'use client';

import React from 'react';
import { Section } from '@/components/layout/section';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

export default function DesignTestPage() {
  const [loading, setLoading] = React.useState(false);

  const handleSimulateLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Header Bar */}
      <div className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-colors duration-300">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-poppins font-extrabold text-lg tracking-tight text-primary">
              Adruva Design System
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </Container>
      </div>

      {/* Hero Section */}
      <Section className="border-b bg-muted/30">
        <Container>
          <div className="max-w-2xl">
            <Label variant="sectionTag">Design System & Guidelines</Label>
            <Heading level="h1" className="mb-4">
              Premium UI & Tokens Check
            </Heading>
            <Text variant="marketing" size="lg" className="mb-6">
              This page showcases and tests the custom typography components, layout wrappers, and Shadcn UI components configured to match the Adruva Solution style guides.
            </Text>
            <div className="flex gap-4">
              <Button onClick={handleSimulateLoad}>Test Skeleton Loader</Button>
              <Button variant="outline" onClick={() => alert('Action Triggered!')}>
                Secondary CTA
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Typography Section */}
      <Section>
        <Container>
          <Heading level="h2" className="mb-8 border-b pb-2">
            1. Typography Sizing & Fonts
          </Heading>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-4">
              <Label className="text-primary font-bold">Headings (Poppins)</Label>
              <div className="space-y-2">
                <div>
                  <Label>level=&quot;h1&quot;</Label>
                  <Heading level="h1">Hero Title H1</Heading>
                </div>
                <div>
                  <Label>level=&quot;h2&quot;</Label>
                  <Heading level="h2">Section Header H2</Heading>
                </div>
                <div>
                  <Label>level=&quot;h3&quot;</Label>
                  <Heading level="h3">Subsection Title H3</Heading>
                </div>
                <div>
                  <Label>level=&quot;h4&quot;</Label>
                  <Heading level="h4">Card Title H4</Heading>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label className="text-primary font-bold">Text & Paragraphs (Inter/Space)</Label>
              <div className="space-y-4">
                <div>
                  <Label>Text variant=&quot;marketing&quot; size=&quot;lg&quot;</Label>
                  <Text variant="marketing" size="lg">
                    This is marketing body text in Space Grotesk font. It feels modern and has geometric proportions.
                  </Text>
                </div>
                <div>
                  <Label>Text variant=&quot;body&quot; size=&quot;base&quot; (Default)</Label>
                  <Text variant="body" size="base">
                    This is base body text in Inter font. It has a line height of 1.7 for clean, comfortable reading on screens of all sizes.
                  </Text>
                </div>
                <div>
                  <Label>Text variant=&quot;muted&quot; size=&quot;sm&quot;</Label>
                  <Text variant="muted" size="sm">
                    This is muted small body text, ideal for descriptions, labels, and supplementary information.
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Dark Section Prop Test */}
      <Section dark className="my-8">
        <Container>
          <Label className="text-primary font-bold mb-2 block">2. Dark Section Wrapper (Forces Black Background)</Label>
          <Heading level="h2" className="text-white mb-4">
            This section has a forced dark background
          </Heading>
          <Text className="text-gray-300 mb-6 max-w-2xl">
            This is used for high-impact callouts or dark segments on the homepage (like the Growth System or Hero). It ignores the system light/dark mode for background coloring, remaining dark in both modes while rendering light readable text.
          </Text>
          <Button variant="default" className="bg-primary text-white hover:bg-primary/90">
            Action inside Dark Section
          </Button>
        </Container>
      </Section>

      {/* Buttons, Badges, and Cards */}
      <Section>
        <Container>
          <Heading level="h2" className="mb-8 border-b pb-2">
            3. Components (Shadcn Customised)
          </Heading>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Interactive elements */}
            <Card className="hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="font-poppins">Button Styles</CardTitle>
                <CardDescription>Click to test behaviors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </CardContent>
              <CardFooter>
                <Text size="sm" variant="muted">Hover translation works on cards</Text>
              </CardFooter>
            </Card>

            {/* Card 2: Badges and tags */}
            <Card className="hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="font-poppins">Badge Badges</CardTitle>
                <CardDescription>Colored tags for services and status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default" className="bg-primary text-white">Orange Tag</Badge>
                  <Badge variant="secondary" className="bg-[#2D8CFF]/10 text-[#2D8CFF] hover:bg-[#2D8CFF]/20">Blue Tag</Badge>
                  <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">Green Tag</Badge>
                  <Badge variant="outline" className="bg-slate-500/10 text-slate-500 hover:bg-slate-500/20">Gray Tag</Badge>
                </div>
              </CardContent>
              <CardFooter>
                <Text size="sm" variant="muted">Using custom variants or overrides</Text>
              </CardFooter>
            </Card>

            {/* Card 3: Inputs & Textareas */}
            <Card className="hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 col-span-1 md:col-span-2 lg:col-span-1">
              <CardHeader>
                <CardTitle className="font-poppins">Form Fields</CardTitle>
                <CardDescription>Text inputs and validation focus states</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <Label>Name Input</Label>
                  <Input placeholder="Enter your name..." />
                </div>
                <div className="space-y-1">
                  <Label>Message Textarea</Label>
                  <Textarea placeholder="Describe your inquiry..." rows={2} />
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Accordions, Tabs, and Overlays */}
      <Section className="bg-muted/10">
        <Container>
          <Heading level="h2" className="mb-8 border-b pb-2">
            4. Layout Widgets & Interactive Elements
          </Heading>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Accordion list */}
            <div className="space-y-4">
              <Label className="text-primary font-bold">Frequently Asked Questions (Accordion)</Label>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-poppins font-semibold">How do we build Next.js apps?</AccordionTrigger>
                  <AccordionContent className="font-inter text-text-secondary text-sm">
                    We use Next.js 14 App Router, dynamic server layouts, tailwind styling, and local fonts for maximum speed and core web vitals optimization.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-poppins font-semibold">Is the theme responsive?</AccordionTrigger>
                  <AccordionContent className="font-inter text-text-secondary text-sm">
                    Yes! It maps CSS properties correctly so layouts automatically shrink and expand from mobile up to desktop configurations.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Tabs content */}
            <div className="space-y-4">
              <Label className="text-primary font-bold">Tabs Slicing</Label>
              <Tabs defaultValue="build" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="build">Build</TabsTrigger>
                  <TabsTrigger value="automate">Automate</TabsTrigger>
                  <TabsTrigger value="grow">Grow</TabsTrigger>
                </TabsList>
                <TabsContent value="build">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-poppins text-base">Website & Software Development</CardTitle>
                      <CardDescription>Custom web applications, SaaS tools, and e-commerce.</CardDescription>
                    </CardHeader>
                  </Card>
                </TabsContent>
                <TabsContent value="automate">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-poppins text-base">AI & Automations</CardTitle>
                      <CardDescription>Lead CRM sync, Meta APIs, WhatsApp webhooks.</CardDescription>
                    </CardHeader>
                  </Card>
                </TabsContent>
                <TabsContent value="grow">
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-poppins text-base">Search & Paid Advertising</CardTitle>
                      <CardDescription>Google Ads, Meta campaigns, SEO rankings.</CardDescription>
                    </CardHeader>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Skeleton Loaders and Dialog Overlays */}
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex-1 min-w-[280px]">
              <Label className="text-primary font-bold mb-4 block">5. Skeleton / Dialog Overlay</Label>
              {loading ? (
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              ) : (
                <div className="p-4 border rounded-card bg-card text-card-foreground">
                  <Text size="sm">Skeleton loader testing area. Click &quot;Test Skeleton Loader&quot; above to trigger.</Text>
                </div>
              )}
            </div>

            <div className="flex items-center justify-start">
              <Dialog>
                <DialogTrigger render={<Button variant="outline">Open Modal Dialog</Button>} />

                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle className="font-poppins">Dialog Title</DialogTitle>
                    <DialogDescription>
                      This dialog is styled with our theme variables and supports transitions.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Text size="sm">
                      Our dialog component uses standard HTML overlays powered by Radix primitives and styled with Tailwind variables.
                    </Text>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Submit Inquiry</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
