import Link from "next/link";
import TryItButton from "@/components/TryItButton";

export const metadata = {
  title: "Pricing — ACraft",
  description: "Simple, generous pricing. Start free, upgrade when you need more.",
};

const tiers = [
  {
    name: "Starter",
    price: "Free",
    cadence: "forever",
    desc: "Get a feel for ACraft with a generous monthly allowance.",
    cta: "Get started",
    features: [
      "30 image generations / month",
      "8 base styles",
      "Standard 1K resolution",
      "Watermarked downloads",
    ],
    accent: "from-white/20 to-white/5",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    cadence: "/ month",
    desc: "For creators shipping content every week.",
    cta: "Start Pro",
    features: [
      "750 generations / month",
      "All 30+ styles",
      "4K resolution exports",
      "Edit & enhance tools",
      "No watermark",
      "Priority queue",
    ],
    accent: "from-pink to-violet",
    highlight: true,
  },
  {
    name: "Studio",
    price: "$39",
    cadence: "/ month",
    desc: "For teams, agencies, and high-volume workflows.",
    cta: "Go Studio",
    features: [
      "Unlimited generations",
      "Team workspace (5 seats)",
      "API access",
      "Custom style training",
      "Dedicated support",
    ],
    accent: "from-violet to-cyan",
    highlight: false,
  },
];

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. Plans are month-to-month and you keep access until the end of the billing cycle.",
  },
  {
    q: "What counts as a generation?",
    a: "One image output equals one generation. Edits and enhances on existing images each count separately.",
  },
  {
    q: "Do you offer student or non-profit discounts?",
    a: "Yes — discounts for students and non-profits will be available at launch. Stay tuned.",
  },
  {
    q: "Is the API rate-limited?",
    a: "Studio plans get 60 requests / minute by default. Higher quotas available on request.",
  },
];

export default function PricingPage() {
  return (
    <div className="relative flex flex-col flex-1 overflow-hidden">
      <div className="blob bg-pink/40 w-[500px] h-[500px] -top-40 -left-40" />
      <div className="blob bg-violet/40 w-[600px] h-[600px] top-40 -right-60" />
      <div className="blob bg-cyan/20 w-[400px] h-[400px] top-[100vh] left-1/3" />

      <header className="relative z-20 w-full">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <img
              src="/logo.png"
              alt="ACraft"
              className="w-9 h-9 rounded-lg ring-1 ring-white/10"
            />
            <span className="font-display font-bold text-lg tracking-tight">
              ACraft
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-10 text-sm text-white/70">
            <Link href="/pricing" className="text-white transition-colors">
              Pricing
            </Link>
            <Link href="/examples" className="hover:text-white transition-colors">
              Gallery
            </Link>
            <Link href="/docs" className="hover:text-white transition-colors">
              Docs
            </Link>
          </div>
          <TryItButton className="relative px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-pink to-violet hover:opacity-90 transition-opacity cursor-pointer" />
        </nav>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] text-pink font-semibold">
            Pricing
          </span>
          <h1 className="mt-3 font-display font-extrabold tracking-tight text-4xl sm:text-5xl md:text-6xl leading-[0.95]">
            Pay for <span className="gradient-text">pixels</span>, not promises
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/65 leading-relaxed">
            Start free. Upgrade only when your ideas outgrow the limits.
            Cancel any time — no contracts, no surprises.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-3xl p-7 sm:p-8 transition-all ${
                t.highlight
                  ? "bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-pink/40 shadow-[0_30px_80px_-20px_rgba(255,45,120,0.45)] scale-[1.02]"
                  : "glass hover:-translate-y-1 hover:border-violet/40"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.25em] font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-pink to-violet">
                  Most popular
                </span>
              )}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.accent} mb-5 opacity-90`} />
              <h2 className="font-display font-bold text-2xl">{t.name}</h2>
              <p className="text-sm text-white/55 mt-1.5 leading-relaxed">
                {t.desc}
              </p>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="font-display font-extrabold text-4xl tracking-tight">
                  {t.price}
                </span>
                <span className="text-xs text-white/50">{t.cadence}</span>
              </div>

              <TryItButton
                className={`mt-6 w-full block text-center px-5 py-3 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                  t.highlight
                    ? "bg-gradient-to-r from-pink to-violet hover:opacity-95 shadow-[0_10px_40px_-10px_rgba(255,45,120,0.6)]"
                    : "bg-white/[0.06] hover:bg-white/[0.12] border border-white/10"
                }`}
              >
                {t.cta}
              </TryItButton>

              <div className="mt-7 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <ul className="mt-6 space-y-3">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2.5 text-sm text-white/75"
                  >
                    <svg
                      viewBox="0 0 20 20"
                      className="w-4 h-4 mt-0.5 shrink-0"
                      fill="none"
                    >
                      <path
                        d="M4 10 L8 14 L16 6"
                        stroke="url(#check-grad)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <defs>
                        <linearGradient id="check-grad" x1="0" y1="0" x2="20" y2="20">
                          <stop offset="0" stopColor="#ff2d78" />
                          <stop offset="1" stopColor="#9b5cff" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <section className="mt-24">
          <div className="text-center mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-cyan font-semibold">
              FAQ
            </span>
            <h2 className="mt-3 font-display font-bold text-3xl sm:text-4xl tracking-tight">
              Common <span className="gradient-text">questions</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {faqs.map((f) => (
              <div
                key={f.q}
                className="glass rounded-2xl p-6 hover:border-violet/40 transition-colors"
              >
                <h3 className="font-display font-bold text-base mb-2">{f.q}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 mb-8 text-center">
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">
            Ready to <span className="gradient-text">create</span>?
          </h2>
          <p className="mt-3 text-sm text-white/60 max-w-md mx-auto">
            Jump in free. No card needed until you upgrade.
          </p>
          <div className="mt-6">
            <TryItButton className="inline-block px-8 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-pink to-violet hover:opacity-95 transition-all shadow-[0_10px_40px_-10px_rgba(255,45,120,0.6)] cursor-pointer" />
          </div>
        </section>
      </main>

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
            <Link href="/pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/docs" className="hover:text-white transition-colors">
              Docs
            </Link>
            <Link href="/examples" className="hover:text-white transition-colors">
              Gallery
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
