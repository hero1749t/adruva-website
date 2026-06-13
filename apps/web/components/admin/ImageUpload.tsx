"use client";

import React, { useState, useCallback, useRef } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value?: string; // current image URL
  onChange: (url: string, publicId: string) => void;
  onClear?: () => void;
  folder?: "blogs" | "projects" | "team" | "og" | "general";
  label?: string;
  hint?: string;
  className?: string;
  aspectRatio?: "square" | "wide" | "auto";
}

export function ImageUpload({
  value,
  onChange,
  onClear,
  folder = "general",
  label = "Upload Image",
  hint = "JPG, PNG, WebP up to 5MB",
  className,
  aspectRatio = "wide",
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadFile = useCallback(
    async (file: File) => {
      // Client-side validation
      const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!allowed.includes(file.type)) {
        toast.error("Only JPG, PNG, WebP, GIF images are allowed");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be under 5MB");
        return;
      }

      setIsUploading(true);
      const toastId = toast.loading("Uploading image...");

      try {
        const apiUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch(
          `${apiUrl}/api/v1/upload/image?folder=${folder}`,
          {
            method: "POST",
            body: formData,
          },
        );

        const json = await res.json();
        if (!res.ok || !json.success) {
          throw new Error(json.message || "Upload failed");
        }

        onChange(json.data.url, json.data.public_id);
        toast.success("Image uploaded!", { id: toastId });
      } catch (err) {
        toast.error((err as Error).message || "Upload failed", { id: toastId });
      } finally {
        setIsUploading(false);
      }
    },
    [folder, onChange],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) uploadFile(file);
    },
    [uploadFile],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) uploadFile(file);
      // reset so same file can be re-selected
      e.target.value = "";
    },
    [uploadFile],
  );

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square"
      : aspectRatio === "wide"
        ? "aspect-video"
        : "";

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </p>
      )}

      {value ? (
        /* Preview state */
        <div
          className={cn(
            "relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 group",
            aspectClass,
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              disabled={isUploading}
              className="px-3 py-1.5 bg-white text-slate-900 text-xs font-semibold rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              Replace
            </button>
            {onClear && (
              <button
                type="button"
                onClick={onClear}
                className="px-3 py-1.5 bg-red-500 text-white text-xs font-semibold rounded-lg hover:bg-red-600 transition-colors flex items-center gap-1.5"
              >
                <X className="w-3.5 h-3.5" />
                Remove
              </button>
            )}
          </div>
          {isUploading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-white animate-spin" />
            </div>
          )}
        </div>
      ) : (
        /* Drop zone */
        <div
          role="button"
          tabIndex={0}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => !isUploading && inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-all duration-200 p-8",
            aspectClass,
            isDragging
              ? "border-brand-orange bg-brand-orange/5 scale-[1.01]"
              : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 hover:border-brand-orange/60 hover:bg-brand-orange/5",
          )}
        >
          {isUploading ? (
            <>
              <Loader2 className="w-8 h-8 text-brand-orange animate-spin" />
              <p className="text-xs text-slate-500 font-medium">Uploading...</p>
            </>
          ) : (
            <>
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200",
                  isDragging
                    ? "bg-brand-orange/20"
                    : "bg-slate-100 dark:bg-slate-800",
                )}
              >
                <ImageIcon
                  className={cn(
                    "w-6 h-6",
                    isDragging ? "text-brand-orange" : "text-slate-400",
                  )}
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {isDragging
                    ? "Drop to upload"
                    : "Drag & drop or click to upload"}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">{hint}</p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}

export default ImageUpload;
