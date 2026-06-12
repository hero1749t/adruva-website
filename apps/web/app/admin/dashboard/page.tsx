"use client";

import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../../lib/api";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Skeleton } from "../../../components/ui/skeleton";
import {
  Mail,
  Send,
  FileText,
  Briefcase,
  ChevronRight,
  Clock,
  Users,
  UserCheck,
} from "lucide-react";
import Link from "next/link";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  serviceInterested: string;
  budgetRange: string;
  status: string;
  createdAt: string;
}

interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
  };
}

interface ArrayResponse<T> {
  success: boolean;
  data: T[];
}

export default function DashboardPage() {
  const { data: inquiriesData, isLoading: inquiriesLoading } = useQuery({
    queryKey: ["admin", "inquiries", { limit: 5 }],
    queryFn: () => apiFetch<PaginatedResponse<Inquiry>>("/inquiries?limit=5"),
  });

  const { data: newsletterData, isLoading: newsletterLoading } = useQuery({
    queryKey: ["admin", "newsletter", { limit: 1 }],
    queryFn: () =>
      apiFetch<PaginatedResponse<unknown>>("/newsletter/subscribers?limit=1"),
  });

  const { data: blogsData, isLoading: blogsLoading } = useQuery({
    queryKey: ["admin", "blogs", { limit: 1, status: "all" }],
    queryFn: () =>
      apiFetch<PaginatedResponse<unknown>>("/blog?limit=1&status=all"),
  });

  const { data: projectsData, isLoading: projectsLoading } = useQuery({
    queryKey: ["admin", "projects", { status: "all" }],
    queryFn: () => apiFetch<ArrayResponse<unknown>>("/projects?status=all"),
  });

  const { data: careersData, isLoading: careersLoading } = useQuery({
    queryKey: ["admin", "careers", { status: "all" }],
    queryFn: () =>
      apiFetch<PaginatedResponse<unknown>>("/careers?limit=1&status=all"),
  });

  const { data: applicationsData, isLoading: applicationsLoading } = useQuery({
    queryKey: ["admin", "applications", { limit: 1 }],
    queryFn: () =>
      apiFetch<PaginatedResponse<unknown>>("/applications?limit=1"),
  });

  const stats = [
    {
      name: "Total Inquiries",
      value: inquiriesData?.pagination.total ?? 0,
      loading: inquiriesLoading,
      icon: Mail,
      color: "from-orange-500 to-amber-500",
      description: "Customer contact submissions",
      href: "/admin/inquiries",
    },
    {
      name: "Newsletter Subscribers",
      value: newsletterData?.pagination.total ?? 0,
      loading: newsletterLoading,
      icon: Send,
      color: "from-blue-500 to-indigo-500",
      description: "Active email registrations",
      href: "/admin/newsletter",
    },
    {
      name: "Blog Posts",
      value: blogsData?.pagination.total ?? 0,
      loading: blogsLoading,
      icon: FileText,
      color: "from-emerald-500 to-teal-500",
      description: "Published and draft articles",
      href: "/admin/blogs",
    },
    {
      name: "Case Studies",
      value: projectsData?.data.length ?? 0,
      loading: projectsLoading,
      icon: Briefcase,
      color: "from-purple-500 to-pink-500",
      description: "Client work portfolio items",
      href: "/admin/projects",
    },
    {
      name: "Open Positions",
      value: careersData?.pagination.total ?? 0,
      loading: careersLoading,
      icon: Users,
      color: "from-cyan-500 to-sky-500",
      description: "Active job listings",
      href: "/admin/careers",
    },
    {
      name: "Applications",
      value: applicationsData?.pagination.total ?? 0,
      loading: applicationsLoading,
      icon: UserCheck,
      color: "from-rose-500 to-red-500",
      description: "Total job applications received",
      href: "/admin/applications",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "contacted":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "converted":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "closed":
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
      default:
        return "bg-slate-500/10 text-slate-500 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <Link key={idx} href={stat.href} className="block group">
            <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] overflow-hidden shadow-sm hover:shadow-md hover:border-brand-orange/30 transition-all duration-200">
              <CardContent className="p-6 relative">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
                      {stat.name}
                    </p>
                    {stat.loading ? (
                      <Skeleton className="h-8 w-16" />
                    ) : (
                      <p className="text-3xl font-bold font-poppins text-slate-900 dark:text-white">
                        {stat.value}
                      </p>
                    )}
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg shadow-slate-200 dark:shadow-none group-hover:scale-105 transition-transform duration-200`}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-4 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{stat.description}</span>
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Inquiries Overview */}
      <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-800/60">
          <div className="space-y-0.5">
            <CardTitle className="text-lg font-bold font-poppins text-slate-900 dark:text-white">
              Recent Inquiries
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400 text-xs font-inter">
              The latest incoming contact form submissions
            </CardDescription>
          </div>
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-1 text-xs font-semibold text-brand-orange hover:text-brand-orange-hover transition-colors duration-150"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            {inquiriesLoading ? (
              <div className="p-8 space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : !inquiriesData?.data || inquiriesData.data.length === 0 ? (
              <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm">
                No recent inquiries found.
              </div>
            ) : (
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/30 text-slate-500 dark:text-slate-400 font-semibold">
                    <th className="px-8 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Budget</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40 text-slate-700 dark:text-slate-300">
                  {inquiriesData.data.map((inquiry) => (
                    <tr
                      key={inquiry.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors duration-150"
                    >
                      <td className="px-8 py-4 font-medium text-slate-900 dark:text-white">
                        {inquiry.name}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs">
                        {inquiry.email}
                      </td>
                      <td className="px-6 py-4 capitalize">
                        {inquiry.serviceInterested?.replace("-", " ") || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        {inquiry.budgetRange || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant="outline"
                          className={`capitalize font-semibold text-[10px] px-2 py-0.5 rounded-full ${getStatusColor(inquiry.status)}`}
                        >
                          {inquiry.status}
                        </Badge>
                      </td>
                      <td className="px-8 py-4 text-right font-medium text-slate-500 dark:text-slate-400">
                        {new Date(inquiry.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
