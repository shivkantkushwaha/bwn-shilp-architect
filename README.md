# Bhawanshilp Architect — Website Preview

A complete, high-fidelity frontend website built for **Bhawanshilp Architect** (भवनशिल्प आर्किटेक्ट्स), an architecture and design consultancy based in Kanpur, Uttar Pradesh led by Ar. Mayank Tiwari.

Built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS 4**.

---

## Design Direction: "The Drawing Sheet"

The site is styled around the aesthetic of architectural drawing sheets:
- **Palette:** Warm paper (`#F4EFE6`), deep paper (`#EAE3D6`), ink (`#14120F`), soft ink (`#4A453D`), hairline rules, brass accents (`#B98A2E` and AA contrast `#7E5C14`), and WhatsApp green (`#25D366`).
- **Typography (`next/font/google`):**
  - **Fraunces** for editorial display headings.
  - **Hanken Grotesk** for clean UI and body text.
  - **IBM Plex Mono** for sheet annotations, dimensions, and datum labels.
  - **Noto Serif Devanagari** for the Hindi firm name (भवनशिल्प आर्किटेक्ट्स).
- **Original Architectural Drawings in Code:** Front elevation, ground floor plan, and longitudinal cross-section SVG components drawn directly in code with dimension ticks, datum marks, and structural callouts.

---

## Quick Start (pnpm only)

This project strictly uses **pnpm**. Do not run `npm` or `yarn`.

```bash
# Install dependencies
pnpm install

# Start local development server (http://localhost:3000)
pnpm dev

# Run linter
pnpm lint

# Build for production
pnpm build

# Start production server
pnpm start
```

---

## Route Overview

- `/`: Home (Asymmetric hero, Google review rating badge, selected work editorial grid, numbered services list, 5-step process sequence, 3 factual advantages, dark rating band, areas served, closing CTA band, title-block footer).
- `/projects`: Projects archive with client-side category filtering (Residential, Commercial, Institutional, Urban).
- `/projects/[slug]`: Project detail page with high-resolution plates, observable architectural features, floor plan drawing, next/previous project navigation, and "Discuss a similar project" CTA prefilling the enquiry.
- `/services`: The 6 architectural services with honest deliverable breakdowns and architectural cross-section visuals.
- `/about`: Practice profile of Ar. Mayank Tiwari, multidisciplinary scope, studio location, and wordmark line-art emblem.
- `/contact`: Interactive 3-step consultation enquiry form, direct phone/WhatsApp links, office hours, and desaturated keyless Google Maps iframe.
- `/_not-found`: Architectural sheet-styled 404 page with longitudinal section drawing.
- `/robots.txt`: Managed dynamically via `src/app/robots.ts` using `siteConfig.noindex`.

---

## How to Edit Business Data

All content lives in typed configuration files under `src/data/`:

| File | Purpose |
| :--- | :--- |
| `src/data/site.ts` | Business name, architect name, address, phone, email, WhatsApp, hours, Google rating, social links, areas served, and `noindex` preview flag. |
| `src/data/services.ts` | The six official services with descriptions and numbering. |
| `src/data/process.ts` | The 5-step project workflow (Talk, Plan, Design, Detail and approve, Build with supervision). |
| `src/data/projects.ts` | All project records: slug, title, category, images, alt text, summary, and features. |
| `src/data/testimonials.ts` | Client testimonials (renders only when populated; shipped as an empty array). |
| `src/data/image-credits.ts` | Attribution registry for Unsplash photographers and custom SVG line drawings. |

---

## How to Connect a Real Backend

The consultation form in `src/components/EnquiryForm.tsx` submits via `src/lib/enquiry.ts`.

To wire up a database, CRM, or email service (such as Resend, Supabase, or AWS SES):
1. Open `src/lib/enquiry.ts`.
2. Replace the simulated `setTimeout` in `submitEnquiry()` with a `fetch()` call to your API route (e.g., `/api/enquiry`).
3. The success screen automatically formats all entered specifications and generates a prefilled `wa.me` message so visitors can send the enquiry directly to Ar. Mayank Tiwari over WhatsApp as well.

---

## Replace Placeholders Checklist

When the client provides real 3D renders, site photos, or drawings, follow this checklist:

1. **Brand Logo:**
   - Drop the firm's real logo file at `public/images/brand/logo.png`.
   - The app will automatically render this image or fall back to the vector wordmark component.

2. **Project Renders (`public/images/projects/`):**
   - Replace `modern-family-residence.jpg` with a real residential project render.
   - Replace `contemporary-villa.jpg` with a real villa or courtyard residence render.
   - Replace `urban-apartment-complex.jpg` with real multi-storey apartment photos.
   - Replace `commercial-retail-block.jpg` with real commercial/shop building photos.
   - Replace `hospital-and-clinic.jpg` with real healthcare/clinic project photos.
   - Replace `institutional-campus.jpg` with real institutional or school building renders.
   - Replace `township-master-plan.jpg` with real master plan graphics.
   - Replace `neoclassical-residence.jpg` with real classical facade photos.

3. **Update Data in `src/data/projects.ts`:**
   - Change `placeholder: true` to `placeholder: false` for real client projects.
   - Update `title`, `summary`, and `features` with the actual project specifications.
   - Optionally populate `location` (e.g. "Swaroop Nagar, Kanpur"), `area` (e.g. "3,500 sq ft"), and `year`.

4. **Supporting Photos (`public/images/support/`):**
   - Replace `construction-site.jpg` with a photo of Ar. Mayank Tiwari supervising on an active site.
   - Replace `drawing-desk.jpg` with an actual photo of the Hanspuram studio office.
   - Replace `interior-living.jpg` with a finished interior photo designed by the firm.

---

## Deploying to Vercel

1. Push this repository to GitHub or GitLab.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework Preset: **Next.js**.
4. Root Directory: `./` (or leave default).
5. Build Command: `pnpm build`.
6. Install Command: `pnpm install`.
7. Once deployed, change `noindex: false` in `src/data/site.ts` when ready for production search engine indexing.
