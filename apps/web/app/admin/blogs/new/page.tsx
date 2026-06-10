'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '../../../../lib/api';
import BlogEditor from '../../../../components/admin/BlogEditor';
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

interface CreateResponse {
  success: boolean;
  data: {
    status: string;
  };
}

export default function NewBlogPage() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const createMutation = useMutation({
    mutationFn: (body: BlogEditorData) =>
      apiFetch<CreateResponse>('/blog', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
    onSuccess: (res) => {
      toast.success(`Blog post created successfully as ${res.data.status}!`);
      router.push('/admin/blogs');
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to create blog post');
      setIsSaving(false);
    },
  });

  const handleSave = (data: BlogEditorData) => {
    setIsSaving(true);
    createMutation.mutate(data);
  };

  return (
    <BlogEditor onSave={handleSave} isSaving={isSaving} />
  );
}
