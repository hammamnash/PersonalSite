# Personal project pages

The home page lists these projects in `/#projects`, immediately after The Background and before Agentic AI, separately from employment history. Each has a real static route and its own editable directory.

| Project | Page to edit | URL |
| --- | --- | --- |
| Nyilehno Rental Management System | `app/projects/nyilehno/page.tsx` | `/projects/nyilehno` |
| Dengkul.fit Running and Cycling Management | `app/projects/dengkul-fit/page.tsx` | `/projects/dengkul-fit` |
| Modal Cocot MC Management | `app/projects/modal-cocot/page.tsx` | `/projects/modal-cocot` |
| Runees Treadmill Run Dashboard | `app/projects/runees/page.tsx` | `/projects/runees` |
| Consulting Portal | `app/projects/consulting-portal/page.tsx` | `/projects/consulting-portal` |

## Add content later

1. Edit the relevant `page.tsx`. Replace its `ProjectPlaceholder` return value with your project content when ready. The shared navigation/footer comes from `app/projects/layout.tsx`; do not add another `<main>`.
2. Project names used by both the homepage and the placeholders live in `app/projects/_data.ts`.
3. The shared temporary page is `app/projects/_components/project-placeholder.tsx`. Editing it changes every page still using the placeholder.
4. When you have approved screenshots, create `public/images/projects/<slug>/` and add only files intended for public access. Reference them as `/images/projects/<slug>/<filename>`.
5. Use only confirmed project details: the problem, intended users, your role, what you built, and relevant screenshots or links. Do not publish credentials, internal URLs, private data, or invented results. No live-app or repository URL has been assumed.
6. Update the page metadata and replace its homepage “Details coming soon” status when content is ready. The current homepage status is rendered in `app/page.tsx`; project-specific statuses can be added to `_data.ts` when they actually differ. The placeholders explicitly use `noindex, nofollow`; root metadata also currently keeps the whole portfolio unindexed. Review both at public launch.
7. Run `npm run build`, serve `out/` with the Cloudflare Pages local runtime described in `docs/404-preview.md`, and run `npm test`, `npm run lint`, and `npm run typecheck`.

The current pages intentionally contain only their supplied names, a visible “Details coming soon” heading, and working return links. This labels the write-ups as unfinished, not the applications as unreleased. No CMS, database, dynamic route handler, new dependency, or separate application repository was created. The existing applications themselves are not modified.

Do not edit generated files under `out/`; rebuilding exports the five routes for Cloudflare Pages.
