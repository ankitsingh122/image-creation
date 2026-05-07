import Link from "next/link";
import TryItButton from "@/components/TryItButton";

export const metadata = {
  title: "Docs — ACraft",
  description: "Quick start, styles, and API reference for ACraft.",
};

const sections = [
  { id: "quickstart", label: "Quick start" },
  { id: "generating", label: "Generating images" },
  { id: "styles", label: "Styles" },
  { id: "editing", label: "Editing & enhancing" },
  { id: "api", label: "API" },
  { id: "limits", label: "Limits" },
];

function Code({ children }) {
  return (
    <pre className="rounded-xl bg-black/60 border border-white/10 px-4 py-3.5 text-[12.5px] leading-relaxed text-white/85 overflow-x-auto font-mono">
      <code>{children}</code>
    </pre>
  );
}

export default function DocsPage() {
  return (
    <div className="relative flex flex-col flex-1 overflow-hidden">
      <div className="blob bg-violet/40 w-[500px] h-[500px] -top-40 -left-40" />
      <div className="blob bg-cyan/30 w-[600px] h-[600px] top-40 -right-60" />
      <div className="blob bg-pink/20 w-[400px] h-[400px] top-[120vh] left-1/3" />

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
            <Link href="/pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/examples" className="hover:text-white transition-colors">
              Gallery
            </Link>
            <Link href="/docs" className="text-white transition-colors">
              Docs
            </Link>
          </div>
          <TryItButton className="relative px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-pink to-violet hover:opacity-90 transition-opacity cursor-pointer" />
        </nav>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full grid lg:grid-cols-[220px_1fr] gap-10">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="glass rounded-2xl p-5">
            <span className="text-[10px] uppercase tracking-[0.25em] text-violet font-semibold">
              Contents
            </span>
            <nav className="mt-4 flex flex-col gap-1.5">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-sm text-white/60 hover:text-white py-1.5 px-2 rounded-md hover:bg-white/[0.05] transition-colors"
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        <article className="min-w-0">
          <div className="mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-pink font-semibold">
              Documentation
            </span>
            <h1 className="mt-3 font-display font-extrabold tracking-tight text-4xl sm:text-5xl leading-[0.95]">
              Build with <span className="gradient-text">ACraft</span>
            </h1>
            <p className="mt-4 text-sm sm:text-base text-white/65 leading-relaxed max-w-2xl">
              Everything you need to go from a blank canvas to share-ready
              images. Skim the quick start, then dive into the bits you care
              about.
            </p>
          </div>

          <section id="quickstart" className="scroll-mt-24">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
              Quick start
            </h2>
            <ol className="mt-5 space-y-4 text-sm text-white/75 leading-relaxed">
              <li className="flex gap-4">
                <span className="shrink-0 w-7 h-7 rounded-lg border border-violet/40 text-violet font-display font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <span>
                  <strong className="text-white">Sign in.</strong> Hit the{" "}
                  <em>Try It</em> button — pass through Google or a passkey,
                  no setup required.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="shrink-0 w-7 h-7 rounded-lg border border-violet/40 text-violet font-display font-bold text-xs flex items-center justify-center">
                  2
                </span>
                <span>
                  <strong className="text-white">Upload a reference</strong>{" "}
                  (optional). Drop in a portrait or any image you want to
                  reimagine.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="shrink-0 w-7 h-7 rounded-lg border border-violet/40 text-violet font-display font-bold text-xs flex items-center justify-center">
                  3
                </span>
                <span>
                  <strong className="text-white">Pick a style</strong> or type
                  a prompt. We craft the underlying instructions for Gemini.
                </span>
              </li>
              <li className="flex gap-4">
                <span className="shrink-0 w-7 h-7 rounded-lg border border-violet/40 text-violet font-display font-bold text-xs flex items-center justify-center">
                  4
                </span>
                <span>
                  <strong className="text-white">Generate, then refine.</strong>{" "}
                  Use <em>Edit</em> or <em>Enhance</em> to iterate without
                  starting over.
                </span>
              </li>
            </ol>
          </section>

          <section id="generating" className="scroll-mt-24 mt-14">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
              Generating images
            </h2>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              The simplest call is just a prompt. Add a reference image to
              guide composition, lighting, or identity.
            </p>
            <div className="mt-5">
              <Code>{`POST /api/generate
{
  "prompt": "cyberpunk samurai under neon rain",
  "style": "cyberpunk",
  "reference": "<base64-image>"   // optional
}`}</Code>
            </div>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Outputs are returned as base64 PNGs. Each call also writes a
              record to your history so you can come back later.
            </p>
          </section>

          <section id="styles" className="scroll-mt-24 mt-14">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
              Styles
            </h2>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Styles are curated prompt presets — not just a label. Each one
              tunes mood, palette, lens, and post-processing.
            </p>
            <div className="mt-5 grid sm:grid-cols-2 gap-3">
              {[
                ["Fantasy", "Painterly, cinematic, golden-hour lighting."],
                ["Sci-Fi", "Hard surfaces, cool palette, volumetric haze."],
                ["Portrait", "Studio lighting, shallow depth, neutral tones."],
                ["Cyberpunk", "Neon rim-light, wet streets, signage bloom."],
                ["Abstract", "Bold color fields, soft geometry, no subject."],
                ["Anime", "Cel-shaded, expressive lines, pastel highlights."],
              ].map(([name, desc]) => (
                <div
                  key={name}
                  className="glass rounded-xl p-4 hover:border-pink/40 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <strong className="font-display text-sm">{name}</strong>
                    <span className="text-[10px] uppercase tracking-widest text-violet">
                      preset
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-white/60 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section id="editing" className="scroll-mt-24 mt-14">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
              Editing & enhancing
            </h2>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              <strong className="text-white">Edit</strong> swaps elements
              while keeping composition. <strong className="text-white">Enhance</strong>{" "}
              upscales and sharpens without changing the subject.
            </p>
            <div className="mt-5">
              <Code>{`POST /api/edit
{
  "image": "<base64-image>",
  "instruction": "make the sky a pink dawn"
}`}</Code>
            </div>
          </section>

          <section id="api" className="scroll-mt-24 mt-14">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
              API
            </h2>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Studio plans get programmatic access. Authenticate with a bearer
              token from your account settings.
            </p>
            <div className="mt-5">
              <Code>{`curl https://api.acraft.app/v1/generate \\
  -H "Authorization: Bearer $ACRAFT_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{ "prompt": "a tiny astronaut on a moss boulder" }'`}</Code>
            </div>
            <p className="mt-4 text-sm text-white/70 leading-relaxed">
              Responses follow the same shape as the in-app endpoints. Errors
              use standard HTTP codes plus a JSON{" "}
              <code className="text-pink">{`{ error }`}</code> field.
            </p>
          </section>

          <section id="limits" className="scroll-mt-24 mt-14">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
              Limits
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-white/70 leading-relaxed list-disc pl-5">
              <li>Reference uploads: 8 MB, JPEG / PNG / WebP.</li>
              <li>Prompt length: 1,500 characters.</li>
              <li>Free tier: 30 generations / month, 1K resolution.</li>
              <li>Pro / Studio: up to 4K, edit & enhance unlocked.</li>
              <li>API rate limit: 60 req / min on Studio (contact us for more).</li>
            </ul>
          </section>

          <div className="mt-20 mb-8 glass rounded-2xl p-8 text-center">
            <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight">
              Ready to <span className="gradient-text">create</span>?
            </h2>
            <p className="mt-3 text-sm text-white/60 max-w-md mx-auto">
              Jump into the studio and start turning prompts into pixels.
            </p>
            <div className="mt-6">
              <TryItButton className="inline-block px-7 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-pink to-violet hover:opacity-95 transition-all shadow-[0_10px_40px_-10px_rgba(255,45,120,0.6)] cursor-pointer" />
            </div>
          </div>
        </article>
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
