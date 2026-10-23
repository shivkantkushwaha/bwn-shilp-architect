export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Validates a 10-digit Indian mobile phone number.
 * Accepts numbers with or without +91, 91, or 0 prefixes, and allows common formatting characters like spaces or hyphens.
 */
export function validatePhone(value: string): ValidationResult {
  if (!value || !value.trim()) {
    return { valid: false, error: 'Phone number is required' };
  }

  const cleaned = value.replace(/[\s\-()]/g, '');
  const indianMobileRegex = /^(?:\+?91|0)?[6-9]\d{9}$/;

  if (!indianMobileRegex.test(cleaned)) {
    return {
      valid: false,
      error: 'Please enter a valid 10-digit Indian mobile number',
    };
  }

  return { valid: true };
}

/**
 * Performs basic email validation.
 */
export function validateEmail(value: string): ValidationResult {
  if (!value || !value.trim()) {
    return { valid: false, error: 'Email address is required' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value.trim())) {
    return {
      valid: false,
      error: 'Please enter a valid email address',
    };
  }

  return { valid: true };
}

/**
 * Validates that a required field has non-empty text.
 */
export function validateRequired(value: string, fieldName: string): ValidationResult {
  if (!value || !value.trim()) {
    return {
      valid: false,
      error: `${fieldName} is required`,
    };
  }

  return { valid: true };
}
