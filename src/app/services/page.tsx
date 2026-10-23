import { Metadata } from 'next';
import Image from 'next/image';
import { services } from '@/data/services';
import { Container } from '@/components/Container';
import { SheetLabel } from '@/components/SheetLabel';
import { Button } from '@/components/Button';
import { SectionDrawing } from '@/components/drawings/SectionDrawing';

export const metadata: Metadata = {
  title: 'Architectural & Engineering Services',
  description:
    'Complete scope of architectural planning, interior design, structural engineering, urban master planning, landscaping, and project supervision in Kanpur by Bhawanshilp Architect.',
};

// Supporting details for what client actually receives for each service (grounded, no prices/timelines)
const SERVICE_DELIVERABLES: Record<string, string[]> = {
  'architectural-planning': [
    'Concept space layouts and zoning options',
    'Dimensioned 2D floor plans, elevations, and building sections',
    '3D perspective views of exterior facades',
    'Door, window, and fenestration schedules',
    'Municipal submission drawings formatted for regulatory approval',
  ],
  'interior-design': [
    'Furniture layout plans and circulation pathways',
    'Flooring layout, material specifications, and tile patterns',
    'False ceiling drawings and electrical / lighting fixture plans',
    'Custom joinery, cabinetry, and wardrobe working details',
    'Curated paint palettes, wall finishes, and surface textures',
  ],
  'structural-design': [
    'Soil test analysis and foundation footing design',
    'Reinforced concrete (RCC) column and beam layouts',
    'Slab reinforcement details and load-bearing calculations',
    'Structural steel framing details where required',
    'Bar bending schedules and on-site rebar inspection guidelines',
  ],
  'urban-development-and-planning': [
    'Topographical site analysis and contour layout planning',
    'Road hierarchy, turning radiuses, and vehicular circulation networks',
    'Plot demarcation and zoning subdivision plans',
    'Stormwater drainage routes and utility easement corridors',
    'Green buffer zones, civic amenities, and open space distribution',
  ],
  'landscaping': [
    'Hardscape layout including pathways, driveways, and retaining curbs',
    'Native plant, shrub, and tree selection suited to local soil and climate',
    'Courtyard planting, planter ledge details, and vertical green elements',
    'Outdoor lighting conduit placement and accent luminaire points',
    'Sub-surface irrigation planning and rainwater percolation zones',
  ],
  'project-supervision': [
    'Periodic on-site milestone inspections during construction',
    'Verification of foundation excavation and column reinforcement placement',
    'Checking casting alignment before and after concrete pours',
    'Brickwork alignment, lintel placement, and waterproofing checks',
    'Direct coordination with site supervisors to resolve drawing ambiguities',
  ],
};

export default function ServicesPage() {
  return (
    <div className="py-8 sm:py-16 lg:py-20 pb-28 lg:pb-20 bg-paper">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-16">
          <SheetLabel className="block mb-2">
            SHEET SET 03 // DISCIPLINARY SCOPE
          </SheetLabel>
          <h1 className="font-display text-3xl sm:text-5xl font-light text-ink mb-3 sm:mb-4">
            Our Services
          </h1>
          <p className="font-body text-ink-soft text-sm sm:text-lg leading-relaxed">
            Bhawanshilp Architect is a multidisciplinary practice. We unite spatial planning, engineering integrity, and construction oversight under one accountable studio.
          </p>
        </div>

        {/* 6 Services Deep-Dive */}
        <div className="space-y-16">
          {services.map((service) => {
            const deliverables = SERVICE_DELIVERABLES[service.slug] || [];

            return (
              <section
                key={service.id}
                id={service.slug}
                className="border border-hairline bg-paper-deep p-6 sm:p-10 scroll-mt-28"
              >
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-hairline font-mono text-xs">
                  <span className="text-brass font-bold text-sm">{service.number} &bull; SERVICE SPECIFICATION</span>
                  <span className="text-ink-soft uppercase hidden sm:inline">KANPUR CONSULTANCY</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-6">
                    <h2 className="font-display text-3xl font-light text-ink mb-4">
                      {service.title}
                    </h2>
                    <p className="font-body text-ink-soft text-base leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="pt-2">
                      <Button
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        variant="primary"
                      >
                        Inquire About This Service
                      </Button>
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-paper border border-hairline p-5 sm:p-6">
                    <span className="font-mono text-xs uppercase tracking-wider text-ink block mb-4 pb-2 border-b border-hairline">
                      What You Receive
                    </span>
                    <ul className="space-y-3 font-body text-sm text-ink-soft">
                      {deliverables.map((item, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5">
                          <span className="font-mono text-xs text-brass font-medium mt-0.5">
                            &bull;
                          </span>
                          <span className="leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Supporting Visuals: Architectural Cross-Section & Interior Photo */}
        <div className="mt-20 pt-16 border-t border-hairline">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <SheetLabel className="block mb-2">TECHNICAL INTEGRATION</SheetLabel>
            <h2 className="font-display text-3xl font-light text-ink">
              From Schematic Drawing to Physical Assembly
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 border border-hairline bg-paper-deep p-3 sm:p-4 overflow-x-auto no-scrollbar">
              <div className="min-w-[540px] sm:min-w-0">
                <SectionDrawing />
              </div>
            </div>
            <div className="lg:col-span-5 relative aspect-[4/5] border border-hairline overflow-hidden">
              <Image
                src="/images/support/interior-living.jpg"
                alt="Contemporary interior living space designed with natural light, warm timber, and neutral finishes"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Consultation CTA */}
        <div className="mt-16 text-center border border-hairline bg-paper-deep p-8 sm:p-12">
          <h2 className="font-display text-3xl font-light text-ink mb-3">
            Have a project in mind?
          </h2>
          <p className="font-body text-ink-soft text-sm sm:text-base max-w-xl mx-auto mb-6">
            Tell us about your plot or property in Kanpur, Lucknow, Prayagraj, or New Delhi. We will advise on the appropriate disciplinary scope.
          </p>
          <Button href="/contact" variant="primary">
            Book a consultation
          </Button>
        </div>
      </Container>
    </div>
  );
}
