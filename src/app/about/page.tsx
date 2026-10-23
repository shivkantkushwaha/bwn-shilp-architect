import { Metadata } from 'next';
import Image from 'next/image';
import { siteConfig } from '@/data/site';
import { Container } from '@/components/Container';
import { SheetLabel } from '@/components/SheetLabel';
import { Wordmark } from '@/components/Wordmark';
import { Button } from '@/components/Button';
import { ElevationDrawing } from '@/components/drawings/ElevationDrawing';
import { MapPinIcon, ClockIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'About Bhawanshilp Architect & Ar. Mayank Tiwari',
  description:
    'Learn about Bhawanshilp Architect, a multidisciplinary architecture and design consultancy based in Kanpur led by Ar. Mayank Tiwari. Providing complete planning and on-site supervision.',
};

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-16 lg:py-20 pb-28 lg:pb-20 bg-paper">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <SheetLabel className="block mb-2">
            SHEET SET 04 // PRACTICE PROFILE
          </SheetLabel>
          <div className="flex flex-col gap-1.5 mb-3 sm:mb-4">
            <h1 className="font-display text-3xl sm:text-5xl font-light text-ink">
              About the Firm
            </h1>
            <span className="font-devanagari text-lg sm:text-xl text-ink-soft">
              {siteConfig.nameHindi}
            </span>
          </div>
          <p className="font-body text-ink-soft text-sm sm:text-lg leading-relaxed">
            Bhawanshilp Architect is a multidisciplinary architecture and design consultancy operating from Hanspuram, Naubasta in Kanpur, Uttar Pradesh.
          </p>
        </div>

        {/* Section 1: Firm Overview & Ar. Mayank Tiwari (Strictly factual, no invented bio) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start py-8 border-t border-hairline">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <SheetLabel className="block mb-2">PRACTICE LEADERSHIP</SheetLabel>
              <h2 className="font-display text-2xl sm:text-3xl font-light text-ink mb-3">
                Led by Ar. Mayank Tiwari
              </h2>
            </div>

            <div className="space-y-4 font-body text-ink-soft text-base leading-relaxed">
              <p>
                Bhawanshilp Architect is established as a comprehensive design practice that bridges the gap between architectural concept and tangible on-site construction. Under the direction of <strong>Ar. Mayank Tiwari</strong>, the firm provides architectural planning, structural calculations, interior detailing, landscaping, and master planning.
              </p>
              <p>
                A core principle of the consultancy is direct involvement. Rather than treating design as an isolated studio exercise, Ar. Mayank Tiwari and team supervise projects on the ground from excavation and foundation footings through to final carpentry and finish handover.
              </p>
              <p>
                The firm serves families building individual residences, commercial and shop owners, healthcare and institutional developers, and municipal township planners across Kanpur, Lucknow, Prayagraj, and New Delhi.
              </p>
            </div>

            {/* Disciplines grid */}
            <div className="pt-4 border-t border-hairline grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3 border border-hairline bg-paper-deep">
                <span className="text-brass block text-[10px]">DISCIPLINE 01</span>
                <span className="text-ink font-medium">Architecture</span>
              </div>
              <div className="p-3 border border-hairline bg-paper-deep">
                <span className="text-brass block text-[10px]">DISCIPLINE 02</span>
                <span className="text-ink font-medium">Structural</span>
              </div>
              <div className="p-3 border border-hairline bg-paper-deep">
                <span className="text-brass block text-[10px]">DISCIPLINE 03</span>
                <span className="text-ink font-medium">Interiors</span>
              </div>
              <div className="p-3 border border-hairline bg-paper-deep">
                <span className="text-brass block text-[10px]">DISCIPLINE 04</span>
                <span className="text-ink font-medium">Landscaping</span>
              </div>
              <div className="p-3 border border-hairline bg-paper-deep">
                <span className="text-brass block text-[10px]">DISCIPLINE 05</span>
                <span className="text-ink font-medium">Urban Planning</span>
              </div>
              <div className="p-3 border border-hairline bg-paper-deep">
                <span className="text-brass block text-[10px]">DISCIPLINE 06</span>
                <span className="text-ink font-medium">Site Supervision</span>
              </div>
            </div>
          </div>

          {/* Right: Wordmark Line Art & Drawing Plate (No portrait, honoring brief) */}
          <div className="lg:col-span-5">
            <div className="border border-hairline bg-paper-deep p-6">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-hairline font-mono text-[10px] text-ink-soft uppercase tracking-wider">
                <span>INSIGNIA // STUDIO IDENTIFIER</span>
                <span className="text-brass">EST. KANPUR</span>
              </div>

              <div className="bg-ink text-paper p-8 text-center my-4 border border-hairline">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 border border-brass/60 flex items-center justify-center font-display text-2xl text-brass">
                    B
                  </div>
                </div>
                <Wordmark size="large" className="text-paper items-center" />
                <span className="font-devanagari text-xs text-paper/70 tracking-wide mt-2 block">
                  {siteConfig.nameHindi}
                </span>
              </div>

              <div className="font-mono text-xs text-ink-soft space-y-2 mt-4 pt-4 border-t border-hairline">
                <div className="flex justify-between">
                  <span>Google Rating:</span>
                  <span className="text-ink font-medium">{siteConfig.google.rating} / 5.0 ({siteConfig.google.reviews} reviews)</span>
                </div>
                <div className="flex justify-between">
                  <span>Operating Base:</span>
                  <span className="text-ink font-medium">Kanpur, UP</span>
                </div>
                <div className="flex justify-between">
                  <span>Contact:</span>
                  <span className="text-ink font-medium">{siteConfig.phoneDisplay}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Studio Location and Visit */}
        <div className="mt-16 pt-12 border-t border-hairline grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-6 space-y-4">
            <SheetLabel className="block mb-2">PHYSICAL OFFICE & HOURS</SheetLabel>
            <h2 className="font-display text-2xl sm:text-3xl font-light text-ink">
              Office in Hanspuram, Naubasta
            </h2>
            <p className="font-body text-ink-soft text-sm sm:text-base leading-relaxed">
              Our office is located in Naubasta, easily accessible for clients across Kanpur Nagar, Kanpur Dehat, and surrounding transit corridors.
            </p>

            <div className="border border-hairline bg-paper-deep p-5 font-mono text-xs space-y-3">
              <div className="flex items-start gap-2">
                <MapPinIcon size={16} className="text-brass mt-0.5 shrink-0" />
                <div>
                  <span className="text-ink font-medium block">{siteConfig.address.full}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-hairline">
                <ClockIcon size={16} className="text-brass shrink-0" />
                <span className="text-ink">{siteConfig.hours.display}</span>
              </div>
            </div>

            <div className="pt-2 flex gap-4">
              <Button href={siteConfig.google.mapsUrl} external variant="outline">
                Get Directions on Google Maps
              </Button>
              <Button href="/contact" variant="primary">
                Book an Office Visit
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-[16/10] border border-hairline overflow-hidden">
            <Image
              src="/images/support/drawing-desk.jpg"
              alt="Architectural drafting desk with blueprint drawings, scale ruler, and design sketches"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Architectural Elevation Drawing Plate */}
        <div className="mt-16 pt-12 border-t border-hairline">
          <div className="max-w-4xl mx-auto">
            <ElevationDrawing />
          </div>
        </div>
      </Container>
    </div>
  );
}
