# AL-MUHSIN BD PLC Corporate Website

A static, multi-page corporate group website built for GitHub Pages.

## Stack
- HTML5
- CSS3
- Bootstrap 5
- Vanilla JavaScript
- jQuery
- AOS (Animate On Scroll)

## Pages
1. Home (`index.html`)
2. About Us (`about.html`)
3. Sister Concerns (`sister-concerns.html`)
4. Muhsin Mart (`muhsin-mart.html`)
5. Muhsin Real Estate (`muhsin-real-estate.html`)
6. Muhsin Foundation (`muhsin-foundation.html`)
7. CSR Activities (`csr.html`)
8. News & Updates (`news.html`)
9. Gallery (`gallery.html`)
10. Contact (`contact.html`)

## Reusable content
- Header: `components/header.html`
- Footer: `components/footer.html`
- Sister concerns: `data/companies.json`
- News: `data/news.json`
- Gallery: `data/gallery.json`

## Local preview
Because components and JSON are loaded with `fetch()`, do not open the HTML files directly with `file://`.
Use a local web server, for example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

GitHub Pages serves the project over HTTP/HTTPS, so dynamic component loading works normally there.

## GitHub Pages deployment
1. Upload all files and folders to the repository root.
2. Open **Settings > Pages**.
3. Set the deployment source to the branch containing the site (usually `main`) and root `/`.
4. Save and wait for the Pages URL to become available.

## Before production launch
Replace the following placeholder content:
- Corporate address, phone and email in `contact.html` and `components/footer.html`.
- `info@example.com` in `assets/js/main.js`.
- Founder/Chairman name, approved message and image.
- Demo news content in `data/news.json`.
- SVG placeholder visuals in `assets/images/` with real optimized WebP/JPG/PNG/SVG assets.
- Official logos for AL-MUHSIN BD PLC and all sister concerns.
- Add the production domain to canonical/OG tags if required.
- Add a final sitemap URL to `robots.txt` after the domain is known.

## Image recommendations
For best performance, use WebP where possible:
- Hero: ~1600×900
- Sister concern card: ~900×560
- Founder portrait: ~700×875
- Gallery: ~1200×900

Keep file names stable to avoid changing JSON, or update paths in the relevant JSON files.
