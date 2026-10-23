// This is the single place to connect a real backend later.
// Replace the simulated delay with a fetch() to your API endpoint.

export interface EnquiryData {
  // Step 1
  projectType: string;
  // Step 2
  city: string;
  plotSize?: string;
  stage: string;
  budget?: string;
  // Step 3
  name: string;
  phone: string;
  email?: string;
  message?: string;
  preferredContact: string;
  preferredTime: string;
}

export async function submitEnquiry(data: EnquiryData): Promise<{ success: boolean }> {
  // TODO: Replace with actual API call
  // Example: const res = await fetch('/api/enquiry', { method: 'POST', body: JSON.stringify(data) });
  void data;
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return { success: true };
}

export function buildWhatsAppMessage(data: EnquiryData): string {
  const lines = [
    `Hi, I'd like to discuss a project with Bhawanshilp Architect.`,
    ``,
    `*Project type:* ${data.projectType}`,
    `*City / Location:* ${data.city}`,
  ];
  if (data.plotSize) lines.push(`*Plot size:* ${data.plotSize}`);
  lines.push(`*Stage:* ${data.stage}`);
  if (data.budget && data.budget !== 'Prefer not to say') lines.push(`*Budget range:* ${data.budget}`);
  lines.push(``);
  lines.push(`*Name:* ${data.name}`);
  lines.push(`*Phone:* ${data.phone}`);
  if (data.email) lines.push(`*Email:* ${data.email}`);
  if (data.message) lines.push(`*Message:* ${data.message}`);
  lines.push(`*Preferred contact:* ${data.preferredContact}`);
  lines.push(`*Preferred time:* ${data.preferredTime}`);
  return lines.join('\n');
}
