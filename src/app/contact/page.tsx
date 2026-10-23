import { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { Container } from '@/components/Container';
import { SheetLabel } from '@/components/SheetLabel';
import { EnquiryForm } from '@/components/EnquiryForm';
import { Button } from '@/components/Button';
import {
  PhoneIcon,
  WhatsAppIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
} from '@/components/icons';

export const metadata: Metadata = {
  title: 'Contact & Consultation Booking',
  description:
    'Book an architecture consultation with Ar. Mayank Tiwari at Bhawanshilp Architect in Kanpur. Call, WhatsApp, visit our office, or submit project specifications.',
};

export default function ContactPage() {
  const encodedAddress = encodeURIComponent(siteConfig.address.full);
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

  return (
    <div className="py-12 sm:py-20 bg-paper">
      <Container>
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <SheetLabel className="block mb-2">
            SHEET SET 05 // CONSULTATION & ENQUIRIES
          </SheetLabel>
          <h1 className="font-display text-4xl sm:text-5xl font-light text-ink mb-4">
            Book a Consultation
          </h1>
          <p className="font-body text-ink-soft text-base sm:text-lg leading-relaxed">
            Whether you are planning a new residence, renovating an existing space, or developing a commercial plot, connect with Ar. Mayank Tiwari directly.
          </p>
        </div>

        {/* 2-Column Grid: Form Left, Direct Contact Details Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: 3-Step Interactive Enquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>

          {/* Right Column: Direct Contact Details & Studio Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Direct Contact Card */}
            <div className="border border-hairline bg-paper-deep p-6 sm:p-8">
              <SheetLabel className="block mb-3">DIRECT CONTACT // IMMEDIATE RESPONSE</SheetLabel>
              <h2 className="font-display text-2xl font-light text-ink mb-6">
                Reach Ar. Mayank Tiwari
              </h2>

              <div className="space-y-6 font-mono text-xs">
                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 bg-paper border border-hairline flex items-center justify-center text-ink shrink-0">
                    <PhoneIcon size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-ink-soft block">Phone Consultation</span>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      className="text-sm font-semibold text-ink hover:text-brass-deep transition-colors"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                    <span className="text-ink-soft text-[11px] block mt-0.5">Calls answered directly by the team</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 bg-whatsapp text-white flex items-center justify-center shrink-0">
                    <WhatsAppIcon size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-ink-soft block">WhatsApp Chat</span>
                    <a
                      href={`https://wa.me/${siteConfig.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-ink hover:text-whatsapp transition-colors"
                    >
                      +{siteConfig.whatsapp}
                    </a>
                    <span className="text-ink-soft text-[11px] block mt-0.5">Fastest way to send plot dimensions or drawings</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 bg-paper border border-hairline flex items-center justify-center text-ink shrink-0">
                    <span className="font-display text-sm font-bold text-ink">@</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-ink-soft block">Email Inquiries</span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm font-semibold text-ink hover:text-brass-deep transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                    <span className="text-ink-soft text-[11px] block mt-0.5">Formal RFPs and institutional submissions</span>
                  </div>
                </div>

                {/* Studio Location */}
                <div className="flex items-start gap-3.5 pt-4 border-t border-hairline">
                  <div className="h-9 w-9 bg-paper border border-hairline flex items-center justify-center text-ink shrink-0">
                    <MapPinIcon size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-ink-soft block">Studio Address</span>
                    <address className="not-italic text-sm text-ink leading-relaxed font-body">
                      {siteConfig.address.full}
                    </address>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="h-9 w-9 bg-paper border border-hairline flex items-center justify-center text-ink shrink-0">
                    <ClockIcon size={16} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase text-ink-soft block">Office Hours</span>
                    <span className="text-sm font-semibold text-ink">{siteConfig.hours.display}</span>
                    <span className="text-ink-soft text-[11px] block mt-0.5">Evenings open for client discussions</span>
                  </div>
                </div>
              </div>

              {/* Google Reviews link */}
              <div className="mt-6 pt-6 border-t border-hairline">
                <a
                  href={siteConfig.google.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 border border-hairline bg-paper text-xs font-mono hover:border-ink transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex text-brass">
                      <StarIcon size={14} fill="#B98A2E" />
                    </div>
                    <span className="font-semibold text-ink">{siteConfig.google.rating} Rating</span>
                    <span className="text-ink-soft">({siteConfig.google.reviews} reviews)</span>
                  </div>
                  <span className="text-brass-deep uppercase text-[10px] font-semibold">View on Maps &rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 pt-12 border-t border-hairline">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <SheetLabel className="block mb-1">LOCATION MAP // HANSPURAM NAUBASTA</SheetLabel>
              <h2 className="font-display text-2xl font-light text-ink">
                Visit the Studio in Kanpur
              </h2>
            </div>
            <Button
              href={siteConfig.google.mapsUrl}
              external
              variant="outline"
              className="sm:w-auto"
            >
              <MapPinIcon size={16} />
              Get directions on Google Maps
            </Button>
          </div>

          {/* Keyless iframe map, lazy-loaded, lightly desaturated */}
          <div className="border border-hairline overflow-hidden bg-paper-deep relative">
            <iframe
              title="Bhawanshilp Architect Studio Map"
              src={mapEmbedUrl}
              width="100%"
              height="450"
              style={{
                border: 0,
                filter: 'grayscale(35%) contrast(95%) sepia(8%)',
              }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Map location of Bhawanshilp Architect office in Naubasta, Kanpur"
            />
          </div>
        </div>
      </Container>
    </div>
  );
}
