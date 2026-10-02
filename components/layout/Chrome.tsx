"use client";

import { motion, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { SocialRail } from "@/components/sections/SocialRail";
import { gotoPanel } from "@/components/story/HorizontalStory";
import { AcornMark } from "@/components/ui/AcornMark";
import { Arrow } from "@/components/ui/Arrow";
import { Clock } from "@/components/ui/Clock";
import { contactHref, site } from "@/content/site";
import { toggleOverview, useActiveEntry, useEntries, useOverview } from "@/lib/story-store";

const order = (i: number) => ({ "--i": i }) as CSSProperties;
const MASK = "block overflow-hidden pb-[0.1em] pt-[0.04em]";
const isActive = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

function MenuIcon() {
  return (
    <svg viewBox="0 0 20 10" className="w-5" fill="none" aria-hidden="true">
      <path d="M0 1h20M6 9h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** Small line of keyboard hints, shown in the menu on desktop. */
const SHORTCUTS = [
  ["← →", "Step panels"],
  ["O", "Overview"],
  ["Esc", "Close"],
] as const;

/**
 * Site chrome. Because pages pan sideways, navigation lives in a floating
 * sidebar on the left: menu, wordmark, the entry index for the current page,
 * and the overview. A thin line along the bottom shows progress.
 * Phones get a top bar instead of the sidebar.
 */
export function Chrome() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const overview = useOverview();
  const entries = useEntries();
  const activeId = useActiveEntry();
  const active = entries.find((item) => item.id === activeId) ?? entries[0];
  const { scrollYProgress } = useScroll();

  const show = () => {
    dialog.current?.showModal();
    setOpen(true);
  };
  const close = () => dialog.current?.close();

  // Contact: mailto once a real address exists; until then, this page's contact panel.
  const mailto = contactHref.startsWith("mailto:");
  const links = [
    ...site.nav,
    { label: "Contact", href: mailto ? contactHref : "#contact", note: "Get in touch" },
  ];
  const onNavigate = (event: MouseEvent, href: string) => {
    close();
    if (href === "#contact") {
      event.preventDefault();
      gotoPanel("contact");
    }
  };

  const menuProps = {
    type: "button" as const,
    onClick: show,
    "aria-haspopup": "dialog" as const,
    "aria-expanded": open,
    "aria-controls": "site-menu",
  };

  return (
    <>
      {/* Phones: top bar. */}
      <header className="glass fixed inset-x-(--m) top-2 z-[60] flex h-12 items-center justify-between gap-4 rounded-full pl-4 pr-1.5 wide:hidden">
        <Link href="/" aria-label={`${site.brand}, home`} className="flex min-h-11 items-center gap-2">
          <AcornMark className="size-5 text-pop" />
          <span className="display text-xl leading-none">{site.brand}</span>
        </Link>
        <button
          {...menuProps}
          className="mono flex h-9 cursor-pointer items-center gap-2.5 rounded-full bg-bone px-4 text-ink"
        >
          Menu
          <MenuIcon />
        </button>
      </header>

      {/* Desktop: floating sidebar. */}
      <aside className="glass fixed bottom-(--m) left-(--m) top-(--m) z-[60] hidden w-(--side) flex-col items-center rounded-[1.5rem] py-2 wide:flex">
        <button
          {...menuProps}
          aria-label="Menu"
          title="Menu"
          className="grid size-12 shrink-0 cursor-pointer place-items-center rounded-full bg-bone text-ink transition-[scale] duration-300 ease-out-expo hover:scale-105"
        >
          <MenuIcon />
        </button>

        <Link
          href="/"
          aria-label={`${site.brand}, home`}
          className="flex shrink-0 flex-col items-center gap-2 py-5 transition-colors hover:text-pop"
        >
          <AcornMark className="size-5 text-pop" />
          <span className="vertical display text-xl leading-none">{site.brand}</span>
        </Link>

        {/* Entry index for the current page. */}
        <nav aria-label="Entries on this page" className="flex min-h-0 flex-1 items-center">
          <ol className="mono flex flex-col items-center gap-1">
            {entries.map((item) => {
              const current = item.id === active?.id;
              return (
                <li key={item.id} className="side-item relative">
                  <a
                    href={`#${item.id}`}
                    aria-label={`${site.sectionWord} ${item.no}, ${item.label}`}
                    aria-current={current ? "location" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      gotoPanel(item.id);
                    }}
                    className={`grid h-8 w-10 place-items-center rounded-full transition-colors duration-300 ${
                      current ? "bg-pop text-ink" : "text-fog hover:text-bone"
                    }`}
                  >
                    {item.no}
                  </a>
                  <span aria-hidden="true" className="side-tip mono">
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ol>
        </nav>

        <button
          type="button"
          onClick={toggleOverview}
          aria-pressed={overview}
          aria-label="Overview: zoom out to every panel"
          aria-keyshortcuts="O"
          title="Overview (O)"
          className={`grid size-11 shrink-0 cursor-pointer place-items-center rounded-full transition-colors hover:text-bone ${
            overview ? "bg-white/10 text-pop" : "text-fog"
          }`}
        >
          <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden="true">
            <rect x="1" y="4" width="3.6" height="8" rx="1" stroke="currentColor" />
            <rect x="6.2" y="4" width="3.6" height="8" rx="1" stroke="currentColor" />
            <rect x="11.4" y="4" width="3.6" height="8" rx="1" stroke="currentColor" />
          </svg>
        </button>

        <p className="vertical mono shrink-0 pb-3 pt-3 text-fog !text-[10px]">
          {site.edition} · {site.copyrightYear}
        </p>
      </aside>

      {/* Scroll progress. */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 bottom-0 z-[59] h-[3px] origin-left bg-pop"
      />

      {/* Menu: the site's pages. */}
      <dialog
        ref={dialog}
        id="site-menu"
        aria-label="Site navigation"
        data-lenis-prevent
        onClose={() => setOpen(false)}
        className="menu aurora m-0 h-dvh max-h-none w-full max-w-none p-0 text-bone backdrop:bg-transparent open:flex open:flex-col"
      >
        <div className="flex h-16 shrink-0 items-center justify-between px-4 wide:h-20 wide:px-8">
          <p className="mono flex items-center gap-2 text-fog">
            <AcornMark className="size-4 text-pop" />
            {site.brand} / {site.edition}
          </p>
          <ul aria-label="Keyboard shortcuts" className="mono hidden items-center gap-5 text-fog wide:flex">
            {SHORTCUTS.map(([key, label]) => (
              <li key={key} className="flex items-center gap-2">
                <kbd className="rounded-md border border-white/20 px-1.5 py-0.5 font-mono text-bone">{key}</kbd>
                {label}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={close}
            className="mono flex h-10 cursor-pointer items-center gap-2.5 rounded-full bg-bone px-4 text-ink transition-[scale] duration-300 ease-out-expo hover:scale-105"
          >
            Close
            <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden="true">
              <path d="M1 1l10 10M11 1 1 11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>

        <nav aria-label="Primary" className="flex flex-1 flex-col justify-center px-4 wide:px-8">
          <ul className="border-t border-white/12">
            {links.map((item, index) => {
              const current = isActive(pathname, item.href);
              const className = `group flex items-baseline gap-4 border-b border-white/12 py-[min(2vh,1rem)] transition-opacity duration-300 hover:opacity-100 ${
                current ? "opacity-100" : "opacity-45"
              }`;
              const inner = (
                <>
                  <span className="mono w-8 shrink-0 text-fog">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={`display text-[clamp(2.75rem,min(15vh,13vw),10rem)] ${MASK}`}>
                    <span
                      className="menu-rise transition-[translate] duration-500 ease-out-expo group-hover:translate-x-3"
                      style={order(index)}
                    >
                      {item.label}
                    </span>
                  </span>
                  <span className="mono ml-auto flex items-center gap-3 text-fog">
                    {item.note}
                    <Arrow className="-translate-x-2 text-bone opacity-0 transition-[opacity,translate] duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100" />
                  </span>
                </>
              );
              return (
                <li key={item.label}>
                  {item.label === "Contact" ? (
                    <a
                      href={item.href}
                      onClick={(event) => onNavigate(event, item.href)}
                      className={className}
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={current ? "page" : undefined}
                      className={className}
                    >
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="theme-dark flex shrink-0 flex-wrap items-center justify-between gap-5 px-4 pb-5 !shadow-none wide:px-8 wide:pb-7">
          <div className="mono flex flex-wrap items-center gap-x-5 gap-y-2 text-fog">
            <p>
              {site.role} · {site.location}
            </p>
            <p className="flex items-center gap-2">
              Local time <span className="text-bone"><Clock timeZone={site.timezone.iana} /></span>{" "}
              {site.timezone.label}
            </p>
            {site.availability.show ? (
              <p className="flex items-center gap-2 text-bone">
                <span aria-hidden="true" className="pulse-dot size-1.5 rounded-full bg-bone" />
                {site.availability.label}
              </p>
            ) : null}
          </div>
          <SocialRail row />
        </div>
      </dialog>
    </>
  );
}
