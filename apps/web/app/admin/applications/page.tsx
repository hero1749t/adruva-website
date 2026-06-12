"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../../lib/api";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Mail,
  Phone,
  Calendar,
  Info,
  Globe,
  Star,
  FileText,
  Link as LinkIcon,
} from "lucide-react";
import toast from "react-hot-toast";

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string | null;
  currentLocation: string | null;
  qualification: string | null;
  experienceLevel: string | null;
  resumeUrl: string | null;
  portfolioUrl: string | null;
  linkedinUrl: string | null;
  coverLetter: string | null;
  whyJoin: string | null;
  referralSource: string | null;
  status: string;
  internalRating: number | null;
  adminNotes: string | null;
  reviewedBy: string | null;
  ipAddress: string | null;
  createdAt: string;
}

interface PaginatedResponse {
  success: boolean;
  data: Application[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface SingleResponse {
  success: boolean;
  data: Application;
}

export default function ApplicationsManager() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>("all");
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const limit = 10;

  // Notes and Rating form states for detail update
  const [adminNotes, setAdminNotes] = useState("");
  const [internalRating, setInternalRating] = useState<number>(3);
  const [appStatus, setAppStatus] = useState("new");

  const statusFilter = status === "all" ? "" : `&status=${status}`;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "applications", { page, limit, status }],
    queryFn: () =>
      apiFetch<PaginatedResponse>(
        `/applications?page=${page}&limit=${limit}${statusFilter}`,
      ),
  });

  const { data: activeAppData, isLoading: detailsLoading } = useQuery({
    queryKey: ["admin", "application", selectedAppId],
    queryFn: async () => {
      const res = await apiFetch<SingleResponse>(
        `/applications/${selectedAppId}`,
      );
      if (res?.data) {
        setAdminNotes(res.data.adminNotes || "");
        setInternalRating(res.data.internalRating || 3);
        setAppStatus(res.data.status || "new");
      }
      return res;
    },
    enabled: !!selectedAppId,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: any }) =>
      apiFetch<{ success: boolean }>(`/applications/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "applications"] });
      queryClient.invalidateQueries({
        queryKey: ["admin", "application", selectedAppId],
      });
      toast.success("Application details updated successfully!");
      setIsOpen(false);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update application");
    },
  });

  const handleOpenDetails = (id: string) => {
    setSelectedAppId(id);
    setIsOpen(true);
  };

  const handleSaveChanges = () => {
    if (selectedAppId) {
      updateMutation.mutate({
        id: selectedAppId,
        payload: {
          status: appStatus,
          internalRating,
          adminNotes,
        },
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "contacted":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case "shortlisted":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "interview":
        return "bg-pink-500/10 text-pink-500 border-pink-500/20";
      case "hired":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  const activeApp = activeAppData?.data;

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">
            Job Applications
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">
            Review and track candidate profiles and submissions
          </p>
        </div>
      </div>

      {/* Filters card */}
      <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] p-4 flex items-center gap-4 rounded-xl">
        <div className="flex items-center gap-2">
          <Label
            htmlFor="status-filter"
            className="text-xs font-semibold text-slate-500 dark:text-slate-400"
          >
            Filter Status:
          </Label>
          <select
            id="status-filter"
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="h-9 px-3 text-xs rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none w-[140px]"
          >
            <option value="all">All Applications</option>
            <option value="new">🔵 New</option>
            <option value="contacted">🟡 Contacted</option>
            <option value="shortlisted">🟣 Shortlisted</option>
            <option value="interview">💗 Interview</option>
            <option value="hired">🟢 Hired</option>
            <option value="rejected">🔴 Rejected</option>
          </select>
        </div>
      </Card>

      {/* Applications Listing Card Table */}
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
                Failed to load applications. Please refresh.
              </div>
            ) : !data?.data || data.data.length === 0 ? (
              <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
                No applications found matching criteria.
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="px-8 py-4">Candidate</th>
                    <th className="px-6 py-4">Applied For</th>
                    <th className="px-6 py-4">Experience</th>
                    <th className="px-6 py-4">Rating</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-slate-700 dark:text-slate-300">
                  {data.data.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors duration-150"
                    >
                      <td className="px-8 py-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-900 dark:text-white leading-snug">
                            {app.fullName}
                          </span>
                          <span className="text-xs text-slate-400 font-mono mt-0.5">
                            {app.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium">{app.jobTitle}</td>
                      <td className="px-6 py-4 capitalize text-xs">
                        {app.experienceLevel || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-amber-500 gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${i < (app.internalRating || 0) ? "fill-current" : "text-slate-300 dark:text-slate-700"}`}
                            />
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant="outline"
                          className={`capitalize font-semibold text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(app.status)}`}
                        >
                          {app.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-500 dark:text-slate-400">
                        {new Date(app.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-8 py-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDetails(app.id)}
                          className="h-8 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 text-xs flex items-center gap-1.5 ml-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Review</span>
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
                Showing page {data.pagination.page} of{" "}
                {data.pagination.totalPages} ({data.pagination.total} total)
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
                  onClick={() =>
                    setPage((p) => Math.min(data.pagination.totalPages, p + 1))
                  }
                  className="px-2"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Detail Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-2xl bg-white dark:bg-[#151f32] border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-poppins flex items-center gap-2">
              <Info className="w-5 h-5 text-brand-orange" />
              <span>Application Review</span>
            </DialogTitle>
            <DialogDescription className="text-slate-500 dark:text-slate-400 text-xs">
              Complete candidate profile and review dashboard parameters.
            </DialogDescription>
          </DialogHeader>

          {detailsLoading || !activeApp ? (
            <div className="space-y-4 py-8">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
          ) : (
            <div className="space-y-6 py-2">
              {/* Profile Card */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-850 bg-slate-50/50 dark:bg-slate-900/10">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Candidate Info
                  </span>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    {activeApp.fullName}
                  </h4>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <Mail className="w-3.5 h-3.5" />
                    <a
                      href={`mailto:${activeApp.email}`}
                      className="hover:underline font-mono"
                    >
                      {activeApp.email}
                    </a>
                  </div>
                  {activeApp.phone && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                      <Phone className="w-3.5 h-3.5" />
                      <a
                        href={`tel:${activeApp.phone}`}
                        className="hover:underline"
                      >
                        {activeApp.phone}
                      </a>
                    </div>
                  )}
                </div>

                <div className="space-y-1 text-xs">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Job Details
                  </span>
                  <p className="pt-0.5">
                    <span className="font-semibold text-slate-500">
                      Position:
                    </span>{" "}
                    <span className="font-medium text-slate-900 dark:text-white">
                      {activeApp.jobTitle}
                    </span>
                  </p>
                  <p className="pt-0.5">
                    <span className="font-semibold text-slate-500">Level:</span>{" "}
                    <span className="font-medium text-slate-900 dark:text-white capitalize">
                      {activeApp.experienceLevel || "N/A"}
                    </span>
                  </p>
                  <p className="pt-0.5">
                    <span className="font-semibold text-slate-500">
                      Location:
                    </span>{" "}
                    <span className="font-medium text-slate-900 dark:text-white">
                      {activeApp.currentLocation || "N/A"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Links Area */}
              <div className="flex gap-3 flex-wrap">
                {activeApp.resumeUrl && (
                  <a
                    href={activeApp.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 text-blue-500 transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Resume</span>
                  </a>
                )}
                {activeApp.linkedinUrl && (
                  <a
                    href={activeApp.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 text-blue-500 transition-colors"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn Profile</span>
                  </a>
                )}
                {activeApp.portfolioUrl && (
                  <a
                    href={activeApp.portfolioUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-900 text-blue-500 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" />
                    <span>Portfolio Website</span>
                  </a>
                )}
              </div>

              {/* Text Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Why Join Adruva?
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 p-3 border border-slate-100 dark:border-slate-850 rounded-xl bg-slate-50/20 dark:bg-slate-950/30 min-h-[80px] whitespace-pre-wrap leading-relaxed">
                    {activeApp.whyJoin || "No explanation provided."}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    Cover Letter
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 p-3 border border-slate-100 dark:border-slate-850 rounded-xl bg-slate-50/20 dark:bg-slate-950/30 min-h-[80px] whitespace-pre-wrap leading-relaxed">
                    {activeApp.coverLetter || "No cover letter provided."}
                  </p>
                </div>
              </div>

              {/* Candidate Metadata */}
              <div className="text-[10px] text-slate-400 dark:text-slate-500 flex gap-4">
                <span>
                  Education/Qualification:{" "}
                  <b className="text-slate-600 dark:text-slate-300">
                    {activeApp.qualification || "N/A"}
                  </b>
                </span>
                <span>
                  Referral:{" "}
                  <b className="text-slate-600 dark:text-slate-300">
                    {activeApp.referralSource || "N/A"}
                  </b>
                </span>
              </div>

              {/* Admin Scoring Area */}
              <div className="border-t border-slate-100 dark:border-slate-800/40 pt-4 space-y-4">
                <h4 className="font-bold text-xs uppercase text-slate-400 tracking-wider">
                  Evaluation & Notes
                </h4>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs font-semibold">
                      Application Status
                    </Label>
                    <select
                      value={appStatus}
                      onChange={(e) => setAppStatus(e.target.value)}
                      className="w-full h-10 px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="new">🔵 New</option>
                      <option value="contacted">🟡 Contacted</option>
                      <option value="shortlisted">🟣 Shortlisted</option>
                      <option value="interview">💗 Interview</option>
                      <option value="hired">🟢 Hired</option>
                      <option value="rejected">🔴 Rejected</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs font-semibold">
                      Internal Rating
                    </Label>
                    <select
                      value={internalRating}
                      onChange={(e) =>
                        setInternalRating(Number(e.target.value))
                      }
                      className="w-full h-10 px-3 py-2 text-sm rounded-md border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none"
                    >
                      <option value="1">⭐ 1/5 - Poor Match</option>
                      <option value="2">⭐⭐ 2/5 - Weak Match</option>
                      <option value="3">⭐⭐⭐ 3/5 - Average</option>
                      <option value="4">⭐⭐⭐⭐ 4/5 - Strong Match</option>
                      <option value="5">⭐⭐⭐⭐⭐ 5/5 - Outstanding</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <Label htmlFor="notes" className="text-xs font-semibold">
                    Admin Notes & Remarks
                  </Label>
                  <textarea
                    id="notes"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Enter review notes, interview feedback, or scheduling parameters..."
                    className="w-full min-h-[80px] p-3 text-xs rounded-md border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none font-inter leading-relaxed"
                  />
                </div>
              </div>

              {/* Submission Date metadata */}
              <div className="border-t border-slate-100 dark:border-slate-800/40 pt-4 flex flex-col gap-1 text-[10px] text-slate-400 dark:text-slate-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>
                    Submitted on{" "}
                    {new Date(activeApp.createdAt).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center gap-1 font-mono">
                  <Globe className="w-3 h-3" />
                  <span>IP Address: {activeApp.ipAddress || "Unknown"}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-4 border-t border-slate-100 dark:border-slate-800/40 gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveChanges}
              disabled={updateMutation.isPending}
              className="bg-brand-orange hover:bg-brand-orange-hover text-white"
            >
              {updateMutation.isPending ? "Saving..." : "Save Evaluation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
