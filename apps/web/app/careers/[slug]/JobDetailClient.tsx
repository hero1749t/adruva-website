'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { cn } from '@/lib/utils';

import { 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  MessageSquare,
  Sparkles,
  Upload,
  Check
} from 'lucide-react';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { jobApplicationSchema, JobApplicationValues } from '@/lib/validations';
import { JobListing } from '@/lib/careers-data';
import { apiFetch } from '@/lib/api';
import { toast, Toaster } from 'sonner';

interface Props {
  job: JobListing;
}

const QUALIFICATION_OPTIONS = [
  { value: 'B.Tech/B.E', label: 'B.Tech / B.E' },
  { value: 'M.Tech/M.E', label: 'M.Tech / M.E' },
  { value: 'BCA', label: 'BCA' },
  { value: 'MCA', label: 'MCA' },
  { value: 'B.Sc', label: 'B.Sc' },
  { value: 'M.Sc', label: 'M.Sc' },
  { value: 'MBA', label: 'MBA' },
  { value: 'Other Graduate', label: 'Other Graduate Degree' },
  { value: 'Other Post-Graduate', label: 'Other Post-Graduate Degree' },
  { value: 'High School/Diploma', label: 'High School / Diploma' }
];

const EXPERIENCE_OPTIONS = [
  { value: 'fresher', label: 'Fresher / Entry Level' },
  { value: '0-1yr', label: '0 – 1 Year' },
  { value: '1-3yr', label: '1 – 3 Years' },
  { value: '3-5yr', label: '3 – 5 Years' },
  { value: '5+yr', label: '5+ Years' }
];

const REFERRAL_OPTIONS = [
  { value: 'LinkedIn', label: 'LinkedIn Post / Search' },
  { value: 'Google Search', label: 'Google Search' },
  { value: 'WhatsApp Group', label: 'WhatsApp Groups' },
  { value: 'Friend Referral', label: 'Friend or Colleague' },
  { value: 'College Placement', label: 'College Placement Cell' },
  { value: 'Other', label: 'Other Sources' }
];

export function JobDetailClient({ job }: Props) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [submittedData, setSubmittedData] = useState<JobApplicationValues | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    reset,
    formState: { errors },
  } = useForm<JobApplicationValues>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      currentLocation: '',
      qualification: '',
      experienceLevel: '',
      portfolioUrl: '',
      linkedinUrl: '',
      coverLetter: '',
      whyJoin: '',
      referralSource: ''
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0 && files[0]) {
      setSelectedFileName(files[0].name);
      setValue('resume', files);
      trigger('resume');
    } else {
      setSelectedFileName('');
    }
  };

  const onUploadClick = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (values: JobApplicationValues) => {
    setSubmitStatus('loading');
    setSubmittedData(values);

    let token = '';
    try {
      if (executeRecaptcha) {
        token = await executeRecaptcha('career_apply');
      } else {
        console.warn('reCAPTCHA not loaded yet, proceeding without token');
      }
    } catch (err) {
      console.error('reCAPTCHA execution failed', err);
    }

    try {
      await apiFetch<any>('/applications', {
        method: 'POST',
        body: JSON.stringify({
          jobId: job.id,
          jobTitle: job.title,
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          currentLocation: values.currentLocation,
          qualification: values.qualification,
          experienceLevel: values.experienceLevel,
          resumeUrl: 'https://example.com/resume-placeholder.pdf', // placeholder for now
          portfolioUrl: values.portfolioUrl || '',
          linkedinUrl: values.linkedinUrl || '',
          coverLetter: values.coverLetter,
          whyJoin: values.whyJoin,
          referralSource: values.referralSource,
          recaptchaToken: token,
        }),
      });

      setSubmitStatus('success');
      toast.success('Application submitted successfully!');
      setSelectedFileName('');
      reset();
    } catch (error) {
      console.error('Careers form submission error:', error);
      setSubmitStatus('error');
      toast.error('Something went wrong. Please submit your application via WhatsApp.');
    }
  };

  const getWhatsAppFallbackUrl = () => {
    if (!submittedData) return '#';
    const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
    const text = `Hi Adruva Solutions! I submitted a job application but couldn't reach the server.
*Job Title:* ${job.title}
*Name:* ${submittedData.fullName}
*Email:* ${submittedData.email}
*Phone:* ${submittedData.phone}
*Location:* ${submittedData.currentLocation}
*Qualification:* ${submittedData.qualification}
*Experience:* ${submittedData.experienceLevel}
*Portfolio:* ${submittedData.portfolioUrl || 'N/A'}
*LinkedIn:* ${submittedData.linkedinUrl || 'N/A'}
*Why Join:* ${submittedData.whyJoin}

I will email my Resume PDF separately to hello@adruvasolution.com.`;

    return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
  };

  const typeLabel = job.type === 'full_time' ? 'Full-Time' : job.type === 'internship' ? 'Internship' : 'Freelance';

  return (
    <div className="w-full bg-background text-foreground transition-colors duration-300">
      <Toaster position="top-right" richColors />

      {/* Breadcrumb & Navigation */}
      <div className="bg-muted/30 py-4 border-b border-border transition-colors duration-300">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-inter">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Link href="/" className="hover:text-brand-orange transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/careers" className="hover:text-brand-orange transition-colors">
                Careers
              </Link>
              <span>/</span>
              <span className="text-foreground font-semibold">{job.title}</span>
            </div>
            <Link 
              href="/careers" 
              className="flex items-center gap-1 text-xs font-bold text-brand-orange hover:text-brand-orange/80 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Careers
            </Link>
          </div>
        </Container>
      </div>

      {/* Main content grid */}
      <Section className="py-12 md:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Job Spec (7 / 12 columns) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Header card info */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-brand-orange/5 border-brand-orange/20 text-brand-orange text-[10px] px-2.5 py-0.5 rounded-full capitalize font-semibold font-space-grotesk">
                    {typeLabel}
                  </Badge>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground text-[10px] px-2.5 py-0.5 rounded-full capitalize font-semibold border-none font-space-grotesk">
                    {job.location_type}
                  </Badge>
                  <Badge variant="outline" className="text-muted-foreground text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-semibold border-border font-space-grotesk">
                    {job.department}
                  </Badge>
                </div>
                
                <h1 className="text-3xl sm:text-4xl font-extrabold text-brand-navy dark:text-white font-poppins leading-tight tracking-tight">
                  {job.title}
                </h1>
                
                <div className="h-1 w-12 bg-brand-orange rounded-full" />
              </div>

              {/* Quick Info Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-border/40 bg-card/40 font-space-grotesk">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">Experience</span>
                  <span className="text-xs font-extrabold text-brand-navy dark:text-white mt-1 capitalize">{job.experience_level.replace('-', '–')}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">Openings</span>
                  <span className="text-xs font-extrabold text-brand-navy dark:text-white mt-1">{job.openings_count} Position{job.openings_count > 1 ? 's' : ''}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">Deadline</span>
                  <span className="text-xs font-extrabold text-brand-navy dark:text-white mt-1">
                    {new Date(job.application_deadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">Salary / Stipend</span>
                  <span className="text-xs font-extrabold text-brand-orange mt-1">{job.salary_label}</span>
                </div>
              </div>

              {/* Job description details */}
              <div className="space-y-6 text-sm text-muted-foreground leading-relaxed font-inter">
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-brand-navy dark:text-white font-poppins">
                    About the Role
                  </h3>
                  <p>{job.description}</p>
                </div>

                {/* Responsibilities */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-brand-navy dark:text-white font-poppins">
                    What You&apos;ll Do
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.responsibilities.map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-brand-navy dark:text-white font-poppins">
                    What We&apos;re Looking For
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                {/* Skills required tag pills */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-brand-navy dark:text-white font-poppins">
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {job.skills_required.map((skill, i) => (
                      <span key={i} className="text-xs font-medium bg-muted text-muted-foreground border border-border/40 px-3 py-1 rounded-lg">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Perks */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-brand-navy dark:text-white font-poppins">
                    Perks & Benefits
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.perks.map((perk, i) => (
                      <li key={i}>{perk}</li>
                    ))}
                  </ul>
                </div>

                {/* Process Steps */}
                <div className="space-y-4 pt-4">
                  <h3 className="text-base font-bold text-brand-navy dark:text-white font-poppins">
                    Hiring Process for this Role
                  </h3>
                  <div className="grid grid-cols-1 gap-3 font-space-grotesk">
                    {job.process_steps.map((step) => (
                      <div key={step.step} className="flex items-center gap-3 p-3 rounded-lg border border-border/20 bg-card/25">
                        <span className="flex items-center justify-center h-6 w-6 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold shrink-0">
                          {step.step}
                        </span>
                        <div>
                          <span className="text-xs font-bold text-brand-navy dark:text-white block">{step.title}</span>
                          <span className="text-[11px] text-muted-foreground leading-normal block font-inter mt-0.5">{step.description}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Application Form (5 / 12 columns) */}
            <div className="lg:col-span-5">
              <Card className="border-border/80 bg-card rounded-2xl shadow-xl overflow-hidden sticky top-24">
                <CardHeader className="bg-muted/10 p-6 border-b border-border/40">
                  <CardTitle className="text-xl font-bold font-poppins text-secondary dark:text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-brand-orange fill-brand-orange" />
                    Apply for this Position
                  </CardTitle>
                  <CardDescription className="text-xs text-muted-foreground mt-1.5 font-inter">
                    Send in your details and PDF resume. We will respond within 7 business days.
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 font-inter max-h-[75vh] overflow-y-auto">
                  {/* Status Banners */}
                  {submitStatus === 'success' && (
                    <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-xs">Application Submitted!</p>
                        <p className="text-[11px] mt-1">We have received your application successfully. Our team will review your details and resume within 7 business days.</p>
                      </div>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div className="flex-grow">
                        <p className="font-bold text-xs">Submission Failed</p>
                        <p className="text-[11px] mt-1">Server connection failed. Please click the button below to submit your details directly via WhatsApp instead.</p>
                        <a
                          href={getWhatsAppFallbackUrl()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 mt-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-lg text-[10px] font-bold transition-colors shadow-md"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-current" />
                          Send Details via WhatsApp
                        </a>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-text-primary dark:text-white uppercase tracking-wider">
                        Full Name <span className="text-brand-orange">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. Rahul Bisht"
                        {...register('fullName')}
                        className={cn('border-border/80 focus-visible:ring-brand-orange text-xs h-9', errors.fullName && 'border-red-500')}
                      />
                      {errors.fullName && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.fullName.message as string}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-text-primary dark:text-white uppercase tracking-wider">
                        Email Address <span className="text-brand-orange">*</span>
                      </label>
                      <Input
                        type="email"
                        placeholder="e.g. rahul@example.com"
                        {...register('email')}
                        className={cn('border-border/80 focus-visible:ring-brand-orange text-xs h-9', errors.email && 'border-red-500')}
                      />
                      {errors.email && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.email.message as string}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-text-primary dark:text-white uppercase tracking-wider">
                        Phone Number <span className="text-brand-orange">*</span>
                      </label>
                      <Input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        {...register('phone')}
                        className={cn('border-border/80 focus-visible:ring-brand-orange text-xs h-9', errors.phone && 'border-red-500')}
                      />
                      {errors.phone && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.phone.message as string}</p>
                      )}
                    </div>

                    {/* Current Location */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-text-primary dark:text-white uppercase tracking-wider">
                        Current Location <span className="text-brand-orange">*</span>
                      </label>
                      <Input
                        type="text"
                        placeholder="e.g. Dehradun, Uttarakhand"
                        {...register('currentLocation')}
                        className={cn('border-border/80 focus-visible:ring-brand-orange text-xs h-9', errors.currentLocation && 'border-red-500')}
                      />
                      {errors.currentLocation && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.currentLocation.message as string}</p>
                      )}
                    </div>

                    {/* Dropdowns: Qualification + Experience */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-text-primary dark:text-white uppercase tracking-wider">
                          Qualification <span className="text-brand-orange">*</span>
                        </label>
                        <select
                          {...register('qualification')}
                          className={cn(
                            'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 border-border/80 focus-visible:ring-brand-orange',
                            errors.qualification && 'border-red-500'
                          )}
                        >
                          <option value="">Select</option>
                          {QUALIFICATION_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {errors.qualification && (
                          <p className="text-[10px] text-red-500 mt-1">{errors.qualification.message as string}</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-text-primary dark:text-white uppercase tracking-wider">
                          Experience <span className="text-brand-orange">*</span>
                        </label>
                        <select
                          {...register('experienceLevel')}
                          className={cn(
                            'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 border-border/80 focus-visible:ring-brand-orange',
                            errors.experienceLevel && 'border-red-500'
                          )}
                        >
                          <option value="">Select</option>
                          {EXPERIENCE_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        {errors.experienceLevel && (
                          <p className="text-[10px] text-red-500 mt-1">{errors.experienceLevel.message as string}</p>
                        )}
                      </div>
                    </div>

                    {/* Resume File Upload Component */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-text-primary dark:text-white uppercase tracking-wider">
                        Resume PDF <span className="text-brand-orange">*</span>
                      </label>
                      <input 
                        type="file" 
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        ref={fileInputRef}
                      />
                      
                      <div 
                        onClick={onUploadClick}
                        className={cn(
                          'border border-dashed border-border/60 hover:border-brand-orange/50 rounded-lg p-4 flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-muted/10 transition-colors',
                          errors.resume && 'border-red-500 bg-red-500/5'
                        )}
                      >
                        {selectedFileName ? (
                          <>
                            <Check className="h-5 w-5 text-green-500" />
                            <span className="text-[11px] font-semibold text-foreground text-center truncate max-w-full">
                              {selectedFileName}
                            </span>
                            <span className="text-[9px] text-muted-foreground">Click to change</span>
                          </>
                        ) : (
                          <>
                            <Upload className="h-5 w-5 text-muted-foreground/60" />
                            <span className="text-[11px] font-semibold text-foreground">Upload Resume PDF</span>
                            <span className="text-[9px] text-muted-foreground">Max file size: 5MB</span>
                          </>
                        )}
                      </div>
                      {errors.resume && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.resume.message as string}</p>
                      )}
                    </div>

                    {/* Links: Portfolio + LinkedIn */}
                    <div className="space-y-3 border-t border-border/15 pt-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-text-primary dark:text-white uppercase tracking-wider">
                          Portfolio URL
                        </label>
                        <Input
                          type="url"
                          placeholder="e.g. https://myportfolio.com"
                          {...register('portfolioUrl')}
                          className="border-border/80 focus-visible:ring-brand-orange text-xs h-9"
                        />
                        {errors.portfolioUrl && (
                          <p className="text-[10px] text-red-500 mt-1">{errors.portfolioUrl.message as string}</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-text-primary dark:text-white uppercase tracking-wider">
                          LinkedIn Profile URL
                        </label>
                        <Input
                          type="url"
                          placeholder="e.g. https://linkedin.com/in/username"
                          {...register('linkedinUrl')}
                          className="border-border/80 focus-visible:ring-brand-orange text-xs h-9"
                        />
                        {errors.linkedinUrl && (
                          <p className="text-[10px] text-red-500 mt-1">{errors.linkedinUrl.message as string}</p>
                        )}
                      </div>
                    </div>

                    {/* Textareas: Cover Letter + Why Join */}
                    <div className="space-y-1.5 border-t border-border/15 pt-3">
                      <label className="text-[10px] font-bold text-text-primary dark:text-white uppercase tracking-wider">
                        Cover Letter <span className="text-brand-orange">*</span>
                      </label>
                      <Textarea
                        rows={4}
                        placeholder="Explain your technical experiences, projects, and why you are suitable for this role (min 100 characters)..."
                        {...register('coverLetter')}
                        className={cn('border-border/80 focus-visible:ring-brand-orange text-xs leading-normal resize-y', errors.coverLetter && 'border-red-500')}
                      />
                      {errors.coverLetter && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.coverLetter.message as string}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-text-primary dark:text-white uppercase tracking-wider">
                        Why do you want to join Adruva? <span className="text-brand-orange">*</span>
                      </label>
                      <Textarea
                        rows={3}
                        placeholder="What excites you about working with our team (min 50 characters)..."
                        {...register('whyJoin')}
                        className={cn('border-border/80 focus-visible:ring-brand-orange text-xs leading-normal resize-y', errors.whyJoin && 'border-red-500')}
                      />
                      {errors.whyJoin && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.whyJoin.message as string}</p>
                      )}
                    </div>

                    {/* Referral source */}
                    <div className="space-y-1.5 border-t border-border/15 pt-3">
                      <label className="text-[10px] font-bold text-text-primary dark:text-white uppercase tracking-wider">
                        How did you hear about us? <span className="text-brand-orange">*</span>
                      </label>
                      <select
                        {...register('referralSource')}
                        className={cn(
                          'flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-xs ring-offset-background file:border-0 file:bg-transparent file:text-xs file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 border-border/80 focus-visible:ring-brand-orange',
                          errors.referralSource && 'border-red-500'
                        )}
                      >
                        <option value="">Select Source</option>
                        {REFERRAL_OPTIONS.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {errors.referralSource && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.referralSource.message as string}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={submitStatus === 'loading'}
                      className="w-full bg-brand-orange hover:bg-brand-orange/95 text-white py-5 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all duration-300 shadow-md hover:shadow-brand-orange/15 hover:shadow-lg"
                    >
                      {submitStatus === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          Submit Application
                          <ArrowLeft className="w-4 h-4 rotate-180 transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

          </div>
        </Container>
      </Section>
    </div>
  );
}
export default JobDetailClient;
