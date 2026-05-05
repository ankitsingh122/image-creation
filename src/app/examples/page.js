import Link from "next/link";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export const metadata = {
  title: "Examples — ACraft",
  description: "Hand-picked examples generated with ACraft + Gemini.",
};

function loadManifest() {
  try {
    const file = join(process.cwd(), "public", "examples", "manifest.json");
    return JSON.parse(readFileSync(file, "utf8"));
  } catch {
    return [];
  }
}

export default function ExamplesPage() {
  const items = loadManifest();

  return (
    <div className="relative flex flex-col flex-1 overflow-hidden">
      <div className="blob bg-pink/30 w-[400px] h-[400px] -top-40 -left-40" />
      <div className="blob bg-violet/30 w-[500px] h-[500px] top-40 -right-40" />
      <div className="blob bg-cyan/20 w-[400px] h-[400px] top-[120vh] left-1/3" />

      <header className="relative z-20 max-w-7xl mx-auto px-6 py-4 w-full flex items-center justify-between">
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
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-white/60 hover:text-white transition-colors"
          >
            ← Back home
          </Link>
          <Link
            href="/generate"
            className="px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-pink to-violet hover:opacity-90 transition-opacity"
          >
            Generate
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.3em] text-pink font-semibold">
            Examples
          </span>
          <h1 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl tracking-tight">
            Made with <span className="gradient-text">ACraft</span>
          </h1>
          <p className="mt-4 max-w-xl mx-auto text-sm text-white/60">
            Real outputs from Gemini 2.5 Flash Image. Click any to download —
            then build your own.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center text-sm text-white/60">
            No examples yet. Run{" "}
            <code className="text-pink">node scripts/gen-examples.mjs</code> to
            populate.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((r, i) => (
              <div
                key={r.src}
                className="glass rounded-2xl overflow-hidden group hover:-translate-y-1 hover:border-pink/40 transition-all"
              >
                <div className="relative aspect-square bg-black/40 overflow-hidden">
                  <img
                    src={r.src}
                    alt={r.prompt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-xs text-white/60 line-clamp-2 mb-3 leading-relaxed">
                    {r.prompt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest text-violet">
                      {r.style}
                    </span>
                    <a
                      href={r.src}
                      download={`acraft-example-${i + 1}.png`}
                      className="text-xs px-3 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.16] transition-colors"
                    >
                      Download
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link
            href="/generate"
            className="inline-block px-8 py-3.5 rounded-full font-semibold text-sm bg-gradient-to-r from-pink to-violet hover:opacity-95 transition-all"
          >
            Try it yourself →
          </Link>
        </div>
      </main>
    </div>
  );
}
