// ─────────────────────────────────────────────────────────────────────────────
// probe-upstream.mjs — isolate the cause of the Anthropic 400.
//
//   node netlify/functions/probe-upstream.mjs
//
// Sends escalating request variants and prints the FULL Anthropic error JSON
// for each. The first variant that fails identifies the offending field.
//
// SAFE BY CONSTRUCTION:
//   · the API key is never printed (only its length and prefix shape)
//   · no player question text is used — a fixed neutral string is sent
//   · nothing is written to any log the game uses
// ─────────────────────────────────────────────────────────────────────────────

import { readFileSync } from 'node:fs'

for (const line of readFileSync(new URL('../../.env.local', import.meta.url), 'utf8').split('\n')) {
  const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
  if (m) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '')
}

const KEY = process.env.ANTHROPIC_API_KEY || ''
const NEUTRAL = 'What is a budget?'          // fixed. never a player question.

console.log('\n══ KEY SANITY ' + '═'.repeat(52))
console.log('  present      :', KEY ? 'yes' : 'NO')
console.log('  length       :', KEY.length, KEY.length >= 90 ? '(plausible)' : '(SUSPICIOUSLY SHORT)')
console.log('  prefix ok    :', KEY.startsWith('sk-ant-') ? 'yes' : 'NO — does not start with sk-ant-')
console.log('  whitespace   :', /\s/.test(KEY) ? '⚠️  CONTAINS WHITESPACE' : 'clean')
console.log('  quotes       :', /["']/.test(KEY) ? '⚠️  CONTAINS QUOTES' : 'clean')
console.log('  non-ascii    :', /[^\x20-\x7E]/.test(KEY) ? '⚠️  CONTAINS NON-ASCII' : 'clean')

const WS = process.env.ANTHROPIC_WORKSPACE_ID || ''
const HEADERS = {
  'content-type':      'application/json',
  'x-api-key':         KEY,
  'anthropic-version': '2023-06-01',
  ...(WS ? { 'anthropic-workspace-id': WS } : {}),
}
console.log('  workspace-id :', WS ? `set (${WS.slice(0,8)}…)` : 'NOT SET')

async function probe(label, body) {
  process.stdout.write(`\n  ${label}\n`)
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST', headers: HEADERS, body: JSON.stringify(body),
    })
    const raw = await res.text()
    if (res.ok) {
      let txt = ''
      try { txt = JSON.parse(raw).content?.[0]?.text ?? '' } catch {}
      console.log(`    ✅ HTTP ${res.status}   reply: ${txt.slice(0, 80)}`)
      return true
    }
    console.log(`    ❌ HTTP ${res.status}`)
    try {
      const j = JSON.parse(raw)
      console.log(`       type    : ${j?.error?.type}`)
      console.log(`       message : ${j?.error?.message}`)
    } catch {
      console.log(`       body    : ${raw.slice(0, 300)}`)
    }
    console.log(`       request-id: ${res.headers.get('request-id') || '(none — not from Anthropic)'}`)
    return false
  } catch (e) {
    console.log(`    ❌ THREW ${e.name}: ${e.message}  cause=${e.cause?.code || '-'}`)
    return false
  }
}

console.log('\n══ ESCALATING PROBES ' + '═'.repeat(45))

// 1 — absolute minimum valid Messages API call.
await probe('1. minimal (model + max_tokens + messages)', {
  model: 'claude-haiku-4-5-20251001',
  max_tokens: 32,
  messages: [{ role: 'user', content: NEUTRAL }],
})

// 2 — add a trivial system prompt.
await probe('2. + short system string', {
  model: 'claude-haiku-4-5-20251001',
  max_tokens: 32,
  system: 'You are a friendly helper. Answer in one sentence.',
  messages: [{ role: 'user', content: NEUTRAL }],
})

// 3 — the real system prompt from the function, unmodified.
const { default: _ } = { default: null }
const src = readFileSync(new URL('./ask-mentor.mjs', import.meta.url), 'utf8')
const tmplMatch = src.match(/const SYSTEM_TEMPLATE = `([\s\S]*?)`\n/)
const template = tmplMatch ? tmplMatch[1] : null
if (template) {
  const realSystem = template
    .replace('{NPC}', 'Sofia')
    .replace('{VOICE}', 'Clear, encouraging, and respectful.')
    .replace('{SCOPE}', 'What credit is, how borrowing and repaying works.')
    .replace('{LANG}', 'English')
    .replace('${OUT_OF_SCOPE_MARKER}', 'OUT_OF_SCOPE')
  console.log(`\n    (real system prompt: ${realSystem.length} chars)`)
  await probe('3. + REAL system prompt from ask-mentor.mjs', {
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 150,
    system: realSystem,
    messages: [{ role: 'user', content: NEUTRAL }],
  })
} else {
  console.log('\n  3. SKIPPED — could not extract SYSTEM_TEMPLATE')
}

// 4 — alternate model IDs, to rule out account-level model access.
console.log('\n══ MODEL ACCESS ' + '═'.repeat(50))
for (const model of ['claude-haiku-4-5-20251001', 'claude-sonnet-5', 'claude-opus-5']) {
  await probe(`model: ${model}`, {
    model, max_tokens: 16, messages: [{ role: 'user', content: 'hi' }],
  })
}

// 5 — what models does this key actually have?
console.log('\n══ MODELS THIS KEY CAN SEE ' + '═'.repeat(39))
try {
  const res = await fetch('https://api.anthropic.com/v1/models?limit=20', { headers: HEADERS })
  if (res.ok) {
    const j = await res.json()
    for (const m of j.data || []) console.log('   ', m.id)
  } else {
    console.log('    HTTP', res.status, (await res.text()).slice(0, 200))
  }
} catch (e) { console.log('    THREW', e.message) }

console.log('')
