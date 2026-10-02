"use client";

import { useEffect, useState } from "react";

/** Copies an email address to the clipboard and confirms in place. */
export function CopyEmail({ email, className = "" }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard blocked: fall back to opening a new message.
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      title={`Copy ${email}`}
      className={`chip mono cursor-pointer transition-colors duration-300 hover:border-(--fg) ${
        copied ? "chip-solid" : ""
      } ${className}`}
    >
      <svg viewBox="0 0 16 16" className="size-[1.1em]" fill="none" aria-hidden="true">
        {copied ? (
          <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="1.5" />
        ) : (
          <>
            <rect x="5" y="5" width="8.5" height="8.5" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
            <path d="M11 3.5V3A1.5 1.5 0 0 0 9.5 1.5H3A1.5 1.5 0 0 0 1.5 3v6.5A1.5 1.5 0 0 0 3 11h.5" stroke="currentColor" strokeWidth="1.25" />
          </>
        )}
      </svg>
      <span aria-live="polite">{copied ? "Copied" : "Copy email"}</span>
    </button>
  );
}
