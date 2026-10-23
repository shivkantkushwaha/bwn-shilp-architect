import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects, getProjectBySlug, getAdjacentProjects } from '@/data/projects';
import { Container } from '@/components/Container';
import { SheetLabel } from '@/components/SheetLabel';
import { Button } from '@/components/Button';
import { ProjectImage } from '@/components/ProjectImage';
import { FloorPlanDrawing } from '@/components/drawings/FloorPlanDrawing';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';
import { ChevronLeftIcon } from '@/components/icons/ChevronLeftIcon';
import { ChevronRightIcon } from '@/components/icons/ChevronRightIcon';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} — ${project.category} Design`,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(slug);

  // Map category to a prefill project type for EnquiryForm
  let prefillType = 'House';
  if (project.category === 'Residential') prefillType = 'House';
  else if (project.category === 'Commercial') prefillType = 'Shop or commercial';
  else if (project.category === 'Institutional') prefillType = 'Multi-storey or apartment building';
  else if (project.category === 'Urban') prefillType = 'Landscape or urban planning';

  return (
    <div className="py-6 sm:py-16 lg:py-20 pb-40 lg:pb-20 bg-paper">
      <Container>
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between pb-4 sm:pb-6 mb-6 sm:mb-8 border-b border-hairline font-mono text-xs">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-ink-soft hover:text-ink transition-colors uppercase min-h-[44px]"
          >
            <ChevronLeftIcon size={14} />
            <span>All Projects</span>
          </Link>
          <SheetLabel className="hidden sm:inline">
            SHEET PRJ // {project.slug.toUpperCase()}
          </SheetLabel>
        </div>

        {/* Title and Category Header */}
        <div className="max-w-4xl mb-6 sm:mb-8">
          <div className="inline-block border border-hairline bg-paper-deep px-3 py-1 font-mono text-xs uppercase tracking-wider text-brass-deep mb-3 sm:mb-4">
            {project.category}
          </div>
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light text-ink tracking-tight mb-3 sm:mb-4">
            {project.title}
          </h1>
          <p className="font-body text-ink-soft text-base sm:text-xl leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Large Featured Project Image */}
        <div className="relative border border-hairline bg-paper-deep p-2 sm:p-4 mb-8 sm:mb-12">
          <div className="flex items-center justify-between pb-2 mb-2 sm:mb-3 border-b border-hairline font-mono text-[10px] text-ink-soft uppercase tracking-wider">
            <span>DRAWING PLATE // PERSPECTIVE VIEW</span>
            <span>BHAWANSHILP ARCHITECT</span>
          </div>

          <div className="relative aspect-[16/10] sm:aspect-[21/9] overflow-hidden border border-hairline">
            <ProjectImage
              src={project.images[0]}
              alt={project.alt}
              title={project.title}
              aspectRatio="16/9"
              priority
              className="w-full h-full"
            />
          </div>

          <div className="mt-2.5 sm:mt-3 flex items-center justify-between font-mono text-[10px] sm:text-[11px] text-ink-soft">
            <span className="truncate pr-2">{project.alt}</span>
            {project.placeholder && <span className="shrink-0">CONCEPT</span>}
          </div>
        </div>

        {/* Two-Column Specification and Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-6 sm:py-8 border-t border-hairline">
          {/* Left Column: Design features you can actually see */}
          <div className="lg:col-span-7">
            <SheetLabel className="block mb-2 sm:mb-3">
              DESIGN SPECIFICATION & OBSERVATIONS
            </SheetLabel>
            <h2 className="font-display text-2xl sm:text-3xl font-light text-ink mb-3 sm:mb-4">
              Observable Architectural Elements
            </h2>
            <p className="font-body text-ink-soft text-sm sm:text-base leading-relaxed mb-6">
              The project is composed with careful attention to climatic orientation, privacy zoning, and enduring material choices suited for the North Indian climate.
            </p>

            {/* List of features */}
            <div className="space-y-3 mb-8">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 border-b border-hairline pb-3"
                >
                  <span className="font-mono text-xs font-semibold text-brass mt-0.5">
                    0{idx + 1}
                  </span>
                  <span className="font-body text-sm sm:text-base text-ink">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Optional Metadata - rendered only if present */}
            {(project.location || project.area || project.year) && (
              <div className="grid grid-cols-3 gap-3 sm:gap-4 border border-hairline bg-paper-deep p-4 font-mono text-xs">
                {project.location && (
                  <div>
                    <span className="text-ink-soft block text-[10px] uppercase">Location</span>
                    <span className="font-medium text-ink">{project.location}</span>
                  </div>
                )}
                {project.area && (
                  <div>
                    <span className="text-ink-soft block text-[10px] uppercase">Built Area</span>
                    <span className="font-medium text-ink">{project.area}</span>
                  </div>
                )}
                {project.year && (
                  <div>
                    <span className="text-ink-soft block text-[10px] uppercase">Year</span>
                    <span className="font-medium text-ink">{project.year}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: "Discuss a similar project" CTA */}
          <div className="lg:col-span-5">
            <div className="border border-hairline bg-paper-deep p-5 sm:p-8">
              <SheetLabel className="block mb-2">
                PROJECT CONSULTATION
              </SheetLabel>
              <h3 className="font-display text-2xl font-light text-ink mb-3">
                Discuss a similar project
              </h3>
              <p className="font-body text-sm text-ink-soft leading-relaxed mb-6">
                Planning a {project.category.toLowerCase()} building with similar spatial requirements? Ar. Mayank Tiwari will review your plot and requirements directly.
              </p>

              <div className="space-y-3">
                <Button
                  href={`/contact?type=${encodeURIComponent(prefillType)}&project=${encodeURIComponent(project.title)}`}
                  variant="primary"
                  className="w-full text-center py-3.5"
                >
                  Book a consultation
                  <ArrowRightIcon size={14} />
                </Button>
                <Button
                  href={`https://wa.me/917275318871?text=${encodeURIComponent(`Hi Ar. Mayank Tiwari, I was looking at your ${project.title} (${project.category}) project and would like to discuss a similar project.`)}`}
                  external
                  variant="whatsapp"
                  className="w-full text-center py-3.5"
                >
                  Discuss on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Floor Plan Reference Drawing */}
        <div className="my-8 sm:my-12 border-t border-hairline pt-8 sm:pt-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 text-center">
              <SheetLabel>TECHNICAL REFERENCE // TYPICAL SCHEMATIC LAYOUT</SheetLabel>
            </div>
            <div className="overflow-x-auto no-scrollbar">
              <div className="min-w-[540px] sm:min-w-0">
                <FloorPlanDrawing />
              </div>
            </div>
          </div>
        </div>

        {/* Previous and Next Project Links */}
        <div className="border-t border-hairline pt-6 sm:pt-8 mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            {prev ? (
              <Link
                href={`/projects/${prev.slug}`}
                className="group flex flex-col p-4 border border-hairline hover:border-ink transition-colors min-h-[56px] active:scale-99"
              >
                <span className="font-mono text-[10px] text-ink-soft uppercase tracking-wider mb-1 flex items-center gap-1">
                  <ChevronLeftIcon size={12} />
                  <span>Previous Project</span>
                </span>
                <span className="font-display text-base sm:text-lg text-ink group-hover:text-brass-deep transition-colors">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="sm:text-right">
            {next ? (
              <Link
                href={`/projects/${next.slug}`}
                className="group flex flex-col sm:items-end p-4 border border-hairline hover:border-ink transition-colors min-h-[56px] active:scale-99"
              >
                <span className="font-mono text-[10px] text-ink-soft uppercase tracking-wider mb-1 flex items-center gap-1 sm:flex-row-reverse">
                  <ChevronRightIcon size={12} />
                  <span>Next Project</span>
                </span>
                <span className="font-display text-base sm:text-lg text-ink group-hover:text-brass-deep transition-colors">
                  {next.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </Container>

      {/* Sticky Mobile One-Thumb CTA on Project Detail */}
      <div className="fixed bottom-[60px] left-0 right-0 z-20 px-3 lg:hidden pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <Button
            href={`/contact?type=${encodeURIComponent(prefillType)}&project=${encodeURIComponent(project.title)}`}
            variant="primary"
            className="w-full text-center shadow-lg py-3 active:scale-98"
          >
            Discuss this project &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
}
