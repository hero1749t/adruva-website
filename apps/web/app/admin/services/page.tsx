'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../../lib/api';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import { Skeleton } from '../../../components/ui/skeleton';
import { Badge } from '../../../components/ui/badge';
import { Edit3, Save, X, Plus, Trash2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

interface Service {
  id: string;
  name: string;
  slug: string;
  category: string;
  tagline: string | null;
  description: string | null;
  benefits: unknown;
  whatsIncluded: string[];
  processSteps: unknown;
  techStack: string[];
  startingPrice: string | null;
  faq: unknown;
  metaTitle: string | null;
  metaDescription: string | null;
  isActive: boolean;
  sortOrder: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export default function ServicesContentManager() {
  const queryClient = useQueryClient();
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Form local states
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(0);

  // Arrays/JSON states
  const [techStack, setTechStack] = useState<string[]>([]);
  const [newTech, setNewTech] = useState('');
  const [whatsIncluded, setWhatsIncluded] = useState<string[]>([]);
  const [newIncluded, setNewIncluded] = useState('');

  const [faqs, setFaqs] = useState<{ question: string; answer: string }[]>([]);
  const [newQ, setNewQ] = useState('');
  const [newA, setNewA] = useState('');

  const [benefits, setBenefits] = useState<{ icon: string; title: string; description: string }[]>([]);
  const [newBenefitIcon, setNewBenefitIcon] = useState('');
  const [newBenefitTitle, setNewBenefitTitle] = useState('');
  const [newBenefitDesc, setNewBenefitDesc] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'services'],
    queryFn: () => apiFetch<ApiResponse<Service[]>>('/services'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Partial<Service> }) =>
      apiFetch<ApiResponse<Service>>(`/services/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'services'] });
      toast.success('Service updated successfully!');
      setSelectedService(null);
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update service');
    },
  });

  const startEditing = (service: Service) => {
    setSelectedService(service);
    setTagline(service.tagline || '');
    setDescription(service.description || '');
    setStartingPrice(service.startingPrice || '');
    setIsActive(service.isActive);
    setSortOrder(service.sortOrder);
    setTechStack(service.techStack || []);
    setWhatsIncluded(service.whatsIncluded || []);

    // Load JSONs
    try {
      const b = service.benefits ? (typeof service.benefits === 'string' ? JSON.parse(service.benefits) : service.benefits) : [];
      setBenefits(Array.isArray(b) ? b : []);
    } catch {
      setBenefits([]);
    }

    try {
      const f = service.faq ? (typeof service.faq === 'string' ? JSON.parse(service.faq) : service.faq) : [];
      setFaqs(Array.isArray(f) ? f : []);
    } catch {
      setFaqs([]);
    }
  };

  const handleSave = () => {
    if (!selectedService) return;

    updateMutation.mutate({
      id: selectedService.id,
      body: {
        tagline,
        description,
        startingPrice,
        isActive,
        sortOrder,
        techStack,
        whatsIncluded,
        benefits,
        faq: faqs,
      },
    });
  };

  const addTech = () => {
    if (newTech.trim() && !techStack.includes(newTech.trim())) {
      setTechStack([...techStack, newTech.trim()]);
      setNewTech('');
    }
  };

  const removeTech = (item: string) => {
    setTechStack(techStack.filter((t) => t !== item));
  };

  const addIncluded = () => {
    if (newIncluded.trim() && !whatsIncluded.includes(newIncluded.trim())) {
      setWhatsIncluded([...whatsIncluded, newIncluded.trim()]);
      setNewIncluded('');
    }
  };

  const removeIncluded = (item: string) => {
    setWhatsIncluded(whatsIncluded.filter((i) => i !== item));
  };

  const addFaq = () => {
    if (newQ.trim() && newA.trim()) {
      setFaqs([...faqs, { question: newQ.trim(), answer: newA.trim() }]);
      setNewQ('');
      setNewA('');
    }
  };

  const removeFaq = (idx: number) => {
    setFaqs(faqs.filter((_, i) => i !== idx));
  };

  const addBenefit = () => {
    if (newBenefitTitle.trim() && newBenefitDesc.trim()) {
      setBenefits([
        ...benefits,
        {
          icon: newBenefitIcon.trim() || 'rocket',
          title: newBenefitTitle.trim(),
          description: newBenefitDesc.trim(),
        },
      ]);
      setNewBenefitIcon('');
      setNewBenefitTitle('');
      setNewBenefitDesc('');
    }
  };

  const removeBenefit = (idx: number) => {
    setBenefits(benefits.filter((_, i) => i !== idx));
  };

  if (selectedService) {
    return (
      <div className="space-y-6">
        {/* Back and title bar */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setSelectedService(null)} className="px-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white flex items-center gap-2">
              <span>Edit Service:</span>
              <span className="text-brand-orange">{selectedService.name}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 capitalize">{selectedService.category} category</p>
          </div>
        </div>

        {/* Editor form card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Core Info card */}
            <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] rounded-xl">
              <CardHeader className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/60">
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-white uppercase font-poppins">Core Details</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="tagline" className="text-xs font-semibold">Service Tagline</Label>
                  <Input id="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="description" className="text-xs font-semibold">Description</Label>
                  <Textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="startingPrice" className="text-xs font-semibold">Starting Price</Label>
                    <Input id="startingPrice" value={startingPrice} onChange={(e) => setStartingPrice(e.target.value)} className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="sortOrder" className="text-xs font-semibold">Sort Order</Label>
                    <Input id="sortOrder" type="number" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value, 10) || 0)} className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850" />
                  </div>
                  <div className="flex items-center gap-2 mt-6 justify-center">
                    <input id="isActive" type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 bg-slate-50 text-brand-orange focus:ring-brand-orange" />
                    <Label htmlFor="isActive" className="text-xs font-semibold select-none cursor-pointer">Active Service</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Benefits array card */}
            <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] rounded-xl">
              <CardHeader className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/60">
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-white uppercase font-poppins">Service Benefits</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold">Icon Name</Label>
                    <Input placeholder="e.g. rocket, shield" value={newBenefitIcon} onChange={(e) => setNewBenefitIcon(e.target.value)} className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850" />
                  </div>
                  <div className="space-y-1 col-span-2">
                    <Label className="text-xs font-semibold">Benefit Title</Label>
                    <Input placeholder="e.g. Fast Loading" value={newBenefitTitle} onChange={(e) => setNewBenefitTitle(e.target.value)} className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">Benefit Description</Label>
                  <Textarea rows={2} placeholder="Brief details about the benefit..." value={newBenefitDesc} onChange={(e) => setNewBenefitDesc(e.target.value)} className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850" />
                </div>
                <Button variant="outline" size="sm" onClick={addBenefit} className="flex items-center gap-1 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Benefit</span>
                </Button>

                {/* List benefits */}
                <div className="space-y-2.5 pt-2">
                  {benefits.map((b, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-4 p-3 rounded-lg border border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/10">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange bg-brand-orange/5 px-2 py-0.5 rounded border border-brand-orange/10 font-mono">{b.icon}</span>
                          <h4 className="font-bold text-xs text-slate-800 dark:text-white leading-none truncate">{b.title}</h4>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 leading-snug">{b.description}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeBenefit(idx)} className="h-6 w-6 p-0 text-slate-400 hover:text-red-500 hover:bg-red-500/5">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* FAQ array card */}
            <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] rounded-xl">
              <CardHeader className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/60">
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-white uppercase font-poppins">Service FAQ</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">Question</Label>
                  <Input placeholder="e.g. Do I get source code ownership?" value={newQ} onChange={(e) => setNewQ(e.target.value)} className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-semibold">Answer</Label>
                  <Textarea rows={2} placeholder="Explain details..." value={newA} onChange={(e) => setNewA(e.target.value)} className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850" />
                </div>
                <Button variant="outline" size="sm" onClick={addFaq} className="flex items-center gap-1 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add FAQ</span>
                </Button>

                {/* List FAQs */}
                <div className="space-y-2.5 pt-2">
                  {faqs.map((f, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-4 p-3 rounded-lg border border-slate-100 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-900/10">
                      <div className="min-w-0 space-y-1">
                        <h4 className="font-bold text-xs text-slate-800 dark:text-white leading-tight">Q: {f.question}</h4>
                        <p className="text-xs text-slate-400 dark:text-slate-500 leading-snug">A: {f.answer}</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeFaq(idx)} className="h-6 w-6 p-0 text-slate-400 hover:text-red-500 hover:bg-red-500/5">
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Tech Stack sidebar editor */}
            <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] rounded-xl">
              <CardHeader className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/60">
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-white uppercase font-poppins">Tech Stack</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="Next.js" value={newTech} onChange={(e) => setNewTech(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addTech()} className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 h-9" />
                  <Button size="sm" onClick={addTech} className="bg-brand-orange hover:bg-brand-orange-hover text-white">Add</Button>
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {techStack.map((tech) => (
                    <Badge key={tech} variant="outline" className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded text-[10px]">
                      <span>{tech}</span>
                      <X className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer" onClick={() => removeTech(tech)} />
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* What's Included sidebar editor */}
            <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] rounded-xl">
              <CardHeader className="px-6 py-4 border-b border-slate-100 dark:border-slate-800/60">
                <CardTitle className="text-sm font-bold text-slate-900 dark:text-white uppercase font-poppins">What&apos;s Included</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-2">
                  <Input placeholder="e.g. Free hosting support" value={newIncluded} onChange={(e) => setNewIncluded(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && addIncluded()} className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 h-9" />
                  <Button size="sm" onClick={addIncluded} className="bg-brand-orange hover:bg-brand-orange-hover text-white">Add</Button>
                </div>
                <div className="space-y-1.5 pt-2">
                  {whatsIncluded.map((item) => (
                    <div key={item} className="flex justify-between items-center p-2 border border-slate-100 dark:border-slate-800/40 rounded bg-slate-50/50 dark:bg-slate-900/5 text-xs text-slate-600 dark:text-slate-400">
                      <span className="truncate">{item}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeIncluded(item)} className="h-5 w-5 p-0 text-slate-400 hover:text-red-500 hover:bg-red-500/5">
                        <X className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Bottom Actions card */}
            <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] rounded-xl">
              <CardContent className="p-6 space-y-3">
                <Button onClick={handleSave} disabled={updateMutation.isPending} className="w-full bg-brand-orange hover:bg-brand-orange-hover text-white flex items-center justify-center gap-2">
                  <Save className="w-4 h-4" />
                  <span>{updateMutation.isPending ? 'Saving Changes...' : 'Save Service'}</span>
                </Button>
                <Button variant="outline" onClick={() => setSelectedService(null)} className="w-full border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900">
                  Cancel
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* List Header */}
      <div>
        <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">Services Offerings</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">Manage descriptions, Pricing levels, and FAQ segments of Adruva offerings</p>
      </div>

      {/* Grid listing services */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Skeleton className="h-36 w-full rounded-xl" />
          <Skeleton className="h-36 w-full rounded-xl" />
          <Skeleton className="h-36 w-full rounded-xl" />
        </div>
      ) : !data?.data || data.data.length === 0 ? (
        <div className="text-center text-slate-500 text-sm py-12">No services found in database. Check migrations & seed data.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.data.map((service) => (
            <Card key={service.id} className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] shadow-sm hover:shadow-md transition-all duration-200 rounded-xl flex flex-col justify-between">
              <CardHeader className="p-6 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded capitalize text-slate-500 dark:text-slate-400 border border-slate-200/20">{service.category}</span>
                  {!service.isActive && (
                    <Badge variant="destructive" className="text-[9px] font-bold uppercase rounded-full">Inactive</Badge>
                  )}
                </div>
                <CardTitle className="text-base font-bold font-poppins text-slate-900 dark:text-white leading-snug">{service.name}</CardTitle>
                <CardDescription className="text-slate-400 dark:text-slate-500 text-xs font-mono mt-1 font-semibold">{service.startingPrice || 'Custom Quote'}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 flex flex-col justify-end">
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-4 font-inter leading-relaxed">{service.description || 'No description provided yet.'}</p>
                <Button variant="outline" size="sm" onClick={() => startEditing(service)} className="w-full flex items-center justify-center gap-1.5 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900">
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Configure Content</span>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
