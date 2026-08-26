"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Select, SelectItem, SelectValue } from "../ui/select";
import { ImageUpload } from "./ImageUpload";
import {
  Save,
  ArrowLeft,
  Sparkles,
  Eye,
  Settings as SettingsIcon,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Edit,
} from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import toast from "react-hot-toast";

const TiptapEditor = dynamic(() => import("./TiptapEditor"), {
  ssr: false,
});

interface Author {
  id: string;
  name: string;
}

interface Blog {
  id: string;
  title: string;
  slug: string;
}

interface BlogEditorData {
  id?: string;
  title?: string;
  slug?: string;
  coverImageUrl?: string | null;
  coverImageCloudinaryId?: string | null;
  authorId?: string | null;
  category?: string;
  tags?: string[];
  metaTitle?: string | null;
  metaDescription?: string | null;
  status?: string;
  readingTimeMinutes?: number;
  content?: unknown;
  language?: string;
  translationOfId?: string | null;
  isPinned?: boolean;
  pinOrder?: number;
  imageAlignOffset?: any;
  relatedBlogIds?: string[];
}

interface BlogEditorProps {
  initialData?: BlogEditorData;
  onSave: (data: BlogEditorData) => void;
  isSaving: boolean;
}

const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English (Default)" },
  { code: "id", name: "Indonesian" },
  { code: "de", name: "German" },
  { code: "ko", name: "Korean" },
  { code: "ja", name: "Japanese" },
  { code: "zh", name: "Chinese" },
  { code: "nl", name: "Dutch" },
  { code: "ru", name: "Russian" },
  { code: "it", name: "Italian" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
];

export default function BlogEditor({
  initialData,
  onSave,
  isSaving,
}: BlogEditorProps) {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [title, setTitle] = useState(initialData?.title || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [coverImageUrl, setCoverImageUrl] = useState(
    initialData?.coverImageUrl || "",
  );
  const [coverImageCloudinaryId, setCoverImageCloudinaryId] = useState(
    initialData?.coverImageCloudinaryId || "",
  );
  const [authorId, setAuthorId] = useState(initialData?.authorId || "");
  const [category, setCategory] = useState(
    initialData?.category || "web-development",
  );
  const [tagsInput, setTagsInput] = useState(
    initialData?.tags?.join(", ") || "",
  );
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(
    initialData?.metaDescription || "",
  );
  const [focusKeyword, setFocusKeyword] = useState("");
  const [readingTime, setReadingTime] = useState(
    (initialData?.readingTimeMinutes as number) || 3,
  );
  const [language, setLanguage] = useState(initialData?.language || "en");
  const [translationOfId, setTranslationOfId] = useState(
    initialData?.translationOfId || null,
  );
  const [isPinned, setIsPinned] = useState(initialData?.isPinned || false);
  const [pinOrder, setPinOrder] = useState(initialData?.pinOrder || 0);
  const [relatedBlogIds, setRelatedBlogIds] = useState<string[]>(() => {
    return Array.isArray(initialData?.relatedBlogIds)
      ? initialData.relatedBlogIds
      : [];
  });
  const [selectedTranslateLangs, setSelectedTranslateLangs] = useState<
    string[]
  >([]);

  // Offset states
  const [imageAlignOffset, setImageAlignOffset] = useState(() => {
    const defaults = {
      laptopX: 50,
      laptopY: 50,
      laptopZoom: 100,
      mobileX: 50,
      mobileY: 50,
      mobileZoom: 100,
    };
    if (initialData?.imageAlignOffset) {
      try {
        const val =
          typeof initialData.imageAlignOffset === "string"
            ? JSON.parse(initialData.imageAlignOffset)
            : initialData.imageAlignOffset;
        if (val && typeof val === "object") {
          return {
            laptopX:
              typeof val.laptopX === "number" ? val.laptopX : defaults.laptopX,
            laptopY:
              typeof val.laptopY === "number" ? val.laptopY : defaults.laptopY,
            laptopZoom:
              typeof val.laptopZoom === "number"
                ? val.laptopZoom
                : defaults.laptopZoom,
            mobileX:
              typeof val.mobileX === "number" ? val.mobileX : defaults.mobileX,
            mobileY:
              typeof val.mobileY === "number" ? val.mobileY : defaults.mobileY,
            mobileZoom:
              typeof val.mobileZoom === "number"
                ? val.mobileZoom
                : defaults.mobileZoom,
          };
        }
      } catch {
        return defaults;
      }
    }
    return defaults;
  });

  const [content, setContent] = useState<string>(() => {
    if (!initialData?.content) return "";
    return typeof initialData.content === "string"
      ? initialData.content
      : JSON.stringify(initialData.content);
  });

  // Fetch active team members
  const { data: authorsData } = useQuery({
    queryKey: ["admin", "authors"],
    queryFn: () =>
      apiFetch<{ success: boolean; data: Author[] }>("/team?all=true"),
  });

  // Fetch list of blogs for related selection
  const { data: blogsListData } = useQuery({
    queryKey: ["admin", "all-blogs-list"],
    queryFn: () =>
      apiFetch<{ success: boolean; data: Blog[] }>(
        "/blog?limit=100&status=all",
      ),
  });

  // Auto-Translation Mutation
  const translateMutation = useMutation({
    mutationFn: (languages: string[]) =>
      apiFetch<{ success: boolean }>(`/blog/${initialData?.id}/translate`, {
        method: "POST",
        body: JSON.stringify({ languages }),
        headers: { "Content-Type": "application/json" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "blog", initialData?.id],
      });
      toast.success("Blog translated successfully!");
      setSelectedTranslateLangs([]);
    },
    onError: (err) => {
      toast.error(err.message || "Failed to auto-translate blog");
    },
  });

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!initialData) {
      setSlug(generateSlug(val));
    }
  };

  const handleFormSubmit = (submitStatus: string) => {
    if (!title.trim() || !slug.trim()) {
      alert("Title and Slug are required!");
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((t: string) => t.trim())
      .filter((t: string) => t.length > 0);

    let contentJson = {};
    try {
      contentJson = content ? JSON.parse(content) : {};
    } catch (e) {
      console.warn("JSON parsing failed, saving raw content");
    }

    onSave({
      title,
      slug,
      coverImageUrl: coverImageUrl || null,
      coverImageCloudinaryId: coverImageCloudinaryId || null,
      authorId: authorId || null,
      category,
      tags,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || title,
      content: contentJson,
      readingTimeMinutes: readingTime,
      status: submitStatus,
      language,
      translationOfId,
      isPinned,
      pinOrder,
      imageAlignOffset,
      relatedBlogIds,
    });
  };

  // Automated SEO checks
  const wordCount = (() => {
    try {
      const text = content.replace(/<[^>]*>/g, " ");
      return text
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 0).length;
    } catch {
      return 0;
    }
  })();

  const hasSubheadings = /<h[2-4]/i.test(content);
  const hasInternalLinks = /href="\//i.test(content);
  const readabilityEase = Math.min(
    100,
    Math.max(30, 85 - wordCount / 200 - title.length / 4),
  );

  const handleTranslateClick = () => {
    if (!initialData?.id) {
      toast.error("Save the blog post before translating!");
      return;
    }
    if (selectedTranslateLangs.length === 0) {
      toast.error("Please select at least one language to translate.");
      return;
    }
    translateMutation.mutate(selectedTranslateLangs);
  };

  const toggleTranslateLang = (langCode: string) => {
    setSelectedTranslateLangs((prev) =>
      prev.includes(langCode)
        ? prev.filter((c) => c !== langCode)
        : [...prev, langCode],
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/blogs">
            <Button
              variant="outline"
              size="sm"
              className="px-2 border-slate-200 dark:border-slate-800"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">
              {initialData ? "Edit Blog Post" : "Create Blog Post"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">
              Compose content, optimize search previews, and manage
              translations.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleFormSubmit("draft")}
            disabled={isSaving}
            className="flex-1 sm:flex-none border-slate-200 dark:border-slate-800 text-xs font-bold"
          >
            SAVE AS DRAFT
          </Button>
          <Button
            type="button"
            onClick={() => handleFormSubmit("published")}
            disabled={isSaving}
            className="flex-1 sm:flex-none bg-brand-orange hover:bg-brand-orange-hover text-white flex items-center justify-center gap-2 text-xs font-bold shadow-md shadow-brand-orange/20"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? "SAVING..." : "SAVE BLOG CHANGES"}</span>
          </Button>
        </div>
      </div>

      {/* Editing Language Bar */}
      <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/60 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Editing Language:
        </span>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-white dark:bg-[#151f32] border border-slate-200 dark:border-slate-800 rounded-lg text-xs p-1.5 focus:outline-none text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
        >
          {SUPPORTED_LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
        {translationOfId && (
          <span className="text-[10px] bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full font-bold">
            Translation Post
          </span>
        )}
      </div>

      {/* Main Grid: Forms & Sidebars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Columns (Tabs for editor / preview) */}
        <div className="lg:col-span-2 space-y-5">
          {/* Tabs header */}
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => setActiveTab("edit")}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all ${
                activeTab === "edit"
                  ? "border-brand-orange text-slate-900 dark:text-white"
                  : "border-transparent text-slate-400 hover:text-slate-500"
              }`}
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit Content</span>
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold border-b-2 transition-all ${
                activeTab === "preview"
                  ? "border-brand-orange text-slate-900 dark:text-white"
                  : "border-transparent text-slate-400 hover:text-slate-500"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Website Preview</span>
            </button>
          </div>

          {activeTab === "edit" ? (
            <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] p-6 rounded-xl shadow-sm space-y-4">
              <div className="space-y-1">
                <Label
                  htmlFor="post-title"
                  className="text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  Post Title
                </Label>
                <Input
                  id="post-title"
                  placeholder="Enter article title..."
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-semibold text-sm"
                />
              </div>

              <div className="space-y-1">
                <Label
                  htmlFor="post-slug"
                  className="text-xs font-bold uppercase tracking-wider text-slate-400"
                >
                  Friendly URL Slug
                </Label>
                <Input
                  id="post-slug"
                  placeholder="enter-url-slug"
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-mono text-xs"
                />
              </div>

              {/* Cover Image Upload */}
              <div className="space-y-1.5 pt-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Featured Image Link / File / Banner
                </Label>
                <ImageUpload
                  folder="blogs"
                  label="Cover Image"
                  hint="Aspect ratio 16:9 recommended."
                  value={coverImageUrl || ""}
                  aspectRatio="wide"
                  onChange={(url, publicId) => {
                    setCoverImageUrl(url);
                    setCoverImageCloudinaryId(publicId);
                  }}
                  onClear={() => {
                    setCoverImageUrl("");
                    setCoverImageCloudinaryId("");
                  }}
                />
              </div>

              {/* Image Alignment Offset Sliders */}
              {coverImageUrl && (
                <div className="bg-slate-50 dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block border-b border-slate-200 dark:border-slate-800 pb-2">
                    Image Crop Preview offsets (Laptop 16:9 & Mobile 4:3)
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Laptop configuration */}
                    <div className="space-y-3">
                      <h5 className="text-[10px] font-bold text-brand-orange uppercase">
                        Laptop Settings
                      </h5>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                          <span>X-Offset</span>
                          <span>{imageAlignOffset.laptopX}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={imageAlignOffset.laptopX}
                          onChange={(e) =>
                            setImageAlignOffset((prev: any) => ({
                              ...prev,
                              laptopX: parseInt(e.target.value),
                            }))
                          }
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                          <span>Y-Offset</span>
                          <span>{imageAlignOffset.laptopY}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={imageAlignOffset.laptopY}
                          onChange={(e) =>
                            setImageAlignOffset((prev: any) => ({
                              ...prev,
                              laptopY: parseInt(e.target.value),
                            }))
                          }
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                          <span>Zoom Level</span>
                          <span>{imageAlignOffset.laptopZoom}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="200"
                          value={imageAlignOffset.laptopZoom}
                          onChange={(e) =>
                            setImageAlignOffset((prev: any) => ({
                              ...prev,
                              laptopZoom: parseInt(e.target.value),
                            }))
                          }
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                        />
                      </div>
                    </div>

                    {/* Mobile configuration */}
                    <div className="space-y-3">
                      <h5 className="text-[10px] font-bold text-brand-orange uppercase">
                        Mobile Settings
                      </h5>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                          <span>X-Offset</span>
                          <span>{imageAlignOffset.mobileX}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={imageAlignOffset.mobileX}
                          onChange={(e) =>
                            setImageAlignOffset((prev: any) => ({
                              ...prev,
                              mobileX: parseInt(e.target.value),
                            }))
                          }
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                          <span>Y-Offset</span>
                          <span>{imageAlignOffset.mobileY}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={imageAlignOffset.mobileY}
                          onChange={(e) =>
                            setImageAlignOffset((prev: any) => ({
                              ...prev,
                              mobileY: parseInt(e.target.value),
                            }))
                          }
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                        />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-semibold text-slate-500">
                          <span>Zoom Level</span>
                          <span>{imageAlignOffset.mobileZoom}%</span>
                        </div>
                        <input
                          type="range"
                          min="50"
                          max="200"
                          value={imageAlignOffset.mobileZoom}
                          onChange={(e) =>
                            setImageAlignOffset((prev: any) => ({
                              ...prev,
                              mobileZoom: parseInt(e.target.value),
                            }))
                          }
                          className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Offset preview panel */}
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                        Laptop Crop (16:9)
                      </span>
                      <div className="relative overflow-hidden w-full aspect-video rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                        <img
                          src={coverImageUrl}
                          alt="preview"
                          style={{
                            objectFit: "cover",
                            transformOrigin: `${imageAlignOffset.laptopX}% ${imageAlignOffset.laptopY}%`,
                            transform: `scale(${imageAlignOffset.laptopZoom / 100})`,
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                        Mobile Crop (4:3)
                      </span>
                      <div className="relative overflow-hidden w-full aspect-[4/3] rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
                        <img
                          src={coverImageUrl}
                          alt="preview"
                          style={{
                            objectFit: "cover",
                            transformOrigin: `${imageAlignOffset.mobileX}% ${imageAlignOffset.mobileY}%`,
                            transform: `scale(${imageAlignOffset.mobileZoom / 100})`,
                            width: "100%",
                            height: "100%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Rich text post content editor */}
              <div className="space-y-1.5 pt-2">
                <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Post Content Editor
                </Label>
                <TiptapEditor
                  value={content}
                  onChange={setContent}
                  outputFormat="json"
                  title={title}
                  slug={slug}
                  seoTitle={metaTitle}
                  setSeoTitle={setMetaTitle}
                  seoDesc={metaDescription}
                  setSeoDesc={setMetaDescription}
                  focusKeyword={focusKeyword}
                  setFocusKeyword={setFocusKeyword}
                />
              </div>
            </Card>
          ) : (
            /* Live Website Preview mockup */
            <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#070b15] p-6 rounded-xl shadow-sm min-h-[500px]">
              <div className="max-w-xl mx-auto space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase bg-brand-orange/15 text-brand-orange px-2 py-0.5 rounded">
                      {category}
                    </span>
                    <span className="text-slate-400 text-xs">
                      • {readingTime} min read
                    </span>
                  </div>
                  <h1 className="text-2xl font-extrabold font-poppins text-slate-900 dark:text-white leading-tight">
                    {title || "Untitled Article"}
                  </h1>
                  <p className="text-slate-500 text-xs font-inter">
                    Estimated published date: {new Date().toLocaleDateString()}{" "}
                    • Written by Adruva Expert
                  </p>
                </div>

                {coverImageUrl && (
                  <div className="relative overflow-hidden w-full aspect-video rounded-xl border border-slate-100 dark:border-slate-900 shadow-md">
                    <img
                      src={coverImageUrl}
                      alt="Banner Preview"
                      style={{
                        objectFit: "cover",
                        transformOrigin: `${imageAlignOffset.laptopX}% ${imageAlignOffset.laptopY}%`,
                        transform: `scale(${imageAlignOffset.laptopZoom / 100})`,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                )}

                <article
                  className="prose dark:prose-invert prose-xs text-slate-700 dark:text-slate-300 font-inter leading-relaxed max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: content.startsWith("{")
                      ? "<p className='text-xs italic text-slate-400'>Rich Tiptap layout structure rendered in preview mode.</p>"
                      : content ||
                        "<p className='text-xs text-slate-400'>Start typing to build content...</p>",
                  }}
                />
              </div>
            </Card>
          )}

          {/* Bottom section: Google SEO Optimization Parameters */}
          <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] p-6 rounded-xl shadow-sm space-y-5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block border-b border-slate-200 dark:border-slate-800 pb-2">
              Google SEO Optimization Parameters
            </span>

            <div className="space-y-4 font-inter text-xs">
              <div className="space-y-1">
                <Label
                  htmlFor="focusKeyword"
                  className="font-bold text-slate-400"
                >
                  FOCUS KEYWORD:
                </Label>
                <Input
                  id="focusKeyword"
                  placeholder="e.g. SEO Company Rishikesh"
                  value={focusKeyword}
                  onChange={(e) => setFocusKeyword(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="metaTitle"
                    className="font-bold text-slate-400"
                  >
                    META SEARCH TITLE:
                  </Label>
                  <span
                    className={`text-[10px] font-bold ${metaTitle.length >= 30 && metaTitle.length <= 60 ? "text-emerald-500" : "text-amber-500"}`}
                  >
                    {metaTitle.length} / 60 Chars (Target: 30-60)
                  </span>
                </div>
                <Input
                  id="metaTitle"
                  placeholder="Enter search title snippet..."
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 font-semibold"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <Label
                    htmlFor="metaDesc"
                    className="font-bold text-slate-400"
                  >
                    META DESCRIPTION SNIPPET:
                  </Label>
                  <span
                    className={`text-[10px] font-bold ${metaDescription.length >= 120 && metaDescription.length <= 160 ? "text-emerald-500" : "text-amber-500"}`}
                  >
                    {metaDescription.length} / 160 Chars (Target: 120-160)
                  </span>
                </div>
                <Textarea
                  id="metaDesc"
                  rows={3}
                  placeholder="Enter search description snippet..."
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                />
              </div>

              {/* Google search mobile preview mockup */}
              <div className="space-y-2 pt-2">
                <span className="font-bold text-slate-400 uppercase tracking-wide block">
                  Google Search Preview (Mobile):
                </span>
                <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c1322] p-4 rounded-xl shadow-inner max-w-lg space-y-1.5 text-left font-sans">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[9px] font-bold text-brand-orange">
                      A
                    </div>
                    <div className="flex flex-col text-[10px] leading-tight">
                      <span className="text-slate-800 dark:text-slate-200 font-semibold">
                        adruvasolution.com
                      </span>
                      <span className="text-slate-400">
                        https://www.adruvasolution.com › blog › {slug || "slug"}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-sm font-semibold text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer leading-tight">
                    {metaTitle || title || "Blog Post Title Preview"}
                  </h4>
                  <p className="text-xs text-[#4d5156] dark:text-[#bdc1c6] leading-relaxed">
                    {metaDescription ||
                      "Please write a meta description to populate the search snippet preview."}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Sidebar Options Panel */}
        <div className="space-y-5">
          {/* Publish Options */}
          <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] rounded-xl shadow-sm">
            <CardContent className="p-5 space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block border-b border-slate-200 dark:border-slate-800 pb-2">
                Publish Settings
              </span>

              <div className="space-y-3.5 font-inter text-xs">
                <div className="space-y-1">
                  <Label className="font-bold text-slate-400 uppercase">
                    Category Tag:
                  </Label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 focus:outline-none font-semibold text-slate-700 dark:text-slate-300"
                  >
                    <option value="web-development">Web Development</option>
                    <option value="mobile-apps">Mobile App Development</option>
                    <option value="ai-tech">AI & Automation</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="design">Design Systems</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <Label className="font-bold text-slate-400 uppercase">
                    Default Author:
                  </Label>
                  <select
                    value={authorId}
                    onChange={(e) => setAuthorId(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg p-2 focus:outline-none font-semibold text-slate-700 dark:text-slate-300"
                  >
                    <option value="">Select Author</option>
                    {Array.isArray(authorsData?.data) &&
                      authorsData.data.filter(Boolean).map((author) => (
                        <option key={author.id} value={author.id}>
                          {author.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <Label className="font-bold text-slate-400 uppercase">
                    Tags (Comma-separated):
                  </Label>
                  <Input
                    placeholder="e.g. Nextjs, Tailwind, SEO"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="font-bold text-slate-400 uppercase">
                    Reading Time (Minutes):
                  </Label>
                  <Input
                    type="number"
                    value={readingTime}
                    onChange={(e) =>
                      setReadingTime(parseInt(e.target.value) || 1)
                    }
                    className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                  />
                </div>

                {/* Homepage Pin Controls */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="pin-post"
                      checked={isPinned}
                      onChange={(e) => setIsPinned(e.target.checked)}
                      className="rounded border-slate-300 text-brand-orange focus:ring-brand-orange h-4 w-4 accent-brand-orange cursor-pointer"
                    />
                    <label
                      htmlFor="pin-post"
                      className="font-bold text-slate-500 cursor-pointer select-none"
                    >
                      Pin Post on Homepage
                    </label>
                  </div>

                  {isPinned && (
                    <div className="space-y-1">
                      <Label className="font-bold text-slate-400 uppercase">
                        Pin Display Order:
                      </Label>
                      <Input
                        type="number"
                        value={pinOrder}
                        onChange={(e) =>
                          setPinOrder(parseInt(e.target.value) || 0)
                        }
                        className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
                      />
                    </div>
                  )}
                </div>

                {/* Related Blogs multiselect */}
                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <Label className="font-bold text-slate-400 uppercase">
                    Related Blogs (Max 3):
                  </Label>
                  <div className="max-h-28 overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-lg p-2 bg-slate-50 dark:bg-slate-950 space-y-1.5">
                    {Array.isArray(blogsListData?.data) &&
                      blogsListData.data
                        .filter((b) => b.id !== initialData?.id)
                        .map((b) => (
                          <div key={b.id} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={`related-${b.id}`}
                              checked={relatedBlogIds.includes(b.id)}
                              onChange={() =>
                                setRelatedBlogIds((prev) =>
                                  prev.includes(b.id)
                                    ? prev.filter((id) => id !== b.id)
                                    : prev.length < 3
                                      ? [...prev, b.id]
                                      : prev,
                                )
                              }
                              className="rounded text-brand-orange h-3.5 w-3.5 accent-brand-orange cursor-pointer"
                            />
                            <label
                              htmlFor={`related-${b.id}`}
                              className="truncate max-w-[170px] text-[10px] text-slate-500 font-medium cursor-pointer"
                            >
                              {b.title}
                            </label>
                          </div>
                        ))}
                    {(!Array.isArray(blogsListData?.data) ||
                      blogsListData.data.length <= 1) && (
                      <span className="text-[10px] text-slate-400 block italic">
                        No other blogs available
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Language Auto-Translator Checklist */}
          {initialData?.id && (
            <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] rounded-xl shadow-sm">
              <CardContent className="p-5 space-y-4">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block border-b border-slate-200 dark:border-slate-800 pb-2">
                  AI Language Auto-Translator
                </span>
                <p className="text-[10px] leading-normal text-slate-400 font-inter">
                  Select target languages to translate the English version into.
                  This uses DeepL with Google fallback in the background.
                </p>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-bold text-slate-500 font-inter pt-1">
                  {SUPPORTED_LANGUAGES.filter((l) => l.code !== language).map(
                    (lang) => (
                      <div
                        key={lang.code}
                        className="flex items-center gap-1.5"
                      >
                        <input
                          type="checkbox"
                          id={`trans-${lang.code}`}
                          checked={selectedTranslateLangs.includes(lang.code)}
                          onChange={() => toggleTranslateLang(lang.code)}
                          className="rounded border-slate-300 text-brand-orange h-3.5 w-3.5 accent-brand-orange cursor-pointer"
                        />
                        <label
                          htmlFor={`trans-${lang.code}`}
                          className="cursor-pointer truncate"
                        >
                          {lang.name}
                        </label>
                      </div>
                    ),
                  )}
                </div>

                <Button
                  onClick={handleTranslateClick}
                  disabled={
                    translateMutation.isPending ||
                    selectedTranslateLangs.length === 0
                  }
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] py-1.5 h-auto uppercase tracking-wide shrink-0 transition"
                >
                  {translateMutation.isPending
                    ? "Translating..."
                    : `Translate into ${selectedTranslateLangs.length} languages`}
                </Button>
              </CardContent>
            </Card>
          )}

          {/* SEO Readability Audit */}
          <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] rounded-xl shadow-sm">
            <CardContent className="p-5 space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block border-b border-slate-200 dark:border-slate-800 pb-2">
                SEO Readability Audit
              </span>

              <div className="space-y-2.5 font-inter text-xs text-slate-500 font-medium">
                {/* Meta Title check */}
                <div className="flex items-center gap-2">
                  {metaTitle.length >= 30 && metaTitle.length <= 60 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                  <span>
                    Meta Title Length: {metaTitle.length} chars (Target: 30-60)
                  </span>
                </div>

                {/* Meta Description check */}
                <div className="flex items-center gap-2">
                  {metaDescription.length >= 120 &&
                  metaDescription.length <= 160 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                  <span>
                    Meta Desc Length: {metaDescription.length} chars (Target:
                    120-160)
                  </span>
                </div>

                {/* Word Count check */}
                <div className="flex items-center gap-2">
                  {wordCount >= 800 ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                  <span>Word Count: {wordCount} words (Target: 800+)</span>
                </div>

                {/* Subheadings check */}
                <div className="flex items-center gap-2">
                  {hasSubheadings ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                  <span>
                    Has Subheadings (H2/H3): {hasSubheadings ? "Yes" : "No"}
                  </span>
                </div>

                {/* Internal Links check */}
                <div className="flex items-center gap-2">
                  {hasInternalLinks ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                  )}
                  <span>
                    Has Internal Links: {hasInternalLinks ? "Yes" : "No"}
                  </span>
                </div>

                {/* Readability Ease check */}
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>
                    Readability Ease: {Math.round(readabilityEase)}/100 (Easy to
                    read)
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
