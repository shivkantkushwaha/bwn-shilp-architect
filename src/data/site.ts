export const siteConfig = {
  name: 'Bhawanshilp Architect',
  nameHindi: 'भवनशिल्प आर्किटेक्ट्स',
  tagline: 'Architecture and design consultancy in Kanpur',
  description: 'Bhawanshilp Architect is a multidisciplinary architecture and design consultancy in Kanpur, India. We supervise projects from scratch to completion.',
  architect: 'Ar. Mayank Tiwari',
  address: {
    line1: '2-A-206, Awas Vikas',
    line2: 'Hanspuram, Naubasta',
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    pincode: '208021',
    full: '2-A-206, Awas Vikas, Hanspuram, Naubasta, Kanpur, Uttar Pradesh 208021',
  },
  phone: '+917275318871',
  phoneDisplay: '+91 72753 18871',
  email: 'mahabhishank@gmail.com',
  whatsapp: '917275318871',
  hours: {
    display: 'Open until 8 PM',
    full: 'TODO: Confirm opening time with client',
  },
  google: {
    rating: 4.9,
    reviews: 609,
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bhawanship+Architects+Awas+Vikas+Hanspuram+Kanpur',
  },
  social: {
    instagram: {
      handle: '@ar_mayank_tiwari_',
      url: 'https://www.instagram.com/ar_mayank_tiwari_/',
    },
    facebook: {
      handle: 'bhawanshilp',
      url: 'https://www.facebook.com/bhawanshilp',
    },
  },
  areasServed: ['Kanpur', 'Lucknow', 'Prayagraj', 'New Delhi'],
  noindex: true,
  showPreviewBadge: false,
} as const;

export type SiteConfig = typeof siteConfig;
