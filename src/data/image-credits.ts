export interface ImageCredit {
  photographer: string;
  url: string;
  usedFor: string;
  isCustomDrawing?: boolean;
}

export const imageCredits: ImageCredit[] = [
  {
    photographer: 'Original SVG Architectural Drawing in Code',
    url: 'internal',
    usedFor: 'ElevationDrawing, FloorPlanDrawing, SectionDrawing, and App Icon',
    isCustomDrawing: true,
  },
  {
    photographer: 'Unsplash Community (Graphic Node)',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    usedFor: 'Modern Family Residence project preview and Hero featured plate',
  },
  {
    photographer: 'Unsplash Community (Webaliser)',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    usedFor: 'Contemporary Villa with Courtyard project preview',
  },
  {
    photographer: 'Unsplash Community (Benoît Dupont)',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00',
    usedFor: 'Urban Apartment Complex project preview',
  },
  {
    photographer: 'Unsplash Community (Sean Pollock)',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    usedFor: 'Commercial Retail Block project preview',
  },
  {
    photographer: 'Unsplash Community (Martha Dominguez)',
    url: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3',
    usedFor: 'Hospital and Clinic Building project preview',
  },
  {
    photographer: 'Unsplash Community (Vasily Kolotusha)',
    url: 'https://images.unsplash.com/photo-1562774053-701939374585',
    usedFor: 'Institutional Campus project preview',
  },
  {
    photographer: 'Unsplash Community (Pedro Lastra)',
    url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
    usedFor: 'Township Master Plan project preview',
  },
  {
    photographer: 'Unsplash Community (R Architecture)',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c',
    usedFor: 'Neoclassical Residence project preview',
  },
  {
    photographer: 'Unsplash Community (Scott Blake)',
    url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd',
    usedFor: 'Construction site on-site supervision stage visual',
  },
  {
    photographer: 'Unsplash Community (Daniel McCullough)',
    url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e',
    usedFor: 'Architect drafting desk visual on About page',
  },
  {
    photographer: 'Unsplash Community (Spacejoy)',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6',
    usedFor: 'Interior living room design visual on Services page',
  },
  {
    photographer: 'Unsplash Community (Erda Estremera)',
    url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae',
    usedFor: 'Landscape garden architecture visual',
  },
];
