# Amelia & Thomas — Wedding Invitation

A lightweight, single-page wedding invitation built with React + Vite. Each
guest opens a personalized link, sees their name, and can RSVP directly from
the page — no backend server required, just two Google Sheets.

## Setup

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Customize content

All wedding content — couple names/initials, date, venue, time, story text,
photos, gallery images, RSVP copy, footer text — lives in `src/data.json`.
Edit that file directly; no rebuild config needed, just save and refresh.

## Configure environment variables

Copy the example env file and fill in your own values (these two are the
only things that stay in env vars — they're backend endpoints, not content):

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `VITE_GUEST_SHEET_CSV_URL` | Published CSV URL of your guest list (see below) |
| `VITE_RSVP_WEBHOOK_URL` | Apps Script Web App URL that receives RSVP submissions (see below) |

## Guest list setup

1. Create a Google Sheet with two columns: `slug` and `name`. Add one row
   per guest or family, e.g.

   | slug | name |
   | --- | --- |
   | john-family | John & Family |
   | sarah | Sarah Lee |

2. Go to **File > Share > Publish to web**, select the sheet, choose
   **CSV** as the format, and publish.
3. Copy the published URL into `VITE_GUEST_SHEET_CSV_URL` in your `.env`.
4. Share the site with each guest using their slug in the URL:

   ```
   https://yoursite.com/?to=john-family
   ```

   The page will greet them by name automatically.

## RSVP backend setup

RSVP submissions are saved to a separate Google Sheet via a small Apps
Script Web App — no server hosting needed.

1. Create a new Google Sheet to store RSVP responses (or use a sheet/tab
   named `RSVP` inside your existing spreadsheet).
2. Open **Extensions > Apps Script** from that sheet.
3. Delete the starter code and paste in the contents of
   [`apps-script/rsvp.gs`](./apps-script/rsvp.gs).
4. Click **Deploy > New deployment**, choose type **Web app**, set
   **Execute as: Me** and **Who has access: Anyone**, then deploy.
5. Copy the generated `/exec` URL into `VITE_RSVP_WEBHOOK_URL` in your
   `.env`.

Full step-by-step instructions are also included as comments at the top of
`apps-script/rsvp.gs`.

## Deploy to GitHub Pages

This repo ships a GitHub Actions workflow (`.github/workflows/deploy.yml`)
that builds and deploys automatically on every push to `main`.

1. In the repo, add two **Actions secrets** (Settings → Secrets and
   variables → Actions → New repository secret):
   - `VITE_GUEST_SHEET_CSV_URL`
   - `VITE_RSVP_WEBHOOK_URL`
2. In Settings → Pages, set **Source** to "GitHub Actions".
3. Push to `main` — the workflow builds with those secrets injected and
   publishes `dist/`. Check progress under the repo's Actions tab.
4. Site goes live at `https://<your-username>.github.io/the-invitation/`.

`vite.config.js` already sets `base: '/the-invitation/'` to match this
repo's name — if you rename the repo, update that path too.

## Deploy elsewhere

Any static host (Vercel, Netlify, etc.) also works:

1. Connect this repository to your Vercel/Netlify project.
2. Set all `VITE_*` environment variables from `.env.example` in the
   project's settings.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Remove/adjust the `base` in `vite.config.js` — it's only needed for
   GitHub Pages' subpath serving; other hosts typically serve from `/`.
