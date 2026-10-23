export interface ProcessStep {
  step: number;
  number: string;
  title: string;
  description: string;
}

export const processSteps: readonly ProcessStep[] = [
  {
    step: 1,
    number: '01',
    title: 'Talk',
    description:
      'You tell us what you need. We visit the site, understand the space, and discuss how you want to use it.',
  },
  {
    step: 2,
    number: '02',
    title: 'Plan',
    description:
      'We study the site, prepare initial layouts, and work out what is possible within your plot and budget.',
  },
  {
    step: 3,
    number: '03',
    title: 'Design',
    description:
      'Detailed drawings, 3D views, and material selections so you can see the building before it is built.',
  },
  {
    step: 4,
    number: '04',
    title: 'Detail and approve',
    description:
      'Working drawings, structural plans, and municipal submissions. Nothing moves forward without your sign-off.',
  },
  {
    step: 5,
    number: '05',
    title: 'Build with supervision',
    description:
      'Construction begins. Our team visits the site regularly to check that the work matches the approved drawings.',
  },
] as const;
