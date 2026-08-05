"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../../lib/api";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  Edit,
  Trash,
  Plus,
  Globe,
  EyeOff,
  Search,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";

interface Blog {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  status: string;
  publishedAt: string | null;
  createdAt: string;
  author: {
    name: string;
  } | null;
}

interface PaginatedResponse {
  success: boolean;
  data: Blog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function BlogManager() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const limit = 10;

  const userRole = session?.user?.role || "content_writer";
  const isWriter = userRole === "content_writer";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "blogs", { page, limit, search }],
    queryFn: () => {
      const searchParam = search ? `&search=${search}` : "";
      return apiFetch<PaginatedResponse>(
        `/blog?page=${page}&limit=${limit}&status=all${searchParam}`,
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiFetch<{ success: boolean }>(`/blog/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
      toast.success("Blog post soft deleted successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete blog post");
    },
  });

  interface PublishResponse {
    success: boolean;
    data: {
      status: string;
    };
  }

  const togglePublishMutation = useMutation({
    mutationFn: (id: string) =>
      apiFetch<PublishResponse>(`/blog/${id}/publish`, {
        method: "PATCH",
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
      const newStatus = res.data.status;
      toast.success(`Blog post is now ${newStatus}!`);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to toggle publication");
    },
  });

  const handleDelete = (id: string, title: string) => {
    setDeleteId(id);
    setDeleteTitle(title);
    setIsDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
      setIsDeleteOpen(false);
      setDeleteId(null);
    }
  };

  const handleTogglePublish = (id: string) => {
    togglePublishMutation.mutate(id);
  };

  const getStatusColor = (status: string) => {
    return status === "published"
      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      : "bg-amber-500/10 text-amber-500 border-amber-500/20";
  };

  return (
    <div className="space-y-6">
      {/* Header and Add button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">
            Blog Manager
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">
            Create, edit, and publish blog articles
          </p>
        </div>
        <Link href="/admin/blogs/new">
          <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Create Article</span>
          </Button>
        </Link>
      </div>

      {/* Search Filter Card */}
      <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] p-4 flex items-center gap-2 rounded-xl">
        <Search className="w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Search articles by title..."
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 h-9 text-xs focus:ring-1 focus:ring-brand-orange focus:border-brand-orange max-w-sm"
        />
      </Card>

      {/* Listing card Table */}
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
                Failed to load blog posts. Please refresh.
              </div>
            ) : !data?.data || data.data.length === 0 ? (
              <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
                No blog posts found.
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="px-8 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Author</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Published Date</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-slate-700 dark:text-slate-300">
                  {data.data.map((blog) => (
                    <tr
                      key={blog.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors duration-150"
                    >
                      <td className="px-8 py-4">
                        <div className="flex flex-col max-w-md">
                          <span className="font-semibold text-slate-900 dark:text-white leading-snug">
                            {blog.title}
                          </span>
                          <span className="text-xs text-slate-400 font-mono mt-0.5 truncate">
                            {blog.slug}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 capitalize">
                        {blog.category?.replace("-", " ") || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {blog.author?.name || "Unknown"}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant="outline"
                          className={`capitalize font-semibold text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(blog.status)}`}
                        >
                          {blog.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400">
                        {blog.publishedAt
                          ? new Date(blog.publishedAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "N/A"}
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex gap-1.5 justify-end">
                          {blog.status === "published" && (
                            <a
                              href={`/blog/${blog.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                title="View on site"
                                className="h-8 w-8 p-0 text-slate-400 hover:text-emerald-500 hover:bg-emerald-500/5"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Button>
                            </a>
                          )}
                          {!isWriter && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleTogglePublish(blog.id)}
                              className="h-8 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-xs flex items-center gap-1"
                            >
                              {blog.status === "published" ? (
                                <>
                                  <EyeOff className="w-3.5 h-3.5 text-amber-500" />
                                  <span>Unpublish</span>
                                </>
                              ) : (
                                <>
                                  <Globe className="w-3.5 h-3.5 text-emerald-500" />
                                  <span>Publish</span>
                                </>
                              )}
                            </Button>
                          )}
                          <Link href={`/admin/blogs/${blog.id}/edit`}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-slate-600 hover:text-brand-orange hover:bg-brand-orange/5 dark:text-slate-400"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </Button>
                          </Link>
                          {!isWriter && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDelete(blog.id, blog.title)}
                              className="h-8 w-8 p-0 text-slate-600 hover:text-red-500 hover:bg-red-500/5 dark:text-slate-400"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-[#151f32] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-poppins flex items-center gap-2">
              <Trash className="w-5 h-5 text-red-500" />
              <span>Delete Blog Post</span>
            </DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 text-xs">
              Are you sure you want to delete &ldquo;{deleteTitle}&rdquo;? This
              is a soft delete and the post can be recovered later.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setIsDeleteOpen(false)}
              className="h-9"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white h-9"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
