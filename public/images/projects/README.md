# Project screenshots

Put screenshots of your projects in this folder, one sub-folder per project:

```
public/images/projects/
  Laguna Guide/
    cover.png      <- main screenshot, shown everywhere the project appears
    01.png         <- extra screens for the project page (optional)
    02.png
```

Then point to them in `data/works.ts`, inside that project's entry:

```ts
cover: "/images/projects/Laguna Guide/cover.png",
gallery: ["/images/projects/Laguna Guide/01.png", "/images/projects/Laguna Guide/02.png"],
```

- `cover` replaces the placeholder tile on the home page, the Works page and
  the project page (where it sits inside a browser-window frame).
- `gallery` adds a screenshot viewer to the Overview panel on the project page,
  with thumbnails to switch between images.
- Paths start with `/images/...` (no `public`).
- A full-page capture about 1600 px wide works well. PNG, JPG or WebP are fine;
  images are resized and optimised automatically.
