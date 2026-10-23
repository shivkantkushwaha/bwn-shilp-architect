export type ProjectCategory = 'Residential' | 'Commercial' | 'Institutional' | 'Urban';

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  images: string[];
  alt: string;
  summary: string;
  features: string[];
  placeholder: boolean;
  location?: string;
  area?: string;
  year?: string;
}

export const projects: Project[] = [
  {
    slug: 'modern-family-residence',
    title: 'Modern Family Residence',
    category: 'Residential',
    images: ['/images/projects/modern-family-residence.jpg'],
    alt: 'Two-storey modern residence with white rendered walls, timber cladding, and glass balcony railings',
    summary:
      'A two-storey family home with clean lines, warm timber accents against white walls, and generous balconies opening to the garden.',
    features: [
      'White rendered facade with timber cladding',
      'Glass balcony railings with planter ledges',
      'Double-height entrance lobby',
      'Warm accent lighting on the facade',
    ],
    placeholder: true,
  },
  {
    slug: 'contemporary-villa',
    title: 'Contemporary Villa with Courtyard',
    category: 'Residential',
    images: ['/images/projects/contemporary-villa.jpg'],
    alt: 'Contemporary villa with central courtyard, stone cladding, and flat roof with pergola',
    summary:
      'A ground-plus-one villa organised around a central courtyard, with stone cladding and a rooftop pergola.',
    features: [
      'Central courtyard for natural ventilation',
      'Natural stone cladding on feature walls',
      'Flat roof with pergola and planting',
      'Jaali-style screen at the entrance',
    ],
    placeholder: true,
  },
  {
    slug: 'urban-apartment-complex',
    title: 'Urban Apartment Complex',
    category: 'Residential',
    images: ['/images/projects/urban-apartment-complex.jpg'],
    alt: 'Multi-storey apartment building with staggered balconies and a mix of painted and exposed concrete surfaces',
    summary:
      'A mid-rise apartment building with staggered balconies, exposed concrete accents, and covered parking at grade.',
    features: [
      'Staggered balconies for privacy and light',
      'Mix of painted and exposed concrete',
      'Ground-level covered parking',
      'Rooftop community terrace',
    ],
    placeholder: true,
  },
  {
    slug: 'commercial-retail-block',
    title: 'Commercial Retail Block',
    category: 'Commercial',
    images: ['/images/projects/commercial-retail-block.jpg'],
    alt: 'Two-storey commercial building with glass shopfronts and a cantilevered upper floor',
    summary:
      'A compact retail block with full-height glass shopfronts on the ground floor and a cantilevered upper storey.',
    features: [
      'Full-height glazed shopfronts',
      'Cantilevered upper floor for shade',
      'Signage-ready facade panels',
      'Rear service access and loading',
    ],
    placeholder: true,
  },
  {
    slug: 'hospital-and-clinic',
    title: 'Hospital and Clinic Building',
    category: 'Institutional',
    images: ['/images/projects/hospital-and-clinic.jpg'],
    alt: 'Three-storey hospital building with a wide entrance portico, horizontal sun shades, and an ambulance bay',
    summary:
      'A three-storey hospital with a wide entrance portico, horizontal sun shading on patient-room windows, and a dedicated ambulance bay.',
    features: [
      'Wide entrance portico with ramp access',
      'Horizontal louvres on patient-facing windows',
      'Dedicated ambulance bay',
      'Service core with goods lift',
    ],
    placeholder: true,
  },
  {
    slug: 'institutional-campus',
    title: 'Institutional Campus',
    category: 'Institutional',
    images: ['/images/projects/institutional-campus.jpg'],
    alt: 'Campus buildings arranged around a central quadrangle with covered walkways and a clock tower',
    summary:
      'A campus layout with buildings arranged around a central quadrangle, connected by covered walkways.',
    features: [
      'Central quadrangle layout',
      'Covered walkways between blocks',
      'Amphitheatre and open-air seating',
      'Administrative block with clock tower',
    ],
    placeholder: true,
  },
  {
    slug: 'township-master-plan',
    title: 'Township Master Plan',
    category: 'Urban',
    images: ['/images/projects/township-master-plan.jpg'],
    alt: 'Aerial view of a planned township with tree-lined roads, residential plots, parks, and a central market area',
    summary:
      'A township layout with residential plots, parks, a central market area, and a network of tree-lined roads.',
    features: [
      'Grid road network with green buffers',
      'Central commercial and market zone',
      'Distributed parks and open spaces',
      'Dedicated institutional zone',
    ],
    placeholder: true,
  },
  {
    slug: 'neoclassical-residence',
    title: 'Neoclassical Residence',
    category: 'Residential',
    images: ['/images/projects/neoclassical-residence.jpg'],
    alt: 'Grand two-storey residence with classical columns, arched windows, and a symmetrical facade',
    summary:
      'A grand residence with classical columns, arched windows, and a symmetrical facade finished in cream stone.',
    features: [
      'Classical columns at the entrance portico',
      'Arched windows with keystones',
      'Symmetrical facade composition',
      'Cream stone finish with brass railings',
    ],
    placeholder: true,
  },
];

export const getCategories = (): ProjectCategory[] => [...new Set(projects.map((p) => p.category))];

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((project) => project.slug === slug);

export const getAdjacentProjects = (
  slug: string
): { prev: Project | null; next: Project | null } => {
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  return {
    prev: currentIndex > 0 ? projects[currentIndex - 1] : null,
    next: currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null,
  };
};
