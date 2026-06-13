"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../../lib/api";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Plus, Edit2, Trash2, Briefcase, ExternalLink } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  slug: string;
  type: string;
  department: string;
  locationType: string | null;
  experienceLevel: string | null;
  description: string | null;
  responsibilities: string[];
  requirements: string[];
  skillsRequired: string[];
  salaryMin: number | null;
  salaryMax: number | null;
  salaryLabel: string | null;
  isPaid: boolean;
  duration: string | null;
  applicationDeadline: string | null;
  openingsCount: number;
  status: string;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const jobSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  type: z.string().min(1, "Job type is required"),
  department: z.string().min(1, "Department is required"),
  locationType: z.string().optional(),
  experienceLevel: z.string().optional(),
  description: z.string().optional(),
  responsibilitiesRaw: z.string().optional(),
  requirementsRaw: z.string().optional(),
  skillsRequiredRaw: z.string().optional(),
  salaryMin: z.coerce.number().optional(),
  salaryMax: z.coerce.number().optional(),
  salaryLabel: z.string().optional(),
  applicationDeadline: z.string().optional(),
  openingsCount: z.coerce.number().int().default(1),
  status: z.string().default("draft"),
});

type JobFields = z.infer<typeof jobSchema>;

export default function CareersManager() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "jobs"],
    queryFn: () => apiFetch<ApiResponse<Job[]>>("/careers?status=all"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<JobFields>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      type: "full_time",
      locationType: "remote",
      experienceLevel: "mid",
      openingsCount: 1,
      status: "draft",
    },
  });

  // Watch title to auto-generate slug
  const titleVal = watch("title");
  const handleGenerateSlug = () => {
    if (titleVal) {
      const generated = titleVal
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setValue("slug", generated);
    }
  };

  const createMutation = useMutation({
    mutationFn: (newJob: any) =>
      apiFetch<ApiResponse<Job>>("/careers", {
        method: "POST",
        body: JSON.stringify(newJob),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "jobs"] });
      toast.success("Job posting created successfully!");
      setIsOpen(false);
      reset();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to create job posting");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiFetch<ApiResponse<Job>>(`/careers/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "jobs"] });
      toast.success("Job posting updated successfully!");
      setIsOpen(false);
      setEditingJob(null);
      reset();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update job posting");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiFetch<{ success: boolean; message?: string }>(`/careers/${id}`, {
        method: "DELETE",
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "jobs"] });
      toast.success(res.message || "Job posting deleted successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete job posting");
    },
  });

  const handleEdit = (job: Job) => {
    setEditingJob(job);
    setValue("title", job.title);
    setValue("slug", job.slug);
    setValue("type", job.type);
    setValue("department", job.department);
    setValue("locationType", job.locationType || "remote");
    setValue("experienceLevel", job.experienceLevel || "mid");
    setValue("description", job.description || "");
    setValue("responsibilitiesRaw", job.responsibilities?.join("\n") || "");
    setValue("requirementsRaw", job.requirements?.join("\n") || "");
    setValue("skillsRequiredRaw", job.skillsRequired?.join("\n") || "");
    setValue("salaryMin", job.salaryMin || undefined);
    setValue("salaryMax", job.salaryMax || undefined);
    setValue("salaryLabel", job.salaryLabel || "");
    setValue(
      "applicationDeadline",
      job.applicationDeadline
        ? new Date(job.applicationDeadline).toISOString().split("T")[0]
        : "",
    );
    setValue("openingsCount", job.openingsCount);
    setValue("status", job.status);
    setIsOpen(true);
  };

  const handleOpenNew = () => {
    setEditingJob(null);
    reset({
      title: "",
      slug: "",
      type: "full_time",
      department: "Engineering",
      locationType: "remote",
      experienceLevel: "mid",
      description: "",
      responsibilitiesRaw: "",
      requirementsRaw: "",
      skillsRequiredRaw: "",
      salaryMin: undefined,
      salaryMax: undefined,
      salaryLabel: "LPA",
      applicationDeadline: "",
      openingsCount: 1,
      status: "draft",
    });
    setIsOpen(true);
  };

  const onSubmit = (fields: JobFields) => {
    // Parse raw text lines into string arrays
    const responsibilities = fields.responsibilitiesRaw
      ? fields.responsibilitiesRaw
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const requirements = fields.requirementsRaw
      ? fields.requirementsRaw
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    const skillsRequired = fields.skillsRequiredRaw
      ? fields.skillsRequiredRaw
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const jobPayload = {
      title: fields.title,
      slug: fields.slug,
      type: fields.type,
      department: fields.department,
      locationType: fields.locationType || null,
      experienceLevel: fields.experienceLevel || null,
      description: fields.description || null,
      responsibilities,
      requirements,
      skillsRequired,
      salaryMin: fields.salaryMin || null,
      salaryMax: fields.salaryMax || null,
      salaryLabel: fields.salaryLabel || null,
      applicationDeadline: fields.applicationDeadline || null,
      openingsCount: fields.openingsCount,
      status: fields.status,
    };

    if (editingJob) {
      updateMutation.mutate({ id: editingJob.id, data: jobPayload });
    } else {
      createMutation.mutate(jobPayload);
    }
  };

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`Delete "${title}"? This is a soft delete.`)) {
      deleteMutation.mutate(id);
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "draft":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "archived":
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
      default:
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  const formatJobType = (type: string) => {
    return type.replace("_", " ");
  };

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">
            Careers Manager
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">
            Publish and edit available positions on the Careers portal
          </p>
        </div>
        <Button
          onClick={handleOpenNew}
          className="bg-brand-orange hover:bg-brand-orange-hover text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </Button>
      </div>

      {/* Main Table */}
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
                Failed to load job listings. Please refresh.
              </div>
            ) : !data?.data || data.data.length === 0 ? (
              <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm flex flex-col items-center justify-center gap-3">
                <Briefcase className="w-8 h-8 text-slate-400" />
                <p>No job postings found.</p>
                <Button onClick={handleOpenNew} variant="outline" size="sm">
                  Create a Job Listing
                </Button>
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="px-8 py-4">Title</th>
                    <th className="px-6 py-4">Department</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Openings</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-slate-700 dark:text-slate-300">
                  {data.data.map((job) => (
                    <tr
                      key={job.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors duration-150"
                    >
                      <td className="px-8 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 dark:text-white leading-snug">
                            {job.title}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5">
                            {job.slug}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 capitalize">{job.department}</td>
                      <td className="px-6 py-4 capitalize text-xs">
                        {formatJobType(job.type)}
                      </td>
                      <td className="px-6 py-4 capitalize text-xs">
                        {job.locationType?.replace("_", " ") || "N/A"}
                      </td>
                      <td className="px-6 py-4">{job.openingsCount}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`capitalize font-semibold text-[10px] border px-2 py-0.5 rounded-full ${getStatusBadgeClass(job.status)}`}
                        >
                          {job.status}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex gap-1.5 justify-end">
                          <Link href={`/careers/${job.slug}`} target="_blank">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-slate-500 hover:text-blue-500"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(job)}
                            className="h-8 w-8 p-0 text-slate-500 hover:text-brand-orange"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(job.id, job.title)}
                            className="h-8 w-8 p-0 text-slate-500 hover:text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
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

      {/* Add / Edit Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl bg-white dark:bg-[#151f32] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-poppins">
              {editingJob ? "Edit Position" : "Create Position"}
            </DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 text-xs">
              Define the requirements, perks, and parameters for the job
              listing.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="title" className="text-xs font-semibold">
                  Job Title
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="title"
                    placeholder="Senior AI Engineer"
                    className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850"
                    {...register("title")}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleGenerateSlug}
                    className="text-xs shrink-0"
                  >
                    Slugify
                  </Button>
                </div>
                {errors.title && (
                  <p className="text-red-500 text-[10px]">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="slug" className="text-xs font-semibold">
                  Slug (Unique URL)
                </Label>
                <Input
                  id="slug"
                  placeholder="senior-ai-engineer"
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
                <Label htmlFor="type" className="text-xs font-semibold">
                  Job Type
                </Label>
                <select
                  id="type"
                  className="w-full h-10 px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                  {...register("type")}
                >
                  <option value="full_time">Full Time</option>
                  <option value="part_time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="department" className="text-xs font-semibold">
                  Department
                </Label>
                <Input
                  id="department"
                  placeholder="Engineering"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850"
                  {...register("department")}
                />
                {errors.department && (
                  <p className="text-red-500 text-[10px]">
                    {errors.department.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="locationType" className="text-xs font-semibold">
                  Location
                </Label>
                <select
                  id="locationType"
                  className="w-full h-10 px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                  {...register("locationType")}
                >
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="on_site">On Site</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label
                  htmlFor="experienceLevel"
                  className="text-xs font-semibold"
                >
                  Experience Level
                </Label>
                <select
                  id="experienceLevel"
                  className="w-full h-10 px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                  {...register("experienceLevel")}
                >
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="lead">Lead / Principal</option>
                </select>
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="openingsCount"
                  className="text-xs font-semibold"
                >
                  Openings Count
                </Label>
                <Input
                  id="openingsCount"
                  type="number"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850"
                  {...register("openingsCount")}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="status" className="text-xs font-semibold">
                  Status
                </Label>
                <select
                  id="status"
                  className="w-full h-10 px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                  {...register("status")}
                >
                  <option value="draft">🟡 Draft</option>
                  <option value="active">🟢 Active / Open</option>
                  <option value="archived">⚫ Archived / Closed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-1">
                <Label htmlFor="salaryMin" className="text-xs font-semibold">
                  Min Salary
                </Label>
                <Input
                  id="salaryMin"
                  type="number"
                  placeholder="5"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850"
                  {...register("salaryMin")}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="salaryMax" className="text-xs font-semibold">
                  Max Salary
                </Label>
                <Input
                  id="salaryMax"
                  type="number"
                  placeholder="10"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850"
                  {...register("salaryMax")}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="salaryLabel" className="text-xs font-semibold">
                  Salary Label
                </Label>
                <Input
                  id="salaryLabel"
                  placeholder="LPA / per month"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850"
                  {...register("salaryLabel")}
                />
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="applicationDeadline"
                  className="text-xs font-semibold"
                >
                  Deadline
                </Label>
                <Input
                  id="applicationDeadline"
                  type="date"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850"
                  {...register("applicationDeadline")}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="description" className="text-xs font-semibold">
                Job Description
              </Label>
              <textarea
                id="description"
                placeholder="Summarize the role, team, and company vision..."
                className="w-full min-h-[80px] p-3 text-sm rounded-md border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none font-inter leading-relaxed"
                {...register("description")}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <Label
                  htmlFor="requirementsRaw"
                  className="text-xs font-semibold"
                >
                  Requirements (one per line)
                </Label>
                <textarea
                  id="requirementsRaw"
                  placeholder="3+ years React experience&#10;Excellent communication"
                  className="w-full min-h-[120px] p-3 text-xs rounded-md border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none font-mono leading-relaxed"
                  {...register("requirementsRaw")}
                />
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="responsibilitiesRaw"
                  className="text-xs font-semibold"
                >
                  Responsibilities (one per line)
                </Label>
                <textarea
                  id="responsibilitiesRaw"
                  placeholder="Build responsive interfaces&#10;Optimize database queries"
                  className="w-full min-h-[120px] p-3 text-xs rounded-md border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none font-mono leading-relaxed"
                  {...register("responsibilitiesRaw")}
                />
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="skillsRequiredRaw"
                  className="text-xs font-semibold"
                >
                  Skills Required (one per line)
                </Label>
                <textarea
                  id="skillsRequiredRaw"
                  placeholder="TypeScript&#10;TailwindCSS&#10;PostgreSQL"
                  className="w-full min-h-[120px] p-3 text-xs rounded-md border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none font-mono leading-relaxed"
                  {...register("skillsRequiredRaw")}
                />
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
