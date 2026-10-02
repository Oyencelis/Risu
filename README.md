# Risu — Portfolio

Portfolio of Lawrence Celis (Risu), web developer and web designer.
Built with Next.js (App Router), TypeScript, Tailwind CSS, Motion and Lenis.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000 (also reachable from other devices on the same Wi-Fi)
npm run build    # production build
npm run lint
```

## Change the content

Everything the site says about you is in `data/`. See `data/README.md`.

| File | Holds |
|---|---|
| `data/works.ts` | Projects (copy the template at the top to add one) |
| `data/profile.ts` | Name, role, portrait, CV, summary, biography |
| `data/skills.ts` | Capabilities, areas of practice, skills, cover tags |
| `data/experience.ts` | Jobs and education |
| `data/contact.ts` | Email, social links, availability |

Images go in `public/images/` (project screenshots in `public/images/projects/<slug>/`).
The CV offered for download is `public/files/lawrence-celis-cv.pdf`.

## How the site is put together

- `app/` — pages: home, `/about`, `/works`, `/works/[slug]`, plus share images, 404 and sitemap.
- `components/story/HorizontalStory.tsx` — turns vertical scrolling into sideways panning on desktop; panels stack on phones.
- `components/canvas/Frame.tsx` — one panel. Panels alternate black and white.
- `components/layout/Chrome.tsx` — sidebar, menu and progress line.
- `content/site.ts` — joins `data/` with the fixed interface wording (button labels, section titles).
- `app/globals.css` — colours, type and animation.

Keyboard: left / right arrows step between panels, `O` opens the overview.

## Deploy

Push the repository to GitHub and import it at vercel.com. No extra configuration is needed.
Set `NEXT_PUBLIC_SITE_URL` if you use a custom domain.
