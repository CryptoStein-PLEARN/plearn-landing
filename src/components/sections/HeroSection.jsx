import { useEffect, useState } from 'react'
import { HERO } from '@/constants/copy'
import { CTA, BETA } from '@/constants/config'
import { COINS, MOCKUPS } from '@/constants/assets'
import Button from '@/components/ui/Button'
import SectionTag from '@/components/ui/SectionTag'

/**
 * HeroSection
 *
 * Layout: 2-column grid — text left, game image right.
 * Background: simple dark purple gradient. The hero image carries its own
 * cinematic atmosphere — no CSS recreation needed.
 */
export default function HeroSection() {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const fade = (delayMs = 0) => ({
    className: ready
      ? 'opacity-100 translate-y-0 transition-all duration-700 ease-out'
      : 'opacity-0 translate-y-6',
    style: { transitionDelay: ready ? `${delayMs}ms` : '0ms' },
  })

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-screen overflow-hidden flex items-center"
      style={{ background: 'radial-gradient(ellipse 100% 90% at 78% 50%, #16074A 0%, #08031E 38%, #050118 65%, #030010 100%)' }}
    >

      {/* Scene connector — wide, very soft atmospheric layer centred at the
          column seam. Gives the entire background a shared tonal depth so
          both sides read as one continuous scene, not two blocks.           */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[140px]"
        style={{ background: 'radial-gradient(ellipse 90% 110% at 48% 52%, rgba(12,6,50,0.45) 0%, transparent 68%)' }} />

      {/* Purple glow — stays tightly around the hero image */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[90px]"
        style={{ background: 'radial-gradient(ellipse 52% 60% at 82% 52%, rgba(110,40,210,0.26) 0%, rgba(70,40,190,0.08) 58%, transparent 75%)' }} />

      {/* Blue-indigo — upper right corner sky accent */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 blur-[80px]"
        style={{ background: 'radial-gradient(ellipse 50% 45% at 92% 6%, rgba(45,25,160,0.45) 0%, transparent 65%)' }} />

      {/* Right-edge indigo tint */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to left, rgba(25,15,90,0.28) 0%, rgba(25,15,90,0.08) 14%, transparent 26%)' }} />

      {/* Left text scrim — dark enough to read, but blends into the scene
          rather than cutting off sharply. Rolls off at 62% not 44%.        */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to right, rgba(3,1,12,0.92) 0%, rgba(4,2,16,0.68) 24%, rgba(4,2,16,0.18) 48%, transparent 62%)' }} />

      {/* Bottom navy depth — removes flat wash, adds cinematic ground */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to top, rgba(2,1,10,0.85) 0%, rgba(3,1,14,0.48) 14%, transparent 30%)' }} />

      {/* Edge vignette — keeps focus centred */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 130% 120% at 50% 50%, transparent 42%, rgba(3,1,12,0.55) 100%)' }} />

      {/* ── Floating P-coin watermarks ────────────────────────────────── */}
      <img src={COINS.purpleStyled} alt="" aria-hidden="true"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '460px', height: '460px', left: '-80px', top: '50%',
          transform: 'translateY(-50%)', objectFit: 'contain',
          opacity: 0.08,
          filter: 'blur(1.5px) drop-shadow(0 0 18px rgba(137,38,231,0.50)) drop-shadow(0 0 38px rgba(87,62,251,0.25))',
          animationDelay: '1.2s', animationDuration: '7s', zIndex: 0 }} />
      <img src={COINS.blue} alt="" aria-hidden="true"
        className="pointer-events-none select-none absolute animate-float"
        style={{ width: '320px', height: '320px', right: '-60px', bottom: '10%',
          objectFit: 'contain',
          opacity: 0.07,
          filter: 'blur(2px) drop-shadow(0 0 16px rgba(70,158,255,0.45)) drop-shadow(0 0 32px rgba(70,158,255,0.22))',
          animationDelay: '3.0s', animationDuration: '8s', zIndex: 0 }} />

      {/* ═══════════════════════════════════════════════
          PAGE CONTENT
          ═══════════════════════════════════════════ */}
      <div className="section-container w-full pt-24 pb-16 lg:pt-0 lg:pb-0 relative z-10">
        <div className="grid lg:grid-cols-[44%_56%] gap-8 lg:gap-4 items-center min-h-screen lg:py-20">

          {/* ── Left: text ──────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6 order-1">

            <div {...fade(0)}>
              <SectionTag>{HERO.preTag}</SectionTag>
            </div>

            <div {...fade(80)}>
              <h1 className="font-karantina text-h1-sm sm:text-h1-md lg:text-h1 text-gradient-hero leading-[1.05]">
                {HERO.headline}
              </h1>
            </div>

            <div {...fade(160)}>
              <p className="font-rem text-body-lg text-text-muted max-w-lg leading-relaxed">
                {HERO.sub}
              </p>
            </div>

            <div className={`flex flex-wrap gap-3 ${fade(240).className}`} style={fade(240).style}>
              <Button href={CTA.joinBeta} variant="primary">{HERO.ctaPrimary}</Button>
              <Button href={CTA.exploreDemo} variant="ghost">{HERO.ctaSecondary}</Button>
            </div>

            <div {...fade(320)}>
              <p className="font-rem text-caption text-text-dim flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-plearn-green flex-shrink-0" aria-hidden="true" />
                {BETA.microcopy}
              </p>
            </div>

          </div>

          {/* ── Right: hero image ────────────────────────────────────────── */}
          <div
            className={`relative flex items-center justify-center order-2 ${fade(150).className}`}
            style={fade(150).style}
          >
            {/* Glow halo — sits behind the image, integrates it into the bg */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-[-12%] blur-[70px]"
              style={{ background: 'radial-gradient(ellipse 75% 70% at 52% 52%, rgba(130,40,240,0.55) 0%, rgba(80,60,230,0.28) 40%, transparent 68%)' }} />

            <img
              src={MOCKUPS.heroGamePreview}
              alt="PLEARN — game missions, rewards, and financial learning on laptop and mobile"
              fetchpriority="high"
              className="relative w-full h-auto object-contain"
              style={{
                maxHeight: '680px',
                /* Soft multi-edge fade: left blends into bg, bottom dissolves into floor,
                   right/top stay mostly opaque. No hard rectangular crop. */
                maskImage: [
                  'linear-gradient(to right,  transparent 0%, black 22%, black 92%, transparent 100%)',
                  'linear-gradient(to bottom, transparent 0%, black 6%, black 78%, transparent 100%)',
                ].join(', '),
                WebkitMaskImage: [
                  'linear-gradient(to right,  transparent 0%, black 22%, black 92%, transparent 100%)',
                  'linear-gradient(to bottom, transparent 0%, black 6%, black 78%, transparent 100%)',
                ].join(', '),
                maskComposite: 'intersect',
                WebkitMaskComposite: 'destination-in',
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const ph = e.currentTarget.nextElementSibling
                if (ph) ph.style.display = 'flex'
              }}
            />

            {/* Placeholder when image file is missing */}
            <div
              className="w-full items-center justify-center rounded-2xl border border-dashed border-plearn-purple/40 bg-bg-surface/60 backdrop-blur"
              style={{ aspectRatio: '4/3', maxHeight: 480, display: 'none' }}
            >
              <div className="flex flex-col items-center gap-4 text-center px-8">
                <img src={COINS.purpleStyled} alt="" aria-hidden="true" className="w-16 h-16 opacity-50" />
                <p className="font-karantina text-2xl text-plearn-purple/70 tracking-wide uppercase">Hero image coming soon</p>
                <p className="font-rem text-sm text-text-dim max-w-xs">
                  <code className="text-plearn-sky/80 text-xs break-all">public/assets/mockups/hero-game-preview.png</code>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ────────────────────────────────────────────── */}
      <div aria-hidden="true" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-35 z-10">
        <span className="font-rem text-caption text-text-dim uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-text-dim to-transparent" />
      </div>

    </section>
  )
}
