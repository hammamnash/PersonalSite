# PersonalSite: light-mode mapping

## Source of truth

Use `.github/design/design.md` (Dimension) for the design language. The user's only requested theme change is light mode. This file records the mapping and portfolio-specific adaptations; it is not a competing design reference.

Design Read: English recruiter-facing portfolio, Dimension's restrained product-editorial language in light mode, ENERGY 2 / RHYTHM 2 / MOTION 1.

## Preserve

- DM Sans display/body, 72px desktop hero at weight 500 and -0.035em tracking.
- Geist for section headings; DM Sans for text below 24px.
- Floating frosted navigation with 19px radius and 16px viewport inset.
- Pill navigation/actions, 10px internal UI elements, 24px content panels.
- 1200px content frame, 64–80px desktop section intervals, mobile-first smaller spacing.
- 1px hairlines, flat surfaces, only a subtle floating-nav shadow.
- Warm-to-cool hero and one restrained violet wash at the hero boundary.
- Left-aligned split hero and numbered accordion rows rather than feature-card walls.

## Dark to light mapping

| Reference role | Light value | Reason |
|---|---|---|
| Canvas #0a0a0a | #fafafa | Bright, neutral reading surface |
| Graphite elevated surface | #ffffff | White elevation against a quiet canvas |
| Body #ededed | #161616 | Clear text contrast in light mode |
| Secondary #c2c2c2 | #525252 | Readable supporting text |
| Tertiary #686868 | #666666 | Metadata legibility |
| White primary action | #161616 with white text | Preserve the inverted action hierarchy |
| Hairline | #dedede | Quiet structural dividers |
| Frosted panel | #f0f0f0 | Supporting content grouping |
| Hero horizon | #f4e3d2 through #f5f0ec to #e4eaf6 | Keep amber/coral-to-cool identity with dark-text contrast |
| Dusk violet | rgba(107,98,242,.4) in a narrow wash | Source-reference accent only; no solid violet UI |

No terracotta, ATD red, or additional personal brand hue. The earlier terracotta draft is superseded by this source-faithful mapping. Fonts are locally served, not fetched from Google during page visits.

## Portfolio-specific adaptations

The source's laptop mockup is omitted because no approved product screenshot exists. A labeled experience map occupies the split hero's right side and explicitly says it is not a client architecture. No fake screenshot, portrait, customer logo, testimonial, or metric.

The owner selected the TOGAF ADM / ArchiMate Core reference image from Archimetric for the ATD work section. Keep its original colors and full aspect ratio; do not crop a diagram into a decorative banner. A source caption distinguishes it from a client deliverable, and a full-size link supports reading on narrow screens. See `docs/image-sources.md` for provenance and the unresolved public-reuse license.

The owner also requested generated warehouse and analytics imagery. Each appears only in its corresponding work disclosure, with an explicit AI-generated caption rather than posing as documentary evidence. Warm-neutral photographic compositions match the light palette; native 16:9 framing and 10px corners fit the content panels. The analytics screen is intentionally indistinct, not a mock employer dashboard. Both WebP assets are locally served and lazy-loaded.

The approved agentic AI exploration section sits after career history and before tools, keeping EA consulting as the professional headline. It separates current interests from job experience and uses this website as the concrete AI-assisted example, without invented metrics or expertise claims. Design Read remains ENERGY 2 / RHYTHM 2 / MOTION 1: existing DM Sans/Geist hierarchy and light neutrals, editorial copy beside a small conceptual workflow, then a plain example note. The workflow uses readable HTML rather than an image, with four steps in source order and arrows that communicate sequence. Human review is emphasized by the existing neutral panel tone; checkpoints before consequential actions are explicitly noted. No new brand hue, model logos, generic AI icons, animation, or extra navigation item.

Navigation leads to actual Work, About, and Contact sections. Native details/summary elements implement the numbered work accordions and work without JavaScript. No blog, CMS, database, login, or theme toggle. Email and LinkedIn are the only outbound contact actions.

Intro gives one focal headline. Selected work uses readable disclosure rows. Career chronology is denser. Tools/training use one flat panel. Contact closes with real destinations. Pill shapes denote interaction; tool labels are rectangular and noninteractive. Training is not represented as certification.

Hover and focus feedback only; reduced-motion rules disable transitions. No scroll-gated content or perpetual animation. 44px interactive targets, keyboard focus, and mobile/zoom reflow are release checks. A preview noindex rule is not an access-control mechanism.
