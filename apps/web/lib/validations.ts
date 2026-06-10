import * as z from 'zod';

export const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(100, { message: 'Full name must be less than 100 characters.' }),
  email: z
    .string()
    .min(1, { message: 'Email address is required.' })
    .email({ message: 'Please enter a valid email address.' }),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required.' })
    .regex(/^(?:\+91|91)?[6-9]\d{9}$/, {
      message: 'Please enter a valid 10-digit Indian phone number.',
    }),
  companyName: z
    .string()
    .max(100, { message: 'Company name must be less than 100 characters.' })
    .optional()
    .or(z.literal('')),
  serviceInterested: z.string().min(1, { message: 'Please select a service of interest.' }),
  budgetRange: z.string().min(1, { message: 'Please select your budget range.' }),
  timeline: z.string().min(1, { message: 'Please select your project timeline.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(1000, { message: 'Message must be less than 1000 characters.' }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const jobApplicationSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters.' })
    .max(100, { message: 'Full name must be less than 100 characters.' }),
  email: z
    .string()
    .min(1, { message: 'Email address is required.' })
    .email({ message: 'Please enter a valid email address.' }),
  phone: z
    .string()
    .min(1, { message: 'Phone number is required.' })
    .regex(/^(?:\+91|91)?[6-9]\d{9}$/, {
      message: 'Please enter a valid 10-digit Indian phone number.',
    }),
  currentLocation: z
    .string()
    .min(2, { message: 'Current location is required.' })
    .max(100, { message: 'Location must be less than 100 characters.' }),
  qualification: z.string().min(1, { message: 'Please select your highest qualification.' }),
  experienceLevel: z.string().min(1, { message: 'Please select your experience level.' }),
  portfolioUrl: z
    .string()
    .url({ message: 'Please enter a valid URL.' })
    .optional()
    .or(z.literal('')),
  linkedinUrl: z
    .string()
    .url({ message: 'Please enter a valid URL.' })
    .optional()
    .or(z.literal('')),
  coverLetter: z
    .string()
    .min(100, { message: 'Cover letter must be at least 100 characters.' })
    .max(2000, { message: 'Cover letter must be less than 2000 characters.' }),
  whyJoin: z
    .string()
    .min(50, { message: 'Please write at least 50 characters.' })
    .max(1000, { message: 'Must be less than 1000 characters.' }),
  referralSource: z.string().min(1, { message: 'Please tell us how you heard about us.' }),
  resume: z
    .any()
    .refine((files) => files && files.length > 0, { message: 'Resume PDF is required.' })
    .refine((files) => !files || !files[0] || files[0].size <= 5 * 1024 * 1024, {
      message: 'Max file size is 5MB.',
    })
    .refine(
      (files) => !files || !files[0] || ['application/pdf'].includes(files[0].type),
      { message: 'Only PDF files are accepted.' }
    ),
});

export type JobApplicationValues = z.infer<typeof jobApplicationSchema>;

