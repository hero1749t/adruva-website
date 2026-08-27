"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Wrench,
  Users,
  Mail,
  Send,
  LogOut,
  Settings,
  UserCheck,
  FolderGit2,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Shield,
} from "lucide-react";
import { ThemeToggle } from "../../components/ui/theme-toggle";
import NotificationsBell from "../../components/admin/NotificationsBell";

type NavItem = {
  name: string;
  href: string;
  icon: any;
  roles: string[];
  permissions?: string[];
  badge?: string;
  badgeColor?: string;
};

type NavGroup = {
  title: string;
  items: NavItem[];
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#060814]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-xs font-semibold tracking-wider animate-pulse uppercase">
            Loading Admin Console...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const userRole = session.user?.role || "content_writer";
  const userInitial = session.user?.name?.slice(0, 2).toUpperCase() || "AD";

  const navGroups: NavGroup[] = [
    {
      title: "Main",
      items: [
        {
          name: "Dashboard",
          href: "/admin/dashboard",
          icon: LayoutDashboard,
          roles: ["owner", "manager", "content_writer"],
        },
      ],
    },
    {
      title: "Content CMS",
      items: [
        {
          name: "Blog Posts",
          href: "/admin/blogs",
          icon: FileText,
          roles: ["owner", "manager", "content_writer"],
        },
        {
          name: "Projects",
          href: "/admin/projects",
          icon: FolderGit2,
          roles: ["owner", "manager"],
        },
        {
          name: "Services",
          href: "/admin/services",
          icon: Wrench,
          roles: ["owner"],
        },
      ],
    },
    {
      title: "HR Operations",
      items: [
        {
          name: "Team Roster",
          href: "/admin/team",
          icon: Users,
          roles: ["owner", "manager"],
        },
        {
          name: "Careers",
          href: "/admin/careers",
          icon: Briefcase,
          roles: ["owner", "manager"],
        },
        {
          name: "Applications",
          href: "/admin/applications",
          icon: UserCheck,
          roles: ["owner", "manager"],
        },
      ],
    },
    {
      title: "Submissions",
      items: [
        {
          name: "Inquiries",
          href: "/admin/inquiries",
          icon: Mail,
          roles: ["owner", "manager"],
          badge: "Leads",
          badgeColor: "bg-emerald-500",
        },
        {
          name: "Newsletter",
          href: "/admin/newsletter",
          icon: Send,
          roles: ["owner", "manager"],
        },
      ],
    },
    {
      title: "System",
      items: [
        {
          name: "Settings",
          href: "/admin/settings",
          icon: Settings,
          roles: ["owner", "manager"],
          permissions: ["settings.edit"],
        },
        {
          name: "Email Templates",
          href: "/admin/settings/email-templates",
          icon: Mail,
          roles: ["owner", "manager"],
          permissions: ["settings.edit"],
        },
        {
          name: "Staff & RBAC",
          href: "/admin/settings/staff",
          icon: Shield,
          roles: ["owner"],
        },
      ],
    },
  ];

  const sidebar = (
    <aside
      className={[
        "h-screen flex flex-col bg-white dark:bg-[#070b15] text-slate-600 dark:text-slate-200 border-r border-slate-200 dark:border-slate-900 shadow-lg dark:shadow-2xl transition-all duration-300 relative z-20",
        isCollapsed ? "lg:w-20" : "lg:w-[17.5rem]",
        "w-[18.5rem]",
      ].join(" ")}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-5 border-b border-slate-200/60 dark:border-slate-900/60 gap-3 justify-between">
        <Link
          href="/admin/dashboard"
          scroll={false}
          className={`flex items-center gap-3 outline-none hover:opacity-90 ${
            isCollapsed ? "lg:justify-center lg:w-full" : ""
          }`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-orange text-sm font-black text-white shadow-md shadow-brand-orange/20">
            AD
          </span>
          {!isCollapsed && (
            <span className="min-w-0">
              <span className="block truncate text-sm font-extrabold leading-tight text-slate-900 dark:text-white font-poppins tracking-tight">
                Adruva Console
              </span>
              <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-brand-orange">
                Workspace
              </span>
            </span>
          )}
        </Link>
        <button
          type="button"
          onClick={() => setMobileMenuOpen(false)}
          className="rounded-full p-1.5 text-slate-400 dark:text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white lg:hidden border border-slate-200 dark:border-slate-800"
        >
          <X size={16} />
        </button>
      </div>

      {/* Tip Message box */}
      {!isCollapsed && (
        <div className="p-4 mx-4 mt-4 rounded-xl border border-slate-200 dark:border-slate-900 bg-slate-50 dark:bg-slate-950/40 hidden lg:block">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            <Sparkles size={12} className="text-brand-orange" />
            <span>Interactive Console</span>
          </div>
          <p className="mt-1 text-[11px] leading-normal text-slate-600 dark:text-slate-500 font-inter">
            Monitor client inquiries, post jobs, and manage sitemaps.
          </p>
        </div>
      )}

      {/* Collapsible Trigger for Desktop */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute top-4 -right-3.5 h-7 w-7 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#070b15] text-slate-400 hover:text-slate-600 dark:hover:text-white shadow-md cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Navigation Groups */}
      <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-6 space-y-4 font-inter">
        {navGroups.map((group) => {
          const userPermissions = session?.user?.permissions || [];
          const visibleItems = group.items.filter((item) => {
            if (!item.roles.includes(userRole)) return false;

            if (item.permissions && userRole !== "owner") {
              const hasAll = item.permissions.every((perm) =>
                userPermissions.includes(perm),
              );
              if (!hasAll) return false;
            }
            return true;
          });

          if (visibleItems.length === 0) return null;

          return (
            <section key={group.title} className="space-y-1">
              {!isCollapsed ? (
                <h4 className="px-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 py-1.5 font-poppins">
                  {group.title}
                </h4>
              ) : (
                <div className="mx-auto my-2 hidden h-px w-8 bg-slate-200 dark:bg-slate-900 lg:block" />
              )}

              <div className="space-y-0.5">
                {visibleItems.map((item) => {
                  const Icon = item.icon;
                  const active = pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      scroll={false}
                      onClick={() => setMobileMenuOpen(false)}
                      title={isCollapsed ? item.name : undefined}
                      className={[
                        "group relative flex min-h-10 items-center gap-3 rounded-xl px-3 text-xs font-semibold outline-none transition-all duration-150",
                        isCollapsed ? "lg:justify-center lg:px-0" : "",
                        active
                          ? "bg-brand-orange/10 dark:bg-slate-900/60 text-brand-orange dark:text-white shadow-sm ring-1 ring-brand-orange/20 dark:ring-slate-800/40"
                          : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/30 hover:text-slate-900 dark:hover:text-white",
                      ].join(" ")}
                    >
                      {active && !isCollapsed && (
                        <span className="absolute left-0 top-2.5 h-5 w-1 rounded-r-full bg-brand-orange" />
                      )}
                      <span
                        className={[
                          "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-transform duration-200 group-hover:scale-105",
                          active
                            ? "bg-brand-orange text-white shadow-md shadow-brand-orange/20"
                            : "bg-slate-50 dark:bg-slate-950 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-900 group-hover:bg-slate-100 dark:group-hover:bg-slate-900 group-hover:text-slate-700 dark:group-hover:text-white",
                        ].join(" ")}
                      >
                        <Icon size={14} />
                      </span>
                      {!isCollapsed && (
                        <>
                          <span className="min-w-0 flex-1 truncate font-medium">
                            {item.name}
                          </span>
                          {item.badge && (
                            <span
                              className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white ${
                                item.badgeColor || "bg-emerald-600"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                      {isCollapsed && item.badge && (
                        <span className="absolute right-3.5 top-2.5 hidden h-2 w-2 rounded-full bg-emerald-500 lg:block animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </nav>

      {/* Footer Profile */}
      <div className="border-t border-slate-200 dark:border-slate-900 p-3 bg-slate-50/50 dark:bg-[#05080f]/60 space-y-3">
        <div
          className={`flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-900 bg-white dark:bg-slate-950/40 p-2.5 ${
            isCollapsed ? "lg:justify-center lg:p-1.5" : ""
          }`}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-brand-orange font-poppins">
            {userInitial}
          </span>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 dark:text-white leading-tight truncate font-inter">
                {session.user?.name || "Admin"}
              </p>
              <p className="text-[10px] text-slate-500 truncate capitalize font-mono mt-0.5">
                {userRole.replace("_", " ")}
              </p>
            </div>
          )}
          {!isCollapsed && <ThemeToggle />}
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-900 hover:border-red-500/20 bg-white dark:bg-slate-950/20 hover:bg-red-500/10 text-slate-500 dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 text-xs font-semibold transition-all duration-200 cursor-pointer"
        >
          <LogOut size={13} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen lg:h-screen lg:overflow-hidden flex bg-slate-50 dark:bg-[#060814] text-slate-950 dark:text-slate-100 transition-colors duration-300">
      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop (Static) and Mobile (Drawer) */}
      <div
        className={`fixed inset-y-0 left-0 z-40 lg:static transform transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebar}
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        {/* Glowing Background Mesh */}
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-brand-orange/5 dark:bg-brand-orange/[0.015] rounded-full blur-[120px] pointer-events-none -z-10" />

        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-900/60 bg-white/80 dark:bg-[#060814]/80 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-6 md:px-8 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="lg:hidden p-1.5 -ml-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-800 transition"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={18} />
            </button>
            <h1 className="text-base font-bold font-poppins tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <Shield size={16} className="text-brand-orange" />
              <span>
                {navGroups
                  .flatMap((g) => g.items)
                  .find((item) => pathname.startsWith(item.href))?.name ||
                  "Admin Console"}
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <NotificationsBell />
            {isCollapsed && <ThemeToggle />}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/40 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Console Live</span>
            </div>
          </div>
        </header>

        {/* Dynamic Scrollable Page Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          {children}
        </div>
      </div>
    </div>
  );
}
