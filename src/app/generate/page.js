"use client";

import { useState } from "react";
import Link from "next/link";

const STYLES = [
  { id: "none", label: "No style" },
  { id: "cinematic", label: "Cinematic" },
  { id: "portrait", label: "Portrait" },
  { id: "anime", label: "Anime" },
  { id: "cyberpunk", label: "Cyberpunk" },
  { id: "fantasy", label: "Fantasy" },
  { id: "abstract", label: "Abstract" },
  { id: "product", label: "Product" },
];

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      const comma = result.indexOf(",");
      resolve({
        data: result.slice(comma + 1),
        mimeType: file.type || "image/png",
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function GeneratePage() {
  const [mode, setMode] = useState("create");
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("none");
  const [context, setContext] = useState("");
  const [refs, setRefs] = useState([]);
  const [source, setSource] = useState(null);
  const [loading, setLoading] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  async function onRefChange(e) {
    const files = Array.from(e.target.files ?? []).slice(0, 3);
    const encoded = await Promise.all(
      files.map(async (f) => ({
        ...(await fileToBase64(f)),
        previewUrl: URL.createObjectURL(f),
        name: f.name,
      })),
    );
    setRefs(encoded);
  }

  async function onSourceChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setSource({
      ...(await fileToBase64(file)),
      previewUrl: URL.createObjectURL(file),
      name: file.name,
    });
  }

  async function onEnhance() {
    if (!prompt.trim() || enhancing) return;
    setEnhancing(true);
    setError("");
    try {
      const res = await fetch("/api/enhance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style, context }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Enhance failed");
      setPrompt(json.prompt);
    } catch (err) {
      setError(err.message);
    } finally {
      setEnhancing(false);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (!prompt.trim()) return;
    if (mode === "edit" && !source) {
      setError("Upload a source image to edit.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const payload = {
        prompt,
        style,
        context,
        mode,
        referenceImages: refs.map(({ data, mimeType }) => ({ data, mimeType })),
      };
      if (mode === "edit" && source) {
        payload.sourceImage = { data: source.data, mimeType: source.mimeType };
      }
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Generation failed");
      setResults((prev) => [
        ...json.images.map((img) => ({
          src: `data:${img.mimeType};base64,${img.data}`,
          prompt,
          style,
          mode,
        })),
        ...prev,
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex flex-col flex-1 overflow-hidden">
      <div className="blob bg-pink/30 w-[400px] h-[400px] -top-40 -left-40" />
      <div className="blob bg-violet/30 w-[500px] h-[500px] top-40 -right-40" />

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
        <Link
          href="/"
          className="text-sm text-white/60 hover:text-white transition-colors"
        >
          ← Back home
        </Link>
      </header>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8 w-full grid lg:grid-cols-[420px_1fr] gap-8">
        <form
          onSubmit={onSubmit}
          className="glass rounded-2xl p-6 h-fit space-y-5"
        >
          <div>
            <h1 className="font-display font-bold text-2xl">
              {mode === "create" ? "Generate" : "Edit"}{" "}
              <span className="gradient-text">image</span>
            </h1>
            <p className="text-xs text-white/50 mt-1">
              Powered by Gemini 2.5 Flash Image
            </p>
          </div>

          <div className="grid grid-cols-2 gap-1 p-1 bg-black/30 rounded-xl border border-white/10">
            {[
              { id: "create", label: "Create" },
              { id: "edit", label: "Edit" },
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                  mode === m.id
                    ? "bg-gradient-to-r from-pink to-violet text-white"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {mode === "edit" && (
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                Source image
              </label>
              {source ? (
                <div className="relative">
                  <img
                    src={source.previewUrl}
                    alt={source.name}
                    className="w-full max-h-64 object-contain rounded-xl bg-black/40 ring-1 ring-white/10"
                  />
                  <button
                    type="button"
                    onClick={() => setSource(null)}
                    className="absolute top-2 right-2 text-xs px-2.5 py-1 rounded-full bg-black/70 hover:bg-black/90 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <input
                  type="file"
                  accept="image/*"
                  onChange={onSourceChange}
                  className="block w-full text-xs text-white/60 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-white/[0.06] file:text-white/80 hover:file:bg-white/[0.12] file:cursor-pointer cursor-pointer"
                  required
                />
              )}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs uppercase tracking-widest text-white/60">
                {mode === "create" ? "Prompt" : "Edit instruction"}
              </label>
              <button
                type="button"
                onClick={onEnhance}
                disabled={!prompt.trim() || enhancing}
                title="Expand the prompt with Gemini"
                className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r from-pink/20 to-violet/20 border border-violet/40 hover:from-pink/30 hover:to-violet/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span className={enhancing ? "animate-spin" : ""}>✨</span>
                {enhancing ? "Enhancing…" : "Enhance"}
              </button>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={4}
              placeholder={
                mode === "create"
                  ? "A red panda astronaut floating above a neon city at dusk"
                  : "Make the sky purple and add a rainbow"
              }
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink/60 transition-colors resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
              Style preset
            </label>
            <div className="grid grid-cols-4 gap-2">
              {STYLES.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStyle(s.id)}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ${
                    style === s.id
                      ? "bg-gradient-to-r from-pink to-violet text-white"
                      : "bg-white/[0.04] text-white/70 hover:bg-white/[0.08] border border-white/10"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
              Context{" "}
              <span className="text-white/30 normal-case">(optional)</span>
            </label>
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              rows={2}
              placeholder="Brand voice, recurring character description, mood — anything you want every image to honor."
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-violet/60 transition-colors resize-none"
            />
          </div>

          {mode === "create" && (
            <div>
              <label className="block text-xs uppercase tracking-widest text-white/60 mb-2">
                Reference images{" "}
                <span className="text-white/30 normal-case">(up to 3)</span>
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={onRefChange}
                className="block w-full text-xs text-white/60 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:bg-white/[0.06] file:text-white/80 hover:file:bg-white/[0.12] file:cursor-pointer cursor-pointer"
              />
              {refs.length > 0 && (
                <div className="mt-3 flex gap-2">
                  {refs.map((r, i) => (
                    <img
                      key={i}
                      src={r.previewUrl}
                      alt={r.name}
                      className="w-14 h-14 rounded-md object-cover ring-1 ring-white/20"
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !prompt.trim() || (mode === "edit" && !source)}
            className="w-full px-6 py-3 rounded-full font-semibold text-sm bg-gradient-to-r from-pink to-violet hover:opacity-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading
              ? mode === "edit"
                ? "Editing…"
                : "Generating…"
              : mode === "edit"
                ? "Apply Edit"
                : "Generate"}
          </button>

          {error && (
            <p className="text-xs text-pink bg-pink/10 border border-pink/30 rounded-lg p-3">
              {error}
            </p>
          )}
        </form>

        <section>
          {results.length === 0 && !loading && (
            <div className="glass rounded-2xl h-full min-h-[400px] flex flex-col items-center justify-center text-center p-10">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink to-violet flex items-center justify-center mb-4 opacity-80">
                <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
                  <path
                    d="M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl mb-2">
                Your gallery awaits
              </h3>
              <p className="text-sm text-white/50 max-w-sm">
                Type a prompt, pick a style, and hit Generate. Generated images
                appear here.
              </p>
            </div>
          )}

          {(loading || results.length > 0) && (
            <div className="grid sm:grid-cols-2 gap-4">
              {loading && (
                <div className="glass rounded-2xl overflow-hidden">
                  <div className="relative aspect-square bg-black/40 flex flex-col items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink/10 via-violet/10 to-cyan/10 animate-pulse" />
                    <div className="relative w-12 h-12 rounded-full border-2 border-violet/30 border-t-pink animate-spin mb-3" />
                    <p className="relative text-xs text-white/70 font-medium">
                      {mode === "edit" ? "Applying edit…" : "Gemini is painting…"}
                    </p>
                  </div>
                  <div className="p-4">
                    <div className="h-3 bg-white/10 rounded w-3/4 mb-2 animate-pulse" />
                    <div className="h-3 bg-white/10 rounded w-1/2 animate-pulse" />
                  </div>
                </div>
              )}
              {results.map((r, i) => (
                <div
                  key={i}
                  className="glass rounded-2xl overflow-hidden group"
                >
                  <div className="relative aspect-square bg-black/40">
                    <img
                      src={r.src}
                      alt={r.prompt}
                      className="w-full h-full object-cover"
                    />
                    {r.mode === "edit" && (
                      <span className="absolute top-2 left-2 text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full bg-cyan/20 text-cyan border border-cyan/40 backdrop-blur">
                        Edit
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-white/50 line-clamp-2 mb-3">
                      {r.prompt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-widest text-violet">
                        {r.style}
                      </span>
                      <a
                        href={r.src}
                        download={`acraft-${i + 1}.png`}
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
        </section>
      </main>
    </div>
  );
}
