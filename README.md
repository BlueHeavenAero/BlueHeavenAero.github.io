# BlueHeavenAero.github.io

Static one-page site for [GitHub Pages](https://pages.github.com/).

## Customize

Edit [`site-config.js`](site-config.js):

- **`logoSrc`** — Path to your header image (e.g. `assets/logo.png`). Leave **`""`** to hide the logo until you add a file under [`assets/`](assets/).
- **`titleLines`** or **`title`** — Main headline (`title` may use `\n` for line breaks).
- **`subtitle`** — Small line under the title (set to `""` to hide).
- **`youtubeVideoId`** — The ID from `https://www.youtube.com/watch?v=VIDEO_ID` (11 characters).
- **`accentColor`** — Optional CSS color for the subtitle (e.g. `#e50914`).
- **`markdownSrc`** — Markdown file loaded below the video (default [`content.md`](content.md)). Requires a local server or GitHub Pages (opening `index.html` as a `file:` URL often blocks `fetch`).
- **`markdownBody`** — Optional inline markdown used when `markdownSrc` is empty, or as a fallback if the file fails to load.

## GitHub Pages

In the repository on GitHub: **Settings → Pages → Build and deployment → Source**: deploy from your default branch, folder **/ (root)**.

After the first deploy, the site is available at `https://<user>.github.io/<repo>/` (user/org pages use a different URL pattern).

## Local preview

Open `index.html` in a browser, or run a static server from the repo root (some browsers block `file:` loading of scripts; a local server avoids that):

```bash
npx --yes serve .
```

Then visit the URL shown in the terminal.
