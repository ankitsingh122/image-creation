"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
      />
      <path
        fill="#FF3D00"
        d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
      />
    </svg>
  );
}

function LoginForm() {
  const params = useSearchParams();
  const callbackUrl = params.get("callbackUrl") || "/";
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);

  async function onCredentialsSubmit(e) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const fd = new FormData(e.currentTarget);
    const res = await signIn("credentials", {
      email: fd.get("email"),
      password: fd.get("password"),
      redirect: false,
      callbackUrl,
    });
    setPending(false);
    if (res?.error) setError("Invalid email or password.");
    else if (res?.url) window.location.href = res.url;
  }

  return (
    <div className="relative w-full max-w-md">
      {/* gradient ring */}
      <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-pink/60 via-violet/40 to-cyan/30 opacity-70 blur-[1px]" />

      <div className="relative glass rounded-3xl p-8 sm:p-10 shadow-[0_30px_80px_-20px_rgba(155,92,255,0.45)]">
        <div className="text-center space-y-2">
          <h1 className="font-display font-extrabold tracking-tight text-3xl sm:text-4xl">
            Welcome <span className="gradient-text">back</span>
          </h1>
          <p className="text-sm text-white/60">
            Sign in to start crafting one-of-a-kind AI images.
          </p>
        </div>

        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl })}
          className="mt-7 w-full flex items-center justify-center gap-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 hover:border-white/20 px-4 py-3 text-sm font-semibold transition-all cursor-pointer"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.2em] text-white/40">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          or
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        <form onSubmit={onCredentialsSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60 px-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm placeholder:text-white/30 outline-none transition-all focus:border-violet/60 focus:ring-2 focus:ring-violet/30"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60 px-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-sm placeholder:text-white/30 outline-none transition-all focus:border-pink/60 focus:ring-2 focus:ring-pink/30"
            />
          </div>

          {error && (
            <div className="rounded-lg bg-pink/10 border border-pink/30 px-3 py-2 text-sm text-pink-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={pending}
            className="w-full rounded-full py-3 text-sm font-semibold bg-gradient-to-r from-pink to-violet hover:opacity-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_40px_-10px_rgba(255,45,120,0.6)]"
          >
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/50">
          New here?{" "}
          <Link href="/" className="text-white/80 hover:text-white underline-offset-4 hover:underline">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <main className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* ambient blobs */}
      <div
        className="blob"
        style={{
          width: 480,
          height: 480,
          top: -160,
          left: -120,
          background: "radial-gradient(circle, rgba(255,45,120,0.55), transparent 60%)",
        }}
      />
      <div
        className="blob"
        style={{
          width: 520,
          height: 520,
          bottom: -180,
          right: -140,
          background: "radial-gradient(circle, rgba(155,92,255,0.5), transparent 60%)",
        }}
      />
      <div
        className="blob"
        style={{
          width: 360,
          height: 360,
          top: "40%",
          left: "55%",
          background: "radial-gradient(circle, rgba(0,229,255,0.18), transparent 65%)",
        }}
      />

      <div className="relative z-10 w-full flex items-center justify-center">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
