'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { EnquiryData, submitEnquiry, buildWhatsAppMessage } from '@/lib/enquiry';
import { validatePhone, validateEmail, validateRequired } from '@/lib/validators';
import { waLink } from '@/lib/whatsapp';
import { siteConfig } from '@/data/site';
import { SheetLabel } from '@/components/SheetLabel';
import { Button } from '@/components/Button';
import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon';
import { PhoneIcon } from '@/components/icons/PhoneIcon';
import { CheckIcon } from '@/components/icons/CheckIcon';
import { ArrowRightIcon } from '@/components/icons/ArrowRightIcon';

interface EnquiryFormProps {
  initialProjectType?: string;
  className?: string;
}

const PROJECT_TYPES = [
  'House',
  'Multi-storey or apartment building',
  'Shop or commercial',
  'Interior only',
  'Landscape or urban planning',
  'Not sure yet',
] as const;

const STAGES = [
  'I have a plot',
  'Planning to buy',
  'Redesigning an existing building',
] as const;

const BUDGETS = [
  'Under ₹20 Lakhs',
  '₹20 Lakhs – ₹50 Lakhs',
  '₹50 Lakhs – ₹1 Crore',
  'Above ₹1 Crore',
  'Prefer not to say',
] as const;

const CONTACT_METHODS = ['WhatsApp', 'Call', 'Visit the office'] as const;
const PREFERRED_TIMES = ['Morning', 'Afternoon', 'Evening'] as const;

function EnquiryFormInner({ initialProjectType, className = '' }: EnquiryFormProps) {
  const searchParams = useSearchParams();
  const queryType = searchParams.get('type') || undefined;
  const effectiveProjectType = initialProjectType || queryType || 'House';

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState<EnquiryData>({
    projectType: effectiveProjectType,
    city: 'Kanpur',
    plotSize: '',
    stage: 'I have a plot',
    budget: 'Prefer not to say',
    name: '',
    phone: '',
    email: '',
    message: '',
    preferredContact: 'WhatsApp',
    preferredTime: 'Morning',
  });

  // Validation Errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Container & Heading refs for focus and smooth scroll
  const formContainerRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  // Focus step heading on transition & scroll into view smoothly
  useEffect(() => {
    if (stepHeadingRef.current) {
      stepHeadingRef.current.focus();
    }
    if (formContainerRef.current && step > 1) {
      formContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [step]);

  // Step 1 Validation
  const handleNextStep1 = () => {
    if (!formData.projectType) {
      setErrors({ projectType: 'Please select what type of project you are planning' });
      return;
    }
    setErrors({});
    setStep(2);
  };

  // Step 2 Validation
  const handleNextStep2 = () => {
    const cityVal = validateRequired(formData.city, 'City / Location');
    if (!cityVal.valid) {
      setErrors({ city: cityVal.error || 'Please enter your project city or location' });
      const cityEl = document.getElementById('city');
      cityEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      cityEl?.focus();
      return;
    }
    setErrors({});
    setStep(3);
  };

  // Step 3 & Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    const nameVal = validateRequired(formData.name, 'Your name');
    if (!nameVal.valid) newErrors.name = nameVal.error || 'Please enter your name';

    const phoneVal = validatePhone(formData.phone);
    if (!phoneVal.valid) newErrors.phone = phoneVal.error || 'Please enter a valid 10-digit Indian mobile number';

    if (formData.email && formData.email.trim() !== '') {
      const emailVal = validateEmail(formData.email);
      if (!emailVal.valid) newErrors.email = emailVal.error || 'Please enter a valid email';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Auto-scroll to first invalid field
      const firstErrorId = Object.keys(newErrors)[0];
      const el = document.getElementById(firstErrorId);
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el?.focus();
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await submitEnquiry(formData);
      setIsSuccess(true);
    } catch {
      setErrors({ form: 'An error occurred while submitting. Please call or WhatsApp us directly.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    const waMessage = buildWhatsAppMessage(formData);
    const waUrl = waLink(waMessage);

    return (
      <div ref={formContainerRef} className={`border border-hairline bg-paper-deep p-5 sm:p-10 ${className}`}>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-8 w-8 items-center justify-center bg-brass text-paper">
            <CheckIcon className="h-4 w-4" />
          </div>
          <SheetLabel>ENTRY RECORDED // READY TO SEND</SheetLabel>
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-light text-ink mb-2">
          Thank you, {formData.name}
        </h3>

        <p className="text-ink-soft text-sm sm:text-base leading-relaxed mb-6">
          Your project specifications have been compiled. WhatsApp is the fastest way to connect directly with Ar. Mayank Tiwari for an immediate response.
        </p>

        {/* Summary Card */}
        <div className="bg-paper border border-hairline p-4 sm:p-5 mb-8 font-mono text-xs space-y-2">
          <div className="text-ink-soft uppercase text-[10px] tracking-wider pb-1.5 border-b border-hairline">
            Specification Summary
          </div>
          <div className="flex justify-between py-1 border-b border-hairline/40">
            <span className="text-ink-soft">Project Type:</span>
            <span className="text-ink font-semibold">{formData.projectType}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-hairline/40">
            <span className="text-ink-soft">Location:</span>
            <span className="text-ink font-semibold">{formData.city}</span>
          </div>
          {formData.plotSize && (
            <div className="flex justify-between py-1 border-b border-hairline/40">
              <span className="text-ink-soft">Plot Size:</span>
              <span className="text-ink">{formData.plotSize}</span>
            </div>
          )}
          <div className="flex justify-between py-1 border-b border-hairline/40">
            <span className="text-ink-soft">Stage:</span>
            <span className="text-ink">{formData.stage}</span>
          </div>
          <div className="flex justify-between pt-1">
            <span className="text-ink-soft">Contact Method:</span>
            <span className="text-ink font-semibold">{formData.preferredContact} ({formData.preferredTime})</span>
          </div>
        </div>

        {/* Primary Action: Send on WhatsApp */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            href={waUrl}
            external
            variant="whatsapp"
            className="flex-1 text-center py-3.5"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Send on WhatsApp Now
          </Button>
          <Button
            href={`tel:${siteConfig.phone}`}
            variant="outline"
            className="sm:w-auto text-center py-3.5"
          >
            <PhoneIcon className="h-4 w-4" />
            Call Ar. Mayank Tiwari
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div ref={formContainerRef} className={`border border-hairline bg-paper p-5 sm:p-10 ${className}`}>
      {/* Step Indicator Header */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-hairline">
        <SheetLabel>
          SHEET ENQ-01 // STEP 0{step} OF 03
        </SheetLabel>
        <div className="flex gap-2">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`h-1.5 w-7 transition-all duration-300 ${
                num === step
                  ? 'bg-brass w-10'
                  : num < step
                  ? 'bg-ink'
                  : 'bg-paper-deep border border-hairline'
              }`}
            />
          ))}
        </div>
      </div>

      {/* STEP 1: What are you planning? */}
      {step === 1 && (
        <fieldset className="animate-in fade-in duration-200">
          <legend className="sr-only">What are you planning?</legend>
          <h3
            ref={stepHeadingRef}
            tabIndex={-1}
            className="font-display text-2xl sm:text-3xl font-light text-ink mb-2 focus:outline-none"
          >
            What are you planning to build or design?
          </h3>
          <p className="text-ink-soft text-sm mb-6 leading-relaxed">
            Select the category that best matches your project.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
            {PROJECT_TYPES.map((type) => {
              const isSelected = formData.projectType === type;
              return (
                <button
                  type="button"
                  key={type}
                  onClick={() => {
                    setFormData({ ...formData, projectType: type });
                    setErrors({});
                  }}
                  className={`text-left p-4 min-h-[52px] border transition-all duration-150 flex items-center justify-between active:scale-[0.99] ${
                    isSelected
                      ? 'border-brass bg-paper-deep text-ink font-medium ring-1 ring-brass'
                      : 'border-hairline bg-paper text-ink-soft hover:border-ink hover:text-ink'
                  }`}
                >
                  <span className="text-sm font-body">{type}</span>
                  {isSelected && <span className="h-2.5 w-2.5 rounded-full bg-brass shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {errors.projectType && (
            <p className="text-xs text-red-700 font-mono mb-4">{errors.projectType}</p>
          )}

          <div className="flex justify-end pt-4 border-t border-hairline">
            <Button onClick={handleNextStep1} variant="primary" className="w-full sm:w-auto py-3.5">
              Next: Project Details
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </fieldset>
      )}

      {/* STEP 2: Project Details */}
      {step === 2 && (
        <fieldset className="animate-in fade-in duration-200">
          <legend className="sr-only">Project Details</legend>
          <h3
            ref={stepHeadingRef}
            tabIndex={-1}
            className="font-display text-2xl sm:text-3xl font-light text-ink mb-2 focus:outline-none"
          >
            Where is the project and what stage is it at?
          </h3>
          <p className="text-ink-soft text-sm mb-6 leading-relaxed">
            Share plot specifications if you have them.
          </p>

          <div className="space-y-5 mb-8">
            {/* City or location: text-base (16px) on mobile prevents iOS zoom */}
            <div>
              <label htmlFor="city" className="block text-xs font-mono uppercase tracking-wider text-ink mb-1.5">
                City / Location <span className="text-brass-deep">*</span>
              </label>
              <input
                id="city"
                type="text"
                autoComplete="address-level2"
                enterKeyHint="next"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="e.g. Kanpur (Naubasta / Swaroop Nagar / Kalyanpur) or Lucknow"
                className="w-full border border-hairline bg-paper px-4 py-3 text-base md:text-sm text-ink focus:border-brass focus:outline-none rounded-none"
              />
              {errors.city && (
                <p className="text-xs text-red-700 font-mono mt-1">{errors.city}</p>
              )}
            </div>

            {/* Plot size */}
            <div>
              <label htmlFor="plotSize" className="block text-xs font-mono uppercase tracking-wider text-ink mb-1.5">
                Plot Size <span className="text-ink-soft text-[10px]">(Optional)</span>
              </label>
              <input
                id="plotSize"
                type="text"
                enterKeyHint="next"
                value={formData.plotSize}
                onChange={(e) => setFormData({ ...formData, plotSize: e.target.value })}
                placeholder="e.g. 150 sq yards, 30x50 ft, or 2000 sq ft"
                className="w-full border border-hairline bg-paper px-4 py-3 text-base md:text-sm text-ink focus:border-brass focus:outline-none rounded-none"
              />
            </div>

            {/* Stage */}
            <div>
              <span className="block text-xs font-mono uppercase tracking-wider text-ink mb-2">
                Current Stage
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {STAGES.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setFormData({ ...formData, stage: s })}
                    className={`p-3 text-left border text-xs min-h-[46px] transition-colors active:scale-[0.99] ${
                      formData.stage === s
                        ? 'border-brass bg-paper-deep font-semibold text-ink'
                        : 'border-hairline text-ink-soft hover:border-ink hover:text-ink'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div>
              <span className="block text-xs font-mono uppercase tracking-wider text-ink mb-2">
                Estimated Budget Range <span className="text-ink-soft text-[10px]">(Optional)</span>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {BUDGETS.map((b) => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setFormData({ ...formData, budget: b })}
                    className={`p-2.5 text-center border text-xs min-h-[46px] transition-colors active:scale-[0.99] ${
                      formData.budget === b
                        ? 'border-brass bg-paper-deep font-semibold text-ink'
                        : 'border-hairline text-ink-soft hover:border-ink hover:text-ink'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-hairline gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-xs font-mono uppercase tracking-wider text-ink-soft hover:text-ink min-h-[44px] px-3 active:scale-95"
            >
              ← Back
            </button>
            <Button onClick={handleNextStep2} variant="primary" className="py-3.5">
              Next: Contact Details
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </fieldset>
      )}

      {/* STEP 3: Contact */}
      {step === 3 && (
        <form onSubmit={handleSubmit} className="animate-in fade-in duration-200">
          <fieldset>
            <legend className="sr-only">Contact Details</legend>
            <h3
              ref={stepHeadingRef}
              tabIndex={-1}
              className="font-display text-2xl sm:text-3xl font-light text-ink mb-2 focus:outline-none"
            >
              How should we reach you?
            </h3>
            <p className="text-ink-soft text-sm mb-6 leading-relaxed">
              Ar. Mayank Tiwari will review your requirements and reach out directly.
            </p>

            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-ink mb-1.5">
                    Your Name <span className="text-brass-deep">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    enterKeyHint="next"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Full Name"
                    className="w-full border border-hairline bg-paper px-4 py-3 text-base md:text-sm text-ink focus:border-brass focus:outline-none rounded-none"
                  />
                  {errors.name && (
                    <p className="text-xs text-red-700 font-mono mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-ink mb-1.5">
                    Phone (10-Digit Mobile) <span className="text-brass-deep">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    enterKeyHint="next"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 9876543210 or +91 9876543210"
                    className="w-full border border-hairline bg-paper px-4 py-3 text-base md:text-sm text-ink focus:border-brass focus:outline-none rounded-none"
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-700 font-mono mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-ink mb-1.5">
                  Email Address <span className="text-ink-soft text-[10px]">(Optional)</span>
                </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  enterKeyHint="next"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full border border-hairline bg-paper px-4 py-3 text-base md:text-sm text-ink focus:border-brass focus:outline-none rounded-none"
                />
                {errors.email && (
                  <p className="text-xs text-red-700 font-mono mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-ink mb-1.5">
                  Brief Message or Questions <span className="text-ink-soft text-[10px]">(Optional)</span>
                </label>
                <textarea
                  id="message"
                  rows={3}
                  enterKeyHint="done"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us anything specific about your project or timeline..."
                  className="w-full border border-hairline bg-paper px-4 py-3 text-base md:text-sm text-ink focus:border-brass focus:outline-none resize-none rounded-none"
                />
              </div>

              {/* Preferred Contact Method */}
              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-ink mb-2">
                  Preferred Contact Method
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {CONTACT_METHODS.map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setFormData({ ...formData, preferredContact: method })}
                      className={`p-2.5 text-center border text-xs min-h-[46px] transition-colors active:scale-[0.99] ${
                        formData.preferredContact === method
                          ? 'border-brass bg-paper-deep font-semibold text-ink'
                          : 'border-hairline text-ink-soft hover:border-ink hover:text-ink'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preferred Time */}
              <div>
                <span className="block text-xs font-mono uppercase tracking-wider text-ink mb-2">
                  Best Time to Reach You
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {PREFERRED_TIMES.map((time) => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setFormData({ ...formData, preferredTime: time })}
                      className={`p-2.5 text-center border text-xs min-h-[46px] transition-colors active:scale-[0.99] ${
                        formData.preferredTime === time
                          ? 'border-brass bg-paper-deep font-semibold text-ink'
                          : 'border-hairline text-ink-soft hover:border-ink hover:text-ink'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {errors.form && (
              <p className="text-xs text-red-700 font-mono mb-4">{errors.form}</p>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-hairline gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-xs font-mono uppercase tracking-wider text-ink-soft hover:text-ink min-h-[44px] px-3 active:scale-95"
              >
                ← Back
              </button>
              <Button type="submit" disabled={isSubmitting} variant="primary" className="py-3.5">
                {isSubmitting ? 'Recording Details...' : 'Submit & Review'}
              </Button>
            </div>
          </fieldset>
        </form>
      )}
    </div>
  );
}

export function EnquiryForm(props: EnquiryFormProps) {
  return (
    <Suspense
      fallback={
        <div className="border border-hairline bg-paper-deep p-8 animate-pulse text-center font-mono text-xs text-ink-soft min-h-[360px] flex items-center justify-center">
          LOADING SPECIFICATION SHEET...
        </div>
      }
    >
      <EnquiryFormInner {...props} />
    </Suspense>
  );
}
