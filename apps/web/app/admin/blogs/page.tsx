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
  Star,
  Download,
  Eye,
  ThumbsUp,
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
  viewsCount?: number;
  likesCount?: number;
  isPinned?: boolean;
  coverImageUrl?: string | null;
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
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState("");
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const limit = 10;

  const userRole = session?.user?.role || "content_writer";
  const isWriter = userRole === "content_writer";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "blogs", { page, limit, search, statusFilter, sortBy }],
    queryFn: () => {
      const searchParam = search ? `&search=${search}` : "";
      const sortParam = sortBy !== "newest" ? `&sort=${sortBy}` : "";
      return apiFetch<PaginatedResponse>(
        `/blog?page=${page}&limit=${limit}&status=${statusFilter}${searchParam}${sortParam}&language=all`,
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

  const togglePublishMutation = useMutation({
    mutationFn: (id: string) =>
      apiFetch<{ success: boolean; data: { status: string } }>(
        `/blog/${id}/publish`,
        {
          method: "PATCH",
        },
      ),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
      toast.success(`Blog post is now ${res.data.status}!`);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to toggle publication");
    },
  });

  const togglePinMutation = useMutation({
    mutationFn: ({ id, isPinned }: { id: string; isPinned: boolean }) =>
      apiFetch<{ success: boolean }>(`/blog/${id}/pin`, {
        method: "PATCH",
        body: JSON.stringify({ isPinned }),
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "blogs"] });
      toast.success("Pin status updated successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update pin status");
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

  const handleTogglePin = (id: string, currentlyPinned: boolean) => {
    togglePinMutation.mutate({ id, isPinned: !currentlyPinned });
  };

  const getStatusColor = (status: string) => {
    return status === "published"
      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 border-emerald-500/20"
      : "bg-amber-500/10 text-amber-600 dark:text-amber-500 border-amber-500/20";
  };

  const exportToCSV = () => {
    if (!data?.data) return;
    const headers = [
      "Title",
      "Slug",
      "Category",
      "Status",
      "Views",
      "Likes",
      "Published At",
    ];
    const rows = data.data.map((blog) => [
      `"${blog.title.replace(/"/g, '""')}"`,
      blog.slug,
      blog.category || "N/A",
      blog.status,
      blog.viewsCount || 0,
      blog.likesCount || 0,
      blog.publishedAt || "N/A",
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `blog_export_${new Date().toISOString().split("T")[0]}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV exported successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Title Header with Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">
            Sanctuary Blog Management
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">
            Monitor client blog views, post updates, and structure translations.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={exportToCSV}
            disabled={!data?.data || data.data.length === 0}
            className="border-slate-200 dark:border-slate-800 text-xs flex items-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT CSV</span>
          </Button>
          <Link href="/admin/blogs/new">
            <Button className="bg-brand-orange hover:bg-brand-orange-hover text-white flex items-center gap-2 text-xs font-semibold">
              <Plus className="w-4 h-4" />
              <span>+ COMPOSE NEW POST</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button className="px-4 py-2 text-xs font-bold text-slate-900 dark:text-white border-b-2 border-brand-orange">
          Published & Drafts
        </button>
        <button
          onClick={() => toast.success("Comments are moderation-free")}
          className="px-4 py-2 text-xs font-bold text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400"
        >
          Manage Comments
        </button>
      </div>

      {/* Filter and Search Controls */}
      <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Status Filter:
          </span>
          {["all", "published", "draft"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setStatusFilter(status);
                setPage(1);
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg capitalize transition-colors ${
                statusFilter === status
                  ? "bg-brand-orange text-white"
                  : "bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
              Sort By:
            </span>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1);
              }}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-xs p-1.5 focus:outline-none text-slate-700 dark:text-slate-300 font-semibold"
            >
              <option value="newest">Newest First</option>
              <option value="views">Most Views</option>
              <option value="likes">Most Likes</option>
            </select>
          </div>

          <div className="relative flex-1 md:w-64 max-w-sm">
            <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
            <Input
              type="text"
              placeholder="Search posts by title, tag, author..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 h-9 text-xs pl-8 focus:ring-1 focus:ring-brand-orange focus:border-brand-orange w-full"
            />
          </div>
        </div>
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
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">
                    <th className="px-6 py-4">Post Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Engagement</th>
                    <th className="px-6 py-4">Publish Date</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-slate-700 dark:text-slate-300 font-inter">
                  {data.data.filter(Boolean).map((blog) => (
                    <tr
                      key={blog.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors duration-150"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {blog.coverImageUrl ? (
                            <img
                              src={blog.coverImageUrl}
                              alt={blog.title}
                              className="w-10 h-7 rounded object-cover shadow-sm bg-slate-100 dark:bg-slate-900 shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-7 rounded bg-slate-100 dark:bg-slate-950 shrink-0 flex items-center justify-center text-slate-400 font-poppins font-bold text-[9px] border border-slate-200 dark:border-slate-800">
                              AD
                            </div>
                          )}
                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-slate-900 dark:text-white leading-snug truncate max-w-sm">
                              {blog.title}
                            </span>
                            <span className="text-[10px] text-slate-400 font-semibold mt-0.5">
                              Author: {blog.author?.name || "Adruva Team"}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-500 dark:text-slate-400 capitalize">
                        {blog.category?.replace("-", " ") || "Uncategorized"}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant="outline"
                          className={`capitalize font-bold text-[9px] px-2 py-0.5 rounded-full ${getStatusColor(blog.status)}`}
                        >
                          {blog.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400 font-semibold">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5 text-slate-400" />
                            <span>{blog.viewsCount || 0} Views</span>
                          </span>
                          <span className="text-slate-300 dark:text-slate-700">
                            |
                          </span>
                          <span className="flex items-center gap-1">
                            <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
                            <span>{blog.likesCount || 0} Likes</span>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-500 dark:text-slate-400">
                        {blog.publishedAt
                          ? new Date(blog.publishedAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "Draft"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-1.5 justify-end items-center">
                          {/* Pin Toggle Button */}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleTogglePin(blog.id, !!blog.isPinned)
                            }
                            className="h-8 w-8 p-0"
                            title={
                              blog.isPinned
                                ? "Unpin from home"
                                : "Pin on homepage"
                            }
                          >
                            <Star
                              className={`w-3.5 h-3.5 transition-transform duration-200 hover:scale-110 ${
                                blog.isPinned
                                  ? "fill-orange-400 text-orange-400"
                                  : "text-slate-400 hover:text-orange-400"
                              }`}
                            />
                          </Button>

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
                              className="h-8 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-[10px] flex items-center gap-1 font-bold"
                            >
                              {blog.status === "published" ? (
                                <>
                                  <EyeOff className="w-3 h-3 text-amber-500" />
                                  <span>Unpublish</span>
                                </>
                              ) : (
                                <>
                                  <Globe className="w-3 h-3 text-emerald-500" />
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
