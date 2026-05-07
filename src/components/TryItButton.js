"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TryItButton({ className, children = "Try It" }) {
  const { status } = useSession();
  const router = useRouter();

  function handleClick(e) {
    e.preventDefault();
    if (status === "authenticated") {
      router.push("/generate");
    } else {
      signIn(undefined, { callbackUrl: "/generate" });
    }
  }

  const label = status === "authenticated" ? children : "Sign in to try";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={status === "loading"}
      className={className}
    >
      {label}
    </button>
  );
}
