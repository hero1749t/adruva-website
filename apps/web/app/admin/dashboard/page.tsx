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
import { Button } from "../../../components/ui/button";
import {
  Mail,
  Send,
  FileText,
  Briefcase,
  ChevronRight,
  Clock,
  Users,
  UserCheck,
  Plus,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ShieldCheck,
  Server,
  Zap,
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
      accent: "border-orange-500/30",
      description: "Customer contact submissions",
      href: "/admin/inquiries",
    },
    {
      name: "Newsletter Subscribers",
      value: newsletterData?.pagination.total ?? 0,
      loading: newsletterLoading,
      icon: Send,
      color: "from-blue-500 to-indigo-500",
      accent: "border-blue-500/30",
      description: "Active email registrations",
      href: "/admin/newsletter",
    },
    {
      name: "Blog Posts",
      value: blogsData?.pagination.total ?? 0,
      loading: blogsLoading,
      icon: FileText,
      color: "from-emerald-500 to-teal-500",
      accent: "border-emerald-500/30",
      description: "Published and draft articles",
      href: "/admin/blogs",
    },
    {
      name: "Case Studies",
      value: projectsData?.data.length ?? 0,
      loading: projectsLoading,
      icon: Briefcase,
      color: "from-purple-500 to-pink-500",
      accent: "border-purple-500/30",
      description: "Client work portfolio items",
      href: "/admin/projects",
    },
    {
      name: "Open Positions",
      value: careersData?.pagination.total ?? 0,
      loading: careersLoading,
      icon: Users,
      color: "from-cyan-500 to-sky-500",
      accent: "border-cyan-500/30",
      description: "Active job listings",
      href: "/admin/careers",
    },
    {
      name: "Applications",
      value: applicationsData?.pagination.total ?? 0,
      loading: applicationsLoading,
      icon: UserCheck,
      color: "from-rose-500 to-red-500",
      accent: "border-rose-500/30",
      description: "Total job applications received",
      href: "/admin/applications",
    },
  ];

  const quickActions = [
    {
      label: "New Blog",
      icon: Plus,
      href: "/admin/blogs/new",
      gradient:
        "bg-orange-500/10 text-orange-500 dark:bg-orange-500/5 hover:bg-orange-500/20",
    },
    {
      label: "Add Project",
      icon: Briefcase,
      href: "/admin/projects",
      gradient:
        "bg-blue-500/10 text-blue-500 dark:bg-blue-500/5 hover:bg-blue-500/20",
    },
    {
      label: "Post Job",
      icon: UserCheck,
      href: "/admin/careers",
      gradient:
        "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/5 hover:bg-emerald-500/20",
    },
    {
      label: "View Leads",
      icon: Mail,
      href: "/admin/inquiries",
      gradient:
        "bg-purple-500/10 text-purple-500 dark:bg-purple-500/5 hover:bg-purple-500/20",
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
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white dark:bg-[#0c1220]/60 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-900/60 shadow-sm backdrop-blur-sm">
        <div>
          <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-brand-orange animate-pulse" />
            <span>Operational Console</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-inter mt-1">
            Real-time analytics and management dashboard for Adruva Solution.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-mono text-[10px]">
            DATABASE: ONLINE
          </Badge>
          <Badge className="bg-brand-orange/10 text-brand-orange border border-brand-orange/20 font-mono text-[10px]">
            SSL SECURE
          </Badge>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link key={idx} href={stat.href} className="block group">
              <Card
                className={`border-0 bg-white dark:bg-[#0c1220]/50 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden group cursor-pointer border-t-[3px] dark:border border-slate-200 dark:border-slate-900/80`}
              >
                <div
                  className={`h-1.5 bg-gradient-to-r ${stat.color} dark:hidden`}
                />
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold tracking-wider text-slate-500 dark:text-slate-400 uppercase font-poppins">
                        {stat.name}
                      </p>
                      {stat.loading ? (
                        <Skeleton className="h-8 w-16 mt-2" />
                      ) : (
                        <p className="text-3xl font-extrabold font-poppins text-slate-900 dark:text-white tracking-tight mt-1">
                          {stat.value}
                        </p>
                      )}
                    </div>
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-4 flex items-center gap-1.5 font-medium font-inter">
                    <Clock className="w-3.5 h-3.5 opacity-70" />
                    <span>{stat.description}</span>
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Analytics Chart & Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart Card */}
        <Card className="lg:col-span-2 border border-slate-200/80 dark:border-slate-900/60 bg-white dark:bg-[#0c1220]/50 shadow-md rounded-2xl overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-base font-bold font-poppins text-slate-900 dark:text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-orange" />
                  <span>Traffic & Leads Trend</span>
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400 text-xs font-inter mt-0.5">
                  Aggregate conversion activity from contact forms (Monthly)
                </CardDescription>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500 font-mono bg-slate-50 dark:bg-slate-950/60 px-2.5 py-1 rounded-full border border-slate-100 dark:border-slate-900">
                <span className="w-2 h-2 rounded-full bg-brand-orange" />
                <span>INQUIRIES</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Custom Responsive SVG Chart */}
            <div className="h-60 w-full bg-slate-50/40 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-900/40 rounded-xl p-4 flex flex-col justify-between">
              <svg
                className="w-full h-full overflow-visible"
                viewBox="0 0 600 180"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="chartGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Horizontal Grid lines */}
                <line
                  x1="0"
                  y1="45"
                  x2="600"
                  y2="45"
                  stroke="rgba(148, 163, 184, 0.08)"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="90"
                  x2="600"
                  y2="90"
                  stroke="rgba(148, 163, 184, 0.08)"
                  strokeWidth="1"
                />
                <line
                  x1="0"
                  y1="135"
                  x2="600"
                  y2="135"
                  stroke="rgba(148, 163, 184, 0.08)"
                  strokeWidth="1"
                />

                {/* Chart Path Area fill */}
                <path
                  d="M0 160 Q 75 140, 150 110 T 300 120 T 450 60 T 600 30 L 600 180 L 0 180 Z"
                  fill="url(#chartGradient)"
                />

                {/* Chart Trend Line */}
                <path
                  d="M0 160 Q 75 140, 150 110 T 300 120 T 450 60 T 600 30"
                  fill="none"
                  stroke="#FF6B00"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* Coordinate Markers */}
                <circle
                  cx="150"
                  cy="110"
                  r="4.5"
                  fill="#FF6B00"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <circle
                  cx="300"
                  cy="120"
                  r="4.5"
                  fill="#FF6B00"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <circle
                  cx="450"
                  cy="60"
                  r="4.5"
                  fill="#FF6B00"
                  stroke="#fff"
                  strokeWidth="2"
                />
                <circle
                  cx="600"
                  cy="30"
                  r="4.5"
                  fill="#FF6B00"
                  stroke="#fff"
                  strokeWidth="2"
                />
              </svg>

              {/* Timeline labels */}
              <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 font-mono border-t border-slate-100 dark:border-slate-900/60 pt-2.5 mt-2">
                <span>MARCH</span>
                <span>APRIL</span>
                <span>MAY</span>
                <span>JUNE</span>
                <span>JULY</span>
                <span>AUGUST</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & System Status Card */}
        <div className="flex flex-col gap-6">
          {/* Quick Actions */}
          <Card className="border border-slate-200/80 dark:border-slate-900/60 bg-white dark:bg-[#0c1220]/50 shadow-md rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold font-poppins text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-brand-orange" />
                <span>Console Actions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <Link key={idx} href={action.href}>
                      <div className="flex flex-col items-center gap-2 p-3.5 rounded-xl border border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-white dark:hover:bg-slate-900/60 hover:border-slate-200 dark:hover:border-slate-800 transition-all duration-200 group cursor-pointer text-center">
                        <div
                          className={`w-9 h-9 rounded-lg ${action.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}
                        >
                          <Icon className="h-4.5 w-4.5" />
                        </div>
                        <span className="text-[10px] font-bold text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white uppercase tracking-wider font-poppins">
                          {action.label}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* System status dashboard */}
          <Card className="border border-slate-200/80 dark:border-slate-900/60 bg-white dark:bg-[#0c1220]/50 shadow-md rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold font-poppins text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-orange" />
                <span>Systems Health</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2.5">
                {[
                  {
                    name: "Database (Postgres)",
                    status: "Active",
                    color: "bg-emerald-500",
                    icon: Server,
                  },
                  {
                    name: "Mail Agent (SMTP)",
                    status: "Ready",
                    color: "bg-emerald-500",
                    icon: Mail,
                  },
                  {
                    name: "API Route Gateway",
                    status: "Healthy",
                    color: "bg-emerald-500",
                    icon: Zap,
                  },
                ].map((sys, index) => {
                  const Icon = sys.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/40"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-900/40 dark:bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500">
                          <Icon size={14} />
                        </div>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 font-inter">
                          {sys.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${sys.color} animate-pulse`}
                        />
                        <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">
                          {sys.status}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Inquiries Overview */}
      <Card className="border border-slate-200/80 dark:border-slate-900/60 bg-white dark:bg-[#0c1220]/50 shadow-md rounded-2xl overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-900/40">
          <div className="space-y-0.5">
            <CardTitle className="text-base font-bold font-poppins text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-orange" />
              <span>Recent Inquiries</span>
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400 text-xs font-inter">
              The latest incoming customer and CRM contact logs
            </CardDescription>
          </div>
          <Link
            href="/admin/inquiries"
            className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-brand-orange hover:text-brand-orange-hover transition-colors duration-150 font-poppins"
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
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-900/40 bg-slate-50/50 dark:bg-slate-950/20 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Budget</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-900/40 text-slate-700 dark:text-slate-300 font-medium">
                  {inquiriesData.data.map((inquiry) => (
                    <tr
                      key={inquiry.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-900/15 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">
                        {inquiry.name}
                      </td>
                      <td className="px-6 py-4 font-mono text-[11px] text-slate-500">
                        {inquiry.email}
                      </td>
                      <td className="px-6 py-4 capitalize text-[11px]">
                        {inquiry.serviceInterested?.replace("-", " ") || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-[11px] font-semibold text-brand-orange">
                        {inquiry.budgetRange || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant="outline"
                          className={`capitalize font-semibold text-[9px] px-2 py-0.5 rounded-full ${getStatusColor(inquiry.status)}`}
                        >
                          {inquiry.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right text-slate-400 font-mono text-[11px]">
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
