"use client";

import { useEffect, useState, useRef } from "react";
import {
  Bell,
  ShieldAlert,
  FileText,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { apiFetch } from "../../lib/api";
import Link from "next/link";

interface NotificationItem {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export default function NotificationsBell() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(0);

  // Play synthesized double-chime chime audio using browser Web Audio API (D5 to A5)
  const playChime = () => {
    try {
      const AudioCtx =
        window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();

      const playTone = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);

        gain.gain.setValueAtTime(0.001, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(
          0.12,
          ctx.currentTime + start + 0.05,
        );
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + start + duration,
        );

        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };

      // Play double-chime D5 (587Hz) followed by A5 (880Hz)
      playTone(587.33, 0, 0.4);
      playTone(880.0, 0.15, 0.5);
    } catch (e) {
      console.warn("Chime synthesis blocked or unsupported", e);
    }
  };

  const fetchNotifications = async (silent = false) => {
    try {
      const res = await apiFetch<{
        success: boolean;
        data: NotificationItem[];
      }>("/notifications?limit=25");
      if (res.success && res.data) {
        setNotifications(res.data);
        const unreadCount = res.data.filter((n) => !n.isRead).length;

        // If unread count increased, play high-quality chime (unless silent/initial load)
        if (!silent && unreadCount > prevCountRef.current) {
          playChime();
        }
        prevCountRef.current = unreadCount;
      }
    } catch (e) {
      console.error("Failed to load notifications", e);
    }
  };

  // Click outside to close dropdown listener
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Broadcast Channel for multi-tab sync
  useEffect(() => {
    const channel = new BroadcastChannel("admin-notifications");
    channel.onmessage = (event) => {
      if (event.data === "reload") {
        fetchNotifications(true);
      }
    };

    // Initial Fetch
    fetchNotifications(true);

    // Poll every 12 seconds
    const interval = setInterval(() => {
      fetchNotifications(false);
    }, 12000);

    return () => {
      clearInterval(interval);
      channel.close();
    };
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await apiFetch("/notifications/read-all", { method: "POST" });
      fetchNotifications(true);
      const channel = new BroadcastChannel("admin-notifications");
      channel.postMessage("reload");
      channel.close();
    } catch (e) {
      console.error("Failed to mark all notifications as read", e);
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await apiFetch(`/notifications/${id}/read`, { method: "PATCH" });
      fetchNotifications(true);
      const channel = new BroadcastChannel("admin-notifications");
      channel.postMessage("reload");
      channel.close();
    } catch (e) {
      console.error("Failed to mark notification as read", e);
    }
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 border border-transparent hover:border-slate-200 dark:hover:border-slate-800 text-slate-500 dark:text-slate-400 hover:text-brand-orange dark:hover:text-brand-orange transition duration-200 cursor-pointer"
        title="Notifications"
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[9px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-[#060814]">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2.5 w-80 md:w-96 rounded-xl border border-slate-200 dark:border-slate-855 bg-white dark:bg-[#0c101d] shadow-2xl z-[9999] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 bg-slate-50/50 dark:bg-slate-900/35 border-b border-slate-200 dark:border-slate-855 flex justify-between items-center">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-slate-800 dark:text-white font-poppins">
                Recent Alerts
              </span>
              {unreadCount > 0 && (
                <span className="bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded-full text-[9px] font-bold">
                  {unreadCount} New
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[10px] font-bold text-brand-orange hover:text-brand-orange-hover hover:underline cursor-pointer transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[320px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-855/50 font-inter">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-xs text-slate-500 dark:text-slate-400">
                You have no recent notification alerts.
              </div>
            ) : (
              notifications.map((item) => {
                const isClientInquiry = item.type === "inquiry";
                return (
                  <div
                    key={item.id}
                    className={`p-3.5 hover:bg-slate-50/40 dark:hover:bg-slate-900/10 flex gap-3 transition-colors ${
                      !item.isRead
                        ? "bg-brand-orange/[0.015] border-l-2 border-brand-orange"
                        : "border-l-2 border-transparent"
                    }`}
                  >
                    {/* Icon based on Type */}
                    <div className="shrink-0 mt-0.5">
                      {isClientInquiry ? (
                        <div className="h-7 w-7 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/5 flex items-center justify-center text-emerald-500">
                          <ShieldAlert size={14} />
                        </div>
                      ) : (
                        <div className="h-7 w-7 rounded-lg bg-blue-500/10 dark:bg-blue-500/5 flex items-center justify-center text-blue-500">
                          <FileText size={14} />
                        </div>
                      )}
                    </div>

                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start mb-0.5">
                        <span className="text-[11px] font-bold text-slate-850 dark:text-slate-200 leading-tight">
                          {item.title}
                        </span>
                        <span className="text-[8px] text-slate-400 shrink-0 font-medium ml-2">
                          {new Date(item.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed break-words pr-2">
                        {item.message}
                      </p>

                      {/* CTA Actions */}
                      <div className="flex items-center gap-3 mt-2">
                        {item.link && (
                          <Link
                            href={item.link}
                            onClick={() => {
                              handleMarkRead(item.id);
                              setIsOpen(false);
                            }}
                            className="inline-flex items-center gap-1 text-[9px] font-bold text-brand-orange hover:text-brand-orange-hover hover:underline transition-colors"
                          >
                            <span>Open Log</span>
                            <ExternalLink size={9} />
                          </Link>
                        )}
                        {!item.isRead && (
                          <button
                            onClick={() => handleMarkRead(item.id)}
                            className="inline-flex items-center gap-1 text-[9px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                          >
                            <CheckCircle size={9} />
                            <span>Mark read</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-855 bg-slate-50/50 dark:bg-slate-900/10 text-center">
            <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold block leading-relaxed uppercase tracking-wider">
              🔔 Real-time client lead monitors active
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
