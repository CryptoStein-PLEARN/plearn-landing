/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],

  theme: {
    extend: {

      // ─── BRAND COLORS ─────────────────────────────────────────────────────
      // Official hex values from the PLEARN brand guideline PDF.
      colors: {
        // Primary
        'plearn-purple':      '#8926E7',
        'plearn-indigo':      '#573EFB',
        // Secondary
        'plearn-pink':        '#EF00BD',
        'plearn-orange':      '#FE5934',
        'plearn-blue':        '#5077F2',
        'plearn-sky':         '#469EFF',
        'plearn-green':       '#01DE5B',
        'plearn-lime':        '#ACED0C',
        'plearn-navy':        '#3535AF',
        // Dark backgrounds (derived)
        'bg-base':            '#0A0714',
        'bg-surface':         '#130E24',
        'bg-elevated':        '#1C1538',
        'bg-subtle':          '#261D4A',
        // Light section (B2B only)
        'bg-light':           '#F7F4FF',
        'bg-light-card':      '#FFFFFF',
        // Text
        'text-plearn':        '#FFFFFF',
        'text-muted':         '#C4B8E8',
        'text-dim':           '#8B7CB8',
        'text-dark':          '#1C1538',
        'text-dark-muted':    '#3535AF',
      },

      // ─── FONTS ────────────────────────────────────────────────────────────
      fontFamily: {
        karantina: ['Karantina', 'Impact', '"Arial Black"', 'sans-serif'],
        rem:       ['REM', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },

      // ─── TYPE SCALE ───────────────────────────────────────────────────────
      fontSize: {
        'display':   ['6rem',    { lineHeight: '1.0',  letterSpacing: '-0.02em' }],
        'h1':        ['4.5rem',  { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'h1-md':     ['3.5rem',  { lineHeight: '1.1'  }],
        'h1-sm':     ['2.75rem', { lineHeight: '1.15' }],
        'h2':        ['3rem',    { lineHeight: '1.15' }],
        'h2-sm':     ['2.25rem', { lineHeight: '1.2'  }],
        'h3':        ['2rem',    { lineHeight: '1.2'  }],
        'h3-sm':     ['1.625rem',{ lineHeight: '1.25' }],
        'body-lg':   ['1.125rem',{ lineHeight: '1.7'  }],
        'body':      ['1rem',    { lineHeight: '1.65' }],
        'body-sm':   ['0.875rem',{ lineHeight: '1.6'  }],
        'ui-label':  ['0.8125rem',{ lineHeight: '1.4', letterSpacing: '0.04em' }],
        'caption':   ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.04em' }],
        'nav':       ['0.9375rem',{ lineHeight: '1.0', letterSpacing: '0.01em' }],
        'btn':       ['0.9375rem',{ lineHeight: '1.0', letterSpacing: '0.03em' }],
      },

      // ─── GRADIENTS (official PLRN GRDNT 01–04 + UI derivatives) ──────────
      backgroundImage: {
        'grdnt-01':    'linear-gradient(90deg, #FE5934, #573EFB)',
        'grdnt-02':    'linear-gradient(90deg, #01DE5B, #855BFF)',
        'grdnt-03':    'linear-gradient(90deg, #EF00BD, #8926E7, #5077F2)',
        'grdnt-04':    'linear-gradient(90deg, #E34EFF, #43FEF0)',
        'grdnt-hero':  'linear-gradient(135deg, #EF00BD 0%, #8926E7 50%, #5077F2 100%)',
        'grdnt-cta':   'linear-gradient(135deg, #8926E7 0%, #573EFB 100%)',
        'grdnt-card':  'linear-gradient(180deg, #130E24 0%, #1C1538 100%)',
        'grdnt-xp':    'linear-gradient(90deg, #8926E7, #EF00BD)',
        'grdnt-radial':'radial-gradient(ellipse at top, #261D4A 0%, #0A0714 70%)',
      },

      // ─── BORDER RADIUS ────────────────────────────────────────────────────
      borderRadius: {
        'card':    '12px',
        'card-lg': '16px',
        'btn':     '10px',
        'pill':    '9999px',
        'badge':   '8px',
      },

      // ─── SHADOWS ──────────────────────────────────────────────────────────
      boxShadow: {
        'coin':        '0 4px 24px rgba(137, 38, 231, 0.35)',
        'card-hover':  '0 8px 32px rgba(137, 38, 231, 0.2)',
        'btn-glow':    '0 4px 20px rgba(137, 38, 231, 0.4)',
        'btn-pink':    '0 4px 20px rgba(239, 0, 189, 0.35)',
        'input-focus': '0 0 0 2px rgba(137, 38, 231, 0.6)',
      },

      // ─── SPACING ──────────────────────────────────────────────────────────
      spacing: {
        'section':    '6rem',
        'section-sm': '4rem',
      },

      // ─── ANIMATIONS ───────────────────────────────────────────────────────
      animation: {
        'float':          'float 3s ease-in-out infinite',
        'float-slow':     'float 4.5s ease-in-out infinite',
        'float-delayed':  'float 3s ease-in-out 1.5s infinite',
        'pulse-ring':     'pulse-ring 2s ease-in-out infinite',
        'fade-up':        'fade-up 0.6s ease-out forwards',
        'fade-up-delay':  'fade-up 0.6s ease-out 0.2s both',
        'xp-fill':        'xp-fill 1s ease-out forwards',
        'scale-in':       'scale-in 0.4s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        'pulse-ring': {
          '0%':   { boxShadow: '0 0 0 0 rgba(239, 0, 189, 0.5)' },
          '70%':  { boxShadow: '0 0 0 14px rgba(239, 0, 189, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(239, 0, 189, 0)' },
        },
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'xp-fill': {
          '0%':   { width: '0%' },
          '100%': { width: 'var(--xp-target, 70%)' },
        },
        'scale-in': {
          '0%':   { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },

  plugins: [],
}
