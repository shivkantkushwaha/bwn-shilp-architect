# Mobile Audit: Bhawanshilp Architect

Conducted on production build (`next build && next start` at `http://localhost:3000`) using Chrome headless CDP with mobile touch emulation, simulated viewports (320×568, 360×800, 390×844, 430×932, 768×1024, 844×390 landscape, 1024×768, 1440×900), and synthetic touch tracing.

Before-screenshots saved to `audit/before/`:
- `audit/before/home.png`
- `audit/before/projects.png`
- `audit/before/project-detail.png`
- `audit/before/services.png`
- `audit/before/about.png`
- `audit/before/contact.png`
- `audit/before/contact-step1.png`
- `audit/before/contact-step2.png`
- `audit/before/contact-step3.png`
- `audit/before/contact-success.png`
- `audit/before/not-found.png`
- `audit/before/mobile-menu.png`
- `audit/before/desktop-1440-home.png` (Desktop baseline verification)
- `audit/before/desktop-1024-home.png` (Desktop 1024px baseline verification)

---

## What Already Works

1. **Rock-Solid Foundation:** Next.js 16 App Router, TypeScript, and Tailwind CSS 4 build cleanly with 0 type errors and 0 lint warnings.
2. **Typography Quality:** Fraunces, Hanken Grotesk, IBM Plex Mono, and Noto Serif Devanagari render cleanly without FOIT, using Next.js font optimization.
3. **Palette & Contrast:** The "Drawing sheet" aesthetic (paper `#F4EFE6`, ink `#14120F`, brass `#B98A2E` and brass-deep `#7E5C14`) provides excellent contrast and clear hierarchy.
4. **Fast Static Generation:** All 19 routes prerender statically or with partial prerendering; initial response is under 50ms locally.
5. **Architectural SVG Line Drawings:** Front elevation, ground floor plan, and building section render sharp vector lines at all DPIs.
6. **Functional 3-Step Flow:** The consultation form validates Indian mobile numbers, handles step progression, and builds a rich WhatsApp link.

---

## Detailed Audit Findings

| # | Route | Viewport | Issue | Severity | Root Cause | Planned Fix |
|---|---|---|---|---|---|---|
| 1 | Global | All mobile | Missing `viewport-fit=cover` and `theme-color` meta tags | **Blocker** | `viewport` export in `layout.tsx` is missing; iOS Safari status bar and home indicator areas appear disconnected from the site palette | Add `export const viewport: Viewport` with `width: 'device-width'`, `initialScale: 1`, `viewportFit: 'cover'`, and `themeColor: '#14120F'` |
| 2 | `/contact` | All mobile | Form input font-size is 14px (`text-sm`), triggering iOS Safari auto-zoom on focus | **Blocker** | CSS applies 14px to inputs; iOS Safari automatically zooms the entire viewport when focusing inputs < 16px, breaking layout and requiring manual pinch-out | Update all mobile form inputs to `text-base` (16px) on mobile with `md:text-sm` on desktop, add `inputMode`, `autoComplete`, and `enterKeyHint` |
| 3 | Global | All mobile | Fixed mobile bottom bar overlaps page content and footer actions | **Blocker** | Content containers lack sufficient bottom padding (`pb-28` required); on `/contact` the bottom bar pushes into view over keyboard | Increase bottom page padding to `pb-32` on mobile; add keyboard detection hook to hide bottom bar when input is focused |
| 4 | `/` | 390×844 | Hero primary CTAs and value proposition pushed below the fold on standard phone heights | **Major** | Hero padding is excessively tall (`pt-8 pb-16` with huge gaps); headline `text-4xl` with loose margins pushes buttons down to ~550px+ | Optimize mobile hero vertical cadence: compact header (`h-14`), tight margin scale, and streamlined spacing so rating chip, headline, subhead, and CTAs sit within the first 650px |
| 5 | Global | All mobile | Sticky header is too tall (`h-20` / 80px), occupying 10% of mobile screen real estate | **Major** | Fixed `h-20` across all breakpoints | Reduce mobile header to `h-14` (56px) on mobile and `sm:h-16 lg:h-20` on desktop |
| 6 | Global | All mobile | Mobile navigation menu is an unstyled dropdown instead of an app-like full-screen sheet | **Major** | Drawer is an absolute div below header with abrupt display toggle; lacks smooth slide transition, backdrop blur, safe-area padding | Implement native-style slide-down/fade drawer with full viewport height (`h-[calc(100dvh-3.5rem)]`), backdrop blur, touch-friendly tap targets, and smooth CSS transitions |
| 7 | `/` | All mobile | Selected Work section is a long vertical stack of 6 heavy cards instead of a swipeable carousel | **Major** | Grid defaults to single column vertical stack on mobile | Transform mobile Selected Work into a fluid horizontal swipe carousel with CSS scroll-snap (`snap-x snap-mandatory`), peek-through card edges, and active pill indicators |
| 8 | `/projects` | All mobile | Category filters are stacked wrap buttons that push portfolio content down | **Major** | Filter buttons wrap into multiple lines on small viewports | Convert mobile category filters into a sticky horizontal scroll bar with scroll-snap and active brass indicator |
| 9 | `/projects/[slug]` | All mobile | Missing persistent bottom CTA in the one-thumb zone on mobile | **Major** | "Discuss a similar project" CTA is buried at the bottom of a long scroll | Add sticky bottom CTA trigger on project detail pages linking to consultation or WhatsApp |
| 10 | `/contact` | All mobile | Embedded Google Maps iframe captures scroll gestures, trapping the user's thumb | **Major** | `iframe` receives pointer events directly while user attempts to scroll past | Add tap-to-interact overlay or `pointer-events-none` with "Tap to activate map" trigger and clear "Get directions" button |
| 11 | Global | All mobile | Multiple interactive tap targets are smaller than 44×44px | **Minor** | Text-only links (wordmark, social links 18px, "Explore drawing", footer links) lack min-height padding | Apply `min-h-[44px] min-w-[44px]` touch targets, with invisible touch padding where visual layout requires compact text |
| 12 | Global | All mobile | Hover effects stick on touch devices after tapping | **Minor** | Tailwind `hover:` classes trigger on tap on mobile touch screens | Wrap hover states in `@media (hover: hover)` or use `active:` states with `touch-action: manipulation` and `-webkit-tap-highlight-color: transparent` |
| 13 | `/contact` | All mobile | Form steps lack motion and feedback during transitions | **Minor** | Instant step replacement without sliding animation or visual progression | Add sliding step transition (`transform translate-x` with 200ms ease) and automatic scroll-to-top on step change |
| 14 | Global | All mobile | Potential layout jump when browser navigation bar collapses/expands | **Minor** | Uses `h-full` or standard percentages without `dvh`/`svh` units | Utilize `dvh` (dynamic viewport height) for full-screen sheet elements and drawer containers |
| 15 | Global | All mobile | Missing PWA web app manifest and Apple touch icon for "Add to Home Screen" | **Minor** | No `manifest.json` or Apple icon link in `<head>` | Add `src/app/manifest.ts` and Apple touch icon in `src/app/icon.svg` / apple-icon configuration |

---
