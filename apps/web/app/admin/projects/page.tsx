"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../../lib/api";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Select, SelectItem, SelectValue } from "../../../components/ui/select";
import {
  Plus,
  Edit,
  Trash,
  Star,
  X,
  ExternalLink,
  Search,
  Copy,
} from "lucide-react";
import { ImageUpload } from "../../../components/admin/ImageUpload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

interface Project {
  id: string;
  title: string;
  slug: string;
  clientName: string | null;
  industry: string | null;
  category: string | null;
  techStack: string[];
  heroImageUrl: string | null;
  heroImageCloudinaryId: string | null;
  galleryImages: unknown;
  problem: string | null;
  solution: string | null;
  results: string | null;
  isFeatured: boolean;
  status: string;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  clientName: z.string().optional(),
  industry: z.string().optional(),
  category: z.string().optional(),
  heroImageUrl: z
    .string()
    .url("Must be a valid URL")
    .or(z.literal(""))
    .optional(),
  heroImageCloudinaryId: z.string().optional(),
  problem: z.string().optional(),
  solution: z.string().optional(),
  results: z.string().optional(),
  isFeatured: z.boolean().default(false),
  status: z.string().default("draft"),
});

type ProjectFields = z.infer<typeof projectSchema>;

export default function ProjectsManager() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Tech stack local states
  const [techStack, setTechStack] = useState<string[]>([]);
  const [newTech, setNewTech] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const userRole = session?.user?.role || "content_writer";
  const isOwner = userRole === "owner";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "projects"],
    queryFn: () => apiFetch<ApiResponse<Project[]>>("/projects?status=all"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFields>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      isFeatured: false,
      status: "draft",
    },
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (val: string) => {
    setValue("title", val);
    if (!editingProject) {
      setValue("slug", generateSlug(val));
    }
  };

  const createMutation = useMutation({
    mutationFn: (body: Record<string, unknown>) =>
      apiFetch<ApiResponse<Project>>("/projects", {
        method: "POST",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      toast.success("Project created successfully!");
      setIsOpen(false);
      reset();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create project");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, body }: { id: string; body: Record<string, unknown> }) =>
      apiFetch<ApiResponse<Project>>(`/projects/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      toast.success("Project updated successfully!");
      setIsOpen(false);
      setEditingProject(null);
      reset();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update project");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiFetch<{ success: boolean }>(`/projects/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      toast.success("Project deleted successfully (soft delete)!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete project");
    },
  });

  const toggleFeaturedMutation = useMutation({
    mutationFn: (id: string) =>
      apiFetch<ApiResponse<Project>>(`/projects/${id}/featured`, {
        method: "PATCH",
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "projects"] });
      const starred = res.data.isFeatured ? "featured" : "unfeatured";
      toast.success(`Project marked as ${starred}!`);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to toggle featured status");
    },
  });

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setValue("title", project.title);
    setValue("slug", project.slug);
    setValue("clientName", project.clientName || "");
    setValue("industry", project.industry || "");
    setValue("category", project.category || "");
    setValue("heroImageUrl", project.heroImageUrl || "");
    setValue("heroImageCloudinaryId", project.heroImageCloudinaryId || "");
    setValue("problem", project.problem || "");
    setValue("solution", project.solution || "");
    setValue("results", project.results || "");
    setValue("isFeatured", project.isFeatured);
    setValue("status", project.status);
    setTechStack(project.techStack || []);
    setIsOpen(true);
  };

  const handleOpenNew = () => {
    setEditingProject(null);
    reset({
      title: "",
      slug: "",
      clientName: "",
      industry: "",
      category: "build",
      heroImageUrl: "",
      heroImageCloudinaryId: "",
      problem: "",
      solution: "",
      results: "",
      isFeatured: false,
      status: "draft",
    });
    setTechStack([]);
    setIsOpen(true);
  };

  const onSubmit = (fields: ProjectFields) => {
    const body = {
      ...fields,
      clientName: fields.clientName || null,
      industry: fields.industry || null,
      category: fields.category || null,
      heroImageUrl: fields.heroImageUrl || null,
      heroImageCloudinaryId: fields.heroImageCloudinaryId || null,
      problem: fields.problem || null,
      solution: fields.solution || null,
      results: fields.results || null,
      techStack,
    };

    if (editingProject) {
      updateMutation.mutate({ id: editingProject.id, body });
    } else {
      createMutation.mutate(body);
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"? This is a soft delete.`)) {
      deleteMutation.mutate(id);
    }
  };

  const handleToggleFeatured = (id: string) => {
    toggleFeaturedMutation.mutate(id);
  };

  const addTech = () => {
    if (newTech.trim() && !techStack.includes(newTech.trim())) {
      setTechStack([...techStack, newTech.trim()]);
      setNewTech("");
    }
  };

  const removeTech = (item: string) => {
    setTechStack(techStack.filter((t) => t !== item));
  };

  const getStatusColor = (status: string) => {
    return status === "published"
      ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
      : "bg-amber-500/10 text-amber-500 border-amber-500/20";
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">
            Case Studies
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">
            Manage client portfolio work and success stories
          </p>
        </div>
        <Button
          onClick={handleOpenNew}
          className="bg-brand-orange hover:bg-brand-orange-hover text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Case Study</span>
        </Button>
      </div>

      {/* Search Filter Card */}
      <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] p-4 flex items-center gap-2 rounded-xl">
        <Search className="w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder="Search case studies by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
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
                Failed to load projects. Please refresh.
              </div>
            ) : !data?.data || data.data.length === 0 ? (
              <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
                No projects found.
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="px-8 py-4">Title</th>
                    <th className="px-6 py-4">Client</th>
                    <th className="px-6 py-4">Industry</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Featured</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-slate-700 dark:text-slate-300">
                  {data.data
                    .filter((p) =>
                      p.title.toLowerCase().includes(searchQuery.toLowerCase()),
                    )
                    .map((project) => (
                      <tr
                        key={project.id}
                        className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors duration-150"
                      >
                        <td className="px-8 py-4">
                          <div className="flex flex-col max-w-sm">
                            <span className="font-semibold text-slate-900 dark:text-white leading-snug">
                              {project.title}
                            </span>
                            <span className="text-xs text-slate-400 font-mono mt-0.5 truncate">
                              {project.slug}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {project.clientName || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          {project.industry || "N/A"}
                        </td>
                        <td className="px-6 py-4 capitalize">
                          {project.category || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() =>
                              isOwner && handleToggleFeatured(project.id)
                            }
                            disabled={!isOwner}
                            className={`flex items-center gap-1 text-xs font-semibold focus:outline-none transition-colors duration-150 ${
                              project.isFeatured
                                ? "text-amber-500 hover:text-amber-600"
                                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                            }`}
                          >
                            <Star
                              className={`w-4 h-4 ${project.isFeatured ? "fill-amber-500" : ""}`}
                            />
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            variant="outline"
                            className={`capitalize font-semibold text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(project.status)}`}
                          >
                            {project.status}
                          </Badge>
                        </td>
                        <td className="px-8 py-4 text-right">
                          <div className="flex gap-1.5 justify-end">
                            {project.status === "published" && (
                              <div className="flex gap-1.5">
                                <a
                                  href={`/work/${project.slug}`}
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
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  title="Copy public link"
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      window.location.origin +
                                        `/work/${project.slug}`,
                                    );
                                    toast.success("Link copied!");
                                  }}
                                  className="h-8 w-8 p-0 text-slate-400 hover:text-blue-500 hover:bg-blue-500/5"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEdit(project)}
                              className="h-8 w-8 p-0 text-slate-600 hover:text-brand-orange hover:bg-brand-orange/5 dark:text-slate-400"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleDelete(project.id, project.title)
                              }
                              className="h-8 w-8 p-0 text-slate-600 hover:text-red-500 hover:bg-red-500/5 dark:text-slate-400"
                            >
                              <Trash className="w-3.5 h-3.5" />
                            </Button>
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

      {/* Add / Edit Case Study Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl bg-white dark:bg-[#151f32] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl overflow-y-auto max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="font-poppins">
              {editingProject ? "Edit Case Study" : "Create Case Study"}
            </DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 text-xs">
              Fill in case study data (Problem, Solution, Results) to display it
              in details page.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="title" className="text-xs font-semibold">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Project Name"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850"
                  {...register("title")}
                  onChange={(e) => handleTitleChange(e.target.value)}
                />
                {errors.title && (
                  <p className="text-red-500 text-[10px]">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="slug" className="text-xs font-semibold">
                  URL Slug
                </Label>
                <Input
                  id="slug"
                  placeholder="project-slug-name"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 font-mono text-xs"
                  {...register("slug")}
                />
                {errors.slug && (
                  <p className="text-red-500 text-[10px]">
                    {errors.slug.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label htmlFor="clientName" className="text-xs font-semibold">
                  Client Name
                </Label>
                <Input
                  id="clientName"
                  placeholder="Client Co."
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs"
                  {...register("clientName")}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="industry" className="text-xs font-semibold">
                  Industry
                </Label>
                <Input
                  id="industry"
                  placeholder="Retail / SaaS"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs"
                  {...register("industry")}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="category" className="text-xs font-semibold">
                  Category
                </Label>
                <Select
                  id="category"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs"
                  {...register("category")}
                >
                  <SelectValue placeholder="Select Category" />
                  <SelectItem value="build">Build (Development)</SelectItem>
                  <SelectItem value="automate">Automate (AI)</SelectItem>
                  <SelectItem value="grow">Grow (Marketing)</SelectItem>
                  <SelectItem value="design">Design (Branding)</SelectItem>
                </Select>
              </div>
            </div>

            <ImageUpload
              folder="projects"
              label="Hero Image"
              hint="Wide photo recommended — JPG, PNG, WebP up to 5MB"
              value={watch("heroImageUrl") || ""}
              aspectRatio="wide"
              onChange={(url, publicId) => {
                setValue("heroImageUrl", url);
                setValue("heroImageCloudinaryId", publicId);
              }}
              onClear={() => {
                setValue("heroImageUrl", "");
                setValue("heroImageCloudinaryId", "");
              }}
            />

            {/* Case study detail descriptions */}
            <div className="space-y-3 p-4 rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/10">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Case Study Details
              </span>
              <div className="space-y-2">
                <Label htmlFor="problem" className="text-xs font-semibold">
                  Problem / Challenge
                </Label>
                <Textarea
                  id="problem"
                  rows={2}
                  placeholder="Explain the client problem..."
                  className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs"
                  {...register("problem")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="solution" className="text-xs font-semibold">
                  Solution Implemented
                </Label>
                <Textarea
                  id="solution"
                  rows={2}
                  placeholder="How we solved it..."
                  className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs"
                  {...register("solution")}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="results" className="text-xs font-semibold">
                  Results & Outcomes
                </Label>
                <Textarea
                  id="results"
                  rows={2}
                  placeholder="Outcomes achieved (e.g. 50% revenue growth)..."
                  className="bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs"
                  {...register("results")}
                />
              </div>
            </div>

            {/* Tech Stack items */}
            <div className="space-y-2">
              <Label className="text-xs font-semibold">
                Technologies Utilized
              </Label>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. Next.js, FastAPI"
                  value={newTech}
                  onChange={(e) => setNewTech(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addTech())
                  }
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs h-9 max-w-xs"
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={addTech}
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white"
                >
                  Add Tech
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {techStack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="flex items-center gap-1 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded text-[10px]"
                  >
                    <span>{tech}</span>
                    <X
                      className="w-3 h-3 text-slate-400 hover:text-red-500 cursor-pointer"
                      onClick={() => removeTech(tech)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 items-center pt-2">
              <div className="space-y-1">
                <Label htmlFor="status" className="text-xs font-semibold">
                  Publication Status
                </Label>
                <Select
                  id="status"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs"
                  {...register("status")}
                >
                  <SelectValue placeholder="Select Status" />
                  <SelectItem value="draft">Draft (Private)</SelectItem>
                  <SelectItem value="published">Published (Public)</SelectItem>
                </Select>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input
                  id="isFeatured"
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 bg-slate-50 text-brand-orange focus:ring-brand-orange"
                  {...register("isFeatured")}
                />
                <Label
                  htmlFor="isFeatured"
                  className="text-xs font-semibold select-none cursor-pointer"
                >
                  Featured Case Study
                </Label>
              </div>
            </div>

            <DialogFooter className="pt-4 border-t border-slate-100 dark:border-slate-800/40">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="bg-brand-orange hover:bg-brand-orange-hover text-white"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
