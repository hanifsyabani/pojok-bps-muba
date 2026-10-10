---
name: frontend-design
description: Guidance for distinctive, intentional visual design when building new UI or reshaping an existing one. Helps with aesthetic direction, typography, and making choices that don't read as templated defaults.
source: https://github.com/anthropics/skills/tree/main/skills/frontend-design
license: See LICENSE.txt in source repository
---

# Frontend Design

Approach this as the design lead at a design studio known for giving every client a distinct visual identity that is not mistaken for anyone else's. This client has already rejected proposals that felt cliché or templated, and is paying for a distinctive point of view: make deliberate, opinionated choices about palette, typography, and layout that are specific to this brief, and take aesthetic risk if justified.

## Ground your designs in the subject matter

If the brief does not identify what the product or subject matter is, identify it yourself before designing, and confirm with the client. The subject's industry, subject matter, materials, and vernacular are where distinctive visual choices come from — a design for a toy for girls aged 8–11 will be very aesthetically different from a dashboard for financial analysts. Build with the brief's real content and subject matter throughout.

## Design principles

For web designs, the hero is the first thing viewers will see. Open with the most characteristic thing in the subject's world, in the form that is most appropriate: a headline, an image, an animation, a live demo, an interactive moment, or other treatments. Be deliberate with your choice: a big number with a small label, supporting stats, and a gradient accent is the default treatment, so only use it if that's truly the best option.

**Typography** carries the personality of the page. Use one family or two, and if two, make them clearly distinct. Choose your typefaces deliberately, not the default families you would reach for on any other project. Set a clear type scale with intentional weights, widths, and spacing.

- Default to line lengths of less than 80 characters
- Serif typefaces can have slightly longer line lengths
- Give serif body text slightly more line-height than a sans-serif

### Avoid these default typographic treatments (AI tells):
- Accenting just a single word or phrase in a headline
- Using all caps for labels
- Adding unnecessary typographic labels above content

**Visual structure is information.** Numbered markers (01 / 02 / 03) are only appropriate if the content actually is a sequence — like a stepped process or a timeline.

**Use non-user-triggered motion sparingly.** A single orchestrated moment — one page-load sequence or one reveal — lands better than scattered effects. Fade-and-slide-up entrances on each section and hover transitions on every card are the generic default and read as AI-generated.

## Anti-patterns to avoid (AI-generated design tells)

1. Warm cream background (~#F4F1EA) with heading in dark brown/charcoal
2. "Rounded rectangle card" layouts with emoji or icon at top-left, heading, short paragraph, and CTA link
3. Gradient hero text on a dark background
4. Glassmorphism blur panels with neon accent colors
5. Three-column "feature grid" with icon + title + paragraph
6. Testimonial carousels with avatar circles and star ratings
7. Stats bars: "10,000+ users / 500+ projects / 99.9% uptime"
8. Large emoji used as decorative section markers

## Process: plan → review → build → critique

1. **Plan**: Identify the brief's subject, audience, and primary job. Write a 2-3 sentence design brief.
2. **Review against brief**: Does the proposed design serve the brief? Is it distinctive?
3. **Build**: Implement with real content, not placeholders. "Lorem ipsum" is not acceptable.
4. **Critique**: Would a designer at a top studio be proud of this? If not, what needs to change?

## Color strategy

Avoid these generic palettes:
- Generic blue (#3B82F6) as primary
- Generic purple (#8B5CF6) as accent
- Pure black (#000000) as background
- Pure white (#FFFFFF) as surface

Instead, derive palette from the subject matter:
- Government/statistics: navy, red, institutional white → specific shades, not generic
- Finance: deep forest green, warm cream, brass
- Healthcare: soft teal, clean white, warm gray
- Tech: cool slate, electric blue-violet, off-white

## Responsive design

Design mobile-first, but design *for* each breakpoint:
- Mobile (< 768px): single column, larger tap targets, simplified nav
- Tablet (768–1199px): two columns, side-by-side content
- Desktop (≥ 1200px): full layout with sidebar, multi-column grids

## Deliverable quality bar

Before shipping:
- [ ] The design has a distinctive visual personality, not a generic template
- [ ] Typography is set with intention: size, weight, spacing, line-height
- [ ] Color palette is derived from the subject, not picked from defaults
- [ ] Layout uses grid or columns deliberately, not arbitrarily
- [ ] Interactive states (hover, focus, active) are designed, not assumed
- [ ] Real content is used throughout, not placeholder text
- [ ] The design works at 375px wide (iPhone SE) and 1440px wide

## Source
- Repository: https://github.com/anthropics/skills
- Stars: 180,069 | Author: Anthropic
