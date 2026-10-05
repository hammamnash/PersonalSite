# Personal project pages

The home page lists these projects in `/#projects`, immediately after The Background and before Agentic AI, separately from employment history. Each has a real static route and its own editable directory.

| Project | Status | Page to edit | URL |
| --- | --- | --- | --- |
| Runees Treadmill Run Dashboard | Live (`runees.hammamnash.site`) | `app/projects/runees/page.tsx` | `/projects/runees` |
| Nyilehno Rental Management System | In development | `app/projects/nyilehno/page.tsx` | `/projects/nyilehno` |
| Dengkul.fit Running and Cycling Management | In development | `app/projects/dengkul-fit/page.tsx` | `/projects/dengkul-fit` |
| Modal Cocot MC Management | In development | `app/projects/modal-cocot/page.tsx` | `/projects/modal-cocot` |
| Consulting Portal | In development | `app/projects/consulting-portal/page.tsx` | `/projects/consulting-portal` |

## Add content later

1. Edit the relevant `page.tsx`. Replace its `ProjectPlaceholder` return value with your project content when ready. The shared navigation/footer comes from `app/projects/layout.tsx`; do not add another `<main>`.
2. Project names used by both the homepage and the placeholders live in `app/projects/_data.ts`.
3. The shared temporary page is `app/projects/_components/project-placeholder.tsx`. Editing it changes every page still using the placeholder.
4. When you have approved screenshots, create `public/images/projects/<slug>/` and add only files intended for public access. Reference them as `/images/projects/<slug>/<filename>`.
5. Use only confirmed project details: the problem, intended users, your role, what you built, and relevant screenshots or links. Do not publish credentials, internal URLs, private data, or invented results. No live-app or repository URL has been assumed; the Runees live URL was supplied by the owner.
6. Update the page metadata and replace its homepage status when content is ready. Homepage statuses now come from `app/projects/_data.ts`: set `status: "live"` and a `url` when a project ships, and the homepage row becomes an external link. The placeholders explicitly use `noindex, nofollow`; root metadata is now indexable — `app/robots.ts` allows crawling and `app/sitemap.ts` lists the homepage and the live Runees page.
7. Run `npm run build`, serve `out/` with the Cloudflare Pages local runtime described in `docs/404-preview.md`, and run `npm test`, `npm run lint`, and `npm run typecheck`.

The current placeholder pages intentionally contain only their supplied names, a visible “In development” heading, and working return links. This labels the write-ups as unfinished, not the applications as unreleased. Runees has real content (`app/projects/runees/page.tsx`) and links to its live deployment. No CMS, database, dynamic route handler, new dependency, or separate application repository was created. The existing applications themselves are not modified.

Do not edit generated files under `out/`; rebuilding exports the five routes for Cloudflare Pages.
