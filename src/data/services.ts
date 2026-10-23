export interface Service {
  id: string;
  number: string;
  title: string;
  slug: string;
  description: string;
}

export const services: readonly Service[] = [
  {
    id: 'architectural-planning',
    number: '01',
    title: 'Architectural planning',
    slug: 'architectural-planning',
    description:
      'Complete building plans from concept to working drawings, designed for how you live and what you need.',
  },
  {
    id: 'interior-design',
    number: '02',
    title: 'Interior design',
    slug: 'interior-design',
    description:
      'Room layouts, materials, finishes, furniture placement, and lighting plans for homes and commercial spaces.',
  },
  {
    id: 'structural-design',
    number: '03',
    title: 'Structural design',
    slug: 'structural-design',
    description:
      'Load calculations, column layouts, beam designs, and foundation plans that keep your building safe and efficient.',
  },
  {
    id: 'urban-development-planning',
    number: '04',
    title: 'Urban development and planning',
    slug: 'urban-development-planning',
    description:
      'Site planning, zoning layouts, road networks, and master plans for colonies, campuses, and townships.',
  },
  {
    id: 'landscaping',
    number: '05',
    title: 'Landscaping',
    slug: 'landscaping',
    description:
      'Garden layouts, hardscape design, planting plans, and outdoor spaces that work with the building.',
  },
  {
    id: 'project-supervision',
    number: '06',
    title: 'Project supervision',
    slug: 'project-supervision',
    description:
      'On-site supervision from foundation to finishing, making sure the work matches the drawings.',
  },
] as const;

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
