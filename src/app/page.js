import Link from "next/link";

const cards = [
  {
    label: "Fantasy",
    src: "/hero/fantasy.png",
    rotate: "-rotate-12",
    glow: "shadow-[0_30px_80px_-20px_rgba(255,45,120,0.5)]",
  },
  {
    label: "Sci-Fi",
    src: "/hero/scifi.png",
    rotate: "-rotate-6",
    glow: "shadow-[0_30px_80px_-20px_rgba(255,45,120,0.55)]",
  },
  {
    label: "Portrait",
    src: "/hero/portrait.png",
    rotate: "rotate-0",
    glow: "shadow-[0_40px_100px_-20px_rgba(155,92,255,0.6)]",
  },
  {
    label: "Cyberpunk",
    src: "/hero/cyberpunk.png",
    rotate: "rotate-6",
    glow: "shadow-[0_30px_80px_-20px_rgba(0,229,255,0.45)]",
  },
  {
    label: "Abstract",
    src: "/hero/abstract.png",
    rotate: "rotate-12",
    glow: "shadow-[0_30px_80px_-20px_rgba(155,92,255,0.45)]",
  },
];

const steps = [
  {
    n: "01",
    title: "Upload Reference",
    desc: "Drop in a photo of yourself or anything you want to reimagine.",
  },
  {
    n: "02",
    title: "Describe Your Vision",
    desc: "Pick a style or write a few words — we handle the prompt engineering.",
  },
  {
    n: "03",
    title: "Get AI Images",
    desc: "Receive a curated set of high-resolution images in seconds.",
  },
];

const features = [
  {
    title: "Gemini Powered",
    desc: "Built on Google's most advanced multimodal model.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path
          d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
          fill="url(#grad1)"
        />
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="24" y2="24">
            <stop offset="0" stopColor="#ff2d78" />
            <stop offset="1" stopColor="#9b5cff" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: "No Prompt Needed",
    desc: "Choose a style — we generate the perfect prompt under the hood.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <circle cx="12" cy="12" r="9" stroke="url(#grad2)" strokeWidth="2" />
        <path
          d="M8 12 L11 15 L16 9"
          stroke="url(#grad2)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="grad2" x1="0" y1="0" x2="24" y2="24">
            <stop offset="0" stopColor="#9b5cff" />
            <stop offset="1" stopColor="#00e5ff" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: "Instant Download",
    desc: "Export 4K images and share-ready stories in one click.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <path
          d="M12 4 V16 M6 12 L12 18 L18 12 M4 20 H20"
          stroke="url(#grad3)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id="grad3" x1="0" y1="0" x2="24" y2="24">
            <stop offset="0" stopColor="#ff2d78" />
            <stop offset="1" stopColor="#00e5ff" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: "Multiple Styles",
    desc: "Fantasy, portrait, cyberpunk, abstract — and 30 more on tap.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7">
        <rect x="3" y="3" width="8" height="8" rx="2" fill="url(#grad4)" />
        <rect
          x="13"
          y="3"
          width="8"
          height="8"
          rx="2"
          fill="url(#grad4)"
          opacity="0.7"
        />
        <rect
          x="3"
          y="13"
          width="8"
          height="8"
          rx="2"
          fill="url(#grad4)"
          opacity="0.7"
        />
        <rect x="13" y="13" width="8" height="8" rx="2" fill="url(#grad4)" />
        <defs>
          <linearGradient id="grad4" x1="0" y1="0" x2="24" y2="24">
            <stop offset="0" stopColor="#ff2d78" />
            <stop offset="1" stopColor="#9b5cff" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

function Card({ label, src, rotate, glow, delay }) {
  return (
    <div
      className={`relative w-36 h-52 sm:w-44 sm:h-60 rounded-2xl overflow-hidden ${rotate} ${glow} animate-float ring-1 ring-white/10 transition-transform duration-500 hover:-translate-y-3 hover:scale-105`}
      style={{ animationDelay: delay }}
    >
      <img
        src={src}
        alt={label}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/0" />
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
        <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-white font-display drop-shadow">
          {label}
        </span>
        <span className="text-[9px] text-white/70">✦</span>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative flex flex-col flex-1 overflow-hidden">
      <div className="blob bg-pink/40 w-[500px] h-[500px] -top-40 -left-40" />
      <div className="blob bg-violet/40 w-[600px] h-[600px] top-40 -right-60" />
      <div className="blob bg-cyan/20 w-[400px] h-[400px] top-[80vh] left-1/3" />

      <header className="relative z-20 w-full">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="ACraft"
              className="w-9 h-9 rounded-lg ring-1 ring-white/10"
            />
            <span className="font-display font-bold text-lg tracking-tight">
              ACraft
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-sm text-white/70">
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#discord" className="hover:text-white transition-colors">
              Discord
            </a>
            <a href="#docs" className="hover:text-white transition-colors">
              Docs
            </a>
          </div>
          <Link
            href="/generate"
            className="relative px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-pink to-violet hover:opacity-90 transition-opacity"
          >
            Try It
          </Link>
        </nav>
      </header>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-6 w-full text-center">
        <h1 className="font-display font-extrabold leading-[0.95] tracking-tight text-4xl sm:text-5xl md:text-6xl">
          You. Re<span className="gradient-text">imagined</span>
        </h1>
        <p className="mt-3 max-w-xl mx-auto text-sm text-white/70 leading-relaxed">
          Upload your photos, define your identity, and craft one-of-a-kind
          images with AI.
        </p>
        <div className="mt-5 flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Link
            href="/generate"
            className="animate-glow-pulse px-6 py-2.5 rounded-full font-semibold text-sm bg-gradient-to-r from-pink to-violet hover:opacity-95 transition-all"
          >
            Generate Image
          </Link>
          <Link
            href="/examples"
            className="px-6 py-2.5 rounded-full font-semibold text-sm glass hover:bg-white/[0.08] transition-colors"
          >
            See Examples
          </Link>
        </div>
        <p className="mt-3 text-xs text-white/50">
          <span className="text-pink font-semibold">10x</span> cheaper and
          faster than hiring a designer
        </p>

        <div className="mt-14 hidden sm:flex items-center justify-center gap-3 flex-wrap">
          {cards.map((card, i) => (
            <Card key={card.label} {...card} delay={`${i * 0.4}s`} />
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-pink font-semibold">
            How it works
          </span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-5xl tracking-tight">
            Three steps to your <span className="gradient-text">vision</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <div
              key={s.n}
              className="glass rounded-2xl p-8 hover:border-pink/40 transition-colors group"
            >
              <div className="w-14 h-14 rounded-xl border border-violet/40 flex items-center justify-center font-display font-bold text-lg text-violet mb-6 group-hover:border-pink group-hover:text-pink transition-colors">
                {s.n}
              </div>
              <h3 className="font-display font-bold text-xl mb-2">{s.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-cyan font-semibold">
            Features
          </span>
          <h2 className="mt-3 font-display font-bold text-3xl sm:text-5xl tracking-tight">
            Built for <span className="gradient-text">creators</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass rounded-2xl p-6 hover:-translate-y-1 hover:border-pink/40 transition-all"
            >
              <div className="mb-5">{f.icon}</div>
              <h3 className="font-display font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="relative z-10 mt-12">
        <div className="h-px bg-gradient-to-r from-transparent via-violet/60 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="ACraft"
              className="w-7 h-7 rounded-md ring-1 ring-white/10"
            />
            <span className="font-display font-bold">ACraft</span>
            <span className="text-white/40 text-sm hidden sm:inline">
              · Reimagine yourself with AI
            </span>
          </div>
          <div className="flex gap-7 text-sm text-white/60">
            <a href="#privacy" className="hover:text-white transition-colors">
              Privacy
            </a>
            <a href="#terms" className="hover:text-white transition-colors">
              Terms
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Contact
            </a>
            <a href="#twitter" className="hover:text-white transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
