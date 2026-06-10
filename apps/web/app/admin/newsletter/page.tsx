'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { apiFetch } from '../../../lib/api';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Skeleton } from '../../../components/ui/skeleton';
import { Download, ChevronLeft, ChevronRight, Send, Mail } from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  status: string;
  subscribedAt: string;
  unsubscribedAt: string | null;
}

interface PaginatedResponse {
  success: boolean;
  data: Subscriber[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function NewsletterManager() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'newsletter', { page, limit }],
    queryFn: () => apiFetch<PaginatedResponse>(`/newsletter/subscribers?page=${page}&limit=${limit}`),
  });

  const handleExport = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const res = await fetch(`${apiUrl}/api/v1/newsletter/export`);
      if (!res.ok) throw new Error('Export failed');
      const csvText = await res.text();

      const blob = new Blob([csvText], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'newsletter_subscribers.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert('Error exporting CSV: ' + (err as Error).message);
    }
  };

  const getStatusColor = (status: string) => {
    return status === 'active'
      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
      : 'bg-red-500/10 text-red-500 border-red-500/20';
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">Newsletter Directory</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">Manage email subscriptions and newsletter leads</p>
        </div>
        <Button
          onClick={handleExport}
          className="bg-brand-orange hover:bg-brand-orange-hover text-white flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </Button>
      </div>

      {/* Grid displaying subscriber counts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32]">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Subscribers Count</p>
              {isLoading ? (
                <Skeleton className="h-8 w-12" />
              ) : (
                <p className="text-2xl font-bold font-poppins text-slate-900 dark:text-white">
                  {data?.pagination.total ?? 0}
                </p>
              )}
            </div>
            <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange">
              <Mail className="w-5 h-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* List Table */}
      <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] shadow-sm">
        <CardHeader className="px-8 py-5 border-b border-slate-100 dark:border-slate-800/60">
          <CardTitle className="text-base font-bold font-poppins text-slate-900 dark:text-white flex items-center gap-2">
            <Send className="w-4 h-4 text-brand-orange" />
            <span>Newsletter Subscribers</span>
          </CardTitle>
          <CardDescription className="text-slate-500 dark:text-slate-400 text-xs">Full index of registered emails</CardDescription>
        </CardHeader>
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
                Failed to load newsletter subscribers. Please refresh.
              </div>
            ) : !data?.data || data.data.length === 0 ? (
              <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
                No subscribers found.
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="px-8 py-4">Email</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Subscribed At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-slate-700 dark:text-slate-300">
                  {data.data.map((sub) => (
                    <tr key={sub.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors duration-150">
                      <td className="px-8 py-4 font-mono font-medium text-slate-900 dark:text-white">{sub.email}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={`capitalize font-semibold text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(sub.status)}`}>
                          {sub.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-slate-500 dark:text-slate-400">
                        {new Date(sub.subscribedAt).toLocaleDateString('en-IN', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
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
    </div>
  );
}
