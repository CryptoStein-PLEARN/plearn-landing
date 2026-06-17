// ─────────────────────────────────────────────────────────────────────────────
// WaitlistForm — shared between WaitlistModal and WaitlistPage
//
// Submission flow:
//   1. Validate fields client-side.
//   2. Insert row into Supabase (waitlist_signups table).
//   3. On success  → show SuccessState.
//   4. On 23505    → duplicate email → show friendly "already on waitlist" message.
//   5. On any other error → show inline error, keep form open so user can retry.
//
// Dev fallback:
//   If VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set (local dev
//   without a Supabase project), submissions fall back to localStorage only
//   and log a warning. This path is unreachable in production — Netlify env
//   variables ensure the client is always initialised on deployed builds.
//
// Fields sent to Supabase:
//   first_name, email (lowercased), role, country, referral_source,
//   source_page, consent_beta_contact, user_agent
//
// Fields NOT sent (set by the database):
//   id, created_at, status
// ─────────────────────────────────────────────────────────────────────────────

import { useRef, useState } from 'react'
import { COINS }    from '@/constants/assets'
import { BETA }     from '@/constants/config'
import supabase     from '@/lib/supabase'

// ── Form options ──────────────────────────────────────────────────────────────

// Values are the slug strings validated by the Supabase CHECK constraint.
// Labels are the human-readable strings shown in the dropdown.
const ROLES = [
  { value: '',               label: 'Select an option…'      },
  { value: 'student',        label: 'Student'                 },
  { value: 'professional',   label: 'Young Professional'      },
  { value: 'teacher',        label: 'Teacher or School'       },
  { value: 'bank-fintech',   label: 'Bank or Fintech'         },
  { value: 'brand-partner',  label: 'Brand / Reward Partner'  },
  { value: 'other',          label: 'Other'                   },
]

const COUNTRIES = [
  'Portugal', 'Spain', 'France', 'Germany', 'Netherlands', 'Belgium',
  'Italy', 'Poland', 'Sweden', 'Finland', 'Denmark', 'Norway',
  'Austria', 'Switzerland', 'United Kingdom', 'Ireland',
  'United States', 'Canada', 'Australia', 'Brazil', 'Other',
]

const HOW_HEARD = [
  { value: '',           label: 'Select an option…'   },
  { value: 'social',     label: 'Social media'         },
  { value: 'friend',     label: 'Friend or colleague'  },
  { value: 'university', label: 'University or school' },
  { value: 'eit',        label: 'EIT Digital'          },
  { value: 'event',      label: 'Event or conference'  },
  { value: 'search',     label: 'Search engine'        },
  { value: 'other',      label: 'Other'                },
]

// ── Styles ────────────────────────────────────────────────────────────────────

const ARROW = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M6 9L12 15L18 9' stroke='rgba(180%2C140%2C255%2C0.70)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`

function inputStyle(focused, error) {
  const border = error
    ? '1.5px solid rgba(239,0,189,0.70)'
    : focused
      ? '1.5px solid rgba(137,38,231,0.85)'
      : '1.5px solid rgba(137,38,231,0.38)'
  const shadow = error
    ? '0 0 0 3px rgba(239,0,189,0.13)'
    : focused
      ? '0 0 0 3px rgba(137,38,231,0.20)'
      : 'none'
  return {
    width: '100%',
    background: 'rgba(255,255,255,0.055)',
    border, borderRadius: '10px',
    padding: '0.72rem 1rem',
    color: '#FFFFFF', fontSize: '0.90rem',
    fontFamily: 'inherit', outline: 'none',
    boxShadow: shadow,
    transition: 'border-color 0.18s, box-shadow 0.18s',
  }
}

function selectStyle(focused, error) {
  return {
    ...inputStyle(focused, error),
    appearance: 'none', WebkitAppearance: 'none',
    backgroundImage: ARROW,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: '2.5rem',
    cursor: 'pointer',
    colorScheme: 'dark',
  }
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FieldLabel({ htmlFor, children, required }) {
  return (
    <label
      htmlFor={htmlFor}
      className="font-rem"
      style={{
        display: 'block',
        fontSize: '0.70rem', fontWeight: 700,
        letterSpacing: '0.10em', textTransform: 'uppercase',
        color: 'rgba(200,180,240,0.72)',
        marginBottom: '0.45rem',
      }}
    >
      {children}
      {required && (
        <span aria-hidden="true" style={{ color: '#EF00BD', marginLeft: '3px' }}>*</span>
      )}
    </label>
  )
}

function FieldError({ id, message }) {
  if (!message) return null
  return (
    <p id={id} role="alert" className="font-rem"
      style={{ fontSize: '0.76rem', color: '#EF00BD', marginTop: '0.35rem' }}>
      {message}
    </p>
  )
}

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <FieldLabel htmlFor={id} required={required}>{label}</FieldLabel>
      {children}
      <FieldError id={`${id}-err`} message={error} />
    </div>
  )
}

// ── Inline submission error banner ────────────────────────────────────────────
// Shown below the form when Supabase returns an error.
// 'duplicate' → friendly "already on the list" message
// 'error'     → generic retry message

function SubmitErrorBanner({ type, onDismiss }) {
  if (!type) return null

  const isDuplicate = type === 'duplicate'

  return (
    <div
      role="alert"
      className="font-rem"
      style={{
        marginTop: '1rem',
        padding: '0.85rem 1rem',
        borderRadius: '10px',
        border: `1.5px solid ${isDuplicate ? 'rgba(70,158,255,0.45)' : 'rgba(239,0,189,0.45)'}`,
        background: isDuplicate ? 'rgba(70,158,255,0.07)' : 'rgba(239,0,189,0.07)',
        display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
      }}
    >
      <span aria-hidden="true" style={{ fontSize: '1rem', lineHeight: 1.5, flexShrink: 0 }}>
        {isDuplicate ? 'ℹ️' : '⚠️'}
      </span>
      <div style={{ flex: 1 }}>
        <p style={{
          fontSize: '0.84rem', lineHeight: 1.55,
          color: isDuplicate ? 'rgba(160,200,255,0.90)' : 'rgba(255,180,230,0.90)',
          margin: 0,
        }}>
          {isDuplicate
            ? "You're already on the waitlist — we'll reach out when your spot opens up."
            : <>
                Something went wrong. Please try again or email us at{' '}
                <a
                  href="mailto:hello@plearngame.com"
                  style={{ color: 'inherit', textDecoration: 'underline' }}
                >
                  hello@plearngame.com
                </a>
                .
              </>
          }
        </p>
      </div>
      <button
        onClick={onDismiss}
        aria-label="Dismiss message"
        className="font-rem"
        style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 0 4px',
          color: 'rgba(200,180,240,0.50)', fontSize: '0.85rem', lineHeight: 1,
          flexShrink: 0,
        }}
      >
        ✕
      </button>
    </div>
  )
}

// ── Success state ─────────────────────────────────────────────────────────────

function SuccessState({ onClose }) {
  return (
    <div className="flex flex-col items-center text-center"
      style={{ padding: '2.5rem 1.5rem 2rem' }}>

      {/* Floating coin + halo */}
      <div style={{ position: 'relative', width: '100px', height: '100px', marginBottom: '1.75rem' }}>
        <div aria-hidden="true" style={{
          position: 'absolute', inset: '-22px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(137,38,231,0.50) 0%, transparent 70%)',
          filter: 'blur(18px)',
        }} />
        <img
          src={COINS.purpleStyled}
          alt=""
          aria-hidden="true"
          className="animate-float"
          style={{
            width: '100px', height: '100px', objectFit: 'contain',
            position: 'relative', zIndex: 1,
            filter:
              'drop-shadow(0 0 18px rgba(137,38,231,0.95)) ' +
              'drop-shadow(0 0 40px rgba(87,62,251,0.65)) ' +
              'drop-shadow(0 0 70px rgba(137,38,231,0.35))',
            animationDuration: '3s',
          }}
        />
      </div>

      {/* Mission-complete badge */}
      <div className="font-rem" style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '5px 14px', borderRadius: '20px',
        background: 'rgba(100,60,240,0.22)',
        border: '1px solid rgba(110,70,255,0.45)',
        fontSize: '0.67rem', fontWeight: 700, color: '#BBA8FF',
        letterSpacing: '0.13em', textTransform: 'uppercase',
        marginBottom: '1.25rem',
      }}>
        <span aria-hidden="true" style={{
          width: '5px', height: '5px', borderRadius: '50%', display: 'inline-block',
          background: '#7B5CF6', boxShadow: '0 0 6px rgba(123,92,246,0.8)',
        }} />
        Mission complete: Beta signup
      </div>

      {/* Headline */}
      <p className="font-karantina" style={{
        fontSize: 'clamp(2.6rem, 8vw, 3.6rem)',
        fontStyle: 'italic', lineHeight: 1.0,
        marginBottom: '0.9rem',
      }}>
        <span style={{ color: '#FFFFFF' }}>You're </span>
        <span style={{
          background: 'linear-gradient(90deg, #EF00BD 0%, #C832FF 45%, #8926E7 80%, #5077F2 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        }}>in.</span>
      </p>

      {/* Body */}
      <p className="font-rem" style={{
        fontSize: '0.95rem', color: 'rgba(200,185,230,0.75)',
        lineHeight: 1.7, maxWidth: '360px', marginBottom: '2rem',
      }}>
        Welcome to the waitlist. We'll reach out when your spot opens up.
      </p>

      {/* CTA */}
      <button
        onClick={onClose}
        className="font-rem font-bold"
        style={{
          padding: '0.9rem 2.2rem', borderRadius: '9999px',
          background: 'linear-gradient(105deg, #8926E7 0%, #5077F2 60%, #469EFF 100%)',
          color: '#FFFFFF', border: 'none', fontSize: '0.92rem', cursor: 'pointer',
          boxShadow: '0 0 22px rgba(137,38,231,0.50), 0 4px 16px rgba(0,0,0,0.30)',
          transition: 'box-shadow 0.2s, transform 0.15s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 0 34px rgba(137,38,231,0.72), 0 6px 20px rgba(0,0,0,0.30)'
          e.currentTarget.style.transform = 'translateY(-1px)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 0 22px rgba(137,38,231,0.50), 0 4px 16px rgba(0,0,0,0.30)'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        Continue exploring PLEARN ›
      </button>

      {/* EIT backer line */}
      <p className="font-rem" style={{
        fontSize: '0.74rem', color: 'rgba(160,140,200,0.50)', marginTop: '1.25rem',
      }}>
        {BETA.backer}
      </p>
    </div>
  )
}

// ── Main form ─────────────────────────────────────────────────────────────────

// sourcePage is passed by the parent:
//   WaitlistModal  → 'modal'
//   WaitlistPage   → 'waitlist-page'
// This value is stored in source_page in Supabase.

export default function WaitlistForm({ onClose, onSuccess, sourcePage = 'modal' }) {
  const [fields, setFields]     = useState({
    firstName: '', email: '', role: '', country: '', howHeard: '',
  })
  const [consent, setConsent]   = useState(false)
  const [errors, setErrors]     = useState({})
  const [status, setStatus]     = useState('idle')   // 'idle'|'submitting'|'success'
  const [submitError, setSubmitError] = useState(null) // null|'duplicate'|'error'
  const [focused, setFocused]   = useState(null)

  const firstNameRef  = useRef(null)
  const emailRef      = useRef(null)
  const roleRef       = useRef(null)
  const consentRef    = useRef(null)

  const set = (field) => (e) => {
    setFields(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!fields.firstName.trim())
      errs.firstName = 'First name is required'
    if (!fields.email.trim())
      errs.email = 'Email address is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
      errs.email = 'Please enter a valid email address'
    if (!fields.role)
      errs.role = 'Please select your role'
    if (!consent)
      errs.consent = 'Please agree to be contacted before signing up'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError(null)

    const errs = validate()
    if (Object.keys(errs).length) {
      setErrors(errs)
      requestAnimationFrame(() => {
        if (errs.firstName) firstNameRef.current?.focus()
        else if (errs.email) emailRef.current?.focus()
        else if (errs.role)  roleRef.current?.focus()
        else if (errs.consent) consentRef.current?.focus()
      })
      return
    }

    setStatus('submitting')

    const entry = {
      first_name:           fields.firstName.trim(),
      email:                fields.email.trim().toLowerCase(),
      role:                 fields.role,
      country:              fields.country  || null,
      referral_source:      fields.howHeard || null,
      source_page:          sourcePage,
      consent_beta_contact: true,     // validated above — always true at this point
      user_agent:           navigator.userAgent || null,
      // NOT sent: id, created_at, status — all set by the database
    }

    // ── Supabase submit ───────────────────────────────────────────────────────
    if (supabase) {
      const { error } = await supabase
        .from('waitlist_signups')
        .insert([entry])

      if (error) {
        // 23505 = unique_violation — duplicate email address
        if (error.code === '23505') {
          setSubmitError('duplicate')
        } else {
          console.error('[PLEARN Waitlist] Supabase insert error:', error)
          setSubmitError('error')
        }
        setStatus('idle')
        return
      }

      // Success — Supabase confirmed the insert
      setStatus('success')
      onSuccess?.()
      return
    }

    // ── Dev fallback (no Supabase env variables) ──────────────────────────────
    // Only reachable in local development when .env.local is not configured.
    // In production, the Supabase client is always initialised.
    if (import.meta.env.DEV) {
      console.warn('[PLEARN Waitlist] ⚠ Supabase not configured — localStorage fallback only.')
      try {
        const prev = JSON.parse(localStorage.getItem('plearn_waitlist') || '[]')
        localStorage.setItem('plearn_waitlist', JSON.stringify([...prev, entry]))
        console.log('[PLEARN Waitlist] Entry saved locally (no backend):', entry)
      } catch {
        console.warn('[PLEARN Waitlist] localStorage unavailable.')
      }
      setTimeout(() => { setStatus('success'); onSuccess?.() }, 420)
    } else {
      // Production with missing env variables — show an error rather than
      // pretending the signup worked.
      console.error('[PLEARN Waitlist] Supabase client not initialised in production.')
      setSubmitError('error')
      setStatus('idle')
    }
  }

  // ── Success state ──
  if (status === 'success') {
    return <SuccessState onClose={onClose} />
  }

  const busy = status === 'submitting'

  return (
    <form onSubmit={handleSubmit} noValidate style={{ padding: '0 clamp(1.25rem, 5vw, 2rem) clamp(1.25rem, 4vw, 2rem)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>

        {/* First name */}
        <Field id="wl-name" label="First name" required error={errors.firstName}>
          <input
            ref={firstNameRef}
            id="wl-name"
            type="text"
            value={fields.firstName}
            onChange={set('firstName')}
            onFocus={() => setFocused('firstName')}
            onBlur={() => setFocused(null)}
            placeholder="Enter your first name"
            autoComplete="given-name"
            aria-required="true"
            aria-invalid={!!errors.firstName || undefined}
            aria-describedby={errors.firstName ? 'wl-name-err' : undefined}
            className="font-rem"
            style={inputStyle(focused === 'firstName', !!errors.firstName)}
          />
        </Field>

        {/* Email */}
        <Field id="wl-email" label="Email address" required error={errors.email}>
          <input
            ref={emailRef}
            id="wl-email"
            type="email"
            value={fields.email}
            onChange={set('email')}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused(null)}
            placeholder="you@example.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email || undefined}
            aria-describedby={errors.email ? 'wl-email-err' : undefined}
            className="font-rem"
            style={inputStyle(focused === 'email', !!errors.email)}
          />
        </Field>

        {/* Role — required */}
        <Field id="wl-role" label="I am a…" required error={errors.role}>
          <select
            ref={roleRef}
            id="wl-role"
            value={fields.role}
            onChange={set('role')}
            onFocus={() => setFocused('role')}
            onBlur={() => setFocused(null)}
            aria-required="true"
            aria-invalid={!!errors.role || undefined}
            aria-describedby={errors.role ? 'wl-role-err' : undefined}
            className="font-rem"
            style={selectStyle(focused === 'role', !!errors.role)}
          >
            {ROLES.map(({ value, label }) => (
              <option key={value} value={value}
                disabled={!value}
                style={{ background: '#0A0714', color: value ? '#FFFFFF' : 'rgba(255,255,255,0.45)' }}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        {/* Country — optional */}
        <Field id="wl-country" label="Country" error={null}>
          <select
            id="wl-country"
            value={fields.country}
            onChange={set('country')}
            onFocus={() => setFocused('country')}
            onBlur={() => setFocused(null)}
            className="font-rem"
            style={selectStyle(focused === 'country', false)}
          >
            <option value="" style={{ background: '#0A0714', color: 'rgba(255,255,255,0.45)' }}>
              Select your country (optional)
            </option>
            {COUNTRIES.map(c => (
              <option key={c} value={c} style={{ background: '#0A0714', color: '#FFFFFF' }}>{c}</option>
            ))}
          </select>
        </Field>

        {/* How heard — optional */}
        <Field id="wl-how" label="How did you hear about us?" error={null}>
          <select
            id="wl-how"
            value={fields.howHeard}
            onChange={set('howHeard')}
            onFocus={() => setFocused('howHeard')}
            onBlur={() => setFocused(null)}
            className="font-rem"
            style={selectStyle(focused === 'howHeard', false)}
          >
            {HOW_HEARD.map(({ value, label }) => (
              <option key={value} value={value}
                style={{ background: '#0A0714', color: value ? '#FFFFFF' : 'rgba(255,255,255,0.45)' }}>
                {label}
              </option>
            ))}
          </select>
        </Field>

        {/* Consent checkbox — required */}
        <div>
          <label
            style={{
              display: 'flex', alignItems: 'flex-start', gap: '0.65rem',
              cursor: 'pointer',
            }}
          >
            <input
              ref={consentRef}
              type="checkbox"
              id="wl-consent"
              checked={consent}
              onChange={(e) => {
                setConsent(e.target.checked)
                if (errors.consent) setErrors(prev => ({ ...prev, consent: '' }))
              }}
              aria-required="true"
              aria-invalid={!!errors.consent || undefined}
              aria-describedby={errors.consent ? 'wl-consent-err' : undefined}
              style={{
                marginTop: '2px', flexShrink: 0,
                width: '16px', height: '16px',
                accentColor: '#8926E7', cursor: 'pointer',
              }}
            />
            <span className="font-rem" style={{
              fontSize: '0.82rem', lineHeight: 1.55,
              color: errors.consent ? '#EF00BD' : 'rgba(200,185,230,0.75)',
              transition: 'color 0.18s',
            }}>
              I agree to be contacted about the PLEARN beta.
              <span aria-hidden="true" style={{ color: '#EF00BD', marginLeft: '3px' }}>*</span>
            </span>
          </label>
          <FieldError id="wl-consent-err" message={errors.consent} />
        </div>

      </div>

      {/* Inline submission error banner */}
      <SubmitErrorBanner
        type={submitError}
        onDismiss={() => setSubmitError(null)}
      />

      {/* Submit button */}
      <button
        type="submit"
        disabled={busy}
        aria-busy={busy}
        className="font-rem font-bold"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
          width: '100%', marginTop: '1.4rem',
          padding: '0.95rem 1.5rem', borderRadius: '9999px', border: 'none',
          background: busy
            ? 'rgba(137,38,231,0.40)'
            : 'linear-gradient(105deg, #EF00BD 0%, #8926E7 45%, #5077F2 80%, #469EFF 100%)',
          color: '#FFFFFF', fontSize: '1rem',
          cursor: busy ? 'wait' : 'pointer',
          boxShadow: busy ? 'none' : '0 0 24px rgba(239,0,189,0.45), 0 0 50px rgba(137,38,231,0.28), 0 4px 18px rgba(0,0,0,0.35)',
          transition: 'background 0.2s, box-shadow 0.2s',
        }}
        onMouseEnter={e => {
          if (busy) return
          e.currentTarget.style.boxShadow = '0 0 34px rgba(239,0,189,0.65), 0 0 65px rgba(137,38,231,0.42), 0 6px 22px rgba(0,0,0,0.35)'
        }}
        onMouseLeave={e => {
          if (busy) return
          e.currentTarget.style.boxShadow = '0 0 24px rgba(239,0,189,0.45), 0 0 50px rgba(137,38,231,0.28), 0 4px 18px rgba(0,0,0,0.35)'
        }}
      >
        {busy ? (
          <>
            <span className="animate-spin" aria-hidden="true" style={{
              width: '16px', height: '16px', borderRadius: '50%', flexShrink: 0,
              border: '2px solid rgba(255,255,255,0.28)',
              borderTopColor: '#FFFFFF', display: 'inline-block',
            }} />
            Sending…
          </>
        ) : (
          'Join the Beta ›'
        )}
      </button>
    </form>
  )
}
