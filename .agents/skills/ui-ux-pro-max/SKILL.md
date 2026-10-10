---
name: ui-ux-pro-max
description: AI-powered design intelligence with 79 UI styles, 192 color palettes, 74 font pairings, 119 UX guidelines, and 25 chart types across 22 tech stacks. Use when designing UI, choosing color palettes, typography, or creating any frontend interface.
source: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
version: "2.13.0"
---

# UI/UX Pro Max

Design intelligence for building professional UI/UX. Activate this skill whenever creating or improving any visual interface.

## 79 UI Styles Available

### Dark & Futuristic
- **Glassmorphism** — Frosted glass panels, blur backdrops, translucent surfaces
- **Neomorphism** — Soft 3D shadows, embossed elements, monochromatic palette
- **Cyberpunk** — Neon accents, dark backgrounds, glitch effects, grid patterns
- **Dark Dashboard** — High-contrast dark UI, sidebar navigation, data-heavy layouts

### Light & Minimal
- **Minimalism** — Whitespace-first, single accent color, clean typography
- **Swiss/International** — Grid-based, Helvetica-era typography, structured layout
- **Brutalism** — Raw HTML aesthetic, bold borders, harsh contrasts, unconventional layout
- **Claymorphism** — Puffy 3D shapes, soft gradients, rounded everything

### Premium & Luxury
- **Luxury/Editorial** — Gold accents, serif typography, generous whitespace
- **Glassmorphism Premium** — Vibrant gradient fills behind frosted panels
- **Corporate Premium** — Navy/slate palette, professional, trustworthy

### Playful & Creative
- **Memphis Design** — Geometric shapes, primary colors, pattern fills
- **Retro/Vintage** — Warm tones, distressed textures, nostalgic type
- **Y2K** — Chrome effects, bubbly text, early 2000s digital aesthetic
- **Kawaii** — Pastel colors, rounded shapes, cute icons

## 192 Color Palettes by Industry

### Government / Public Sector
```css
/* Indonesian Government Palette */
--primary: #C8102E;    /* Merah Indonesia */
--secondary: #FFFFFF;  /* Putih */
--accent: #004B8D;     /* Biru Negara */
--bg-dark: #0D1117;
--text: #F0F2F5;

/* BPS Data Portal */
--primary: #1B4F8A;
--secondary: #E8F0FE;
--accent: #D94F30;
--success: #1E8A4A;
--warning: #F0B429;
```

### Statistics / Data Viz
```css
/* Data Science Dark */
--bg: #0F1117;
--surface: #1A1F2E;
--accent-blue: #60A5FA;
--accent-green: #4ADE80;
--accent-orange: #FB923C;
--accent-purple: #A78BFA;
--chart-1: #3B82F6;
--chart-2: #10B981;
--chart-3: #F59E0B;
--chart-4: #EF4444;
--chart-5: #8B5CF6;
```

## 74 Font Pairings

### Government / Official
| Display | Body | Use case |
|---------|------|----------|
| Playfair Display | Source Sans Pro | Official reports |
| Merriweather | Open Sans | Public documents |
| EB Garamond | Lato | Academic/research |

### Data & Tech
| Display | Body | Use case |
|---------|------|----------|
| Inter | Inter | Modern data app |
| Space Grotesk | DM Sans | Tech startup |
| IBM Plex Sans | IBM Plex Mono | Technical dashboard |
| Sora | Noto Sans | Modern SaaS |

### Recommended for BPS/Government Portal
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;700&display=swap');

--font-display: 'Playfair Display', Georgia, serif;
--font-body: 'Inter', system-ui, sans-serif;
--font-mono: 'IBM Plex Mono', monospace;
```

## 119 UX Guidelines

### Navigation Patterns
- **Fixed top navbar** with blur backdrop for data portals
- **Sidebar navigation** for admin/dashboard interfaces
- **Breadcrumbs** required for deep hierarchies (3+ levels)
- **Mobile hamburger** menu threshold: < 768px

### Data Display
- Use **skeleton loaders** instead of spinners for content
- **Empty states** must have: illustration + message + CTA
- **Pagination** vs **infinite scroll**: use pagination for structured data
- **Tables**: sticky header required for > 8 rows
- **Charts**: always include accessible text alternative

### Forms Best Practices
- Label above field (never placeholder as label)
- Inline validation, not submit-time validation
- Required fields: mark required, not optional
- Max form width: 640px for single-column forms
- **File upload**: show drag-and-drop + click fallback

### Accessibility (WCAG 2.1 AA)
- Minimum contrast: 4.5:1 for normal text, 3:1 for large text
- Focus indicators: 3px outline, 3px offset
- Touch targets: minimum 44×44px
- `aria-live` for dynamic content updates

## 25 Chart Types

| Chart | Best for | Library |
|-------|----------|---------|
| Line | Trends over time | Chart.js, Recharts |
| Bar | Comparisons | Chart.js |
| Pie/Donut | Part-to-whole (max 5 slices) | Chart.js |
| Scatter | Correlation | D3, Plotly |
| Heatmap | Matrix data | D3 |
| Treemap | Hierarchical quantities | D3 |
| Choropleth | Geographic data | Leaflet + D3 |
| Sankey | Flow/relationships | D3 |

## 22 Tech Stacks

- **Svelte/SvelteKit** — Recommended for this project
- React, Vue, Angular, Next.js, Nuxt
- Vanilla HTML/CSS/JS
- Tailwind CSS, Vanilla CSS, SCSS
- Chart.js, D3.js, Recharts, Plotly

## Quick Design Checklist

Before delivering any UI:
- [ ] Color contrast passes WCAG 2.1 AA
- [ ] Mobile responsive (320px minimum)
- [ ] Hover/focus states on all interactive elements
- [ ] Loading states defined
- [ ] Empty states defined
- [ ] Error states defined
- [ ] Dark mode compatible (if applicable)
- [ ] Typography scale is consistent
- [ ] Spacing uses consistent scale (4px, 8px, 12px, 16px, 24px, 32px, 48px)

## Source
- Repository: https://github.com/nextlevelbuilder/ui-ux-pro-max-skill
- Stars: 133,871 | Version: 2.13.0
