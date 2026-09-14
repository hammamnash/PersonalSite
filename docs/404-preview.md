# Custom 404 verification

The page source is `app/not-found.tsx`; `npm run build` generates `out/404.html`.
The owner-supplied image is `public/images/sdimages.jpg` (201 × 251 JPEG).

For a local Cloudflare Pages routing check:

```bash
npm run build
WRANGLER_SEND_METRICS=false npx --yes wrangler@4.131.2 pages dev out --ip 127.0.0.1 --port 3100 --compatibility-date=2026-09-11 --show-interactive-dev-session=false
```

Keep that server running, then in another terminal:

```bash
npm test
npm run lint
npm run typecheck
```

Visit `/missing-portfolio-page` or `/missing/deep/page` to exercise the fallback. Both should retain the requested URL and return HTTP 404 with the cat page, not redirect to the homepage. `/404.html` is useful for viewing the exported artifact directly but does not alone verify fallback status handling.

A plain Python `http.server` does not apply Pages' custom-404 routing, so it cannot pass the missing-URL tests. Wrangler's generated `.wrangler/` state is excluded from Git and lint.

Local validation is not a deployment. After publishing the updated `out/` contents through the existing deployment flow, check a nonexistent URL on the actual domain as well. No Worker function, catch-all redirect, or Cloudflare dashboard error-page setting is needed for this static Pages artifact.

Official reference: https://developers.cloudflare.com/pages/configuration/serving-pages/
