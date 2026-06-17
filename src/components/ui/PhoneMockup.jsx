import { LOGOS, COINS, CHARACTERS } from '@/constants/assets'

// ─────────────────────────────────────────────────────────────────────────────
// PLEARN — GameMockup v6 — Game Map Edition
//
// Laptop (450px):
//   Full-screen game map — zone islands with SVG progress rings,
//   central glowing hub, dashed connection lines, floating glass panels.
//
// Phone (165px): overlaps bottom-right of laptop for natural depth.
// ─────────────────────────────────────────────────────────────────────────────

// ── Map constants ─────────────────────────────────────────────────────────────
// These are fixed pixel values so the SVG lines align with the island divs.

const ISLE   = 72                          // island SVG size (px)
const RING_R = 28                          // progress ring radius
const CIRC   = 2 * Math.PI * RING_R        // ≈ 175.93

// Zone island top-left positions inside the map area (446 × 236 px)
const ISLE_POS = [
  { left: 84,  top: 6   },   // Financial Responsibility
  { left: 290, top: 6   },   // Checking & Debit
  { left: 84,  top: 144 },   // Savings
  { left: 290, top: 144 },   // Credit & Loans
]

// Zone island centers (used for SVG connection lines)
const ZCX = ISLE_POS.map(p => p.left + ISLE / 2)   // [120, 326, 120, 326]
const ZCY = ISLE_POS.map(p => p.top  + ISLE / 2)   // [42,  42,  180, 180]

const HUB_X = 223   // center of 446-wide map
const HUB_Y = 118   // center of 236-tall map
const HUB_R = 24    // hub circle radius

// ── Primitives ────────────────────────────────────────────────────────────────

function Bar({ pct, color, h = 4 }) {
  return (
    <div style={{ height: h, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden', flexShrink: 0 }}>
      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 99 }} />
    </div>
  )
}

function PCoin({ src, size = 10 }) {
  return (
    <img src={src} alt="" aria-hidden="true"
      style={{ width: size, height: size, objectFit: 'contain', flexShrink: 0 }} />
  )
}

// ── Zone island (circular, SVG progress ring + coin inside) ──────────────────

function ZoneIsland({ label, color, coin, progress, locked, style }) {
  const dash      = (progress / 100) * CIRC
  const innerOff  = ISLE / 2 - (RING_R - 8)   // = 36 - 20 = 16
  const innerSize = (RING_R - 8) * 2           // = 40

  return (
    <div style={{
      position: 'absolute',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      width: ISLE,
      ...style,
    }}>
      {/* Ring + coin */}
      <div style={{ position: 'relative', width: ISLE, height: ISLE }}>

        {/* SVG: outer glow ring + track + progress arc */}
        <svg
          width={ISLE} height={ISLE}
          style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
          aria-hidden="true"
        >
          {/* Ambient outer glow */}
          <circle cx={ISLE/2} cy={ISLE/2} r={RING_R + 9}
            fill="none" stroke={color} strokeWidth="1" opacity="0.10" />
          {/* Track */}
          <circle cx={ISLE/2} cy={ISLE/2} r={RING_R}
            fill="none" stroke={`${color}22`} strokeWidth="4" />
          {/* Progress arc */}
          <circle cx={ISLE/2} cy={ISLE/2} r={RING_R}
            fill="none" stroke={color} strokeWidth="4"
            strokeDasharray={`${dash.toFixed(1)} ${CIRC.toFixed(1)}`}
            strokeLinecap="round"
            transform={`rotate(-90 ${ISLE/2} ${ISLE/2})`}
            opacity="0.90"
          />
        </svg>

        {/* Inner circle with coin */}
        <div style={{
          position: 'absolute',
          top: innerOff, left: innerOff,
          width: innerSize, height: innerSize,
          borderRadius: '50%',
          background: `radial-gradient(circle at 40% 38%, ${color}38, ${color}12)`,
          border: `1.5px solid ${color}38`,
          boxShadow: `0 0 14px ${color}30, inset 0 1px 0 ${color}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <PCoin src={coin} size={innerSize * 0.70} />
        </div>

        {/* Lock overlay */}
        {locked && (
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'rgba(10,7,20,0.68)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Simple SVG lock */}
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden="true">
              <rect x="2" y="7" width="10" height="8" rx="2" fill="rgba(255,255,255,0.22)" />
              <path d="M4 7V5a3 3 0 016 0v2" stroke="rgba(255,255,255,0.22)"
                strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>

      {/* Zone label — Karantina, this IS a key title */}
      <p style={{
        fontFamily: "'Karantina', Impact, sans-serif",
        fontSize: 10, color: '#FFF', textAlign: 'center',
        lineHeight: 1.2, marginTop: 5, textTransform: 'uppercase',
        textShadow: `0 0 10px ${color}55`,
        letterSpacing: '0.03em',
        maxWidth: ISLE + 14, whiteSpace: 'pre-line',
        pointerEvents: 'none',
      }}>
        {label}
      </p>
    </div>
  )
}

// ── Map zone data ─────────────────────────────────────────────────────────────

const MAP_ZONES = [
  { id: 'financial', label: 'FINANCIAL\nRESPONS.',  color: '#8926E7', coin: COINS.purpleStyled, progress: 65, locked: false },
  { id: 'checking',  label: 'CHECKING\n& DEBIT',    color: '#469EFF', coin: COINS.blue,         progress: 40, locked: false },
  { id: 'savings',   label: 'SAVINGS',              color: '#01DE5B', coin: COINS.green,        progress: 80, locked: false },
  { id: 'credit',    label: 'CREDIT\n& LOANS',      color: '#FE5934', coin: COINS.orange,       progress: 20, locked: true  },
]

// ── Connection lines ──────────────────────────────────────────────────────────

function ConnectionLines() {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        overflow: 'visible', pointerEvents: 'none',
      }}
    >
      {MAP_ZONES.map((z, i) => (
        <g key={z.id}>
          {/* Glow halo */}
          <line
            x1={ZCX[i]} y1={ZCY[i]} x2={HUB_X} y2={HUB_Y}
            stroke={z.color} strokeWidth="5" strokeOpacity="0.10"
          />
          {/* Dashed path */}
          <line
            x1={ZCX[i]} y1={ZCY[i]} x2={HUB_X} y2={HUB_Y}
            stroke={z.color} strokeWidth="1.5"
            strokeDasharray="5 4" strokeOpacity="0.48"
          />
          {/* Zone endpoint dot */}
          <circle cx={ZCX[i]} cy={ZCY[i]} r="3"
            fill={z.color} opacity="0.55" />
        </g>
      ))}
    </svg>
  )
}

// ── Central hub ───────────────────────────────────────────────────────────────

function CentralHub() {
  return (
    <div style={{ position: 'absolute', left: HUB_X - HUB_R, top: HUB_Y - HUB_R, zIndex: 20 }}>
      {/* Ambient bloom */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: -(HUB_R * 1.6), borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(137,38,231,0.50) 0%, transparent 70%)',
        filter: 'blur(10px)',
        pointerEvents: 'none',
      }} />
      {/* Outer ring */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: -8, borderRadius: '50%',
        border: '1px solid rgba(137,38,231,0.25)',
      }} />
      {/* Mid ring */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: -3, borderRadius: '50%',
        border: '1px solid rgba(137,38,231,0.40)',
      }} />
      {/* Main circle */}
      <div style={{
        width: HUB_R * 2, height: HUB_R * 2, borderRadius: '50%',
        background: 'radial-gradient(circle at 42% 38%, rgba(162,70,255,1), rgba(87,62,251,0.92))',
        boxShadow: '0 0 32px rgba(137,38,231,1), 0 0 64px rgba(137,38,231,0.38)',
        border: '2px solid rgba(255,255,255,0.22)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <PCoin src={COINS.purpleStyled} size={HUB_R * 1.25} />
      </div>
    </div>
  )
}

// ── Floating glass panels ─────────────────────────────────────────────────────

const GLASS_STYLE = {
  position: 'absolute',
  background: 'rgba(12,8,22,0.88)',
  border: '1px solid rgba(255,255,255,0.09)',
  borderRadius: 10,
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  zIndex: 30,
}

const QUESTS_DATA = [
  { label: 'Complete a Lesson',  reward: '50',  coin: COINS.green  },
  { label: 'Answer 10 Quiz Qs', reward: '75',  coin: COINS.blue   },
  { label: 'Save 100 Coins',    reward: '100', coin: COINS.orange },
]

function QuestPanel() {
  return (
    <div style={{ ...GLASS_STYLE, left: 5, top: 58, width: 78, padding: '6px 6px 5px' }}>
      <div style={{ fontFamily: "'REM', sans-serif", fontSize: 7, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#8B7CB8', marginBottom: 5 }}>
        Quests
      </div>
      {QUESTS_DATA.map((q, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 4, marginBottom: 4 }}>
          <div style={{
            width: 11, height: 11, borderRadius: '50%', flexShrink: 0, marginTop: 1,
            border: '1.5px solid rgba(255,255,255,0.14)',
          }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "'REM', sans-serif", fontSize: 7.5, color: '#C4B8E8', lineHeight: 1.3 }}>{q.label}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginTop: 1 }}>
              <PCoin src={q.coin} size={8} />
              <span style={{ fontFamily: "'REM', sans-serif", fontSize: 7, color: '#8B7CB8' }}>{q.reward} P</span>
            </div>
          </div>
        </div>
      ))}
      <div style={{ fontFamily: "'REM', sans-serif", fontSize: 7, fontWeight: 600, color: '#8926E7', textAlign: 'center', marginTop: 2, background: 'rgba(137,38,231,0.10)', border: '1px solid rgba(137,38,231,0.22)', borderRadius: 6, padding: '3px 4px' }}>
        View All
      </div>
    </div>
  )
}

const LESSONS = [
  { name: 'Needs vs. Wants', done: true  },
  { name: 'Budget Basics',   done: true  },
  { name: 'Smart Spending',  done: false, active: true  },
  { name: 'Track Your Money',done: false },
]

function LessonPanel() {
  return (
    <div style={{ ...GLASS_STYLE, right: 5, top: 58, width: 82, padding: '6px 7px 5px' }}>
      <div style={{ fontFamily: "'REM', sans-serif", fontSize: 7, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.10em', color: '#8B7CB8', marginBottom: 4 }}>
        Lesson Path
      </div>
      <div style={{ fontFamily: "'REM', sans-serif", fontSize: 7.5, color: '#C4B8E8', marginBottom: 4, lineHeight: 1.2 }}>
        Ch.3: Money Basics
      </div>
      <Bar pct={60} color="#8926E7" h={3} />
      <div style={{ marginTop: 5, display: 'flex', flexDirection: 'column', gap: 3 }}>
        {LESSONS.map((l, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
              background: l.done ? '#01DE5B' : l.active ? '#8926E7' : 'rgba(255,255,255,0.08)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {l.done && (
                <svg width="6" height="5" viewBox="0 0 6 5" aria-hidden="true">
                  <path d="M1 2.5L2.5 4L5 1" stroke="#0A0714" strokeWidth="1.2"
                    strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <span style={{
              fontFamily: "'REM', sans-serif", fontSize: 7,
              color: l.done ? '#C4B8E8' : l.active ? '#FFF' : '#8B7CB8',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {l.name}
            </span>
          </div>
        ))}
      </div>
      {/* Next reward */}
      <div style={{ marginTop: 6, padding: '4px 5px', borderRadius: 7, background: 'rgba(254,89,52,0.10)', border: '1px solid rgba(254,89,52,0.20)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          <span style={{ fontFamily: "'REM', sans-serif", fontSize: 7, color: '#C4B8E8' }}>Next Reward</span>
          <span style={{ fontSize: 9 }}>🏆</span>
        </div>
        <Bar pct={67} color="#FE5934" h={3} />
        <span style={{ fontFamily: "'REM', sans-serif", fontSize: 7, color: '#8B7CB8', marginTop: 2, display: 'block' }}>2 / 3</span>
      </div>
    </div>
  )
}

// ── Game map (full laptop body) ───────────────────────────────────────────────

function GameMap() {
  return (
    <div
      className="relative flex-1 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 50% 48%, rgba(137,38,231,0.14) 0%, rgba(10,7,20,0.97) 66%)',
      }}
    >
      {/* Grid texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage:
            'linear-gradient(rgba(137,38,231,0.055) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(137,38,231,0.055) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Per-zone ambient glow spots */}
      {MAP_ZONES.map((z, i) => (
        <div key={`glow-${z.id}`} aria-hidden="true" style={{
          position: 'absolute',
          left: ZCX[i] - 38, top: ZCY[i] - 38,
          width: 76, height: 76,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${z.color}38 0%, transparent 70%)`,
          filter: 'blur(14px)',
          pointerEvents: 'none',
        }} />
      ))}

      {/* Connection lines + endpoint dots (behind islands) */}
      <ConnectionLines />

      {/* Zone islands */}
      {MAP_ZONES.map((z, i) => (
        <ZoneIsland key={z.id} {...z} style={ISLE_POS[i]} />
      ))}

      {/* Central hub (on top of lines, behind panels) */}
      <CentralHub />

      {/* Floating glass panels — small and secondary */}
      <QuestPanel />
      <LessonPanel />
    </div>
  )
}

// ── Laptop header ─────────────────────────────────────────────────────────────

function StatChip({ icon, value, label, color }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 3,
      padding: '3px 5px', borderRadius: 6, flexShrink: 0,
      background: `${color}13`, border: `1px solid ${color}28`,
    }}>
      <span style={{ fontSize: 8 }}>{icon}</span>
      <div>
        <div style={{ fontFamily: "'REM', sans-serif", fontSize: 8, fontWeight: 700, color, lineHeight: 1 }}>{value}</div>
        <div style={{ fontFamily: "'REM', sans-serif", fontSize: 6, color: '#8B7CB8', lineHeight: 1, marginTop: 1 }}>{label}</div>
      </div>
    </div>
  )
}

function LaptopHeader() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '5px 10px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      background: 'linear-gradient(90deg, rgba(137,38,231,0.11), rgba(87,62,251,0.04))',
      flexShrink: 0,
    }}>
      <img src={LOGOS.logotype} alt="PLEARN" style={{ height: 12, width: 'auto', flexShrink: 0 }} />

      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />

      {/* Tiny player block */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
        <div style={{
          width: 18, height: 18, borderRadius: '50%', overflow: 'hidden', position: 'relative',
          border: '1.5px solid rgba(137,38,231,0.55)', background: '#1C1538', flexShrink: 0,
        }}>
          <img src={CHARACTERS.alex} alt="" aria-hidden="true"
            style={{ position: 'absolute', width: '330%', left: '-115%', top: '-2%' }} />
        </div>
        <div>
          <div style={{ fontFamily: "'REM', sans-serif", fontSize: 8, fontWeight: 600, color: '#FFF', lineHeight: 1 }}>Alex · Lv.12</div>
          <div style={{ width: 40, marginTop: 2 }}><Bar pct={68} color="#8926E7" h={3} /></div>
        </div>
      </div>

      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.05)' }} />

      <StatChip icon="🔥" value="7"     label="Streak"  color="#FE5934" />
      <StatChip icon="🪙" value="2,350" label="P-Coins" color="#8926E7" />
      <StatChip icon="🎁" value="3"     label="Rewards" color="#01DE5B" />
    </div>
  )
}

// ── Laptop screen ─────────────────────────────────────────────────────────────

function LaptopScreen() {
  return (
    <div style={{ background: '#0A0714', height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <LaptopHeader />
      <GameMap />
    </div>
  )
}

// ── Mobile screen ─────────────────────────────────────────────────────────────

function MobileScreen() {
  return (
    <div style={{ background: '#130E24', display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px 8px', flexShrink: 0 }}>
        <img src={LOGOS.logotype} alt="PLEARN" style={{ height: 13, width: 'auto' }} />
        <div style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: 'rgba(137,38,231,0.18)', border: '1px solid rgba(137,38,231,0.32)',
          borderRadius: 99, padding: '3px 8px',
        }}>
          <PCoin src={COINS.purpleStyled} size={11} />
          <span style={{ fontFamily: "'REM', sans-serif", fontSize: 9, fontWeight: 700, color: '#FFF' }}>2,350</span>
        </div>
      </div>

      <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '0 12px', flexShrink: 0 }} />

      <div style={{ flex: 1, padding: '9px 12px 0', display: 'flex', flexDirection: 'column', gap: 7, overflow: 'hidden' }}>

        {/* Player card */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 9,
          padding: '8px 9px', borderRadius: 12, flexShrink: 0,
          background: 'linear-gradient(135deg, rgba(137,38,231,0.16), rgba(87,62,251,0.08))',
          border: '1px solid rgba(137,38,231,0.22)',
          boxShadow: '0 0 16px rgba(137,38,231,0.09)',
        }}>
          {/* Avatar — aggressive face crop */}
          <div style={{
            width: 42, height: 42, borderRadius: '50%', overflow: 'hidden',
            border: '2px solid #8926E7',
            boxShadow: '0 0 14px rgba(137,38,231,0.55)',
            background: '#1C1538',
            position: 'relative', flexShrink: 0,
          }}>
            <img src={CHARACTERS.alex} alt="Alex"
              style={{ position: 'absolute', width: '330%', left: '-115%', top: '-2%' }} />
          </div>
          {/* Stats */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 }}>
              <span style={{ fontFamily: "'Karantina', sans-serif", fontSize: 13, color: '#FFF', lineHeight: 1 }}>Alex</span>
              <span style={{ fontFamily: "'REM', sans-serif", fontSize: 8, color: '#8B7CB8' }}>Lv. 4</span>
            </div>
            <Bar pct={60} color="#8926E7" h={5} />
            <span style={{ fontFamily: "'REM', sans-serif", fontSize: 7, color: '#8B7CB8', marginTop: 2, display: 'block' }}>1,200 / 2,000 XP</span>
          </div>
        </div>

        {/* Daily streak */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'rgba(254,89,52,0.10)', border: '1px solid rgba(254,89,52,0.25)',
          borderRadius: 8, padding: '5px 9px', flexShrink: 0,
        }}>
          <span style={{ fontFamily: "'REM', sans-serif", fontSize: 8, fontWeight: 600, color: '#C4B8E8' }}>Daily Streak</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 1, marginLeft: 'auto' }}>
            {[1,2,3,4,5,6,7].map(i => (
              <span key={i} style={{ fontSize: 9 }}>🔥</span>
            ))}
          </div>
        </div>

        {/* Continue Learning */}
        <div style={{
          borderRadius: 12, padding: '9px 10px', flexShrink: 0,
          background: 'linear-gradient(135deg, rgba(137,38,231,0.17), rgba(87,62,251,0.08))',
          border: '1px solid rgba(137,38,231,0.22)',
          boxShadow: '0 0 16px rgba(137,38,231,0.10)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontFamily: "'REM', sans-serif", fontSize: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#8B7CB8' }}>
              Continue Learning
            </span>
            <span style={{ fontFamily: "'REM', sans-serif", fontSize: 7, color: '#8B7CB8' }}>60%</span>
          </div>
          <div style={{ fontFamily: "'Karantina', sans-serif", fontSize: 16, color: '#FFF', lineHeight: 1.1, marginBottom: 7 }}>
            Budget Basics
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <Bar pct={60} color="#8926E7" h={5} />
            </div>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg, #8926E7, #573EFB)',
              boxShadow: '0 0 10px rgba(137,38,231,0.55)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#FFF', fontSize: 8, marginLeft: 1 }}>▶</span>
            </div>
          </div>
        </div>

        {/* Reward Chest */}
        <div style={{
          borderRadius: 12, padding: '9px 10px', flexShrink: 0,
          background: 'linear-gradient(135deg, rgba(254,89,52,0.14), rgba(254,89,52,0.05))',
          border: '1px solid rgba(254,89,52,0.28)',
          boxShadow: '0 0 14px rgba(254,89,52,0.09)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontFamily: "'REM', sans-serif", fontSize: 8, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: '#FE5934' }}>
              Reward Chest
            </span>
            <span style={{ fontSize: 14 }}>🏆</span>
          </div>
          <div style={{ fontFamily: "'REM', sans-serif", fontSize: 8, color: '#8B7CB8', marginBottom: 6 }}>
            Complete 1 more quest!
          </div>
          <Bar pct={67} color="#FE5934" h={5} />
          <span style={{ fontFamily: "'REM', sans-serif", fontSize: 7, color: '#8B7CB8', marginTop: 2, display: 'block' }}>2 / 3 quests</span>
        </div>

      </div>

      {/* Home bar */}
      <div style={{ paddingBottom: 8, paddingTop: 5, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
        <div style={{ width: 52, height: 3, background: 'rgba(255,255,255,0.18)', borderRadius: 99 }} />
      </div>
    </div>
  )
}

// ── Laptop device frame ───────────────────────────────────────────────────────

function LaptopMockup() {
  return (
    <div style={{ position: 'relative', width: 450 }}>
      {/* Ambient glow behind screen */}
      <div aria-hidden="true" style={{
        position: 'absolute', zIndex: -1,
        inset: '-18px -22px -10px -22px',
        borderRadius: 26, filter: 'blur(48px)', opacity: 0.22,
        background: 'linear-gradient(135deg, #8926E7 0%, #5077F2 55%, #573EFB 100%)',
      }} />

      {/* Screen */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        borderRadius: '16px 16px 0 0', height: 268,
        border: '2px solid rgba(255,255,255,0.11)',
        boxShadow: '0 0 0 1px rgba(137,38,231,0.15), 0 20px 54px rgba(0,0,0,0.65)',
      }}>
        {/* Camera dot */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)',
          width: 5, height: 5, borderRadius: '50%', background: 'rgba(255,255,255,0.12)', zIndex: 10,
        }} />
        <LaptopScreen />
      </div>

      {/* Keyboard base */}
      <div style={{
        height: 20, borderRadius: '0 0 14px 14px',
        borderLeft: '2px solid rgba(255,255,255,0.09)',
        borderRight: '2px solid rgba(255,255,255,0.09)',
        borderBottom: '2px solid rgba(255,255,255,0.09)',
        background: 'linear-gradient(180deg, #1C1538, #130E24)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{ width: 80, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 99 }} />
      </div>
    </div>
  )
}

// ── Phone device frame ────────────────────────────────────────────────────────

function PhoneFrame() {
  return (
    <div style={{ position: 'relative', width: 165 }}>
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: -1,
        borderRadius: '2.5rem', transform: 'scale(0.88)',
        background: 'linear-gradient(148deg, #8926E7, #EF00BD)',
        filter: 'blur(28px)', opacity: 0.30,
      }} />
      {/* Device */}
      <div style={{
        position: 'relative', overflow: 'hidden', borderRadius: '2.25rem',
        border: '2px solid rgba(255,255,255,0.13)',
        boxShadow: '0 0 0 1px rgba(137,38,231,0.22), 0 0 0 4px rgba(255,255,255,0.03), 0 28px 70px rgba(0,0,0,0.72)',
      }}>
        {/* Dynamic island */}
        <div style={{ background: '#0A0714', paddingTop: 10, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ width: 58, height: 14, background: '#000', borderRadius: 99 }} />
        </div>
        {/* Screen */}
        <div style={{ height: 316 }}>
          <MobileScreen />
        </div>
      </div>
    </div>
  )
}

// ── Composed GameMockup ───────────────────────────────────────────────────────
//
// Container: 500 × 420 px
// Laptop:    450 × 288 px  → anchored top-left (0, 0)
// Phone:     165 × 344 px  → anchored bottom-right
//   Phone top:  420 − 344 = 76px (≈26% down the laptop height)
//   Phone left: 500 − 165 = 335px  →  overlap = 450 − 335 = 115px
//   Phone extends 420 − 288 = 132px below laptop (natural corner overlap)

export default function GameMockup({ className = '' }) {
  return (
    <div
      className={`relative flex-shrink-0 ${className}`}
      style={{ width: 500, height: 420 }}
    >
      <div style={{ position: 'absolute', left: 0, top: 0 }}>
        <LaptopMockup />
      </div>
      <div style={{ position: 'absolute', right: 0, bottom: 0, zIndex: 10 }}>
        <PhoneFrame />
      </div>
    </div>
  )
}
