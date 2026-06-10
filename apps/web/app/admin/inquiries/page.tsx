'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiFetch } from '../../../lib/api';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Skeleton } from '../../../components/ui/skeleton';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../../../components/ui/dialog';
import { Select, SelectItem } from '../../../components/ui/select';
import { Label } from '../../../components/ui/label';
import { Download, ChevronLeft, ChevronRight, Eye, Mail, Phone, Calendar, Info, Globe } from 'lucide-react';
import toast from 'react-hot-toast';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  companyName: string | null;
  serviceInterested: string | null;
  budgetRange: string | null;
  timeline: string | null;
  message: string | null;
  source: string;
  status: string;
  crmLeadId: string | null;
  ipAddress: string | null;
  userAgent: string | null;
  createdAt: string;
}

interface PaginatedResponse {
  success: boolean;
  data: Inquiry[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface SingleResponse {
  success: boolean;
  data: Inquiry;
}

export default function InquiriesManager() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>('all');
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const limit = 10;

  const statusFilter = status === 'all' ? '' : `&status=${status}`;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'inquiries', { page, limit, status }],
    queryFn: () => apiFetch<PaginatedResponse>(`/inquiries?page=${page}&limit=${limit}${statusFilter}`),
  });

  const { data: activeInquiryData, isLoading: detailsLoading } = useQuery({
    queryKey: ['admin', 'inquiry', selectedInquiryId],
    queryFn: () => apiFetch<SingleResponse>(`/inquiries/${selectedInquiryId}`),
    enabled: !!selectedInquiryId,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, newStatus }: { id: string; newStatus: string }) =>
      apiFetch<{ success: boolean }>(`/inquiries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'inquiry', selectedInquiryId] });
      toast.success('Inquiry status updated successfully!');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update status');
    },
  });

  const handleExport = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/v1/inquiries/export`);
      if (!res.ok) throw new Error('Export failed');
      const csvText = await res.text();

      const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'inquiries.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Error exporting CSV: ' + (err as Error).message);
    }
  };

  const handleOpenDetails = (id: string) => {
    setSelectedInquiryId(id);
    setIsOpen(true);
  };

  const handleStatusChange = (newStatus: string) => {
    if (selectedInquiryId) {
      updateStatusMutation.mutate({ id: selectedInquiryId, newStatus });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'contacted':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'converted':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'closed':
        return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
      default:
        return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
    }
  };

  const activeInquiry = activeInquiryData?.data;

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">Leads & Inquiries</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">Monitor website inquiries and CRM push logs</p>
        </div>
        <Button
          onClick={handleExport}
          className="bg-brand-orange hover:bg-brand-orange-hover text-white flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </Button>
      </div>

      {/* Filters card */}
      <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] p-4 flex items-center gap-4 rounded-xl">
        <div className="flex items-center gap-2">
          <Label htmlFor="status-filter" className="text-xs font-semibold text-slate-500 dark:text-slate-400">Filter Status:</Label>
          <Select id="status-filter" value={status} onChange={(e) => { setStatus((e.target as HTMLSelectElement).value); setPage(1); }} className="w-[140px] bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs">
            <SelectItem value="all">All Inquiries</SelectItem>
            <SelectItem value="new">🟢 New</SelectItem>
            <SelectItem value="contacted">🟡 Contacted</SelectItem>
            <SelectItem value="converted">🔵 Converted</SelectItem>
            <SelectItem value="closed">⚫ Closed</SelectItem>
          </Select>
        </div>
      </Card>

      {/* Listing Card Table */}
      <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-8 space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : isError ? (
              <div className="p-12 text-center text-red-500 text-sm">
                Failed to load inquiries. Please refresh.
              </div>
            ) : !data?.data || data.data.length === 0 ? (
              <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
                No inquiries found matching criteria.
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="px-8 py-4">Name</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Budget</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">CRM ID</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-slate-700 dark:text-slate-300">
                  {data.data.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors duration-150">
                      <td className="px-8 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 dark:text-white leading-snug">{inq.name}</span>
                          <span className="text-xs text-slate-400 font-mono mt-0.5">{inq.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 capitalize">{inq.serviceInterested?.replace('-', ' ') || 'N/A'}</td>
                      <td className="px-6 py-4">{inq.budgetRange || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={`capitalize font-semibold text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(inq.status)}`}>
                          {inq.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        {inq.crmLeadId ? (
                          <span className="font-mono text-xs text-brand-orange bg-brand-orange/5 px-2 py-0.5 rounded border border-brand-orange/10">{inq.crmLeadId}</span>
                        ) : (
                          <span className="text-slate-400 text-xs font-mono">Failed/Pending</span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400">
                        {new Date(inq.createdAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-8 py-4 text-right">
                        <Button variant="outline" size="sm" onClick={() => handleOpenDetails(inq.id)} className="h-8 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-xs flex items-center gap-1.5 ml-auto">
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Detail</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Controls */}
          {data && data.pagination.totalPages > 1 && (
            <div className="px-8 py-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Showing page {data.pagination.page} of {data.pagination.totalPages} ({data.pagination.total} total)
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page === data.pagination.totalPages}
                  onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
                  className="px-2"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Inquiry Detail Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-xl bg-white dark:bg-[#151f32] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-poppins flex items-center gap-2">
              <Info className="w-5 h-5 text-brand-orange" />
              <span>Inquiry Details</span>
            </DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 text-xs">
              Complete submission data and integration status.
            </DialogDescription>
          </DialogHeader>

          {detailsLoading || !activeInquiry ? (
            <div className="space-y-4 py-8">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : (
            <div className="space-y-6 py-2">
              {/* Profile Card */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/10">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Visitor Contact</span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{activeInquiry.name}</h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Mail className="w-3.5 h-3.5" />
                    <a href={`mailto:${activeInquiry.email}`} className="hover:underline font-mono">{activeInquiry.email}</a>
                  </div>
                  {activeInquiry.phone && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                      <Phone className="w-3.5 h-3.5" />
                      <a href={`tel:${activeInquiry.phone}`} className="hover:underline">{activeInquiry.phone}</a>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Project Parameters</span>
                  <div className="text-xs text-slate-700 dark:text-slate-300">
                    <p><span className="font-semibold text-slate-500">Service:</span> <span className="capitalize font-medium text-slate-900 dark:text-white">{activeInquiry.serviceInterested?.replace('-', ' ') || 'N/A'}</span></p>
                    <p className="pt-0.5"><span className="font-semibold text-slate-500">Budget:</span> <span className="font-medium text-slate-900 dark:text-white">{activeInquiry.budgetRange || 'N/A'}</span></p>
                    <p className="pt-0.5"><span className="font-semibold text-slate-500">Timeline:</span> <span className="font-medium text-slate-900 dark:text-white">{activeInquiry.timeline?.replace('-', ' ') || 'N/A'}</span></p>
                  </div>
                </div>
              </div>

              {/* Message Details */}
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Visitor Message</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 p-4 border border-slate-100 dark:border-slate-850 rounded-xl bg-slate-50/20 dark:bg-slate-950/30 whitespace-pre-wrap leading-relaxed">
                  {activeInquiry.message || 'No message provided.'}
                </p>
              </div>

              {/* CRM / Meta log details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-400">CRM Integration status</span>
                  <div className="flex items-center gap-2">
                    {activeInquiry.crmLeadId ? (
                      <div className="flex flex-col gap-1">
                        <span className="font-mono text-xs text-emerald-500 bg-emerald-500/5 border border-emerald-500/20 px-2 py-0.5 rounded flex items-center gap-1 w-fit">
                          <Globe className="w-3.5 h-3.5" />
                          <span>Pushed to CRM</span>
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">Lead ID: {activeInquiry.crmLeadId}</span>
                      </div>
                    ) : (
                      <span className="font-mono text-xs text-red-500 bg-red-500/5 border border-red-500/20 px-2 py-0.5 rounded">
                        Failed / Dev Bypass
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Update Lead status</span>
                  <Select value={activeInquiry.status} onChange={(e) => handleStatusChange((e.target as HTMLSelectElement).value)} className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs">
                    <SelectItem value="new">🟢 New</SelectItem>
                    <SelectItem value="contacted">🟡 Contacted</SelectItem>
                    <SelectItem value="converted">🔵 Converted</SelectItem>
                    <SelectItem value="closed">⚫ Closed</SelectItem>
                  </Select>
                </div>
              </div>

              {/* Metadata */}
              <div className="border-t border-slate-100 dark:border-slate-800/40 pt-4 flex flex-col gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>Submitted on {new Date(activeInquiry.createdAt).toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-1 font-mono">
                  <Globe className="w-3 h-3" />
                  <span>IP Address: {activeInquiry.ipAddress || 'Unknown'}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-4 border-t border-slate-100 dark:border-slate-800/40">
            <Button variant="outline" onClick={() => setIsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
