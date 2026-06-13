"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../../lib/api";
import { Card, CardHeader } from "../../../components/ui/card";
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
import {
  Plus,
  Edit2,
  Trash2,
  UserPlus,
  Image as ImageIcon,
} from "lucide-react";
import { ImageUpload } from "../../../components/admin/ImageUpload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

interface TeamMember {
  id: string;
  name: string;
  designation: string;
  photoUrl: string | null;
  photoCloudinaryId: string | null;
  linkedinUrl: string | null;
  sortOrder: number;
  isActive: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const memberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  designation: z.string().min(1, "Designation is required"),
  photoUrl: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  photoCloudinaryId: z.string().optional(),
  linkedinUrl: z
    .string()
    .url("Must be a valid LinkedIn URL")
    .or(z.literal(""))
    .optional(),
  sortOrder: z.coerce.number().int().default(0),
  isActive: z.boolean().default(true),
});

type MemberFields = z.infer<typeof memberSchema>;

export default function TeamManager() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "team"],
    queryFn: () => apiFetch<ApiResponse<TeamMember[]>>("/team?all=true"),
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MemberFields>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      isActive: true,
      sortOrder: 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: (newMember: MemberFields) =>
      apiFetch<ApiResponse<TeamMember>>("/team", {
        method: "POST",
        body: JSON.stringify(newMember),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "team"] });
      toast.success("Team member added successfully!");
      setIsOpen(false);
      reset();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to add team member");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: MemberFields }) =>
      apiFetch<ApiResponse<TeamMember>>(`/team/${id}`, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "team"] });
      toast.success("Team member updated successfully!");
      setIsOpen(false);
      setEditingMember(null);
      reset();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update team member");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiFetch<{ success: boolean; message?: string }>(`/team/${id}`, {
        method: "DELETE",
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "team"] });
      toast.success(res.message || "Team member deleted successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete team member");
    },
  });

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setValue("name", member.name);
    setValue("designation", member.designation);
    setValue("photoUrl", member.photoUrl || "");
    setValue("photoCloudinaryId", member.photoCloudinaryId || "");
    setValue("linkedinUrl", member.linkedinUrl || "");
    setValue("sortOrder", member.sortOrder);
    setValue("isActive", member.isActive);
    setIsOpen(true);
  };

  const handleOpenNew = () => {
    setEditingMember(null);
    reset({
      name: "",
      designation: "",
      photoUrl: "",
      photoCloudinaryId: "",
      linkedinUrl: "",
      sortOrder: 0,
      isActive: true,
    });
    setIsOpen(true);
  };

  const onSubmit = (fields: MemberFields) => {
    const cleanFields = {
      ...fields,
      photoUrl: fields.photoUrl || null,
      photoCloudinaryId: fields.photoCloudinaryId || null,
      linkedinUrl: fields.linkedinUrl || null,
    } as unknown as MemberFields;

    if (editingMember) {
      updateMutation.mutate({ id: editingMember.id, data: cleanFields });
    } else {
      createMutation.mutate(cleanFields);
    }
  };

  const handleDelete = (id: string, name: string) => {
    if (
      window.confirm(`Delete "${name}" from the team? This cannot be undone.`)
    ) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">
            Team Roster
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">
            Manage profiles of team members and content authors
          </p>
        </div>
        <Button
          onClick={handleOpenNew}
          className="bg-brand-orange hover:bg-brand-orange-hover text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </Button>
      </div>

      {/* Roster Cards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      ) : !data?.data || data.data.length === 0 ? (
        <Card className="border border-dashed border-slate-300 dark:border-slate-800 p-12 text-center text-slate-500 max-w-lg mx-auto rounded-xl">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-6 h-6 text-slate-400" />
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white mb-1">
            No Team Members Found
          </h3>
          <p className="text-xs text-slate-400 mb-6">
            Add team members to display them on the website and assign them as
            blog authors.
          </p>
          <Button
            onClick={handleOpenNew}
            className="bg-brand-orange hover:bg-brand-orange-hover text-white"
          >
            Add First Member
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.data.map((member) => (
            <Card
              key={member.id}
              className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col rounded-xl"
            >
              {/* Member Photo area */}
              <div className="aspect-square w-full relative bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800/60 flex items-center justify-center overflow-hidden">
                {member.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-full h-full object-cover object-center"
                  />
                ) : (
                  <ImageIcon className="w-10 h-10 text-slate-300 dark:text-slate-700" />
                )}
                {!member.isActive && (
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex items-center justify-center">
                    <span className="bg-red-500/90 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
                      Inactive
                    </span>
                  </div>
                )}
              </div>

              {/* Member details card footer */}
              <CardHeader className="p-4 flex-grow space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight truncate font-poppins">
                    {member.name}
                  </h3>
                  {member.linkedinUrl && (
                    <a
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-slate-400 hover:text-[#0077B5] transition-colors duration-150"
                    >
                      <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-tight font-medium font-inter">
                  {member.designation}
                </p>
              </CardHeader>

              <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800/40 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/10">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">
                  Sort Order: {member.sortOrder}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(member)}
                    className="h-8 w-8 p-0 text-slate-600 hover:text-brand-orange hover:bg-brand-orange/5 dark:text-slate-400 dark:hover:text-brand-orange"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(member.id, member.name)}
                    className="h-8 w-8 p-0 text-slate-600 hover:text-red-500 hover:bg-red-500/5 dark:text-slate-400 dark:hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Add / Edit Dialog Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md bg-white dark:bg-[#151f32] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl">
          <DialogHeader>
            <DialogTitle className="font-poppins">
              {editingMember ? "Edit Team Member" : "Add Team Member"}
            </DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 text-xs">
              Fill in the details to publish the profile to the website.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-xs font-semibold">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-[10px]">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="designation" className="text-xs font-semibold">
                  Designation
                </Label>
                <Input
                  id="designation"
                  placeholder="Lead Developer"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850"
                  {...register("designation")}
                />
                {errors.designation && (
                  <p className="text-red-500 text-[10px]">
                    {errors.designation.message}
                  </p>
                )}
              </div>
            </div>

            <ImageUpload
              folder="team"
              label="Profile Photo"
              hint="Square photo recommended — JPG, PNG, WebP up to 5MB"
              value={watch("photoUrl") || ""}
              aspectRatio="square"
              onChange={(url, publicId) => {
                setValue("photoUrl", url);
                setValue("photoCloudinaryId", publicId);
              }}
              onClear={() => {
                setValue("photoUrl", "");
                setValue("photoCloudinaryId", "");
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label
                  htmlFor="photoCloudinaryId"
                  className="text-xs font-semibold"
                >
                  Cloudinary Image ID
                </Label>
                <Input
                  id="photoCloudinaryId"
                  placeholder="team/john-doe"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 font-mono text-xs"
                  {...register("photoCloudinaryId")}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="linkedinUrl" className="text-xs font-semibold">
                  LinkedIn URL
                </Label>
                <Input
                  id="linkedinUrl"
                  placeholder="https://linkedin.com/in/..."
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs"
                  {...register("linkedinUrl")}
                />
                {errors.linkedinUrl && (
                  <p className="text-red-500 text-[10px]">
                    {errors.linkedinUrl.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 items-center pt-2">
              <div className="space-y-1">
                <Label htmlFor="sortOrder" className="text-xs font-semibold">
                  Sort Order
                </Label>
                <Input
                  id="sortOrder"
                  type="number"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850"
                  {...register("sortOrder")}
                />
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input
                  id="isActive"
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-700 bg-slate-50 text-brand-orange focus:ring-brand-orange"
                  {...register("isActive")}
                />
                <Label
                  htmlFor="isActive"
                  className="text-xs font-semibold select-none cursor-pointer"
                >
                  Active Profile
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
