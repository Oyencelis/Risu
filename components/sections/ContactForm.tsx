"use client";

import { useState, type FormEvent } from "react";
import { Arrow } from "@/components/ui/Arrow";

type ContactFormProps = {
  /** Where the message is posted. See `formEndpoint` in data/contact.ts. */
  endpoint: string;
  /** Shown as a fallback if sending fails. */
  email: string;
};

type Status = "idle" | "sending" | "sent" | "error";

const FIELD =
  "w-full rounded-xl border border-(--rul) bg-transparent px-3.5 py-2.5 text-[max(14px,calc(1.4*var(--scale)))] text-(--fg) outline-none transition-colors duration-300 placeholder:text-(--mut) focus:border-(--fg)";

/**
 * Contact form. Posts the message as JSON to the form service, which forwards
 * it to your inbox. No page reload; the result is announced in place.
 */
export function ContactForm({ endpoint, email }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    // Hidden field that people never see; bots fill it in. Drop those quietly.
    if (data.get("_honey")) return;

    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          _subject: `Portfolio message from ${data.get("name")}`,
          _template: "table",
        }),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-3 py-4">
        <p className="display-s text-[calc(2.4*var(--scale))]">Message sent.</p>
        <p className="body-s text-(--mut)">Thank you — I will reply to your email soon.</p>
        <button type="button" onClick={() => setStatus("idle")} className="btn btn-ghost mono cursor-pointer">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2.5">
      <div className="grid gap-2.5 sm:grid-cols-2">
        <label>
          <span className="sr-only">Your name</span>
          <input name="name" type="text" required autoComplete="name" placeholder="Your name" className={FIELD} />
        </label>
        <label>
          <span className="sr-only">Your email</span>
          <input name="email" type="email" required autoComplete="email" placeholder="Your email" className={FIELD} />
        </label>
      </div>
      <label>
        <span className="sr-only">Message</span>
        <textarea
          name="message"
          required
          rows={3}
          placeholder="Tell me about your project"
          data-lenis-prevent
          className={`${FIELD} resize-none`}
        />
      </label>
      <input name="_honey" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={status === "sending"} className="btn mono cursor-pointer disabled:opacity-60">
          {status === "sending" ? "Sending…" : "Send message"}
          <Arrow />
        </button>
        <p role="alert" className="body-s text-(--mut)">
          {status === "error" ? (
            <>
              Could not send. Please email{" "}
              <a href={`mailto:${email}`} className="underline">
                {email}
              </a>
              .
            </>
          ) : null}
        </p>
      </div>
    </form>
  );
}
