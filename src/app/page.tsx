import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { siteConfig } from '@/data/site';
import { services } from '@/data/services';
import { processSteps } from '@/data/process';
import { projects } from '@/data/projects';
import { testimonials } from '@/data/testimonials';
import { waLink } from '@/lib/whatsapp';
import { Container } from '@/components/Container';
import { Section } from '@/components/Section';
import { SheetLabel } from '@/components/SheetLabel';
import { Button } from '@/components/Button';
import { ProjectImage } from '@/components/ProjectImage';
import { ElevationDrawing } from '@/components/drawings/ElevationDrawing';
import {
  StarIcon,
  WhatsAppIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon,
} from '@/components/icons';

export const metadata: Metadata = {
  title: 'Bhawanshilp Architect — Architecture & Design Consultancy in Kanpur',
  description:
    'Multidisciplinary architecture and design consultancy in Kanpur led by Ar. Mayank Tiwari. Architectural planning, interiors, structural design, and on-site project supervision.',
};

export default function HomePage() {
  const selectedProjects = projects.slice(0, 6);
  const featuredProject = projects[0];

  return (
    <div className="pb-28 lg:pb-0">
      {/* 1. HERO SECTION (Asymmetric: serif headline, rating badge, CTAs within the one-thumb zone on mobile) */}
      <section className="relative pt-4 pb-10 sm:pt-10 sm:pb-20 lg:pt-16 lg:pb-28 border-b border-hairline overflow-hidden">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
            {/* Left Column (7 cols on desktop, compact on mobile so CTAs fit above the fold) */}
            <div className="lg:col-span-7 flex flex-col items-start pr-0 lg:pr-8">
              {/* Google Reviews Chip (min 44px tap target) */}
              <a
                href={siteConfig.google.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-hairline bg-paper-deep px-3.5 py-2 text-xs font-mono mb-4 sm:mb-8 hover:border-ink transition-colors min-h-[44px] active:scale-98"
                aria-label={`Google rating: ${siteConfig.google.rating} from ${siteConfig.google.reviews} reviews`}
              >
                <div className="flex items-center text-brass">
                  <StarIcon size={14} fill="#B98A2E" />
                </div>
                <span className="font-semibold text-ink">
                  {siteConfig.google.rating} on Google
                </span>
                <span className="text-hairline">·</span>
                <span className="text-ink-soft">
                  {siteConfig.google.reviews} reviews
                </span>
              </a>

              {/* Monospace sheet tag */}
              <SheetLabel className="mb-2 sm:mb-3">
                SHEET 01 // OVERVIEW &bull; KANPUR, UP
              </SheetLabel>

              {/* Display Headline: tight and impactful */}
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-light text-ink tracking-tight leading-[1.12] mb-3 sm:mb-6">
                Architecture and design consultancy in Kanpur.
              </h1>

              {/* Supporting plain statement */}
              <p className="font-body text-sm sm:text-lg text-ink-soft max-w-xl leading-relaxed mb-6 sm:mb-8">
                We plan, design, and supervise residential, commercial, and institutional buildings from scratch to completion. Led by Ar. Mayank Tiwari.
              </p>

              {/* Primary Actions: placed in the one-thumb zone on mobile */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Button href="/contact" variant="primary" className="w-full sm:w-auto text-center py-3.5">
                  Book a consultation
                </Button>
                <Button
                  href={waLink('Hi, I would like to consult with Bhawanshilp Architect on a project.')}
                  external
                  variant="whatsapp"
                  className="w-full sm:w-auto text-center py-3.5"
                >
                  <WhatsAppIcon size={18} />
                  WhatsApp us
                </Button>
              </div>

              {/* Key architectural metadata ticker */}
              <div className="mt-8 sm:mt-12 pt-4 sm:pt-6 border-t border-hairline w-full grid grid-cols-3 gap-3 sm:gap-4 font-mono text-[11px] sm:text-xs text-ink-soft">
                <div>
                  <span className="block text-[9px] sm:text-[10px] uppercase text-ink-soft/70">Principal</span>
                  <span className="font-medium text-ink truncate block">{siteConfig.architect}</span>
                </div>
                <div>
                  <span className="block text-[9px] sm:text-[10px] uppercase text-ink-soft/70">Studio</span>
                  <span className="font-medium text-ink truncate block">Hanspuram, Kanpur</span>
                </div>
                <div>
                  <span className="block text-[9px] sm:text-[10px] uppercase text-ink-soft/70">Practice</span>
                  <span className="font-medium text-ink truncate block">Scratch to end</span>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Tall Featured Project with Mono Annotation */}
            <div className="lg:col-span-5 mt-4 lg:mt-0">
              <div className="relative border border-hairline bg-paper-deep p-3 sm:p-4">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-hairline font-mono text-[10px] uppercase tracking-wider text-ink-soft">
                  <span>PLATE 01 // SELECTED WORK</span>
                  <span className="text-brass font-medium">AR. M. TIWARI</span>
                </div>

                <div className="relative aspect-[4/5] overflow-hidden">
                  <ProjectImage
                    src={featuredProject.images[0]}
                    alt={featuredProject.alt}
                    title={featuredProject.title}
                    priority
                    aspectRatio="4/5"
                    className="w-full h-full"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-ink/85 text-paper p-3.5 sm:p-4 backdrop-blur-xs">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-brass block">
                      {featuredProject.category}
                    </span>
                    <span className="font-display text-base sm:text-lg text-paper block">
                      {featuredProject.title}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-ink-soft">
                  <span>26°25&apos;N 80°20&apos;E &bull; KANPUR</span>
                  <Link
                    href={`/projects/${featuredProject.slug}`}
                    className="text-brass-deep hover:text-ink transition-colors font-medium min-h-[44px] inline-flex items-center"
                  >
                    View Project &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. SELECTED WORK (Native swipeable scroll-snap carousel on mobile; editorial grid on desktop) */}
      <Section id="work">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-6 mb-8 sm:mb-12 border-b border-hairline">
            <div>
              <SheetLabel className="block mb-1 sm:mb-2">
                SHEET 02 // SELECTED WORK
              </SheetLabel>
              <h2 className="font-display text-2xl sm:text-4xl font-light text-ink">
                Recent Projects
              </h2>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-ink hover:text-brass-deep transition-colors min-h-[44px]"
            >
              <span>View all projects</span>
              <ArrowRightIcon size={14} />
            </Link>
          </div>

          {/* MOBILE: App-like Swipeable Carousel with CSS Scroll-Snap (< md) */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-5 px-5 pb-4">
              {selectedProjects.map((project, idx) => (
                <div
                  key={project.slug}
                  className="w-[84vw] max-w-[320px] shrink-0 snap-start flex flex-col justify-between border border-hairline bg-paper-deep p-3.5"
                >
                  <Link href={`/projects/${project.slug}`} className="block group">
                    <div className="relative aspect-[3/2] overflow-hidden border border-hairline mb-3">
                      <ProjectImage
                        src={project.images[0]}
                        alt={project.alt}
                        title={project.title}
                        aspectRatio="3/2"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-paper px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-ink border border-hairline">
                        {project.category}
                      </div>
                    </div>
                    <div className="flex items-baseline justify-between mb-1">
                      <h3 className="font-display text-xl font-light text-ink group-hover:text-brass-deep transition-colors">
                        {project.title}
                      </h3>
                      <span className="font-mono text-xs text-ink-soft">0{idx + 1}</span>
                    </div>
                    <p className="font-body text-xs text-ink-soft line-clamp-2 leading-relaxed mb-3">
                      {project.summary}
                    </p>
                  </Link>

                  <div className="pt-2.5 border-t border-hairline flex items-center justify-between font-mono text-xs">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-brass-deep font-medium inline-flex items-center gap-1 min-h-[44px]"
                    >
                      <span>Explore</span>
                      <ArrowRightIcon size={12} />
                    </Link>
                    <span className="text-[10px] text-ink-soft/70 uppercase">CONCEPT</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Carousel Navigation Indicator */}
            <div className="flex items-center justify-between pt-3 px-1 font-mono text-[11px] text-ink-soft border-t border-hairline/60">
              <span className="text-brass font-medium">SWIPE FOR MORE PROJECTS &rarr;</span>
              <span>1 TO {selectedProjects.length}</span>
            </div>
          </div>

          {/* DESKTOP: Varied Spans Editorial Grid (>= md) */}
          <div className="hidden md:grid md:grid-cols-12 gap-8">
            {/* Project 1: Span 7 cols */}
            <div className="md:col-span-7">
              <Link href={`/projects/${selectedProjects[0].slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden border border-hairline mb-3">
                  <ProjectImage
                    src={selectedProjects[0].images[0]}
                    alt={selectedProjects[0].alt}
                    title={selectedProjects[0].title}
                    aspectRatio="3/2"
                  />
                  <div className="absolute top-3 left-3 bg-paper px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink border border-hairline">
                    {selectedProjects[0].category}
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-light text-ink group-hover:text-brass-deep transition-colors">
                    {selectedProjects[0].title}
                  </h3>
                  <span className="font-mono text-xs text-ink-soft">01</span>
                </div>
                <p className="font-body text-sm text-ink-soft mt-1 leading-relaxed">
                  {selectedProjects[0].summary}
                </p>
              </Link>
            </div>

            {/* Project 2: Span 5 cols */}
            <div className="md:col-span-5 flex flex-col justify-between">
              <Link href={`/projects/${selectedProjects[1].slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden border border-hairline mb-3">
                  <ProjectImage
                    src={selectedProjects[1].images[0]}
                    alt={selectedProjects[1].alt}
                    title={selectedProjects[1].title}
                    aspectRatio="4/5"
                  />
                  <div className="absolute top-3 left-3 bg-paper px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink border border-hairline">
                    {selectedProjects[1].category}
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl font-light text-ink group-hover:text-brass-deep transition-colors">
                    {selectedProjects[1].title}
                  </h3>
                  <span className="font-mono text-xs text-ink-soft">02</span>
                </div>
                <p className="font-body text-sm text-ink-soft mt-1 leading-relaxed">
                  {selectedProjects[1].summary}
                </p>
              </Link>
            </div>

            {/* Project 3: Span 4 cols */}
            <div className="md:col-span-4">
              <Link href={`/projects/${selectedProjects[2].slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden border border-hairline mb-3">
                  <ProjectImage
                    src={selectedProjects[2].images[0]}
                    alt={selectedProjects[2].alt}
                    title={selectedProjects[2].title}
                    aspectRatio="4/5"
                  />
                  <div className="absolute top-3 left-3 bg-paper px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink border border-hairline">
                    {selectedProjects[2].category}
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl font-light text-ink group-hover:text-brass-deep transition-colors">
                    {selectedProjects[2].title}
                  </h3>
                  <span className="font-mono text-xs text-ink-soft">03</span>
                </div>
                <p className="font-body text-sm text-ink-soft mt-1 leading-relaxed">
                  {selectedProjects[2].summary}
                </p>
              </Link>
            </div>

            {/* Project 4: Span 8 cols */}
            <div className="md:col-span-8">
              <Link href={`/projects/${selectedProjects[3].slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden border border-hairline mb-3">
                  <ProjectImage
                    src={selectedProjects[3].images[0]}
                    alt={selectedProjects[3].alt}
                    title={selectedProjects[3].title}
                    aspectRatio="3/2"
                  />
                  <div className="absolute top-3 left-3 bg-paper px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink border border-hairline">
                    {selectedProjects[3].category}
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-light text-ink group-hover:text-brass-deep transition-colors">
                    {selectedProjects[3].title}
                  </h3>
                  <span className="font-mono text-xs text-ink-soft">04</span>
                </div>
                <p className="font-body text-sm text-ink-soft mt-1 leading-relaxed">
                  {selectedProjects[3].summary}
                </p>
              </Link>
            </div>

            {/* Project 5: Span 6 cols */}
            <div className="md:col-span-6">
              <Link href={`/projects/${selectedProjects[4].slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden border border-hairline mb-3">
                  <ProjectImage
                    src={selectedProjects[4].images[0]}
                    alt={selectedProjects[4].alt}
                    title={selectedProjects[4].title}
                    aspectRatio="3/2"
                  />
                  <div className="absolute top-3 left-3 bg-paper px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink border border-hairline">
                    {selectedProjects[4].category}
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl font-light text-ink group-hover:text-brass-deep transition-colors">
                    {selectedProjects[4].title}
                  </h3>
                  <span className="font-mono text-xs text-ink-soft">05</span>
                </div>
                <p className="font-body text-sm text-ink-soft mt-1 leading-relaxed">
                  {selectedProjects[4].summary}
                </p>
              </Link>
            </div>

            {/* Project 6: Span 6 cols */}
            <div className="md:col-span-6">
              <Link href={`/projects/${selectedProjects[5].slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden border border-hairline mb-3">
                  <ProjectImage
                    src={selectedProjects[5].images[0]}
                    alt={selectedProjects[5].alt}
                    title={selectedProjects[5].title}
                    aspectRatio="3/2"
                  />
                  <div className="absolute top-3 left-3 bg-paper px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-ink border border-hairline">
                    {selectedProjects[5].category}
                  </div>
                </div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-xl font-light text-ink group-hover:text-brass-deep transition-colors">
                    {selectedProjects[5].title}
                  </h3>
                  <span className="font-mono text-xs text-ink-soft">06</span>
                </div>
                <p className="font-body text-sm text-ink-soft mt-1 leading-relaxed">
                  {selectedProjects[5].summary}
                </p>
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* 3. SERVICES (Numbered list 01 to 06 separated by hairlines) */}
      <Section id="services" className="border-t border-hairline">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="lg:col-span-5">
              <SheetLabel className="block mb-2">
                SHEET 03 // SCOPE OF SERVICES
              </SheetLabel>
              <h2 className="font-display text-2xl sm:text-4xl font-light text-ink">
                What We Do
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="font-body text-sm sm:text-base text-ink-soft leading-relaxed">
                We handle the complete scope under one roof — from architectural floor plans and municipal approvals to structural calculations, interior layouts, and on-site construction supervision.
              </p>
            </div>
          </div>

          {/* Numbered hairline-separated list */}
          <div className="divide-y divide-hairline border-y border-hairline">
            {services.map((service) => (
              <div
                key={service.id}
                className="py-5 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-start group hover:bg-paper-deep/60 transition-colors px-2 sm:px-3 -mx-2 sm:-mx-3"
              >
                <div className="md:col-span-2 font-mono text-xs sm:text-sm font-semibold text-brass">
                  {service.number}
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-xl sm:text-2xl font-light text-ink group-hover:text-brass-deep transition-colors">
                    {service.title}
                  </h3>
                </div>
                <div className="md:col-span-5">
                  <p className="font-body text-xs sm:text-base text-ink-soft leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="md:col-span-1 flex md:justify-end items-center pt-1">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title)}`}
                    className="font-mono text-xs text-brass-deep hover:text-ink transition-colors uppercase min-h-[44px] inline-flex items-center"
                    aria-label={`Inquire about ${service.title}`}
                  >
                    Inquire &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Button href="/services" variant="outline" className="w-full sm:w-auto text-center py-3.5">
              Learn more about each service
            </Button>
          </div>
        </Container>
      </Section>

      {/* 4. HOW A PROJECT USUALLY GOES */}
      <Section id="process" className="border-t border-hairline bg-paper-deep">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start">
            {/* Left Column: Heading and 5 Process Steps */}
            <div className="lg:col-span-7">
              <SheetLabel className="block mb-2">
                SHEET 04 // PROJECT SEQUENCE
              </SheetLabel>
              <h2 className="font-display text-2xl sm:text-4xl font-light text-ink mb-3 sm:mb-4">
                How a Project Usually Goes
              </h2>
              <p className="font-body text-sm sm:text-base text-ink-soft leading-relaxed mb-8 sm:mb-10">
                Building or redesigning a property is a major undertaking. We keep the sequence structured, transparent, and supervised from start to finish.
              </p>

              <div className="space-y-5 sm:space-y-6">
                {processSteps.map((step, idx) => (
                  <div
                    key={step.number}
                    className="flex gap-3.5 sm:gap-6 border-b border-hairline pb-5 sm:pb-6 last:border-b-0"
                  >
                    <div className="shrink-0 flex flex-col items-center">
                      <div className="flex h-8 w-8 items-center justify-center font-mono text-xs font-semibold bg-paper border border-hairline text-brass">
                        {step.number}
                      </div>
                      {idx < processSteps.length - 1 && (
                        <div className="w-px h-full bg-hairline my-2" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-light text-ink mb-1">
                        {step.title}
                      </h3>
                      <p className="font-body text-xs sm:text-sm text-ink-soft leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Construction Site Image with Drawing Annotation */}
            <div className="lg:col-span-5">
              <div className="border border-hairline bg-paper p-3 sm:p-4">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-hairline font-mono text-[10px] text-ink-soft uppercase tracking-wider">
                  <span>STAGE 05 // ON-SITE SUPERVISION</span>
                  <span className="text-brass">EXECUTION</span>
                </div>

                <div className="relative aspect-[4/5] overflow-hidden border border-hairline mb-3 sm:mb-4">
                  <Image
                    src="/images/support/construction-site.jpg"
                    alt="Active building construction site with concrete framework and reinforcement supervision"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>

                <div className="font-mono text-[11px] sm:text-xs text-ink-soft space-y-1">
                  <div className="flex justify-between border-b border-hairline pb-1">
                    <span>ROLE:</span>
                    <span className="text-ink font-medium">On-Site Supervision</span>
                  </div>
                  <div className="flex justify-between border-b border-hairline py-1">
                    <span>VERIFICATION:</span>
                    <span className="text-ink font-medium">Drawings to Reality</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span>SCOPE:</span>
                    <span className="text-ink font-medium">Foundation to Finishing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* 5. WHY BHAWANSHILP */}
      <Section id="why" className="border-t border-hairline">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
            <SheetLabel className="block mb-2">
              SHEET 05 // CORE PRINCIPLES
            </SheetLabel>
            <h2 className="font-display text-2xl sm:text-4xl font-light text-ink mb-2 sm:mb-3">
              Why Bhawanshilp
            </h2>
            <p className="font-body text-ink-soft text-sm sm:text-base leading-relaxed">
              Straightforward architecture practice built on technical clarity and accountable execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="border border-hairline bg-paper-deep p-5 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-semibold text-brass block mb-2 sm:mb-3">01 // INTEGRATION</span>
                <h3 className="font-display text-xl sm:text-2xl font-light text-ink mb-2 sm:mb-3">
                  All disciplines under one roof
                </h3>
                <p className="font-body text-xs sm:text-sm text-ink-soft leading-relaxed">
                  Architectural layout, structural design, interior planning, and landscaping are coordinated together. You do not have to manage conflicting advice between different contractors and designers.
                </p>
              </div>
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-hairline font-mono text-[10px] sm:text-[11px] text-brass-deep">
                NO DISCONNECT BETWEEN DRAWINGS
              </div>
            </div>

            <div className="border border-hairline bg-paper-deep p-5 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-semibold text-brass block mb-2 sm:mb-3">02 // SUPERVISION</span>
                <h3 className="font-display text-xl sm:text-2xl font-light text-ink mb-2 sm:mb-3">
                  Supervision from scratch to completion
                </h3>
                <p className="font-body text-xs sm:text-sm text-ink-soft leading-relaxed">
                  We don&apos;t just hand over a set of drawings and walk away. Ar. Mayank Tiwari and team supervise the work on site regularly to ensure construction matches the approved architectural plans.
                </p>
              </div>
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-hairline font-mono text-[10px] sm:text-[11px] text-brass-deep">
                FOUNDATION TO FINAL OCCUPANCY
              </div>
            </div>

            <div className="border border-hairline bg-paper-deep p-5 sm:p-8 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-semibold text-brass block mb-2 sm:mb-3">03 // VISUALISATION</span>
                <h3 className="font-display text-xl sm:text-2xl font-light text-ink mb-2 sm:mb-3">
                  3D views before you build
                </h3>
                <p className="font-body text-xs sm:text-sm text-ink-soft leading-relaxed">
                  Before a single brick is laid, you receive realistic 3D elevation renders and interior perspectives. You see the room proportions, materials, lighting, and finishes and approve them first.
                </p>
              </div>
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-hairline font-mono text-[10px] sm:text-[11px] text-brass-deep">
                COMPLETE VISUAL CLARITY
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Architectural Elevation Line Drawing Section */}
      <section className="py-8 sm:py-12 bg-paper border-t border-hairline overflow-hidden">
        <Container>
          <div className="max-w-4xl mx-auto overflow-x-auto no-scrollbar">
            <div className="min-w-[540px] sm:min-w-0">
              <ElevationDrawing />
            </div>
          </div>
        </Container>
      </section>

      {/* 6. DARK RATING BAND */}
      <section className="bg-ink text-paper py-12 sm:py-24 border-t border-brass/20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 flex flex-col items-start border-b lg:border-b-0 lg:border-r border-paper/15 pb-6 lg:pb-0 lg:pr-8">
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-brass mb-2 sm:mb-3">
                VERIFIED GOOGLE RATING // KANPUR
              </span>

              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-display text-5xl sm:text-7xl font-light text-paper tracking-tight">
                  {siteConfig.google.rating}
                </span>
                <div className="flex flex-col">
                  <div className="flex text-brass">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <StarIcon key={i} size={18} fill="#B98A2E" />
                    ))}
                  </div>
                  <span className="font-mono text-xs text-paper/70 mt-1">
                    Out of 5.0 stars
                  </span>
                </div>
              </div>

              <p className="font-body text-paper/80 text-xs sm:text-sm mb-5 sm:mb-6">
                Based on <strong className="text-paper">{siteConfig.google.reviews} verified reviews</strong> on Google Maps from clients across Kanpur and neighboring districts.
              </p>

              <Button
                href={siteConfig.google.mapsUrl}
                external
                variant="outline"
                className="border-brass text-paper hover:bg-brass hover:text-ink w-full sm:w-auto text-center py-3.5"
              >
                Read reviews on Google
              </Button>
            </div>

            <div className="lg:col-span-7 lg:pl-8">
              <div className="font-mono text-xs uppercase tracking-wider text-brass mb-3 sm:mb-4">
                WHAT CLIENTS VALUE
              </div>
              <div className="space-y-4 font-body text-xs sm:text-base text-paper/85 leading-relaxed">
                <p>
                  Clients regularly highlight Ar. Mayank Tiwari&apos;s direct involvement, realistic spatial planning that respects family budgets, and constant supervision during the critical structural phases.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-paper/15 font-mono text-[11px] sm:text-xs text-paper/70">
                  <div>
                    <span className="text-brass block font-semibold text-sm">100%</span>
                    <span>Multi-discipline Coordination</span>
                  </div>
                  <div>
                    <span className="text-brass block font-semibold text-sm">4.9 / 5</span>
                    <span>Google Client Satisfaction</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {testimonials && testimonials.length > 0 && (
            <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-paper/15">
              <SheetLabel className="text-brass block mb-6">CLIENT TESTIMONIALS</SheetLabel>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((t, idx) => (
                  <div key={idx} className="border border-paper/15 p-6 bg-paper/5">
                    <p className="font-body text-sm italic text-paper/90 mb-4">&ldquo;{t.text}&rdquo;</p>
                    <div className="font-mono text-xs text-brass">{t.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* 7. AREAS SERVED */}
      <section className="py-8 sm:py-16 bg-paper-deep border-t border-hairline">
        <Container>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <div>
              <SheetLabel className="block mb-1">
                REGIONAL PRACTICE // GEOGRAPHIC COVERAGE
              </SheetLabel>
              <h2 className="font-display text-xl sm:text-3xl font-light text-ink">
                Areas We Serve
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
              {siteConfig.areasServed.map((city) => (
                <div
                  key={city}
                  className="border border-hairline bg-paper px-3 sm:px-4 py-2 font-mono text-xs uppercase tracking-wider text-ink text-center"
                >
                  {city}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 8. CLOSING CTA BAND */}
      <Section id="closing-cta" dark className="border-t border-brass/20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <SheetLabel className="text-brass block mb-2 sm:mb-3">
                LET&apos;S DISCUSS YOUR PROJECT
              </SheetLabel>
              <h2 className="font-display text-2xl sm:text-5xl font-light text-paper tracking-tight mb-3 sm:mb-4">
                Ready to build or redesign?
              </h2>
              <p className="font-body text-paper/80 text-sm sm:text-lg max-w-xl mx-auto leading-relaxed">
                Connect directly with Ar. Mayank Tiwari to discuss your plot, building requirements, and next steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <div className="border border-paper/15 p-5 sm:p-6 bg-paper/5 flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center bg-brass text-ink mb-3 sm:mb-4">
                    <PhoneIcon size={20} />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl text-paper mb-1 sm:mb-2">Direct Call</h3>
                  <p className="font-body text-xs text-paper/70 mb-4">
                    Speak directly with Ar. Mayank Tiwari regarding your project.
                  </p>
                </div>
                <Button href={`tel:${siteConfig.phone}`} variant="outline" className="border-paper/40 text-paper hover:bg-paper hover:text-ink w-full py-3.5">
                  {siteConfig.phoneDisplay}
                </Button>
              </div>

              <div className="border border-paper/15 p-5 sm:p-6 bg-paper/5 flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center bg-whatsapp text-white mb-3 sm:mb-4">
                    <WhatsAppIcon size={20} />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl text-paper mb-1 sm:mb-2">WhatsApp Us</h3>
                  <p className="font-body text-xs text-paper/70 mb-4">
                    Send drawings, plot dimensions, or queries for immediate review.
                  </p>
                </div>
                <Button
                  href={waLink('Hi, I would like to discuss a project with Ar. Mayank Tiwari.')}
                  external
                  variant="whatsapp"
                  className="w-full py-3.5"
                >
                  Send a Message
                </Button>
              </div>

              <div className="border border-paper/15 p-5 sm:p-6 bg-paper/5 flex flex-col justify-between">
                <div>
                  <div className="flex h-10 w-10 items-center justify-center bg-paper/20 text-paper mb-3 sm:mb-4">
                    <MapPinIcon size={20} />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl text-paper mb-1 sm:mb-2">Studio Visit</h3>
                  <p className="font-body text-xs text-paper/70 mb-1">
                    {siteConfig.address.full}
                  </p>
                  <p className="font-mono text-[11px] text-brass mb-4">
                    {siteConfig.hours.display}
                  </p>
                </div>
                <Button href={siteConfig.google.mapsUrl} external variant="outline" className="border-paper/40 text-paper hover:bg-paper hover:text-ink w-full py-3.5">
                  Get directions
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
