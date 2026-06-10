'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiFetch } from '../../../../../lib/api';
import BlogEditor from '../../../../../components/admin/BlogEditor';
import { Skeleton } from '../../../../../components/ui/skeleton';
import toast from 'react-hot-toast';

interface BlogEditorData {
  title?: string;
  slug?: string;
  coverImageUrl?: string | null;
  coverImageCloudinaryId?: string | null;
  authorId?: string | null;
  category?: string;
  tags?: string[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  status?: string;
  readingTimeMinutes?: number;
  content?: unknown;
}

interface BlogResponse {
  success: boolean;
  data: BlogEditorData;
}

interface UpdateResponse {
  success: boolean;
  data: {
    status: string;
  };
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [isSaving, setIsSaving] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'blog', id],
    queryFn: () => apiFetch<BlogResponse>(`/blog/${id}`),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: (body: BlogEditorData) =>
      apiFetch<UpdateResponse>(`/blog/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(body),
      }),
    onSuccess: (res) => {
      toast.success(`Blog post updated successfully as ${res.data.status}!`);
      router.push('/admin/blogs');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update blog post');
      setIsSaving(false);
    },
  });

  const handleSave = (formData: BlogEditorData) => {
    setIsSaving(true);
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <div className="grid grid-cols-3 gap-6">
          <Skeleton className="h-[400px] col-span-2 rounded-xl" />
          <Skeleton className="h-[400px] rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="p-8 text-center text-red-500 font-medium">
        Failed to load blog post details. Please return to the list and try again.
      </div>
    );
  }

  return (
    <BlogEditor initialData={data.data} onSave={handleSave} isSaving={isSaving} />
  );
}
