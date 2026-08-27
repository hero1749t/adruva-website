"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../../../lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Skeleton } from "../../../../components/ui/skeleton";
import { Badge } from "../../../../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import {
  UserPlus,
  Shield,
  Trash2,
  Check,
  Loader2,
  Settings,
  Mail,
  UserCheck,
  UserX,
  Search,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const AVAILABLE_PERMISSIONS = [
  {
    key: "settings.edit",
    label: "Manage Settings & Email Templates",
    category: "System",
  },
  { key: "blog.create", label: "Create Blog Posts", category: "Content" },
  { key: "blog.edit", label: "Edit Blog Posts", category: "Content" },
  { key: "blog.publish", label: "Publish Blog Posts", category: "Content" },
  {
    key: "projects.edit",
    label: "Manage Portfolio Projects",
    category: "Content",
  },
  { key: "services.edit", label: "Manage Core Services", category: "Content" },
  { key: "careers.edit", label: "Manage Job Postings", category: "HR Ops" },
  {
    key: "applications.view",
    label: "View Candidate Applications",
    category: "HR Ops",
  },
  {
    key: "inquiries.view",
    label: "View Client Leads & Inquiries",
    category: "Submissions",
  },
];

export default function StaffManager() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isPermissionsOpen, setIsPermissionsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Form states for creating new user
  const [newUserName, setNewUserName] = useState("");
  const [newUserEmail, setNewUserEmail] = useState("");
  const [newUserPassword, setNewUserPassword] = useState("");
  const [newUserRole, setNewUserRole] = useState("content_writer");
  const [newUserPermissions, setNewUserPermissions] = useState<string[]>([]);

  // Permissions edit states
  const [editingPermissions, setEditingPermissions] = useState<string[]>([]);

  // Delete confirmations
  const [deleteUser, setDeleteUser] = useState<AdminUser | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: () => apiFetch<ApiResponse<AdminUser[]>>("/auth/users"),
  });

  const createMutation = useMutation({
    mutationFn: (payload: any) =>
      apiFetch<ApiResponse<AdminUser>>("/auth/users", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("Staff member created successfully!");
      setIsAddOpen(false);
      resetAddForm();
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to create staff member");
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: { id: string; data: any }) =>
      apiFetch<ApiResponse<AdminUser>>(`/auth/users/${payload.id}`, {
        method: "PATCH",
        body: JSON.stringify(payload.data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("User updated successfully!");
      setIsPermissionsOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update user");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiFetch<{ success: boolean; message: string }>(`/auth/users/${id}`, {
        method: "DELETE",
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success(res.message || "User deleted successfully");
      setIsDeleteOpen(false);
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to delete user");
    },
  });

  const resetAddForm = () => {
    setNewUserName("");
    setNewUserEmail("");
    setNewUserPassword("");
    setNewUserRole("content_writer");
    setNewUserPermissions([]);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName || !newUserEmail || !newUserPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    createMutation.mutate({
      name: newUserName,
      email: newUserEmail,
      password: newUserPassword,
      role: newUserRole,
      permissions: newUserPermissions,
    });
  };

  const handleToggleActive = (user: AdminUser) => {
    if (user.role === "owner") {
      toast.error("Cannot modify status of Owner account.");
      return;
    }
    updateMutation.mutate({
      id: user.id,
      data: { isActive: !user.isActive },
    });
  };

  const openPermissionsModal = (user: AdminUser) => {
    setSelectedUser(user);
    setEditingPermissions(user.permissions || []);
    setIsPermissionsOpen(true);
  };

  const handleSavePermissions = () => {
    if (!selectedUser) return;
    updateMutation.mutate({
      id: selectedUser.id,
      data: { permissions: editingPermissions },
    });
  };

  const handleTogglePermission = (permissionKey: string) => {
    setEditingPermissions((prev) =>
      prev.includes(permissionKey)
        ? prev.filter((p) => p !== permissionKey)
        : [...prev, permissionKey],
    );
  };

  const handleToggleNewUserPermission = (permissionKey: string) => {
    setNewUserPermissions((prev) =>
      prev.includes(permissionKey)
        ? prev.filter((p) => p !== permissionKey)
        : [...prev, permissionKey],
    );
  };

  const users = data?.data || [];
  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Staff & RBAC
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage admin console users, roles, and granular feature access
            permissions.
          </p>
        </div>
        <Button
          onClick={() => setIsAddOpen(true)}
          className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold gap-1.5 self-start sm:self-auto"
        >
          <UserPlus size={16} />
          Add Staff Member
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800">
          <CardTitle className="text-lg font-bold">Roster</CardTitle>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-transparent border-slate-200 dark:border-slate-800 text-xs"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-6 space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-sm text-slate-500 dark:text-slate-400">
              No staff members found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold">
                    <th className="p-4">Name</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Role</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Last Login</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors"
                    >
                      <td className="p-4 font-bold text-slate-900 dark:text-white">
                        {user.name}
                      </td>
                      <td className="p-4 text-slate-500 dark:text-slate-400 font-medium">
                        {user.email}
                      </td>
                      <td className="p-4">
                        <Badge
                          className={`font-extrabold text-[10px] px-2 py-0.5 border uppercase ${
                            user.role === "owner"
                              ? "bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-950"
                              : user.role === "manager"
                                ? "bg-indigo-50 dark:bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 border-indigo-100 dark:border-indigo-950"
                                : "bg-slate-100 dark:bg-slate-850 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-800"
                          }`}
                        >
                          {user.role.replace("_", " ")}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <button
                          disabled={user.role === "owner"}
                          onClick={() => handleToggleActive(user)}
                          className={`flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10px] uppercase border transition-all ${
                            user.isActive
                              ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-950"
                              : "bg-slate-100 dark:bg-slate-850 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-800"
                          } ${user.role !== "owner" ? "cursor-pointer hover:opacity-85" : "cursor-not-allowed"}`}
                        >
                          {user.isActive ? (
                            <>
                              <UserCheck size={11} /> Active
                            </>
                          ) : (
                            <>
                              <UserX size={11} /> Inactive
                            </>
                          )}
                        </button>
                      </td>
                      <td className="p-4 text-slate-400 dark:text-slate-500 font-medium">
                        {user.lastLoginAt
                          ? new Date(user.lastLoginAt).toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Never"}
                      </td>
                      <td className="p-4 text-right space-x-1.5">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                          title="Manage Permissions"
                          onClick={() => openPermissionsModal(user)}
                        >
                          <Shield size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={user.role === "owner"}
                          className="h-7 w-7 text-slate-400 hover:text-rose-600 disabled:opacity-30 disabled:hover:text-slate-400"
                          title="Delete Account"
                          onClick={() => {
                            setDeleteUser(user);
                            setIsDeleteOpen(true);
                          }}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Staff Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Add Staff Member</DialogTitle>
            <DialogDescription>
              Create a new user account to access the Admin Panel. Password is
              required for manual login.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4 py-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  Full Name
                </label>
                <Input
                  required
                  placeholder="Rahul Singh"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  Email Address
                </label>
                <Input
                  required
                  type="email"
                  placeholder="rahul@adruvasolution.com"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  Password
                </label>
                <Input
                  required
                  type="password"
                  placeholder="••••••••"
                  value={newUserPassword}
                  onChange={(e) => setNewUserPassword(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                  Base Role
                </label>
                <select
                  value={newUserRole}
                  onChange={(e) => setNewUserRole(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-slate-200 dark:border-slate-800 bg-transparent px-3 py-1 text-xs shadow-sm outline-none text-slate-900 dark:text-slate-100"
                >
                  <option value="content_writer">Content Writer</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
            </div>

            {/* Permissions list */}
            {newUserRole === "manager" && (
              <div className="space-y-2 border-t border-slate-100 dark:border-slate-800 pt-3">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <Shield size={13} className="text-brand-orange" />
                  Grant Feature Access
                </label>
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2">
                  {AVAILABLE_PERMISSIONS.map((perm) => {
                    const checked = newUserPermissions.includes(perm.key);
                    return (
                      <label
                        key={perm.key}
                        className="flex items-center gap-2 px-3 py-2 border border-slate-100 dark:border-slate-850 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer select-none text-left"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() =>
                            handleToggleNewUserPermission(perm.key)
                          }
                          className="h-3.5 w-3.5 rounded border-slate-300 dark:border-slate-800 accent-brand-orange cursor-pointer"
                        />
                        <div className="min-w-0 flex-1">
                          <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                            {perm.label}
                          </div>
                          <div className="text-[9px] text-slate-400 dark:text-slate-500 font-medium">
                            Category: {perm.category}
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsAddOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold gap-1.5"
                disabled={createMutation.isPending}
              >
                {createMutation.isPending ? (
                  <Loader2 size={13} className="animate-spin" />
                ) : (
                  <Check size={13} />
                )}
                Save Staff Member
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Permissions Dialog */}
      <Dialog open={isPermissionsOpen} onOpenChange={setIsPermissionsOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Manage Permissions</DialogTitle>
            <DialogDescription>
              Grant or revoke granular feature permissions for{" "}
              <strong>{selectedUser?.name}</strong>.
            </DialogDescription>
          </DialogHeader>

          {selectedUser?.role === "owner" ? (
            <div className="py-6 text-center space-y-2">
              <Shield size={32} className="text-rose-500 mx-auto" />
              <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Owner Access Level
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                Owner accounts have full root privileges and bypass all
                permissions checks. Granular filters do not apply.
              </div>
            </div>
          ) : (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-1 gap-2 max-h-[360px] overflow-y-auto pr-2">
                {AVAILABLE_PERMISSIONS.map((perm) => {
                  const checked = editingPermissions.includes(perm.key);
                  return (
                    <label
                      key={perm.key}
                      className="flex items-center gap-2.5 px-3 py-2.5 border border-slate-100 dark:border-slate-850 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer select-none text-left"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleTogglePermission(perm.key)}
                        className="h-3.5 w-3.5 rounded border-slate-300 dark:border-slate-800 accent-brand-orange cursor-pointer"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold text-slate-800 dark:text-slate-200">
                          {perm.label}
                        </div>
                        <div className="text-[9px] text-slate-400 dark:text-slate-500 font-medium">
                          Category: {perm.category}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPermissionsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold gap-1.5"
              disabled={
                updateMutation.isPending || selectedUser?.role === "owner"
              }
              onClick={handleSavePermissions}
            >
              {updateMutation.isPending ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Check size={13} />
              )}
              Save Permissions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-rose-600">
              Delete Staff Member
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to permanently delete{" "}
              <strong>{deleteUser?.name}</strong>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="pt-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="font-semibold gap-1.5"
              disabled={deleteMutation.isPending}
              onClick={() => deleteUser && deleteMutation.mutate(deleteUser.id)}
            >
              {deleteMutation.isPending ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Trash2 size={13} />
              )}
              Permanently Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
