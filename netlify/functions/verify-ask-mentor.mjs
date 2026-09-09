// ─────────────────────────────────────────────────────────────────────────────
// verify-ask-mentor.mjs — offline verification harness for the Ask Mentor
// endpoint. Imports the REAL handler and stubs only the upstream Anthropic
// call, so every gate, the response contract, the rate limiter and the logging
// behaviour are exercised exactly as they run in production.
//
//   node netlify/functions/verify-ask-mentor.mjs
//
// No API key and no network required. This does NOT verify real model output
// (tone, length, child-appropriateness) — that needs the live run.
// ─────────────────────────────────────────────────────────────────────────────

process.env.ANTHROPIC_API_KEY = 'sk-ant-STUB-not-a-real-key'

const handler = (await import('./ask-mentor.mjs')).default

// ── Stub upstream ───────────────────────────────────────────────────────────
let upstreamCalls = 0
let lastUpstreamBody = null
let stubReply = 'Credit means borrowing money now and paying it back later. Think of it as a promise you keep over time.'

const realFetch = globalThis.fetch
globalThis.fetch = async (url, opts) => {
  if (String(url).includes('api.anthropic.com')) {
    upstreamCalls++
    lastUpstreamBody = JSON.parse(opts.body)
    return new Response(JSON.stringify({ content: [{ type: 'text', text: stubReply }] }),
      { status: 200, headers: { 'content-type': 'application/json' } })
  }
  return realFetch(url, opts)
}

// ── Capture logs ────────────────────────────────────────────────────────────
const logs = []
const realLog = console.log, realErr = console.error
console.log   = (...a) => logs.push(a.join(' '))
console.error = (...a) => logs.push(a.join(' '))

// ── Helpers ─────────────────────────────────────────────────────────────────
let sid = 0
const call = async (moduleId, question, language = 'en', sessionId = null) => {
  const req = new Request('https://x/.netlify/functions/ask-mentor', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      moduleId, question, language,
      sessionId: sessionId ?? `s${++sid}`, clientVersion: 'verify',
    }),
  })
  const res = await handler(req)
  return { status: res.status, body: await res.json() }
}

let pass = 0, fail = 0
const out = []
const check = (label, cond, detail = '') => {
  if (cond) { pass++; out.push(`  PASS  ${label}`) }
  else      { fail++; out.push(`  FAIL  ${label}   ${detail}`) }
}

const expect = async (label, moduleId, question, wantSource, wantReason = null) => {
  const { body } = await call(moduleId, question)
  const got = body.reason ? `${body.source}/${body.reason}` : body.source
  const want = wantReason ? `${wantSource}/${wantReason}` : wantSource
  check(`M${moduleId}  ${label.padEnd(42)} ${want}`, got === want, `got ${got}`)
  return body
}

// ═══════════════════════════════════════════════════════════════════════════
out.push('\n── 4. ON-SCOPE → source: "ai"  (all four modules) ──────────────')
await expect('needs vs wants',            1, 'What is the difference between needs and wants?', 'ai')
await expect('start saving',              1, 'How do I start saving money?',                    'ai')
await expect('why budget',                1, 'Why should I make a budget?',                     'ai')
await expect('checking account',          2, 'What is a checking account?',                     'ai')
await expect('why use a bank',            2, 'Why should I use a bank at all?',                 'ai')
await expect('debit card',                2, 'What is a debit card?',                           'ai')
await expect('what is credit',            3, 'What does credit actually mean?',                 'ai')
await expect('credit score concept',      3, 'What is a credit score?',                         'ai')
await expect('loan vs credit card',       3, 'What is the difference between a loan and a credit card?', 'ai')
await expect('emergency fund',            4, 'What is an emergency fund?',                      'ai')
await expect('savings habit',             4, 'How do I build a saving habit?',                  'ai')
await expect('money runs out',            4, 'What if money runs out?',                         'ai')

out.push('\n── 5. OFF-TOPIC → source: "fallback" ───────────────────────────')
await expect('credit score (M3 topic)',   1, 'What is a credit score?',   'fallback', 'out_of_scope')
await expect('credit score',              2, 'How does a credit score work?', 'fallback', 'out_of_scope')
await expect('mortgage',                  4, 'How does a mortgage work?', 'fallback', 'out_of_scope')

out.push('\n── 6. PERSONAL ADVICE → reason: "personal_advice" ──────────────')
await expect('should I take a loan',      3, 'Should I take out a loan?',      'fallback', 'personal_advice')
await expect('fix my credit score',       3, 'How do I fix my credit score?',  'fallback', 'personal_advice')
await expect('I have a debt',             3, 'I have a debt, what do I do?',   'fallback', 'personal_advice')
await expect('my savings account',        2, 'Should I get a savings account?', 'fallback', 'personal_advice')

out.push('\n── 7. INVEST / CRYPTO / TRADING → reason: "blocked_term" ───────')
await expect('invest in stocks',          1, 'Should I invest in stocks?',     'fallback', 'blocked_term')
await expect('bitcoin',                   2, 'Is bitcoin a good idea?',        'fallback', 'blocked_term')
await expect('forex trading',             3, 'Should I start trading forex?',  'fallback', 'blocked_term')
await expect('which investment',          4, 'What investment should I pick?', 'fallback', 'blocked_term')
await expect('crypto',                    3, 'Tell me about cryptocurrency',   'fallback', 'blocked_term')
await expect('gambling',                  1, 'Is betting a good way to earn?', 'fallback', 'blocked_term')

out.push('\n── VALIDATION ──────────────────────────────────────────────────')
await expect('empty question',            1, '',                'fallback', 'bad_request')
await expect('bad moduleId',              9, 'What is a budget?', 'fallback', 'bad_request')
await expect('over 200 chars',            1, 'a'.repeat(250),   'fallback', 'too_long')

{
  const req = new Request('https://x/', { method: 'GET' })
  const res = await handler(req)
  check(`GET returns 405`.padEnd(56), res.status === 405, `got ${res.status}`)

  const bad = new Request('https://x/', { method: 'POST', body: 'not json' })
  const r2 = await handler(bad)
  const b2 = await r2.json()
  check(`non-JSON body → 200 fallback`.padEnd(56), r2.status === 200 && b2.source === 'fallback')

  const opt = await handler(new Request('https://x/', { method: 'OPTIONS' }))
  check(`OPTIONS preflight → 204`.padEnd(56), opt.status === 204, `got ${opt.status}`)
}

out.push('\n── RATE LIMIT (10/hour per sessionId) ──────────────────────────')
{
  const rl = 'ratelimit-session'
  let last
  for (let i = 0; i < 11; i++) last = await call(1, 'What is a budget?', 'en', rl)
  check(`11th request → rate_limited`.padEnd(56),
    last.body.source === 'fallback' && last.body.reason === 'rate_limited',
    `got ${last.body.source}/${last.body.reason}`)

  const other = await call(1, 'What is a budget?', 'en', 'different-session')
  check(`different session unaffected`.padEnd(56), other.body.source === 'ai')
}

out.push('\n── GATE EFFICIENCY (refusals must not spend tokens) ────────────')
{
  const before = upstreamCalls
  await call(1, 'Should I invest in stocks?', 'en', 'gate-a')
  await call(3, 'Should I take out a loan?',  'en', 'gate-b')
  await call(1, 'What is a credit score?',    'en', 'gate-c')
  check(`3 refusals → 0 upstream calls`.padEnd(56), upstreamCalls === before,
    `${upstreamCalls - before} calls leaked`)
}

out.push('\n── PROMPT INTEGRITY ────────────────────────────────────────────')
{
  await call(3, 'What is a credit score?', 'en', 'prompt-check')
  const sys = lastUpstreamBody.system
  const msg = lastUpstreamBody.messages[0].content
  check(`question sent as user turn, not in system`.padEnd(56),
    msg === 'What is a credit score?' && !sys.includes('What is a credit score?'))
  check(`system prompt carries module-3 scope`.padEnd(56),
    sys.includes('Sofia') && sys.includes('credit'))
  check(`max_tokens capped at 110`.padEnd(56), lastUpstreamBody.max_tokens === 110)

  await call(1, 'How do I save?', 'en', 'prompt-check-2')
  check(`module 1 gets Grandma Milie prompt`.padEnd(56),
    lastUpstreamBody.system.includes('Grandma Milie'))
}

out.push('\n── OUTPUT POST-CHECKS ──────────────────────────────────────────')
{
  stubReply = 'OUT_OF_SCOPE'
  const a = await call(1, 'Tell me about something odd', 'en', 'post-a')
  check(`OUT_OF_SCOPE marker → fallback`.padEnd(56),
    a.body.source === 'fallback' && a.body.reason === 'out_of_scope')

  stubReply = 'x'.repeat(900)
  const b = await call(1, 'Explain budgeting', 'en', 'post-b')
  check(`over-length model output → fallback`.padEnd(56),
    b.body.source === 'fallback' && b.body.reason === 'too_long')

  stubReply = 'You should invest in stocks for better returns.'
  const c = await call(1, 'Explain budgeting', 'en', 'post-c')
  check(`blocked term in OUTPUT → fallback`.padEnd(56),
    c.body.source === 'fallback' && c.body.reason === 'blocked_term')

  stubReply = 'A budget helps you decide what matters first.'
  const d = await call(1, 'Explain budgeting', 'en', 'post-d')
  check(`clean output passes through`.padEnd(56), d.body.source === 'ai')

  stubReply = ''
  const e = await call(1, 'Explain budgeting', 'en', 'post-e')
  check(`empty model output → fallback`.padEnd(56),
    e.body.source === 'fallback' && e.body.reason === 'upstream_error')
  stubReply = 'A budget helps you decide what matters first.'
}

out.push('\n── UPSTREAM FAILURE HANDLING ───────────────────────────────────')
{
  const saved = globalThis.fetch
  globalThis.fetch = async () => new Response('nope', { status: 500 })
  const a = await call(1, 'Explain budgeting', 'en', 'up-a')
  check(`upstream 500 → 200 fallback`.padEnd(56),
    a.status === 200 && a.body.reason === 'upstream_error')

  globalThis.fetch = async () => { throw new Error('network down') }
  const b = await call(1, 'Explain budgeting', 'en', 'up-b')
  check(`network throw → 200 fallback`.padEnd(56),
    b.status === 200 && b.body.reason === 'upstream_error')
  globalThis.fetch = saved
}

out.push('\n── CONTRACT SHAPE ──────────────────────────────────────────────')
{
  const ok = await call(1, 'Why make a budget?', 'en', 'shape-a')
  check(`ai: ok/source/moduleId/response present`.padEnd(56),
    ok.body.ok === true && ok.body.source === 'ai' &&
    ok.body.moduleId === 1 && typeof ok.body.response === 'string')

  const fb = await call(1, 'Should I invest?', 'en', 'shape-b')
  check(`fallback: response is empty string`.padEnd(56), fb.body.response === '')
  check(`fallback: reason present`.padEnd(56), typeof fb.body.reason === 'string')
  check(`fallback: ok still true`.padEnd(56), fb.body.ok === true)
}

// ═══════════════════════════════════════════════════════════════════════════
// 8 + 9. PRIVACY — no question text, no response text in any log line
// ═══════════════════════════════════════════════════════════════════════════
const CANARY_Q = 'my secret canary question about pocket money'
const CANARY_R = 'CANARY-RESPONSE-TEXT-SHOULD-NEVER-BE-LOGGED'
stubReply = CANARY_R
await call(1, CANARY_Q, 'en', 'canary-session')

const joined = logs.join('\n')
out.push('\n── 8 + 9. PRIVACY ──────────────────────────────────────────────')
check(`question text never logged`.padEnd(56), !joined.includes('canary question'))
check(`question text never logged (any fragment)`.padEnd(56), !joined.includes('pocket money'))
check(`response text never logged`.padEnd(56), !joined.includes(CANARY_R))
check(`log line contains only metrics`.padEnd(56),
  logs.some(l => l.includes('"evt":"ask-mentor"') && l.includes('latencyMs')))

const metricLine = logs.find(l => l.includes('"evt":"ask-mentor"'))
const metricKeys = metricLine ? Object.keys(JSON.parse(metricLine)).sort() : []
check(`log keys == evt,moduleId,language,source,latencyMs,chars`.padEnd(56),
  JSON.stringify(metricKeys) === JSON.stringify(['chars','evt','language','latencyMs','moduleId','source']),
  metricKeys.join(','))
check(`sessionId never logged`.padEnd(56), !joined.includes('canary-session'))

// ── Report ──────────────────────────────────────────────────────────────────
console.log = realLog; console.error = realErr
console.log(out.join('\n'))
console.log('\n' + '─'.repeat(66))
console.log(`  passed ${pass}   failed ${fail}   upstream calls made: ${upstreamCalls}`)
console.log('─'.repeat(66))
console.log('\nSample metric log line (this is ALL that is written):')
console.log('  ' + (metricLine || '(none)'))
console.log('')
process.exit(fail === 0 ? 0 : 1)
