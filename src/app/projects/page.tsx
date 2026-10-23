import { Metadata } from 'next';
import { projects, getCategories } from '@/data/projects';
import { Container } from '@/components/Container';
import { SheetLabel } from '@/components/SheetLabel';
import { ProjectsFilterClient } from './ProjectsFilterClient';

export const metadata: Metadata = {
  title: 'Selected Projects & Architectural Portfolio',
  description:
    'Explore residential homes, multi-storey apartments, commercial buildings, healthcare institutions, and urban master plans by Bhawanshilp Architect in Kanpur and North India.',
};

export default function ProjectsPage() {
  const categories = getCategories();

  return (
    <div className="py-8 sm:py-16 lg:py-20 pb-28 lg:pb-20 bg-paper">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <SheetLabel className="block mb-2">
            SHEET SET 02 // PROJECT ARCHIVE
          </SheetLabel>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-ink mb-4">
            Selected Work
          </h1>
          <p className="font-body text-ink-soft text-base sm:text-lg leading-relaxed">
            Residential residences, apartments, commercial facilities, institutions, and master planning schemes. Filter by typology below to inspect spatial approaches and material palettes.
          </p>
        </div>

        {/* Client filterable list */}
        <ProjectsFilterClient initialProjects={projects} categories={categories} />
      </Container>
    </div>
  );
}
