export interface Testimonial {
  name: string;
  text: string;
  rating?: number;
  source?: string;
  role?: string;
  location?: string;
}

export const testimonials: Testimonial[] = [];
