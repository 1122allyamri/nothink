# Amri® — Studio homepage

An editorial, grid-based studio homepage (single page, this phase) built as a
dependency-free static site: semantic HTML + CSS custom properties + a small
vanilla JS layer. No build step.

## Preview

```bash
python3 -m http.server 4173 --directory site
# then open http://localhost:4173
```

(or open `site/index.html` via any static server; Google Fonts requires network,
with graceful system-font fallbacks.)

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | Homepage markup, metadata, JSON-LD |
| `work.html` | Work page — industry directory + case-study panel |
| `scripts/work.js` | Work page behaviour: directory, all-works / case views, hash routing (`work.html#slug`) |
| `styles/main.css` | Design tokens (light + dark), all components, responsive rules |
| `scripts/data.js` | **Single source of truth** for posts, projects, voices, lab items, team, footer links, contact |
| `scripts/main.js` | Renders collections from `data.js`; theme toggle, journal-rail rotation, scroll reveals, footer clock |
| `assets/img/*.svg` | Generated placeholder artwork — all `[TEMP]` |
| `tools/generate-placeholders.py` | Regenerates the placeholder artwork; delete once real assets exist |

## Replacing temporary content

Everything marked `[TEMP]` in `scripts/data.js` is placeholder:

- **Projects** (Aurel, Kilowatt, Fieldnote, Marlow) are fictional. Swap names,
  descriptions and the 3 media files per project (keep filenames or update paths).
- **Posts, quotes, people names** are invented copy.
- **Portraits / studio photo / all imagery** are generated SVG stand-ins —
  replace one-for-one with photography (any raster format works; update paths).
- **Phone number and city/timezone** in `data.js` + the phone link in `index.html`.
- The email `allyamri2026@gmail.com` is real and wired to all CTAs.
- `<link rel="canonical">` and the JSON-LD `url` point at `https://example.com/` — set the real domain.

## Notes

- Dark mode: toggle in the nav, persisted in `localStorage`, defaults to OS preference.
- Motion honours `prefers-reduced-motion` (reveals, rail rotation, spinning footer mark all disable).
- Keep SVG `feTurbulence`/large-blur filters out of the artwork — dozens of
  filtered images on one page can wedge browser compositors (this is why the
  generator uses radial gradients instead).
