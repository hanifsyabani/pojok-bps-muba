# AGENTS.md

## Project Overview

This project is a frontend prototype website for Badan Pusat Statistik (BPS)
Kabupaten Musi Banyuasin.

The prototype is prepared for stakeholder review before backend development.
It should look and feel like a real institutional website, but all data must be
dummy/mock data.

## Current Phase

Prototype / frontend only.

Focus on:

- UI/UX
- Responsive layout
- Navigation
- Interactive frontend components
- Prototype forms
- Prototype admin dashboard
- Mock data
- Loading, empty, and error states where useful

Do not implement:

- Backend API features
- Database
- Authentication
- Authorization
- Real file upload/storage
- Real data submission
- Production-only infrastructure

The `app/api` package exists from the starter template. Do not expand it unless
backend work is explicitly requested.

## Current Stack

Follow the stack that exists in `README.md`:

- Bun workspace
- Svelte + Vite
- TypeScript
- Tailwind CSS 4 via the Vite plugin
- Shared BPS theme tokens in `app/web/src/app.css`

Do not migrate to SvelteKit, shadcn-svelte, or ECharts unless that
migration is explicitly requested. Do not add dependencies for work that can be
handled with the current stack.

Use Tailwind utilities for page and component styling. Keep shared theme tokens
and reusable utilities in `app/web/src/app.css`.

## Website Scope

The frontend prototype should cover these sections:

```text
BPS Kabupaten Musi Banyuasin
|-- Beranda
|-- Profil BPS
|-- Statistik & Data
|-- Layanan
|-- Perbaikan Data Desil
|-- Kegiatan
`-- Admin Dashboard
```

Each navigation item has a separate client-side route and page component.
`App.svelte` owns routing state, while `nav-bottom.svelte` renders the active page.

## Mock Data

Centralize prototype data in:

```text
app/web/src/constants/
```

Do not scatter large mock datasets directly inside Svelte components.
Keep mock data strongly typed.
Keep frontend type definitions and component props in `app/web/src/types/`.
Mutable form state must use copies of constant templates.

All numbers, submissions, kegiatan, and service examples must be treated as
prototype data. Do not present dummy values as official BPS statistics.

Use labels such as:

```text
Data contoh
Data contoh untuk kebutuhan prototype
Bukan statistik resmi
```

## Color System

Use the current BPS palette from `app/web/src/app.css`:

```text
Sky Blue  #2D95CA
Green     #75B547
Orange    #E28939
Ink       #102033
Base      #F8FAFC
Surface   #FFFFFF
Text      #334155
```

Do not hardcode one-off colors inside components unless there is a clear local
reason. Prefer CSS variables.

## UI Direction

The website should feel like a modern Indonesian government institution site:

- Professional
- Clean
- Trustworthy
- Data-oriented
- Accessible
- Responsive

Avoid:

- Startup-style marketing pages
- Excessive gradients
- Glassmorphism
- Decorative animation
- Rounded cards everywhere
- Claims that sound official but have not been verified

Content and data should stay visually primary.

## Forms

Forms should have:

- Clear labels
- Required indicators
- Validation messages or validation feedback
- Focus states
- Success states
- Disabled/loading states

For Perbaikan Data Desil, file upload must remain frontend-only:

- Simulate file selection and upload progress locally.
- Allow removing a selected file.
- Validate PDF, JPG, JPEG, and PNG.
- Do not store files or send them to a server.

## Admin Dashboard

The admin dashboard is a UI prototype only. It can show:

- KPI cards
- Pengajuan Desil table
- Search
- Status filter
- Status badges
- Pagination UI
- Detail buttons that simulate interaction

Do not add real authentication or authorization.

## Accessibility

Use semantic HTML where practical:

```html
<header>
<nav>
<main>
<section>
<article>
<footer>
```

Use buttons for actions and links for navigation. Form inputs must have visible
labels. Do not rely only on color to communicate status.

## Definition of Done

A frontend change is complete when:

- The UI works with mock data.
- It is responsive.
- TypeScript passes.
- Important empty/loading/error states are considered when relevant.
- No unnecessary dependency is added.
- Existing prototype flows are not unintentionally broken.

## Most Important Rule

This is a prototype for presentation to BPS Kabupaten Musi Banyuasin.

Prioritize:

```text
Visual quality -> User experience -> Realistic interaction -> Responsive design -> Maintainable code
```

Do not spend time on backend infrastructure until the frontend prototype has
been reviewed and approved.
