# data/ — everything about you

These five files hold all the information the site shows. Edit them to change
the site's content; you do not need to touch any component.

| File | What it holds | Where it shows |
|---|---|---|
| `works.ts` | Your projects | Home (Entry 02), Works page, each project page |
| `profile.ts` | Name, role, location, portrait, summary, biography, key facts | Cover, Profile, About, page metadata |
| `skills.ts` | Capabilities, areas of practice, skills and tools, cover tags | Entry 03, Profile, About, cover |
| `experience.ts` | Jobs and education | Entry 04, About |
| `contact.ts` | Email, social links, availability | Contact panel on every page, menu |

## Add a work

1. Open `works.ts`.
2. Copy the template from the comment at the top.
3. Paste it into the `works` list (order in the list = order on the site) and fill it in.
4. Optional: put screenshots in `public/images/projects/<slug>/` and set `cover` / `gallery`.

The new work appears on the home page, gets its own panel on the Works page,
and gets its own page at `/works/<slug>`.

## Add a job or a course

Add an item to the list in `experience.ts`.

## Turn on a social link

In `contact.ts`, replace `null` with the profile URL.

## Change your photo

Put the file under `public/images/` and set `portrait` in `profile.ts`.

## Where is the rest?

- Fixed interface wording (button labels, section titles, menu items): `content/site.ts`.
- Layout and styling: `components/` and `app/globals.css`.
- Images: `public/images/`.
