'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  ArrowRight, 
  Sparkle, 
  Building,
  Tag,
  Clock,
  Code2,
  ExternalLink
} from 'lucide-react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { projects, ProjectItem } from '@/lib/work-data';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SectionTag } from '@/components/ui/section-tag';
import { cn } from '@/lib/utils';

interface CaseStudyClientProps {
  project: ProjectItem;
}

export function CaseStudyClient({ project }: CaseStudyClientProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const checkReducedMotion = () => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
    };
    checkReducedMotion();
  }, []);

  // Filter related projects (aim for same category, fallback to others to get exactly 3)
  let relatedProjects = projects.filter((p) => p.category === project.category && p.slug !== project.slug);
  if (relatedProjects.length < 3) {
    const otherProjects = projects.filter((p) => p.slug !== project.slug && !relatedProjects.find((rp) => rp.slug === p.slug));
    relatedProjects = [...relatedProjects, ...otherProjects].slice(0, 3);
  }

  // Animation variants
  const fadeInUp = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  return (
    <div className="w-full bg-background text-foreground transition-colors duration-300">
      
      {/* a) & b) Breadcrumbs & Hero Section */}
      <Section className="pt-10 pb-16 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.04)_0%,transparent_70%)] pointer-events-none select-none z-0" />

        <Container className="relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium mb-8 font-inter">
            <Link href="/" className="hover:text-brand-orange transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <Link href="/work" className="hover:text-brand-orange transition-colors">
              Our Work
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <span className="text-foreground font-semibold">{project.title}</span>
          </nav>

          {/* Hero Content */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider font-space-grotesk border-brand-orange/20 text-brand-orange bg-brand-orange/5 px-2.5 py-1">
                {project.category}
              </Badge>
              <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-wider font-space-grotesk px-2.5 py-1">
                {project.industry}
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-brand-navy dark:text-white leading-[1.15] mb-6 font-poppins">
              {project.title}
            </h1>
            
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto font-inter">
              {project.overview}
            </p>
          </div>

          {/* Full-width 16:9 Gradient Header Banner */}
          <div className={cn(
            'w-full aspect-[21/9] rounded-3xl bg-gradient-to-br flex items-center justify-center relative overflow-hidden select-none shadow-2xl',
            project.heroGradient
          )}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,transparent_85%)] mix-blend-overlay" />
            <div className="relative z-10 flex flex-col items-center">
              <Sparkle className="h-8 w-8 text-white/45 animate-pulse mb-3" />
              <span className="text-xs font-bold text-white/50 tracking-[0.2em] uppercase font-space-grotesk">
                Case Study Project Artifact
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* c) Quick Stats Bar */}
      <Section className="py-6 border-y border-border/20 bg-muted/5 relative z-10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center max-w-4xl mx-auto">
            {/* Industry */}
            <div className="flex flex-col items-center p-3 border-r border-border/10 last:border-0 md:border-r">
              <Building className="h-4.5 w-4.5 text-brand-orange mb-2" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-space-grotesk mb-1">
                INDUSTRY
              </span>
              <span className="text-xs font-semibold text-brand-navy dark:text-white font-inter">
                {project.industry.toUpperCase()}
              </span>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-col items-center p-3 border-r border-border/10 last:border-0 md:border-r">
              <Code2 className="h-4.5 w-4.5 text-brand-orange mb-2" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-space-grotesk mb-1">
                TECH STACK
              </span>
              <span className="text-xs font-semibold text-brand-navy dark:text-white font-inter truncate max-w-full">
                {project.techStack.slice(0, 2).join(' / ')}
              </span>
            </div>

            {/* Timeline */}
            <div className="flex flex-col items-center p-3 border-r border-border/10 last:border-0 md:border-r">
              <Clock className="h-4.5 w-4.5 text-brand-orange mb-2" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-space-grotesk mb-1">
                TIMELINE
              </span>
              <span className="text-xs font-semibold text-brand-navy dark:text-white font-inter">
                {project.timeline}
              </span>
            </div>

            {/* Category */}
            <div className="flex flex-col items-center p-3">
              <Tag className="h-4.5 w-4.5 text-brand-orange mb-2" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-space-grotesk mb-1">
                CATEGORY
              </span>
              <span className="text-xs font-semibold text-brand-navy dark:text-white font-inter">
                {project.category.toUpperCase()}
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* d) & e) Problem & Solution Section */}
      <Section className="py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start max-w-4xl mx-auto">
            {/* The Challenge */}
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="flex flex-col items-start"
            >
              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-3 font-space-grotesk">
                THE CHALLENGE
              </span>
              <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white mb-4 font-poppins">
                The Business Problem
              </h2>
              <div className="h-1 w-10 bg-brand-orange rounded-full mb-6" />
              <p className="text-xs text-muted-foreground leading-relaxed font-inter">
                {project.problem}
              </p>
            </motion.div>

            {/* Our Solution */}
            <motion.div 
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="flex flex-col items-start"
            >
              <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-3 font-space-grotesk">
                OUR APPROACH
              </span>
              <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white mb-4 font-poppins">
                The Engineering Solution
              </h2>
              <div className="h-1 w-10 bg-brand-orange rounded-full mb-6" />
              <p className="text-xs text-muted-foreground leading-relaxed font-inter">
                {project.solution}
              </p>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* f) Tech Stack badges row */}
      <Section className="bg-muted/10 border-y border-border/20 py-12">
        <Container>
          <div className="text-center max-w-md mx-auto mb-8">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-1 font-space-grotesk">
              SYSTEM ARCHITECTURE
            </span>
            <h3 className="text-base font-bold text-brand-navy dark:text-white font-poppins">
              Technologies Utilized
            </h3>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-xl mx-auto">
            {project.techStack.map((tech) => (
              <div key={tech} className="px-3 py-1.5 rounded-lg border border-border/30 bg-card shadow-sm text-xs font-semibold text-brand-navy/80 dark:text-white/80 font-space-grotesk">
                {tech}
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* g) Results Cards Section */}
      <Section className="py-16 md:py-24 bg-brand-navy text-white dark:bg-[#070707] dark:border-y dark:border-white/10">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionTag className="justify-center text-white">THE IMPACT</SectionTag>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight font-poppins">
              Project results & outcomes
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-4 mx-auto" />
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          >
            {project.results.map((result, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="p-6 rounded-2xl border border-white/5 bg-white/5 text-center flex flex-col justify-center items-center backdrop-blur-sm"
              >
                <span className="text-3xl md:text-4xl font-extrabold text-brand-orange block mb-2 font-poppins">
                  {result.metric}
                </span>
                <span className="text-xs font-semibold text-white/80 font-space-grotesk tracking-wide uppercase">
                  {result.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* h) Screenshots Gallery */}
      <Section className="py-16 md:py-24">
        <Container>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <SectionTag className="justify-center">VISUAL WORK</SectionTag>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
              Interface screenshots & flows
            </h2>
            <div className="h-1 w-12 bg-brand-orange rounded-full mt-4 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {project.gallery.map((gradient, index) => (
              <Dialog key={index}>
                <DialogTrigger
                  render={
                    <button className={cn(
                      'h-48 w-full rounded-2xl bg-gradient-to-br flex items-center justify-center relative overflow-hidden group focus:outline-none shadow-md border border-border/20 cursor-zoom-in transition-transform duration-300 hover:scale-[1.02]',
                      gradient
                    )}>
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                      <span className="text-[9px] font-bold text-white/60 tracking-wider uppercase font-space-grotesk">
                        Screenshot {index + 1}
                      </span>
                    </button>
                  }
                />
                <DialogContent className="max-w-3xl border-none p-0 overflow-hidden bg-transparent shadow-none flex items-center justify-center">
                  <DialogTitle className="sr-only">Screenshot {index + 1} Lightbox Preview</DialogTitle>
                  <DialogDescription className="sr-only">Case study screenshot preview mockup</DialogDescription>
                  <div className={cn(
                    'w-full aspect-video rounded-3xl bg-gradient-to-br flex items-center justify-center text-white font-extrabold text-xl shadow-2xl relative border border-white/10',
                    gradient
                  )}>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.15)_0%,transparent_85%)] mix-blend-overlay" />
                    <span className="font-space-grotesk tracking-widest text-white/50 text-xs uppercase">
                      SCREENSHOT {index + 1} FULL MOCKUP
                    </span>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </Container>
      </Section>

      {/* i) CTA: Let's Talk */}
      <Section className="bg-muted/10 border-y border-border/20 py-16 text-center">
        <Container>
          <div className="max-w-xl mx-auto">
            <span className="text-[10px] font-bold text-brand-orange uppercase tracking-wider block mb-3 font-space-grotesk">
              COLLABORATION OPPORTUNITY
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-brand-navy dark:text-white mb-3 font-poppins">
              Have a similar project in mind?
            </h2>
            <p className="text-xs text-muted-foreground mb-8 font-inter">
              Get an honest technical scope check and estimated budget numbers for your company.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-bold h-12 px-6 rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-[0_4px_14px_rgba(255,107,0,0.3)] mx-auto"
              >
                Let&apos;s Talk
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </Section>

      {/* j) Related Projects Section */}
      {relatedProjects.length > 0 && (
        <Section className="py-16 md:py-24">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div className="flex flex-col items-start">
                <SectionTag>MORE SUCCESS STORIES</SectionTag>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-navy dark:text-white font-poppins">
                  Related Case Studies
                </h2>
                <div className="h-1 w-12 bg-brand-orange rounded-full mt-4" />
              </div>
              <Link
                href="/work"
                className="group flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-hover transition-colors font-inter"
              >
                View all work
                <motion.span
                  animate={prefersReducedMotion ? {} : { x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedProjects.map((project) => (
                <div
                  key={project.slug}
                  className="flex flex-col rounded-2xl border border-border/40 bg-card overflow-hidden transition-all duration-300 group hover:border-brand-orange/30 hover:shadow-[0_4px_20px_rgba(255,107,0,0.06)]"
                >
                  {/* Image Gradient Placeholder */}
                  <div className={cn('h-40 w-full bg-gradient-to-br flex items-center justify-center p-6 relative overflow-hidden select-none', project.heroGradient)}>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.12)_0%,transparent_80%)] mix-blend-overlay" />
                    <span className="text-[9px] font-extrabold tracking-widest text-white/50 uppercase font-space-grotesk">
                      {project.industry} Case Study
                    </span>
                  </div>

                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-brand-navy dark:text-white mb-2 font-poppins group-hover:text-brand-orange transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 font-inter">
                        {project.overview}
                      </p>
                    </div>

                    <div className="mt-auto space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {project.techStack.slice(0, 3).map((t) => (
                          <Badge key={t} variant="secondary" className="bg-muted hover:bg-muted text-[9px] text-muted-foreground font-semibold px-2 py-0.5 rounded-sm border border-border/10 font-inter">
                            {t}
                          </Badge>
                        ))}
                      </div>
                      <div className="border-t border-border/10 pt-3">
                        <Link href={`/work/${project.slug}`} className="text-xs font-bold text-brand-navy hover:text-brand-orange dark:text-white/80 dark:hover:text-brand-orange transition-colors flex items-center gap-1 font-inter">
                          View Case Study
                          <ExternalLink className="h-3 w-3 opacity-60" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

    </div>
  );
}
export default CaseStudyClient;
