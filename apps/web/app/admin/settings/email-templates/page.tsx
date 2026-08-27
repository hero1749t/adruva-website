"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
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
  Mail,
  Edit3,
  Save,
  Eye,
  Send,
  Loader2,
  RefreshCw,
  Info,
  Smartphone,
  Monitor,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface EmailTemplate {
  id: string;
  type: string;
  name: string;
  subject: string;
  content: string;
  variables: string[];
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export default function EmailTemplatesManager() {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null);
  const [editedSubject, setEditedSubject] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [activeViewTab, setActiveViewTab] = useState<"edit" | "preview">(
    "edit",
  );
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">(
    "desktop",
  );
  const [isTestMailOpen, setIsTestMailOpen] = useState(false);
  const [testRecipient, setTestRecipient] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin", "email-templates"],
    queryFn: () => apiFetch<ApiResponse<EmailTemplate[]>>("/email-templates"),
  });

  useEffect(() => {
    if (data?.data && data.data.length > 0 && !selectedTemplate) {
      const firstTemplate = data.data[0];
      if (firstTemplate) {
        setSelectedTemplate(firstTemplate);
        setEditedSubject(firstTemplate.subject);
        setEditedContent(firstTemplate.content);
      }
    }
  }, [data, selectedTemplate]);

  const selectTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setEditedSubject(template.subject);
    setEditedContent(template.content);
    setActiveViewTab("edit");
  };

  const updateMutation = useMutation({
    mutationFn: (payload: { id: string; subject: string; content: string }) =>
      apiFetch<ApiResponse<EmailTemplate>>(`/email-templates/${payload.id}`, {
        method: "PUT",
        body: JSON.stringify({
          subject: payload.subject,
          content: payload.content,
        }),
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "email-templates"] });
      setSelectedTemplate(res.data);
      toast.success("Email template updated successfully!");
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to update email template");
    },
  });

  const testMailMutation = useMutation({
    mutationFn: (payload: { id: string; to: string }) =>
      apiFetch<{ success: boolean; message: string }>(
        `/email-templates/${payload.id}/test`,
        {
          method: "POST",
          body: JSON.stringify({ to: payload.to }),
        },
      ),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res.message || "Test email sent successfully!");
        setIsTestMailOpen(false);
      } else {
        toast.error(res.message || "Failed to send test email.");
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Failed to trigger test email");
    },
  });

  const handleSave = () => {
    if (!selectedTemplate) return;
    updateMutation.mutate({
      id: selectedTemplate.id,
      subject: editedSubject,
      content: editedContent,
    });
  };

  const handleSendTestMail = () => {
    if (!selectedTemplate || !testRecipient) return;
    testMailMutation.mutate({
      id: selectedTemplate.id,
      to: testRecipient,
    });
  };

  const insertVariable = (variable: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const placeholder = `{{${variable}}}`;
    const newContent =
      editedContent.substring(0, start) +
      placeholder +
      editedContent.substring(end);

    setEditedContent(newContent);

    // Reposition cursor after the placeholder
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd =
        start + placeholder.length;
    }, 50);
  };

  // Generate preview HTML with dummy values parsed
  const getPreviewHtml = () => {
    if (!selectedTemplate) return "";
    let html = editedContent;

    const dummyVars: Record<string, string> = {
      name: "John Doe",
      service: "AI-Powered CRM Automation",
      budget: "₹2L – ₹5L",
      timeline: "1-3 months",
      jobTitle: "Full Stack Engineer",
      email: "candidate@example.com",
    };

    selectedTemplate.variables.forEach((variable) => {
      const val = dummyVars[variable] || `[${variable}]`;
      html = html.replace(new RegExp(`{{${variable}}}`, "g"), val);
    });

    return html;
  };

  const templates = data?.data || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Email Templates
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Customize transactional HTML email auto-replies sent to customers
            and candidates.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-8 w-1/4" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-48 w-full" />
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Templates Navigation Sidebar */}
          <Card className="lg:col-span-1 h-fit">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <CardTitle className="text-base font-semibold">
                Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-1">
              {templates.map((template) => {
                const active = selectedTemplate?.id === template.id;
                return (
                  <button
                    key={template.id}
                    onClick={() => selectTemplate(template)}
                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition-all text-left outline-none ${
                      active
                        ? "bg-brand-orange/10 dark:bg-slate-900 text-brand-orange dark:text-white ring-1 ring-brand-orange/20 dark:ring-slate-800/60"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/30 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Mail
                      size={16}
                      className={
                        active ? "text-brand-orange" : "text-slate-400"
                      }
                    />
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium">
                        {template.name}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                        Type: {template.type}
                      </div>
                    </div>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Template Detail & Editor */}
          {selectedTemplate && (
            <Card className="lg:col-span-3">
              <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 dark:border-slate-800 py-4">
                <div>
                  <CardTitle className="text-lg font-bold">
                    {selectedTemplate.name}
                  </CardTitle>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Last updated:{" "}
                    {new Date(selectedTemplate.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs font-semibold gap-1.5"
                    onClick={() => {
                      setTestRecipient(session?.user?.email || "");
                      setIsTestMailOpen(true);
                    }}
                  >
                    <Send size={13} />
                    Send Test
                  </Button>
                  <Button
                    size="sm"
                    className="h-8 text-xs font-semibold gap-1.5 bg-brand-orange hover:bg-brand-orange/90 text-white"
                    onClick={handleSave}
                    disabled={updateMutation.isPending}
                  >
                    {updateMutation.isPending ? (
                      <Loader2 size={13} className="animate-spin" />
                    ) : (
                      <Save size={13} />
                    )}
                    Save Changes
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* Tabs */}
                <div className="flex border-b border-slate-100 dark:border-slate-800 pb-px gap-6">
                  <button
                    onClick={() => setActiveViewTab("edit")}
                    className={`flex items-center gap-1.5 pb-3 text-xs font-bold border-b-2 transition-all outline-none ${
                      activeViewTab === "edit"
                        ? "border-brand-orange text-brand-orange dark:text-white"
                        : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    }`}
                  >
                    <Edit3 size={14} />
                    Edit Template
                  </button>
                  <button
                    onClick={() => setActiveViewTab("preview")}
                    className={`flex items-center gap-1.5 pb-3 text-xs font-bold border-b-2 transition-all outline-none ${
                      activeViewTab === "preview"
                        ? "border-brand-orange text-brand-orange dark:text-white"
                        : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    }`}
                  >
                    <Eye size={14} />
                    Live Web Preview
                  </button>
                </div>

                {activeViewTab === "edit" ? (
                  <div className="space-y-4">
                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        Email Subject
                      </label>
                      <Input
                        value={editedSubject}
                        onChange={(e) => setEditedSubject(e.target.value)}
                        placeholder="Subject line"
                        className="bg-transparent font-medium border-slate-200 dark:border-slate-800 text-sm"
                      />
                    </div>

                    {/* Variable Badges */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                        <Info size={12} className="text-brand-orange" />
                        Dynamic Placeholders (Click to insert)
                      </label>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedTemplate.variables.map((variable) => (
                          <Badge
                            key={variable}
                            variant="secondary"
                            onClick={() => insertVariable(variable)}
                            className="px-2.5 py-1 text-[10px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/40 dark:border-slate-850 cursor-pointer select-none transition-colors"
                          >
                            {"{{"}
                            {variable}
                            {"}}"}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Content HTML Editor */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        HTML Content Source Code
                      </label>
                      <textarea
                        ref={textareaRef}
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        rows={16}
                        className="w-full rounded-lg border border-slate-200 dark:border-slate-850 p-4 font-mono text-xs leading-relaxed bg-[#0b0f19] text-emerald-400 outline-none focus:ring-1 focus:ring-slate-800 shadow-inner resize-y"
                        placeholder="<html>..."
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Device selector */}
                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2 border border-slate-100 dark:border-slate-950">
                      <div className="text-xs font-semibold text-slate-500 pl-2">
                        Previewing parsed HTML with simulated data
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-7 w-8 ${
                            previewDevice === "desktop"
                              ? "bg-white dark:bg-slate-950 text-brand-orange shadow-sm border border-slate-200/40 dark:border-slate-900"
                              : "text-slate-400"
                          }`}
                          onClick={() => setPreviewDevice("desktop")}
                          title="Desktop View"
                        >
                          <Monitor size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`h-7 w-8 ${
                            previewDevice === "mobile"
                              ? "bg-white dark:bg-slate-950 text-brand-orange shadow-sm border border-slate-200/40 dark:border-slate-900"
                              : "text-slate-400"
                          }`}
                          onClick={() => setPreviewDevice("mobile")}
                          title="Mobile View"
                        >
                          <Smartphone size={14} />
                        </Button>
                      </div>
                    </div>

                    {/* Mail Subject preview */}
                    <div className="border border-slate-100 dark:border-slate-950 rounded-lg p-3 bg-slate-50/50 dark:bg-slate-900/10 text-xs">
                      <span className="font-bold text-slate-400 mr-2">
                        Subject:
                      </span>
                      <span className="font-semibold text-slate-700 dark:text-slate-200">
                        {editedSubject.replace(
                          /{{(\w+)}}/g,
                          (_, key) =>
                            (
                              ({
                                name: "John Doe",
                                service: "AI-Powered CRM Automation",
                                budget: "₹2L – ₹5L",
                                timeline: "1-3 months",
                                jobTitle: "Full Stack Engineer",
                                email: "candidate@example.com",
                              }) as Record<string, string>
                            )[key] || `[${key}]`,
                        )}
                      </span>
                    </div>

                    {/* Preview Frame */}
                    <div className="flex justify-center border border-slate-100 dark:border-slate-850 rounded-xl bg-slate-100/50 dark:bg-slate-950/40 p-4 min-h-[500px]">
                      <iframe
                        srcDoc={getPreviewHtml()}
                        title="Template Preview"
                        className={`bg-white border border-slate-200 shadow-sm transition-all duration-300 rounded-lg ${
                          previewDevice === "mobile"
                            ? "w-[360px] h-[550px]"
                            : "w-full h-[600px]"
                        }`}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Test Mail Dialog */}
      <Dialog open={isTestMailOpen} onOpenChange={setIsTestMailOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send Test Email</DialogTitle>
            <DialogDescription>
              Test how the custom email template renders in a real inbox. Enter
              the recipient email below.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400">
                Recipient Email Address
              </label>
              <Input
                type="email"
                placeholder="email@example.com"
                value={testRecipient}
                onChange={(e) => setTestRecipient(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsTestMailOpen(false)}
            >
              Cancel
            </Button>
            <Button
              size="sm"
              className="bg-brand-orange hover:bg-brand-orange/90 text-white font-semibold gap-1.5"
              onClick={handleSendTestMail}
              disabled={testMailMutation.isPending || !testRecipient}
            >
              {testMailMutation.isPending ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Send size={13} />
              )}
              Send Test
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
