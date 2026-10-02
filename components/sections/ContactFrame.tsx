import { Frame, FrameBody, type Theme } from "@/components/canvas/Frame";
import { ContactForm } from "@/components/sections/ContactForm";
import { SocialRail } from "@/components/sections/SocialRail";
import { AcornMark } from "@/components/ui/AcornMark";
import { Words } from "@/components/ui/Accented";
import { Arrow } from "@/components/ui/Arrow";
import { BackToStart } from "@/components/ui/BackToStart";
import { Clock } from "@/components/ui/Clock";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/content/site";

/** Closing panel, shared by every page: call to action, contact form, social icons, colophon. */
export function ContactFrame({ theme = "light" }: { theme?: Theme }) {
  const { closing, contact } = site;
  const services = site.services.items.map((item) => item.title);

  return (
    <Frame theme={theme} name={closing.label} id="contact">
      <FrameBody className="min-h-[70svh] justify-between gap-10 wide:min-h-0">
        <p className="mono flex flex-wrap justify-between gap-3">
          <span className="chip chip-solid">{closing.label}</span>
          {site.availability.show ? (
            <span className="chip">
              <span aria-hidden="true" className="pulse-dot size-1.5 rounded-full bg-(--fg)" />
              {site.availability.label}
            </span>
          ) : (
            <span className="chip">{site.location}</span>
          )}
          <span className="chip">
            Local time <Clock timeZone={site.timezone.iana} /> {site.timezone.label}
          </span>
        </p>

        {/* What you can get in touch about, running edge to edge. */}
        <Marquee
          items={services}
          label="Services"
          outline
          duration={40}
          className="display -mx-5 text-[calc(4.4*var(--scale))] wide:-mx-[calc(3.6*var(--scale))] wide:text-[calc(7*var(--scale))]"
        />

        <div className="flex flex-col gap-10 wide:flex-row wide:items-end wide:gap-[calc(4*var(--scale))]">
          <h2 className="display drift text-[calc(6.6*var(--scale))] wide:flex-1 wide:text-[calc(16*var(--scale))]">
            {closing.headingLines.map((line, index) => (
              <Reveal
                key={line}
                as="span"
                delay={index * 120}
                className={`block ${index === 1 ? "serif-i" : ""}`}
              >
                <Words text={line} />
              </Reveal>
            ))}
            <span className="body-l mt-5 block max-w-[30em] font-sans font-normal tracking-normal text-(--mut)">
              {closing.body}
            </span>
          </h2>

          <Reveal className="card flex flex-col gap-4 p-5 wide:w-[max(calc(46*var(--scale)),23rem)] wide:shrink-0 wide:p-[calc(2.4*var(--scale))]">
            {contact.formEndpoint ? (
              <ContactForm endpoint={contact.formEndpoint} email={contact.email} />
            ) : null}
            <div className="mono flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-(--rul) pt-3">
              <span className="flex flex-wrap items-center gap-3">
                <a href={`mailto:${contact.email}`} className="link-u normal-case tracking-normal">
                  {contact.email}
                </a>
                <CopyEmail email={contact.email} />
              </span>
              {site.profile.cv ? (
                <a href={site.profile.cv} download className="inline-flex items-center gap-2">
                  <span className="link-u">{site.profile.cvLabel}</span>
                  <Arrow className="rotate-90" />
                </a>
              ) : null}
            </div>
          </Reveal>

          {/* Social icons: a vertical rail on desktop, a row on phones. */}
          <SocialRail className="wide:shrink-0 wide:self-center" />
        </div>

        <footer className="mono flex flex-col gap-2 border-t border-(--rul) pt-4 text-(--mut) wide:flex-row wide:items-center wide:justify-between">
          <p className="flex items-center gap-2">
            <AcornMark className="size-4" />
            {closing.credit}
          </p>
          <p className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>
              © {site.copyrightYear} {site.brand}. {closing.rights}
            </span>
            <BackToStart className="text-(--fg)" />
          </p>
        </footer>
      </FrameBody>
    </Frame>
  );
}
