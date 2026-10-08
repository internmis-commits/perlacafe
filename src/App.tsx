import { useState, useEffect, useRef } from 'react'

const NAV_LINKS = [
  { label: 'Home', href: '#' },
  { label: 'Our Story', href: '#story' },
  { label: 'Menu', href: '#menu' },
  { label: "The Driver's Pause", href: '#pause' },
  { label: 'Assured Benefits', href: '#assured' },
  { label: 'Locations', href: '#locations' },
]

const MENU_CATEGORIES = [
  {
    category: 'Signature Coffee',
    items: [
      { name: 'Perlatte', note: "Perla's Signature Latte", price: '₱175' },
      { name: 'Classic Latte', note: 'Espresso & steamed milk', price: '₱150' },
      { name: 'Americano', note: 'Double shot, clean & bold', price: '₱110' },
      { name: 'Cappuccino', note: 'Rich, balanced, velvety', price: '₱140' },
      { name: 'Iced Coffee', note: 'Cold brewed over ice', price: '₱130' },
    ],
  },
  {
    category: 'Refreshments',
    items: [
      { name: 'Cold Brew', note: '12-hour slow-brew', price: '₱160' },
      { name: 'Iced Tea', note: 'Brewed in-house daily', price: '₱90' },
      { name: 'Still Water', note: 'Chilled, premium', price: '₱50' },
      { name: 'Fresh Juice', note: 'Seasonal selection', price: '₱120' },
      { name: 'Sparkling Water', note: 'Chilled', price: '₱70' },
    ],
  },
  {
    category: 'Quick Bites',
    items: [
      { name: 'Breakfast Sandwich', note: 'Egg, cheese & greens', price: '₱195' },
      { name: 'Butter Croissant', note: 'Freshly baked each morning', price: '₱110' },
      { name: 'Overnight Oats', note: 'Light & nourishing', price: '₱145' },
      { name: 'Light Meal Set', note: "Ask for today's selection", price: '₱220' },
      { name: 'Road Trip Snack Pack', note: 'Curated for the journey', price: '₱165' },
    ],
  },
]

const LOCATIONS = [
  {
    name: 'Waypoint Makati',
    address: 'Ayala Avenue, Makati City',
    hours: 'Mon – Sun  ·  6:00 AM – 10:00 PM',
    note: '0.8 km from EDSA',
  },
  {
    name: 'Waypoint BGC',
    address: '5th Avenue, Bonifacio Global City',
    hours: 'Mon – Sun  ·  6:00 AM – 11:00 PM',
    note: '2.1 km from Makati CBD',
  },
  {
    name: 'Waypoint Quezon City',
    address: 'Commonwealth Avenue, Quezon City',
    hours: 'Mon – Sun  ·  6:00 AM – 10:00 PM',
    note: '4.5 km from EDSA Balintawak',
  },
]

/* ─── Arrow SVG ─── */
function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg width="16" height="8" viewBox="0 0 16 8" fill="none" className={className}>
      <path d="M1 4h14M10 1l4 3-4 3" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Perla Logo ─── */
function PerlaLogo({ className = '' }: { className?: string }) {
  return (
    <img
      src="/perla-logo.png"
      alt="Perla Insurance"
      className={`object-contain ${className}`}
      draggable={false}
    />
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [videoActive, setVideoActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const videoReadyRef = useRef(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 56)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // After 2 s: crossfade from image → video background
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const startVideo = () => {
      video.play().catch(() => {})
      setVideoActive(true)
    }

    const onCanPlay = () => { videoReadyRef.current = true }
    video.addEventListener('canplay', onCanPlay)

    const timer = setTimeout(() => {
      if (videoReadyRef.current) {
        startVideo()
      } else {
        video.addEventListener('canplay', startVideo, { once: true })
      }
    }, 2000)

    return () => {
      clearTimeout(timer)
      video.removeEventListener('canplay', onCanPlay)
      video.removeEventListener('canplay', startVideo)
    }
  }, [])

  const onLight = scrolled

  return (
    <div className="bg-warm-white text-near-black min-h-screen">

      {/* ════════════════════════════════════════
          HEADER
      ════════════════════════════════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-warm-white/95 backdrop-blur-md border-b border-warm-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-16 lg:h-[72px]">

          {/* Wordmark */}
          <a href="#" className="flex flex-col leading-none flex-shrink-0">
            <span
              className={`font-serif text-[1.35rem] lg:text-[1.55rem] font-semibold tracking-[0.06em] transition-colors duration-300 ${
                onLight ? 'text-near-black' : 'text-white'
              }`}
            >
              WAYPOINT
            </span>
            <span
              className={`text-[8px] font-sans font-medium tracking-[0.22em] uppercase mt-[3px] transition-colors duration-300 ${
                onLight ? 'text-muted-text' : 'text-white/50'
              }`}
            >
              A Café by Perla Insurance
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`text-[10.5px] font-medium tracking-[0.14em] uppercase transition-colors duration-200 whitespace-nowrap ${
                  onLight ? 'text-charcoal hover:text-perla-red' : 'text-white/70 hover:text-white'
                }`}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right: Perla logo + CTA */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Perla parent brand badge */}
            <div className={`flex items-center gap-2 px-2.5 py-1.5 transition-colors duration-300 ${onLight ? 'bg-ivory' : 'bg-white/10 backdrop-blur-sm'}`}>
              <PerlaLogo className="h-6 w-auto" />
              <div className="leading-none">
                <p className={`text-[7px] font-medium tracking-[0.18em] uppercase transition-colors duration-300 ${onLight ? 'text-muted-text' : 'text-white/45'}`}>
                  A Café by
                </p>
                <p className={`text-[7.5px] font-semibold tracking-[0.15em] uppercase mt-[2px] transition-colors duration-300 ${onLight ? 'text-charcoal' : 'text-white/65'}`}>
                  Perla Insurance
                </p>
              </div>
            </div>

            <a
              href="#locations"
              className="inline-flex items-center text-[9.5px] font-semibold tracking-[0.2em] uppercase bg-perla-red text-white px-5 py-3 hover:bg-red-dark transition-colors duration-200"
            >
              Find a Waypoint
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
            aria-label="Toggle navigation"
          >
            {[
              menuOpen ? 'rotate-45 translate-y-[6px]' : '',
              menuOpen ? 'opacity-0' : '',
              menuOpen ? '-rotate-45 -translate-y-[6px]' : '',
            ].map((extra, i) => (
              <span
                key={i}
                className={`block w-[22px] h-px transition-all duration-300 origin-center ${
                  onLight ? 'bg-near-black' : 'bg-white'
                } ${extra}`}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 bg-warm-white border-t border-warm-border ${
            menuOpen ? 'max-h-[480px]' : 'max-h-0'
          }`}
        >
          <nav className="px-6 py-1 flex flex-col">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="py-3.5 text-[10.5px] font-medium tracking-[0.15em] uppercase text-charcoal border-b border-warm-border hover:text-perla-red transition-colors last:border-0"
              >
                {label}
              </a>
            ))}
            <a
              href="#locations"
              onClick={() => setMenuOpen(false)}
              className="my-5 text-center text-[9.5px] font-semibold tracking-[0.2em] uppercase bg-perla-red text-white py-4 hover:bg-red-dark transition-colors"
            >
              Find a Waypoint
            </a>
          </nav>
        </div>
      </header>


      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        className="relative flex items-end bg-espresso"
        style={{ minHeight: '100svh', height: '100svh' }}
      >
        {/* ── Background layers ── */}
        <div className="absolute inset-0 overflow-hidden">

          {/* Car image — visible for first 2 s, then fades out */}
          <img
            src="https://images.unsplash.com/photo-1551952237-954a0e68786c?w=1920&h=1080&fit=crop&auto=format"
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              opacity: videoActive ? 0 : 0.48,
              transition: 'opacity 1200ms ease-in-out',
            }}
          />

          {/* Video — preloads silently, crossfades in at 2 s */}
          <video
            ref={videoRef}
            src="/waypoint-hero.mp4"
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            preload="auto"
            style={{
              opacity: videoActive ? 0.72 : 0,
              transition: 'opacity 1200ms ease-in-out',
            }}
          />
        </div>

        {/* Consistent gradient — text always legible */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(26,24,22,0.92) 0%, rgba(26,24,22,0.28) 50%, rgba(26,24,22,0.45) 100%)' }}
        />

        {/* ── Hero content ── */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-16 lg:pb-28">
          <div className="max-w-[680px]">


            <h1 className="font-serif font-bold text-white leading-[1.03] mb-5 text-[2.75rem] lg:text-[4.5rem] xl:text-[5.2rem]">
              Every Journey<br />Needs a<br />Waypoint.
            </h1>

            <p className="text-white/55 text-base font-light leading-relaxed max-w-xs mb-8">
              A sophisticated place to pause, refresh and enjoy good coffee between destinations.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#locations"
                className="inline-flex items-center justify-center text-[10px] font-semibold tracking-[0.2em] uppercase bg-perla-red text-white px-8 py-4 hover:bg-red-dark transition-colors duration-200"
              >
                Find a Waypoint
              </a>
              <a
                href="#menu"
                className="inline-flex items-center justify-center text-[10px] font-semibold tracking-[0.2em] uppercase border border-white/30 text-white px-8 py-4 hover:border-white/55 transition-colors duration-200"
              >
                Explore the Menu
              </a>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-7 right-8 lg:right-14 flex items-center gap-3 z-10">
          <span className="text-[9px] tracking-[0.25em] uppercase text-white/25">Scroll</span>
          <div className="w-8 h-px bg-white/15" />
        </div>
      </section>


      {/* ════════════════════════════════════════
          THE WAYPOINT IDEA
      ════════════════════════════════════════ */}
      <section className="py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-28 items-center">

            {/* Text */}
            <div className="order-2 lg:order-1">
              <p className="font-serif italic text-perla-red text-sm mb-4 tracking-wide">The Waypoint Idea</p>
              <div className="w-8 h-px bg-warm-border mb-6" />
              <h2 className="font-serif font-semibold text-near-black leading-[1.08] mb-6 text-[2.1rem] lg:text-[2.9rem]">
                A Better Stop<br />For Every Journey.
              </h2>
              <p className="text-muted-text text-base leading-[1.85] font-light max-w-[380px] mb-10">
                Long journeys are made of more than miles. WAYPOINT gives drivers a place to pause, refresh and take a moment before continuing the road ahead.
              </p>

              {/* Route graphic */}
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full border border-warm-border" />
                <div className="w-10 h-px bg-warm-border" />
                <div className="relative flex items-center justify-center">
                  <div className="w-[13px] h-[13px] rounded-full bg-perla-red" />
                  <div className="absolute w-[22px] h-[22px] rounded-full border border-perla-red/25" />
                </div>
                <div className="w-10 h-px bg-warm-border" />
                <div className="w-2 h-2 rounded-full border border-warm-border" />
                <span className="ml-3 font-serif italic text-[11px] text-muted-text">Your Waypoint</span>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-[4/5] bg-warm-gray overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1571130961933-0680ba8d5ff2?w=800&h=1000&fit=crop&auto=format"
                  alt="Grand café interior — an inviting place to pause mid-journey"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thin red accent line */}
              <div className="absolute -left-3 top-12 bottom-12 w-px bg-perla-red/70 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          THREE EXPERIENCES
      ════════════════════════════════════════ */}
      <section className="py-20 lg:py-28 border-y border-warm-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-warm-border">
            {[
              {
                num: '01',
                title: 'Take a Pause',
                body: 'Give yourself a moment before continuing. The road will still be there.',
              },
              {
                num: '02',
                title: 'Refresh',
                body: 'Carefully prepared coffee, light refreshments and quick bites for the road.',
              },
              {
                num: '03',
                title: 'Continue When Ready',
                body: 'Getting there safely matters more than getting there quickly.',
              },
            ].map(({ num, title, body }) => (
              <div key={num} className="group px-8 lg:px-14 py-10 lg:py-12 hover:bg-ivory transition-colors duration-300">
                <p className="font-serif italic text-perla-red text-sm mb-5">{num}</p>
                <h3 className="font-serif font-semibold text-near-black text-[1.25rem] lg:text-[1.45rem] leading-snug mb-3">
                  {title}
                </h3>
                <div className="w-4 h-px bg-perla-red mb-4 group-hover:w-8 transition-all duration-500" />
                <p className="text-muted-text text-sm leading-relaxed font-light">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          PERLATTE
      ════════════════════════════════════════ */}
      <section className="py-24 lg:py-40 bg-near-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-28 items-center">

            {/* Image */}
            <div className="relative order-1">
              <div className="aspect-[4/5] bg-espresso overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1650097364104-eef0e54af0da?w=800&h=1000&fit=crop&auto=format"
                  alt="Perlatte — Perla's Signature Latte with delicate latte art"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-0 -right-px bottom-0 w-px bg-perla-red/50 hidden lg:block" />
            </div>

            {/* Text */}
            <div className="order-2">
              <p className="font-serif italic text-white/35 text-sm mb-6 tracking-wide">Waypoint Signature</p>

              <h2 className="font-serif font-bold text-white leading-[1.02] mb-4"
                style={{ fontSize: 'clamp(3.2rem, 7vw, 5.5rem)' }}>
                Meet<br />Perlatte.
              </h2>

              <p className="font-serif italic text-perla-red text-xl lg:text-2xl mb-7 tracking-wide">
                Perla's Signature Latte
              </p>

              <div className="w-8 h-px bg-white/15 mb-7" />

              <p className="text-white/55 text-base leading-[1.85] font-light max-w-[340px] mb-10">
                A smooth, comforting signature latte created exclusively for the WAYPOINT experience — crafted for the journey, designed for the pause.
              </p>

              <a
                href="#menu"
                className="inline-flex items-center gap-4 text-[10px] font-semibold tracking-[0.2em] uppercase border border-white/20 text-white px-8 py-4 hover:border-perla-red hover:text-perla-red transition-colors duration-300"
              >
                Explore the Menu
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          DRIVER'S PAUSE
      ════════════════════════════════════════ */}
      <section id="pause" className="py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-28 items-center">

            {/* Text */}
            <div>
              <p className="font-serif italic text-perla-red text-sm mb-4 tracking-wide">The Driver's Pause</p>
              <div className="w-8 h-px bg-warm-border mb-6" />
              <h2 className="font-serif font-semibold text-near-black leading-[1.08] mb-6 text-[2.1rem] lg:text-[2.9rem]">
                Feeling Tired?<br />Make a Stop.
              </h2>
              <p className="text-muted-text text-base leading-[1.85] font-light max-w-[380px] mb-5">
                If the road feels long and you're feeling tired, don't force the journey.
              </p>
              <p className="text-muted-text text-base leading-[1.85] font-light max-w-[380px] mb-9">
                Pull over somewhere safe, take a break and continue when you're ready.
              </p>

              {/* Pull quote */}
              <div className="border-l border-perla-red pl-5 mb-10">
                <p className="font-serif italic text-charcoal text-[1.05rem] leading-relaxed">
                  "Sometimes, the safest choice<br />is to pause."
                </p>
              </div>

              <a
                href="#locations"
                className="inline-flex items-center gap-4 text-[10px] font-semibold tracking-[0.2em] uppercase bg-perla-red text-white px-8 py-4 hover:bg-red-dark transition-colors duration-200"
              >
                Take the Driver's Pause
                <Arrow />
              </a>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] bg-warm-gray overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1758445038510-1ed36a6e6edd?w=800&h=1000&fit=crop&auto=format"
                  alt="A driver peacefully at rest inside a café"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -right-3 top-12 bottom-12 w-px bg-perla-red/60 hidden lg:block" />
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          MENU
      ════════════════════════════════════════ */}
      <section id="menu" className="py-20 lg:py-32 bg-ivory border-y border-warm-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-16">
            <div>
              <p className="font-serif italic text-perla-red text-sm mb-4 tracking-wide">From the Waypoint Bar</p>
              <h2 className="font-serif font-semibold text-near-black leading-[1.08] text-[2.1rem] lg:text-[2.9rem]">
                Good Coffee.<br />Good Break.
              </h2>
            </div>
            <a
              href="#"
              className="self-start lg:self-auto inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.2em] uppercase text-charcoal border border-warm-border px-6 py-3 hover:border-perla-red hover:text-perla-red transition-colors duration-200"
            >
              View Full Menu
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-10 lg:gap-16">
            {MENU_CATEGORIES.map(({ category, items }) => (
              <div key={category}>
                <p className="font-serif italic text-perla-red text-[11px] mb-5 tracking-wide">{category}</p>
                <div className="space-y-0">
                  {items.map(({ name, note, price }) => (
                    <div
                      key={name}
                      className="flex items-start justify-between gap-4 py-4 border-b border-warm-border last:border-b-0"
                    >
                      <div className="min-w-0">
                        <div className="font-serif text-[0.95rem] font-medium text-near-black leading-snug">{name}</div>
                        <div className="text-[11px] text-muted-text font-light mt-0.5">{note}</div>
                      </div>
                      <div className="font-serif text-sm text-charcoal shrink-0 tabular-nums pt-px">{price}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          PERLA ASSURED
      ════════════════════════════════════════ */}
      <section id="assured" className="py-20 lg:py-32 bg-perla-red text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-28 items-center">

            <div>
              <p className="font-serif italic text-white/40 text-sm mb-5 tracking-wide">Perla Assured Privilege</p>
              <h2 className="font-serif font-semibold text-white leading-[1.08] mb-5 text-[2rem] lg:text-[2.7rem]">
                Perla Assured?<br />Your Journey<br />Comes with Perks.
              </h2>
              <p className="text-white/65 text-base leading-[1.85] font-light max-w-[340px] mb-9">
                Active Perla assureds enjoy exclusive privileges at WAYPOINT — a recognition of choosing to travel protected.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-4 text-[10px] font-semibold tracking-[0.2em] uppercase bg-white text-perla-red px-8 py-4 hover:bg-ivory transition-colors duration-200"
              >
                View Assured Benefits
                <Arrow className="text-perla-red" />
              </a>
            </div>

            {/* Benefit card */}
            <div className="border border-white/15 p-10 lg:p-14">
              <div className="font-serif font-bold text-white leading-none mb-2"
                style={{ fontSize: 'clamp(4rem, 10vw, 7rem)' }}>
                10%
              </div>
              <div className="font-serif italic text-white/40 text-sm mb-7 tracking-wide">Off Selected Items</div>
              <div className="w-8 h-px bg-white/15 mb-7" />
              <p className="text-white/70 text-base leading-relaxed font-light mb-7">
                Selected drinks and meals at any WAYPOINT location across the Philippines.
              </p>
              <p className="text-white/30 text-[10.5px] font-light leading-relaxed">
                Valid upon verification of an active Perla policy. Not valid with other offers. Terms and conditions apply.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          OUR STORY
      ════════════════════════════════════════ */}
      <section id="story" className="py-24 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-28 items-center">

            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] bg-warm-gray overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1783943432308-c4ca4ce68105?w=800&h=1000&fit=crop&auto=format"
                  alt="WAYPOINT café — crafted with intention"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -right-3 top-12 bottom-12 w-px bg-perla-red/60 hidden lg:block" />
            </div>

            {/* Text */}
            <div>
              <p className="font-serif italic text-perla-red text-sm mb-4 tracking-wide">The Waypoint Story</p>
              <div className="w-8 h-px bg-warm-border mb-6" />
              <h2 className="font-serif font-semibold text-near-black leading-[1.08] mb-6 text-[2.1rem] lg:text-[2.9rem]">
                Built Around<br />The Journey.
              </h2>
              <p className="text-muted-text text-base leading-[1.85] font-light max-w-[380px] mb-5">
                Perla Insurance has spent decades helping protect what matters on the road. WAYPOINT extends that philosophy beyond insurance — creating a place where drivers can pause, refresh and prepare for the journey ahead.
              </p>
              <p className="text-muted-text text-base leading-[1.85] font-light max-w-[380px]">
                Every Waypoint is designed with the same care and intention that Perla has always brought to protecting Filipino motorists.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          LOCATIONS
      ════════════════════════════════════════ */}
      <section id="locations" className="py-20 lg:py-32 bg-ivory border-y border-warm-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="mb-12 lg:mb-16">
            <p className="font-serif italic text-perla-red text-sm mb-4 tracking-wide">Find Your Waypoint</p>
            <h2 className="font-serif font-semibold text-near-black leading-[1.08] text-[2.1rem] lg:text-[2.9rem]">
              Your Next<br />Pause Is Closer.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {LOCATIONS.map(({ name, address, hours, note }) => (
              <div
                key={name}
                className="group bg-warm-white border border-warm-border p-7 lg:p-9 hover:border-perla-red transition-colors duration-300"
              >
                {/* Marker */}
                <div className="flex items-center gap-2 mb-7">
                  <div className="w-2 h-2 rounded-full bg-perla-red shrink-0" />
                  <div className="flex-1 h-px bg-warm-border group-hover:bg-perla-red/20 transition-colors duration-300" />
                </div>

                <h3 className="font-serif font-semibold text-near-black text-[1.1rem] leading-snug mb-2">{name}</h3>
                <p className="text-muted-text text-[12.5px] font-light mb-1">{address}</p>
                <p className="text-muted-text text-[11px] font-light mb-1">{hours}</p>
                <p className="font-serif italic text-[11px] text-charcoal mb-7">{note}</p>

                <a
                  href="#"
                  className="inline-flex items-center gap-2.5 text-[10px] font-semibold tracking-[0.18em] uppercase text-perla-red hover:text-red-dark transition-colors group/link"
                >
                  Get Directions
                  <Arrow className="transition-transform duration-200 group-hover/link:translate-x-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          CAMPAIGN
      ════════════════════════════════════════ */}
      <section className="relative py-28 lg:py-48 bg-near-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-espresso">
          <img
            src="https://images.unsplash.com/photo-1635965453398-121ed3ea7c24?w=1920&h=960&fit=crop&auto=format"
            alt="A winding road stretching toward the horizon"
            className="w-full h-full object-cover opacity-15"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-near-black/70 via-transparent to-near-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <p className="font-serif italic text-white/30 text-sm mb-8 tracking-wide">The Waypoint Campaign</p>

          <h2
            className="font-serif font-bold text-white leading-[1.03] mb-7"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6.5rem)' }}
          >
            Sometimes,<br />The Best Move<br />Is to Pause.
          </h2>

          <p className="text-white/40 text-base font-light tracking-wide mb-10">
            Take a break. Refresh. Continue when you're ready.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <span className="font-serif italic text-perla-red text-base">#TheWaypointPause</span>
            <span className="text-white/15 hidden sm:block">·</span>
            <span className="font-serif italic text-white/25 text-base">#PERLATTE</span>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          PERLA CONNECTION
      ════════════════════════════════════════ */}
      <section className="py-14 lg:py-20 border-b border-warm-border">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-24 items-center">
            <div>
              <p className="font-serif italic text-muted-text text-[11px] mb-4 tracking-wide">Powered by Perla</p>
              <h2 className="font-serif font-semibold text-near-black leading-[1.12] mb-4 text-[1.6rem] lg:text-[2rem]">
                Protected for the Journey.<br />Refreshed at Waypoint.
              </h2>
              <p className="text-muted-text text-sm leading-[1.85] font-light max-w-[320px] mb-6">
                WAYPOINT is a café concept by Perla Insurance, created around the people and journeys we help protect every day.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.18em] uppercase text-perla-red hover:text-red-dark transition-colors duration-200 group"
              >
                Visit Perla Insurance
                <Arrow className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>

            <div className="flex items-center gap-6 lg:justify-end">
              <div className="h-16 w-px bg-warm-border" />
              <div className="flex items-center gap-4">
                <PerlaLogo className="h-14 w-auto" />
                <div>
                  <p className="text-[8px] font-medium tracking-[0.22em] uppercase text-muted-text mb-1">A concept by</p>
                  <p className="font-serif font-semibold text-near-black text-[2rem] lg:text-[2.4rem] tracking-wider leading-none">
                    PERLA
                  </p>
                  <p className="text-[8px] font-medium tracking-[0.22em] uppercase text-muted-text mt-0.5">Insurance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer className="bg-near-black text-white pt-16 lg:pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-14 border-b border-white/8">

            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-white/8 p-1.5 rounded-sm">
                  <PerlaLogo className="h-8 w-auto" />
                </div>
              </div>
              <p className="font-serif text-white text-[1.5rem] font-semibold tracking-[0.06em] mb-0.5">WAYPOINT</p>
              <p className="text-[8px] font-medium tracking-[0.2em] uppercase text-white/30 mb-5">
                A Café by Perla Insurance
              </p>
              <p className="font-serif italic text-white/25 text-sm leading-relaxed mb-7 max-w-[200px]">
                A sophisticated place to pause, refresh and continue safely.
              </p>
              <div className="flex items-center gap-5">
                {['Facebook', 'Instagram', 'X'].map((s) => (
                  <a key={s} href="#" className="text-[9px] text-white/25 hover:text-white/70 transition-colors tracking-widest uppercase">
                    {s}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigate */}
            <div>
              <p className="font-serif italic text-white/30 text-[11px] mb-5 tracking-wide">Navigate</p>
              <ul className="space-y-3">
                {['Our Story', 'Menu', "The Driver's Pause", 'Assured Benefits', 'Locations', 'Contact'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[11.5px] text-white/40 hover:text-white/80 transition-colors font-light">{l}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer */}
            <div>
              <p className="font-serif italic text-white/30 text-[11px] mb-5 tracking-wide">Customer</p>
              <ul className="space-y-3">
                {['FAQs', 'Privacy Policy', 'Terms & Conditions'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[11.5px] text-white/40 hover:text-white/80 transition-colors font-light">{l}</a>
                  </li>
                ))}
              </ul>
              <p className="font-serif italic text-white/30 text-[11px] mt-8 mb-4 tracking-wide">Parent Brand</p>
              <a href="#" className="text-[11.5px] text-white/40 hover:text-perla-red transition-colors font-light tracking-wider">
                PERLA INSURANCE →
              </a>
            </div>

            {/* Locations */}
            <div>
              <p className="font-serif italic text-white/30 text-[11px] mb-5 tracking-wide">Find a Waypoint</p>
              <ul className="space-y-3 mb-8">
                {['Waypoint Makati', 'Waypoint BGC', 'Waypoint Quezon City'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-[11.5px] text-white/40 hover:text-white/80 transition-colors font-light">{l}</a>
                  </li>
                ))}
              </ul>
              <a
                href="#locations"
                className="inline-block text-[9.5px] font-semibold tracking-[0.2em] uppercase bg-perla-red text-white px-5 py-3 hover:bg-red-dark transition-colors"
              >
                All Locations
              </a>
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8">
            <p className="text-[10px] text-white/20 tracking-wide">
              © 2025 WAYPOINT. A Café by Perla Insurance. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-5 h-px bg-perla-red/40" />
              <p className="text-[10px] text-white/20 tracking-[0.18em] uppercase">Perla Insurance Group</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
