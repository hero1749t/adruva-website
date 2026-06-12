"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../../lib/api";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Skeleton } from "../../../components/ui/skeleton";
import { Settings, Globe, PhoneCall, Mail, Share2, Save } from "lucide-react";
import toast from "react-hot-toast";

interface ApiResponse<T> {
  success: boolean;
  data: T;
}

export default function SettingsManager() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<
    "general" | "integrations" | "smtp" | "social"
  >("general");
  const [formData, setFormData] = useState<Record<string, string>>({
    siteName: "",
    description: "",
    contactEmail: "",
    contactPhone: "",
    officeAddress: "",
    calendlyUrl: "",
    whatsappToken: "",
    whatsappPhoneId: "",
    teamWhatsapp: "",
    smtpHost: "",
    smtpPort: "",
    smtpUser: "",
    smtpPassword: "",
    senderEmail: "",
    facebookUrl: "",
    instagramUrl: "",
    linkedinUrl: "",
    twitterUrl: "",
    youtubeUrl: "",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: () => apiFetch<ApiResponse<Record<string, string>>>("/settings"),
  });

  useEffect(() => {
    if (data?.data) {
      setFormData((prev) => ({
        ...prev,
        ...data.data,
      }));
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: (payload: Record<string, string>) =>
      apiFetch<{ success: boolean; message?: string }>("/settings", {
        method: "POST",
        body: JSON.stringify(payload),
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["admin", "settings"] });
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success(res.message || "Settings updated successfully!");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to save settings");
    },
  });

  const handleInputChange = (key: string, val: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: val,
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(formData);
  };

  const tabs = [
    { id: "general", name: "General Information", icon: Globe },
    { id: "integrations", name: "Third-party Integrations", icon: PhoneCall },
    { id: "smtp", name: "Email Settings (SMTP)", icon: Mail },
    { id: "social", name: "Social Platforms", icon: Share2 },
  ] as const;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Skeleton className="h-48 w-full md:col-span-1 rounded-xl" />
          <Skeleton className="h-96 w-full md:col-span-3 rounded-xl" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-12 text-center text-red-500 text-sm">
        Failed to load database settings. Please refresh the page.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-brand-orange" />
            <span>Site Configuration</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">
            Manage general company data, communication tools, and API
            credentials
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar Tabs */}
        <div className="md:col-span-1 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isTabActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-xs font-semibold transition-all duration-200 ${
                  isTabActive
                    ? "bg-brand-orange text-white shadow-lg shadow-brand-orange/15 font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/50 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Configuration Card Form */}
        <Card className="md:col-span-3 border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] shadow-sm rounded-xl">
          <CardContent className="p-6">
            <form onSubmit={handleSave} className="space-y-6">
              {/* Tab 1: General Details */}
              {activeTab === "general" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white font-poppins pb-2 border-b border-slate-100 dark:border-slate-800/60">
                    Company & Brand Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label
                        htmlFor="siteName"
                        className="text-xs font-semibold"
                      >
                        Website Title / Brand Name
                      </Label>
                      <Input
                        id="siteName"
                        value={formData.siteName}
                        onChange={(e) =>
                          handleInputChange("siteName", e.target.value)
                        }
                        placeholder="Adruva Technology Solutions"
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor="contactEmail"
                        className="text-xs font-semibold"
                      >
                        Primary Contact Email
                      </Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) =>
                          handleInputChange("contactEmail", e.target.value)
                        }
                        placeholder="info@adruva.com"
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label
                        htmlFor="contactPhone"
                        className="text-xs font-semibold"
                      >
                        Primary Telephone
                      </Label>
                      <Input
                        id="contactPhone"
                        value={formData.contactPhone}
                        onChange={(e) =>
                          handleInputChange("contactPhone", e.target.value)
                        }
                        placeholder="+91-XXXXXXXXXX"
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor="officeAddress"
                        className="text-xs font-semibold"
                      >
                        Corporate Office Address
                      </Label>
                      <Input
                        id="officeAddress"
                        value={formData.officeAddress}
                        onChange={(e) =>
                          handleInputChange("officeAddress", e.target.value)
                        }
                        placeholder="Dehradun, Uttarakhand, India"
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="description"
                      className="text-xs font-semibold"
                    >
                      Brand / Meta Description
                    </Label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder="Empowering businesses with modern high-performance cloud applications..."
                      className="w-full min-h-[100px] p-3 text-xs rounded-md border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none font-inter leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* Tab 2: Third-party Integrations */}
              {activeTab === "integrations" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white font-poppins pb-2 border-b border-slate-100 dark:border-slate-800/60">
                    APIs & Integrations
                  </h3>

                  <div className="space-y-1">
                    <Label
                      htmlFor="calendlyUrl"
                      className="text-xs font-semibold"
                    >
                      Calendly Booking Link
                    </Label>
                    <Input
                      id="calendlyUrl"
                      value={formData.calendlyUrl}
                      onChange={(e) =>
                        handleInputChange("calendlyUrl", e.target.value)
                      }
                      placeholder="https://calendly.com/adruva"
                      className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label
                        htmlFor="whatsappPhoneId"
                        className="text-xs font-semibold"
                      >
                        WhatsApp Cloud API Phone ID
                      </Label>
                      <Input
                        id="whatsappPhoneId"
                        value={formData.whatsappPhoneId}
                        onChange={(e) =>
                          handleInputChange("whatsappPhoneId", e.target.value)
                        }
                        placeholder="1029384756..."
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor="whatsappToken"
                        className="text-xs font-semibold"
                      >
                        WhatsApp Cloud API Bearer Token
                      </Label>
                      <Input
                        id="whatsappToken"
                        type="password"
                        value={formData.whatsappToken}
                        onChange={(e) =>
                          handleInputChange("whatsappToken", e.target.value)
                        }
                        placeholder="EAABw..."
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor="teamWhatsapp"
                        className="text-xs font-semibold"
                      >
                        Recipient WhatsApp Number (Team)
                      </Label>
                      <Input
                        id="teamWhatsapp"
                        value={formData.teamWhatsapp}
                        onChange={(e) =>
                          handleInputChange("teamWhatsapp", e.target.value)
                        }
                        placeholder="+919876543210"
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: SMTP Settings */}
              {activeTab === "smtp" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white font-poppins pb-2 border-b border-slate-100 dark:border-slate-800/60">
                    Mail Server Configurations
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1 md:col-span-2">
                      <Label
                        htmlFor="smtpHost"
                        className="text-xs font-semibold"
                      >
                        SMTP Host
                      </Label>
                      <Input
                        id="smtpHost"
                        value={formData.smtpHost}
                        onChange={(e) =>
                          handleInputChange("smtpHost", e.target.value)
                        }
                        placeholder="smtp.gmail.com"
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor="smtpPort"
                        className="text-xs font-semibold"
                      >
                        SMTP Port
                      </Label>
                      <Input
                        id="smtpPort"
                        value={formData.smtpPort}
                        onChange={(e) =>
                          handleInputChange("smtpPort", e.target.value)
                        }
                        placeholder="587"
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label
                        htmlFor="smtpUser"
                        className="text-xs font-semibold"
                      >
                        SMTP Authentication User
                      </Label>
                      <Input
                        id="smtpUser"
                        value={formData.smtpUser}
                        onChange={(e) =>
                          handleInputChange("smtpUser", e.target.value)
                        }
                        placeholder="user@example.com"
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor="smtpPassword"
                        className="text-xs font-semibold"
                      >
                        SMTP Authentication Password
                      </Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={formData.smtpPassword}
                        onChange={(e) =>
                          handleInputChange("smtpPassword", e.target.value)
                        }
                        placeholder="••••••••••••••••"
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="senderEmail"
                      className="text-xs font-semibold"
                    >
                      Sender Display Email (From)
                    </Label>
                    <Input
                      id="senderEmail"
                      value={formData.senderEmail}
                      onChange={(e) =>
                        handleInputChange("senderEmail", e.target.value)
                      }
                      placeholder="no-reply@adruva.com"
                      className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Tab 4: Social Handles */}
              {activeTab === "social" && (
                <div className="space-y-4">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white font-poppins pb-2 border-b border-slate-100 dark:border-slate-800/60">
                    Social Platform Handles
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label
                        htmlFor="linkedinUrl"
                        className="text-xs font-semibold"
                      >
                        LinkedIn Business URL
                      </Label>
                      <Input
                        id="linkedinUrl"
                        value={formData.linkedinUrl}
                        onChange={(e) =>
                          handleInputChange("linkedinUrl", e.target.value)
                        }
                        placeholder="https://linkedin.com/company/adruva"
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor="instagramUrl"
                        className="text-xs font-semibold"
                      >
                        Instagram Business URL
                      </Label>
                      <Input
                        id="instagramUrl"
                        value={formData.instagramUrl}
                        onChange={(e) =>
                          handleInputChange("instagramUrl", e.target.value)
                        }
                        placeholder="https://instagram.com/adruva"
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label
                        htmlFor="facebookUrl"
                        className="text-xs font-semibold"
                      >
                        Facebook Page URL
                      </Label>
                      <Input
                        id="facebookUrl"
                        value={formData.facebookUrl}
                        onChange={(e) =>
                          handleInputChange("facebookUrl", e.target.value)
                        }
                        placeholder="https://facebook.com/adruva"
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label
                        htmlFor="twitterUrl"
                        className="text-xs font-semibold"
                      >
                        Twitter / X Handle
                      </Label>
                      <Input
                        id="twitterUrl"
                        value={formData.twitterUrl}
                        onChange={(e) =>
                          handleInputChange("twitterUrl", e.target.value)
                        }
                        placeholder="https://x.com/adruva"
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label
                      htmlFor="youtubeUrl"
                      className="text-xs font-semibold"
                    >
                      YouTube Channel URL
                    </Label>
                    <Input
                      id="youtubeUrl"
                      value={formData.youtubeUrl}
                      onChange={(e) =>
                        handleInputChange("youtubeUrl", e.target.value)
                      }
                      placeholder="https://youtube.com/@adruva"
                      className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Action Save Button */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/40 flex justify-end">
                <Button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="bg-brand-orange hover:bg-brand-orange-hover text-white flex items-center gap-2"
                >
                  {saveMutation.isPending ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>Save Configuration</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
