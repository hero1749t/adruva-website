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
  ShieldAlert,
  Settings,
  UserCheck,
  FolderGit2,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    roles: ["owner", "manager", "content_writer"],
  },
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
  {
    name: "Inquiries",
    href: "/admin/inquiries",
    icon: Mail,
    roles: ["owner", "manager"],
  },
  {
    name: "Newsletter",
    href: "/admin/newsletter",
    icon: Send,
    roles: ["owner", "manager"],
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
    roles: ["owner"],
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0A0A0A]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm font-medium animate-pulse">
            Loading console...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const userRole = session.user?.role || "content_writer";

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-[#0A0A0A] transition-colors duration-300">
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`w-64 bg-[#0B1F3A] text-white flex flex-col fixed inset-y-0 left-0 z-20 border-r border-slate-800 shadow-xl transform transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Brand Logo Header */}
        <div className="h-16 flex items-center px-6 border-b border-slate-800 gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-orange flex items-center justify-center shadow-md shadow-brand-orange/20">
            <ShieldAlert className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col flex-1">
            <span className="font-bold text-sm leading-none font-poppins text-white">
              Adruva Console
            </span>
            <span className="text-[10px] text-brand-gray tracking-wider uppercase font-semibold mt-0.5">
              Website CMS
            </span>
          </div>
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems
            .filter((item) => item.roles.includes(userRole))
            .map((item) => {
              const isActive = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/15 font-semibold"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 group-hover:text-white"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
        </nav>

        {/* Footer User Profile & Logout */}
        <div className="p-4 border-t border-slate-800 bg-[#071527]/40">
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="text-sm font-semibold truncate font-inter text-white">
                {session.user?.name || "Admin User"}
              </span>
              <span className="text-xs text-brand-gray truncate capitalize">
                {userRole.replace("_", " ")}
              </span>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-800 hover:border-red-500/20 bg-slate-900/50 hover:bg-red-500/10 text-slate-300 hover:text-red-400 text-sm font-medium transition-all duration-200"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:pl-64 min-h-screen flex flex-col">
        {/* Top Navbar */}
        <header className="h-16 border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#0E1726]/30 backdrop-blur-md sticky top-0 z-10 flex items-center justify-between px-4 md:px-8 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold font-poppins text-slate-900 dark:text-white">
              {navItems.find((item) => pathname.startsWith(item.href))?.name ||
                "Admin Console"}
            </h1>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Dehradun, India
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 p-8 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
