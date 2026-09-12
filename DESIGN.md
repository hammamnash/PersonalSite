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

Navigation leads to actual Work, About, and Contact sections. Native details/summary elements implement the numbered work accordions and work without JavaScript. No blog, CMS, database, login, or theme toggle. Email and LinkedIn are the only outbound contact actions.

Intro gives one focal headline. Selected work uses readable disclosure rows. Career chronology is denser. Tools/training use one flat panel. Contact closes with real destinations. Pill shapes denote interaction; tool labels are rectangular and noninteractive. Training is not represented as certification.

Hover and focus feedback only; reduced-motion rules disable transitions. No scroll-gated content or perpetual animation. 44px interactive targets, keyboard focus, and mobile/zoom reflow are release checks. A preview noindex rule is not an access-control mechanism.
