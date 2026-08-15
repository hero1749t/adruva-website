"use client";

import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { NodeSelection } from "@tiptap/pm/state";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import CharacterCount from "@tiptap/extension-character-count";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";
import { Node, mergeAttributes } from "@tiptap/core";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Code,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  AlertTriangle,
  FolderOpen,
  Grid,
  FileCode,
  Maximize2,
  Minimize2,
  Trash2,
} from "lucide-react";

// ─── Custom Extended Image Node (Supports Alignment, Width, Captions & Links) ───
const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "100%",
        renderHTML: (attributes) => {
          const isFull = attributes.width === "100%" || !attributes.width;
          return {
            width: attributes.width,
            style: `width: ${attributes.width}; max-width: 100%; height: auto; display: ${isFull ? "block" : "inline-block"}; vertical-align: middle; margin: ${isFull ? "20px auto" : "10px"};`,
          };
        },
      },
      align: {
        default: "center",
        renderHTML: (attributes) => {
          const isFull = attributes.width === "100%" || !attributes.width;
          if (!isFull) return {};
          return {
            class: `align-${attributes.align}`,
            style:
              attributes.align === "left"
                ? "float: left; margin: 0 20px 20px 0; display: block;"
                : attributes.align === "right"
                  ? "float: right; margin: 0 0 20px 20px; display: block;"
                  : "display: block; margin: 20px auto; clear: both;",
          };
        },
      },
      caption: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-caption") || "",
        renderHTML: (attributes) => ({
          "data-caption": attributes.caption,
        }),
      },
      href: {
        default: "",
        parseHTML: (element) => {
          if (element.getAttribute("data-href"))
            return element.getAttribute("data-href");
          if (element.getAttribute("href")) return element.getAttribute("href");
          const parentA = element.closest("a");
          if (parentA) return parentA.getAttribute("href") || "";
          return "";
        },
        renderHTML: (attributes) => ({
          "data-href": attributes.href,
        }),
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    const href = HTMLAttributes["data-href"] || HTMLAttributes.href;
    if (href) {
      return [
        "a",
        {
          href,
          target: "_blank",
          rel: "noopener noreferrer",
          style: "display: inline-block; max-width: 100%;",
        },
        ["img", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)],
      ];
    }
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },
});

// ─── Custom Alert Box Node ───────────────────────────────────────────────────
const AlertBox = Node.create({
  name: "alertBox",
  group: "block",
  content: "block+",
  defining: true,
  addAttributes() {
    return {
      type: {
        default: "note",
      },
    };
  },
  parseHTML() {
    return [{ tag: "div[data-type=alert-box]" }];
  },
  renderHTML({ node, HTMLAttributes }: any) {
    const typeColors: Record<string, string> = {
      note: "#3b82f6",
      tip: "#10b981",
      warning: "#f59e0b",
      caution: "#ef4444",
    };
    const bgColors: Record<string, string> = {
      note: "rgba(59, 130, 246, 0.08)",
      tip: "rgba(16, 185, 129, 0.08)",
      warning: "rgba(245, 158, 11, 0.08)",
      caution: "rgba(239, 68, 68, 0.08)",
    };
    const color = typeColors[node.attrs.type] || typeColors.note;
    const bg = bgColors[node.attrs.type] || bgColors.note;
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-type": "alert-box",
        class: `alert-box alert-${node.attrs.type} p-4 border-l-4 rounded-r-lg my-5`,
        style: `border-left-color: ${color}; background-color: ${bg};`,
      }),
      0,
    ];
  },
});

// ─── Custom Iframe Node (YouTube & Spotify Video/Audio Embeds) ───────────────
const Iframe = Node.create({
  name: "iframe",
  group: "block",
  selectable: true,
  draggable: true,
  atom: true,
  addAttributes() {
    return {
      src: {
        default: null,
      },
      width: {
        default: "100%",
      },
      height: {
        default: "450px",
      },
    };
  },
  parseHTML() {
    return [{ tag: "iframe" }];
  },
  renderHTML({ HTMLAttributes }: any) {
    return [
      "iframe",
      mergeAttributes(HTMLAttributes, {
        frameborder: "0",
        allowfullscreen: "true",
        class: "w-full rounded-xl border-none my-6 shadow-md",
        style: `height: ${HTMLAttributes.height || "450px"};`,
      }),
    ];
  },
});

// ─── Client-side Image Compression Helper ──────────────────────────────────
async function compressImageToWebp(
  file: File,
  quality = 0.8,
  maxWidth = 1600,
): Promise<File> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Canvas context is null"));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File(
                [blob],
                file.name.replace(/\.[^/.]+$/, "") + ".webp",
                {
                  type: "image/webp",
                  lastModified: Date.now(),
                },
              );
              resolve(compressedFile);
            } else {
              reject(new Error("Canvas toBlob returned null"));
            }
          },
          "image/webp",
          quality,
        );
      };
      img.onerror = (err) => reject(err);
      img.src = event.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

// ─── Custom Block Nodes supporting inline style attributes ────────────────────
const CustomParagraph = Paragraph.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
    };
  },
});

const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
    };
  },
});

const CustomBlockquote = Blockquote.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      style: {
        default: null,
        parseHTML: (element) => element.getAttribute("style"),
        renderHTML: (attributes) => {
          if (!attributes.style) return {};
          return { style: attributes.style };
        },
      },
    };
  },
});

function cleanAndParseTiptapJson(value: string): any {
  if (!value || !value.trim().startsWith("{")) return null;
  try {
    return JSON.parse(value);
  } catch (e) {
    try {
      const repaired = value
        .replace(/\\{2,}"/g, '\\"')
        .replace(/[\u201c\u201d]/g, '"');
      return JSON.parse(repaired);
    } catch (err) {
      console.warn("Tiptap JSON parsing failed.");
      return null;
    }
  }
}

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
  outputFormat?: "html" | "json";
  title?: string;
  slug?: string;
  seoTitle?: string;
  setSeoTitle?: (val: string) => void;
  seoDesc?: string;
  setSeoDesc?: (val: string) => void;
  focusKeyword?: string;
  setFocusKeyword?: (val: string) => void;
}

async function uploadToServer(file: File): Promise<string> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${apiUrl}/api/v1/upload/image?folder=blogs`, {
    method: "POST",
    body: formData,
  });

  const json = await res.json();
  if (!res.ok || !json.success) {
    throw new Error(json.message || "Upload failed");
  }
  return json.data.url;
}

// ── Toolbar Button Component ────────────────────────────────────────────────
function ToolBtn({
  onClick,
  active,
  disabled,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`h-8 min-w-[32px] px-2 flex items-center justify-center rounded-lg text-xs font-semibold border transition-all duration-150 ${
        active
          ? "bg-brand-orange border-brand-orange text-white shadow-sm"
          : "bg-white dark:bg-[#151f32] border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900"
      } ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}`}
    >
      {children}
    </button>
  );
}

function Sep() {
  return (
    <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1.5 self-center" />
  );
}

export default function TiptapEditor({
  value,
  onChange,
  outputFormat = "json",
  title = "",
  slug = "",
  seoTitle = "",
  setSeoTitle,
  setSeoDesc,
  focusKeyword = "",
  setFocusKeyword,
  seoDesc = "",
}: TiptapEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [isCodeView, setIsCodeView] = useState(false);
  const [localHtml, setLocalHtml] = useState("");

  // Zen Mode & Media Library States
  const [isZenMode, setIsZenMode] = useState(false);
  const [isMediaOpen, setIsMediaOpen] = useState(false);

  // Auto-Save / Restore Local Draft States
  const [showRestoreBanner, setShowRestoreBanner] = useState(false);
  const [draftData, setDraftData] = useState<any>(null);

  // Load All Blogs to Extract Images for Media Library Browser
  const { data: blogsData } = useQuery({
    queryKey: ["admin", "blogs-media-library"],
    queryFn: () =>
      apiFetch<{ success: boolean; data: any[] }>("/blog?limit=100&status=all"),
  });

  const getBlogImages = useCallback((): string[] => {
    if (!blogsData?.data) return [];
    const images: string[] = [];
    blogsData.data.forEach((blog) => {
      if (blog.coverImageUrl) {
        images.push(blog.coverImageUrl);
      }
      if (blog.content) {
        try {
          const content =
            typeof blog.content === "string"
              ? JSON.parse(blog.content)
              : blog.content;
          const extractImages = (node: any) => {
            if (node.type === "image" && node.attrs?.src) {
              images.push(node.attrs.src);
            }
            if (node.content) {
              node.content.forEach(extractImages);
            }
          };
          if (content && typeof content === "object") {
            extractImages(content);
          }
        } catch (e) {
          // ignore
        }
      }
    });
    return Array.from(new Set(images)).filter(Boolean);
  }, [blogsData]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: false,
        heading: false,
        blockquote: false,
      }),
      CustomParagraph,
      CustomHeading,
      CustomBlockquote,
      Underline,
      TextStyle,
      Color,
      CustomImage.configure({
        HTMLAttributes: {
          class:
            "tiptap-image rounded-xl border border-slate-200 dark:border-slate-800",
        },
        allowBase64: false,
      }),
      AlertBox,
      Iframe,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-brand-orange underline hover:text-brand-orange-hover",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight.configure({
        HTMLAttributes: {
          class: "bg-yellow-200 dark:bg-yellow-900/60 rounded px-0.5",
        },
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: "tiptap-table border-collapse w-full my-6 text-sm",
        },
      }),
      TableRow,
      TableHeader,
      TableCell,
      CharacterCount,
    ] as any,
    content: (() => {
      if (!value) return "<p></p>";
      const parsed = cleanAndParseTiptapJson(value);
      return parsed !== null ? parsed : value;
    })(),
    onUpdate: ({ editor }) => {
      if (outputFormat === "html") {
        onChange(editor.getHTML());
      } else {
        onChange(JSON.stringify(editor.getJSON()));
      }
    },
    editorProps: {
      handleClickOn(view, pos, node, nodePos, event, direct) {
        if (node.type.name === "image") {
          const selection = NodeSelection.create(view.state.doc, nodePos);
          view.dispatch(view.state.tr.setSelection(selection));
          return true;
        }
        return false;
      },
    },
  });

  // Local Storage Draft Recovery Hooks
  useEffect(() => {
    if (!slug) return;
    const draftKey = `draft_blog_post_${slug}`;
    const saved = localStorage.getItem(draftKey);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          parsed.savedAt &&
          Date.now() - parsed.savedAt < 1000 * 60 * 60 * 24 * 7
        ) {
          // Offering restore only if draft matches corresponding post and is less than 7 days old
          setDraftData(parsed);
          setShowRestoreBanner(true);
        }
      } catch (e) {
        // ignore
      }
    }
  }, [slug]);

  // Periodic Local Draft Saver Hook
  useEffect(() => {
    if (!editor || isCodeView || !slug) return;
    const contentVal = editor.getHTML();
    if (contentVal === "<p></p>" || !contentVal.trim()) return;

    const draftKey = `draft_blog_post_${slug}`;
    const timer = setTimeout(() => {
      const draftPayload = {
        content:
          outputFormat === "html"
            ? contentVal
            : JSON.stringify(editor.getJSON()),
        title: title || "",
        seoTitle: seoTitle || "",
        seoDesc: seoDesc || "",
        focusKeyword: focusKeyword || "",
        savedAt: Date.now(),
      };
      localStorage.setItem(draftKey, JSON.stringify(draftPayload));
    }, 1500);

    return () => clearTimeout(timer);
  }, [editor, value, title, seoTitle, seoDesc, focusKeyword, isCodeView, slug]);

  const handleRestoreDraft = () => {
    if (!editor || !draftData) return;
    try {
      if (outputFormat === "html") {
        editor.commands.setContent(draftData.content, false);
        onChange(draftData.content);
      } else {
        const json =
          typeof draftData.content === "string"
            ? JSON.parse(draftData.content)
            : draftData.content;
        editor.commands.setContent(json, false);
        onChange(JSON.stringify(json));
      }
    } catch (e) {
      editor.commands.setContent(draftData.content, false);
      onChange(draftData.content);
    }

    if (setSeoTitle && draftData.seoTitle) setSeoTitle(draftData.seoTitle);
    if (setSeoDesc && draftData.seoDesc) setSeoDesc(draftData.seoDesc);
    if (setFocusKeyword && draftData.focusKeyword)
      setFocusKeyword(draftData.focusKeyword);

    setShowRestoreBanner(false);
  };

  const handleDiscardDraft = () => {
    if (slug) {
      localStorage.removeItem(`draft_blog_post_${slug}`);
    }
    setShowRestoreBanner(false);
  };

  // Sync external changes safely
  useEffect(() => {
    if (!editor || isCodeView) return;

    let isValueJson = false;
    let parsedValue: any = null;
    try {
      if (value && value.trim().startsWith("{")) {
        parsedValue = JSON.parse(value);
        isValueJson = true;
      }
    } catch (e) {
      // ignore
    }

    if (isValueJson && parsedValue) {
      const currentJson = editor.getJSON();
      if (JSON.stringify(currentJson) !== JSON.stringify(parsedValue)) {
        editor.commands.setContent(parsedValue, false);
      }
    } else if (value !== editor.getHTML()) {
      editor.commands.setContent(value || "<p></p>", false);
    }
  }, [value, editor, isCodeView]);

  const insertAndSelectImage = (src: string, alt = "") => {
    if (!editor) return;
    (editor.chain().focus() as any).setImage({ src, alt, title: alt }).run();
  };

  const compressAndUploadImage = async (file: File) => {
    setIsUploading(true);
    setUploadProgress("Converting to WebP & optimizing...");
    try {
      const webpFile = await compressImageToWebp(file, 0.8, 1600);
      setUploadProgress("Uploading to Cloudinary...");
      const url = await uploadToServer(webpFile);
      const altText = window.prompt("Enter Image Alt Text (SEO):") || "";
      insertAndSelectImage(url, altText);
    } catch (err: any) {
      alert(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      setUploadProgress("");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      compressAndUploadImage(file);
    }
    e.target.value = "";
  };

  // Drag and drop event listeners inside Tiptap container
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      compressAndUploadImage(file);
    }
  };

  // Formatting Actions Helpers
  const addLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt(
      "Enter Link URL (e.g. https://google.com):",
      previousUrl,
    );
    if (url === null) return;
    if (url === "") {
      (editor.chain().focus() as any).extendMarkRange("link").unsetLink().run();
      return;
    }
    (editor.chain().focus() as any)
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  };

  const addIframeEmbed = () => {
    if (!editor) return;
    const src = window.prompt("Enter Video (YouTube Embed/Spotify Share) URL:");
    if (!src) return;
    editor
      .chain()
      .focus()
      .insertContent({
        type: "iframe",
        attrs: { src, height: "450px" },
      })
      .run();
  };

  const createTable = () => {
    if (!editor) return;
    (editor.chain().focus() as any)
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  const addAlert = (type: "note" | "tip" | "warning" | "caution") => {
    if (!editor) return;
    editor
      .chain()
      .focus()
      .insertContent({
        type: "alertBox",
        attrs: { type },
        content: [
          {
            type: "paragraph",
            content: [{ type: "text", text: `This is a ${type} alert box...` }],
          },
        ],
      })
      .run();
  };

  // HTML Source Code View Toggle
  const toggleCodeView = () => {
    if (!editor) return;
    if (isCodeView) {
      editor.commands.setContent(localHtml, true);
      setIsCodeView(false);
    } else {
      setLocalHtml(editor.getHTML());
      setIsCodeView(true);
    }
  };

  const handleHtmlCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setLocalHtml(val);
    if (outputFormat === "html") {
      onChange(val);
    } else {
      // Best-effort JSON update if requested
      try {
        const tempEditor = editor;
        if (tempEditor) {
          tempEditor.commands.setContent(val, false);
          onChange(JSON.stringify(tempEditor.getJSON()));
        }
      } catch (err) {
        // ignore
      }
    }
  };

  if (!editor) return null;

  const chars = editor.storage.characterCount?.characters() || 0;
  const words = editor.storage.characterCount?.words() || 0;

  // Real-Time SEO & Readability Calculations
  const seoChecklist = useMemo(() => {
    let plainText = "";
    let h2Found = false;
    let internalLinkFound = false;
    let imageCount = 0;
    let missingAltCount = 0;

    if (editor) {
      plainText = editor.getText() || "";
      editor.state.doc.descendants((node) => {
        if (
          node.type.name === "heading" &&
          (node.attrs.level === 2 || node.attrs.level === 3)
        ) {
          h2Found = true;
        }
        if (node.type.name === "image") {
          imageCount++;
          if (!node.attrs.alt) {
            missingAltCount++;
          }
        }
        if (node.marks) {
          node.marks.forEach((mark) => {
            if (mark.type.name === "link" && mark.attrs.href) {
              const href = mark.attrs.href;
              if (href.startsWith("/") || href.includes("adruvasolution.com")) {
                internalLinkFound = true;
              }
            }
          });
        }
      });
    }

    const wordsVal = plainText.trim().split(/\s+/).filter(Boolean).length;
    let readability = { ease: 100, grade: "0.0" };

    if (plainText.trim()) {
      const cleanText = plainText.trim();
      const sentences = cleanText
        .split(/[.!?]+/)
        .filter((s) => s.trim().length > 0);
      const sentenceCount = Math.max(1, sentences.length);
      const wordsArray = cleanText.split(/\s+/).filter(Boolean);

      const countSyllables = (word: string) => {
        let w = word.toLowerCase();
        if (w.length <= 3) return 1;
        w = w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "");
        w = w.replace(/^y/, "");
        const syls = w.match(/[aeiouy]{1,2}/g);
        return syls ? syls.length : 1;
      };

      let totalSyllables = 0;
      for (const w of wordsArray) {
        totalSyllables += countSyllables(w);
      }

      const ease =
        206.835 -
        1.015 * (wordsVal / sentenceCount) -
        84.6 * (totalSyllables / wordsVal);
      const grade =
        0.39 * (wordsVal / sentenceCount) +
        11.8 * (totalSyllables / wordsVal) -
        15.59;

      readability = {
        ease: Math.max(0, Math.min(100, Math.round(ease))),
        grade: grade < 0 ? "0.0" : grade.toFixed(1),
      };
    }

    const keywordInTitle = focusKeyword
      ? title.toLowerCase().includes(focusKeyword.toLowerCase())
      : false;
    const keywordInDesc = focusKeyword
      ? seoDesc.toLowerCase().includes(focusKeyword.toLowerCase())
      : false;

    return {
      wordCount: wordsVal,
      hasH2: h2Found,
      hasInternalLinks: internalLinkFound,
      hasImages: imageCount > 0,
      missingAltTags: missingAltCount > 0,
      keywordInTitle,
      keywordInDesc,
      readability,
    };
  }, [editor, chars, title, seoDesc, focusKeyword]);

  const editorNode = (
    <div className="flex flex-col bg-white dark:bg-[#151f32] border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Restore Draft Banner */}
      {showRestoreBanner && (
        <div className="bg-amber-500/10 border-b border-amber-500/20 px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs font-inter z-20">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-medium">
            <AlertTriangle className="w-4 h-4" />
            <span>
              Unsaved local draft found from{" "}
              {draftData?.savedAt
                ? new Date(draftData.savedAt).toLocaleTimeString()
                : "recent session"}
              . Would you like to restore it?
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleRestoreDraft}
              className="bg-brand-orange hover:bg-brand-orange-hover text-white px-3 py-1 rounded font-bold transition-all shadow-sm"
            >
              Restore Draft
            </button>
            <button
              type="button"
              onClick={handleDiscardDraft}
              className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 px-3 py-1 rounded font-medium transition-all"
            >
              Discard
            </button>
          </div>
        </div>
      )}

      {/* ─── Rich Text Toolbar ────────────────────────────────────────────── */}
      {!isCodeView && (
        <div className="p-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 flex flex-wrap gap-1 items-center z-10 sticky top-0">
          <ToolBtn
            title="Bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
          >
            <Bold className="w-4 h-4" />
          </ToolBtn>
          <ToolBtn
            title="Italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
          >
            <Italic className="w-4 h-4" />
          </ToolBtn>
          <ToolBtn
            title="Underline"
            onClick={() =>
              (editor.chain().focus() as any).toggleUnderline().run()
            }
            active={editor.isActive("underline")}
          >
            <UnderlineIcon className="w-4 h-4" />
          </ToolBtn>

          <Sep />

          <ToolBtn
            title="Heading 2"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            active={editor.isActive("heading", { level: 2 })}
          >
            <Heading2 className="w-4 h-4" />
          </ToolBtn>
          <ToolBtn
            title="Heading 3"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            active={editor.isActive("heading", { level: 3 })}
          >
            <Heading3 className="w-4 h-4" />
          </ToolBtn>
          <ToolBtn
            title="Blockquote"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
          >
            <Quote className="w-4 h-4" />
          </ToolBtn>

          <Sep />

          <ToolBtn
            title="Bullet List"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          >
            <List className="w-4 h-4" />
          </ToolBtn>
          <ToolBtn
            title="Ordered List"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          >
            <ListOrdered className="w-4 h-4" />
          </ToolBtn>

          <Sep />

          <ToolBtn
            title="Align Left"
            onClick={() =>
              (editor.chain().focus() as any).setTextAlign("left").run()
            }
            active={editor.isActive({ textAlign: "left" })}
          >
            <AlignLeft className="w-4 h-4" />
          </ToolBtn>
          <ToolBtn
            title="Align Center"
            onClick={() =>
              (editor.chain().focus() as any).setTextAlign("center").run()
            }
            active={editor.isActive({ textAlign: "center" })}
          >
            <AlignCenter className="w-4 h-4" />
          </ToolBtn>
          <ToolBtn
            title="Align Right"
            onClick={() =>
              (editor.chain().focus() as any).setTextAlign("right").run()
            }
            active={editor.isActive({ textAlign: "right" })}
          >
            <AlignRight className="w-4 h-4" />
          </ToolBtn>
          <ToolBtn
            title="Align Justify"
            onClick={() =>
              (editor.chain().focus() as any).setTextAlign("justify").run()
            }
            active={editor.isActive({ textAlign: "justify" })}
          >
            <AlignJustify className="w-4 h-4" />
          </ToolBtn>

          <Sep />

          <ToolBtn
            title="Insert Link"
            onClick={addLink}
            active={editor.isActive("link")}
          >
            <LinkIcon className="w-4 h-4" />
          </ToolBtn>
          <ToolBtn
            title="Upload Image"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="w-4 h-4" />
          </ToolBtn>
          <ToolBtn
            title="Media Library Browser"
            onClick={() => setIsMediaOpen(true)}
          >
            <FolderOpen className="w-4 h-4" />
          </ToolBtn>

          <Sep />

          <ToolBtn
            title="Alert Box - Note"
            onClick={() => addAlert("note")}
            active={editor.isActive("alertBox", { type: "note" })}
          >
            <AlertTriangle className="w-4 h-4 text-blue-500" />
          </ToolBtn>
          <ToolBtn
            title="Alert Box - Tip"
            onClick={() => addAlert("tip")}
            active={editor.isActive("alertBox", { type: "tip" })}
          >
            <AlertTriangle className="w-4 h-4 text-emerald-500" />
          </ToolBtn>
          <ToolBtn
            title="Alert Box - Warning"
            onClick={() => addAlert("warning")}
            active={editor.isActive("alertBox", { type: "warning" })}
          >
            <AlertTriangle className="w-4 h-4 text-amber-500" />
          </ToolBtn>
          <ToolBtn
            title="Alert Box - Caution"
            onClick={() => addAlert("caution")}
            active={editor.isActive("alertBox", { type: "caution" })}
          >
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </ToolBtn>

          <Sep />

          <ToolBtn
            title="Insert Table"
            onClick={createTable}
            active={editor.isActive("table")}
          >
            <Grid className="w-4 h-4" />
          </ToolBtn>
          {editor.isActive("table") && (
            <>
              <ToolBtn
                title="Delete Table"
                onClick={() =>
                  (editor.chain().focus() as any).deleteTable().run()
                }
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </ToolBtn>
            </>
          )}

          <ToolBtn title="Iframe Embed (YouTube)" onClick={addIframeEmbed}>
            <FileCode className="w-4 h-4" />
          </ToolBtn>

          <Sep />

          <ToolBtn
            title="Undo"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo className="w-4 h-4" />
          </ToolBtn>
          <ToolBtn
            title="Redo"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo className="w-4 h-4" />
          </ToolBtn>
        </div>
      )}

      {/* ─── Editor Workspace Area ───────────────────────────────────────── */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="relative flex-grow min-h-[450px]"
      >
        {isCodeView ? (
          <textarea
            value={localHtml}
            onChange={handleHtmlCodeChange}
            className="w-full min-h-[450px] p-5 font-mono text-xs leading-relaxed bg-[#0d1117] text-[#c9d1d9] border-none outline-none resize-y focus:ring-0"
            placeholder="Edit raw HTML code here..."
          />
        ) : (
          <div className="min-h-[450px] overflow-y-auto">
            <EditorContent editor={editor} />
          </div>
        )}

        {/* Upload overlay */}
        {isUploading && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center z-30">
            <div className="bg-white dark:bg-[#151f32] border border-slate-200 dark:border-slate-800 rounded-xl px-6 py-4 flex items-center gap-3 shadow-xl">
              <div className="w-4 h-4 border-2 border-brand-orange border-t-transparent rounded-full animate-spin" />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {uploadProgress}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ─── Editor Footer / Stats ────────────────────────────────────────── */}
      <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30 flex justify-between items-center text-[10px] text-slate-500 font-medium">
        <span>
          {isCodeView
            ? "💡 Note: Writing HTML directly allows custom elements. Switch back to rich text to preview."
            : "💡 Tip: You can drag and drop images directly into the editor sheet below."}
        </span>
        <div className="flex items-center gap-3">
          <span>
            Words: {words} | Characters: {chars}
          </span>
          <button
            type="button"
            onClick={toggleCodeView}
            className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-[10px] rounded transition-colors text-slate-700 dark:text-slate-200"
          >
            {isCodeView ? "Rich Text View" : "Source Code View"}
          </button>
          <button
            type="button"
            onClick={() => setIsZenMode(!isZenMode)}
            className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400"
            title="Toggle Zen Mode"
          >
            {isZenMode ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
  if (isZenMode) {
    return (
      <div className="fixed inset-0 bg-[#060814]/98 z-[999999] flex flex-col p-6 overflow-y-auto">
        <div className="max-w-4xl w-full mx-auto flex-grow flex flex-col space-y-4">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Zen Writing Workspace
            </span>
            <button
              onClick={() => setIsZenMode(false)}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-white"
            >
              Exit Zen Mode
            </button>
          </div>
          {editorNode}
        </div>
      </div>
    );
  }

  return (
    <>
      {editorNode}

      {/* ─── SEO Audit Checklists & Google SERP Preview Card ─────────────── */}
      {title && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* SEO Checklist & Scores */}
          <div className="bg-white dark:bg-[#151f32] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-5">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-850">
              <h4 className="text-sm font-bold font-poppins text-slate-900 dark:text-white">
                SEO Audit Checklist & Readability
              </h4>
              <span className="text-[10px] uppercase font-bold text-brand-orange">
                Real-Time Scorer
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-850 p-3 rounded-lg text-center">
                <span className="text-[10px] text-slate-500 font-bold block mb-1">
                  READABILITY EASE
                </span>
                <span
                  className={`text-base font-extrabold ${seoChecklist.readability.ease > 60 ? "text-emerald-500" : "text-amber-500"}`}
                >
                  {seoChecklist.readability.ease} / 100
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">
                  {seoChecklist.readability.ease > 60
                    ? "Easy to read"
                    : "Difficult to read"}
                </span>
              </div>
              <div className="bg-slate-50/50 dark:bg-slate-900/20 border border-slate-100 dark:border-slate-850 p-3 rounded-lg text-center">
                <span className="text-[10px] text-slate-500 font-bold block mb-1">
                  GRADE LEVEL
                </span>
                <span className="text-base font-extrabold text-slate-700 dark:text-slate-300">
                  Grade {seoChecklist.readability.grade}
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">
                  Target: Grade 7.0-9.0
                </span>
              </div>
            </div>

            <div className="space-y-2.5 font-inter text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50/30 dark:bg-slate-900/10">
                <span className="font-medium">Total Word Count</span>
                <span
                  className={`font-bold px-2 py-0.5 rounded text-[10px] ${seoChecklist.wordCount >= 300 ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}
                >
                  {seoChecklist.wordCount} words (Target: &gt;300)
                </span>
              </div>

              {/* Checks */}
              <div className="flex items-center gap-2.5">
                <span
                  className={
                    seoChecklist.hasH2
                      ? "text-emerald-500 font-bold"
                      : "text-rose-500 font-bold"
                  }
                >
                  {seoChecklist.hasH2 ? "✓" : "✗"}
                </span>
                <span>Includes H2/H3 Heading Tags</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span
                  className={
                    seoChecklist.hasImages
                      ? "text-emerald-500 font-bold"
                      : "text-rose-500 font-bold"
                  }
                >
                  {seoChecklist.hasImages ? "✓" : "✗"}
                </span>
                <span>Has inline image elements</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span
                  className={
                    !seoChecklist.missingAltTags
                      ? "text-emerald-500 font-bold"
                      : "text-rose-500 font-bold"
                  }
                >
                  {!seoChecklist.missingAltTags ? "✓" : "✗"}
                </span>
                <span>All images have alt tags set</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span
                  className={
                    seoChecklist.hasInternalLinks
                      ? "text-emerald-500 font-bold"
                      : "text-rose-500 font-bold"
                  }
                >
                  {seoChecklist.hasInternalLinks ? "✓" : "✗"}
                </span>
                <span>Includes internal links to services/work</span>
              </div>

              {focusKeyword && (
                <>
                  <div className="flex items-center gap-2.5">
                    <span
                      className={
                        seoChecklist.keywordInTitle
                          ? "text-emerald-500 font-bold"
                          : "text-rose-500 font-bold"
                      }
                    >
                      {seoChecklist.keywordInTitle ? "✓" : "✗"}
                    </span>
                    <span>Focus keyword present in Article Title</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <span
                      className={
                        seoChecklist.keywordInDesc
                          ? "text-emerald-500 font-bold"
                          : "text-rose-500 font-bold"
                      }
                    >
                      {seoChecklist.keywordInDesc ? "✓" : "✗"}
                    </span>
                    <span>Focus keyword present in SEO Meta Description</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Google SERP Preview Card */}
          <div className="bg-white dark:bg-[#151f32] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-850">
              <h4 className="text-sm font-bold font-poppins text-slate-900 dark:text-white">
                Google Search Results Preview (Mobile)
              </h4>
              <span className="text-[10px] text-slate-400 font-medium font-inter">
                SERP Simulator
              </span>
            </div>

            {/* Inputs for Keyword / Meta Title / Meta Desc */}
            <div className="space-y-3 font-inter text-xs">
              <div>
                <label className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                  Focus Keyword
                </label>
                <input
                  type="text"
                  value={focusKeyword}
                  onChange={(e) =>
                    setFocusKeyword && setFocusKeyword(e.target.value)
                  }
                  placeholder="e.g. mobile app development delhi"
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 rounded-lg p-2 text-xs focus:ring-1 focus:ring-brand-orange focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">
                      Meta Title
                    </label>
                    <span
                      className={`text-[9px] font-bold ${seoTitle.length >= 30 && seoTitle.length <= 60 ? "text-emerald-500" : "text-rose-500"}`}
                    >
                      {seoTitle.length} / 60 Chars
                    </span>
                  </div>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle && setSeoTitle(e.target.value)}
                    placeholder="Enter customized SEO meta title..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-855 rounded-lg p-2 text-xs focus:ring-1 focus:ring-brand-orange focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[10px] uppercase font-bold text-slate-500">
                      Slug path
                    </label>
                  </div>
                  <input
                    type="text"
                    disabled
                    value={slug || "post-slug"}
                    className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-2 text-xs opacity-60 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[10px] uppercase font-bold text-slate-500">
                    Meta Description snippet
                  </label>
                  <span
                    className={`text-[9px] font-bold ${seoDesc.length >= 120 && seoDesc.length <= 160 ? "text-emerald-500" : "text-rose-500"}`}
                  >
                    {seoDesc.length} / 160 Chars
                  </span>
                </div>
                <textarea
                  rows={2}
                  value={seoDesc}
                  onChange={(e) => setSeoDesc && setSeoDesc(e.target.value)}
                  placeholder="Enter summary snippet (Optimal: 120-160 chars)..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-855 rounded-lg p-2 text-xs resize-none focus:ring-1 focus:ring-brand-orange focus:outline-none"
                />
              </div>
            </div>

            {/* Google Search Result Mock Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 font-sans text-left mt-3">
              <div className="flex items-center gap-2 text-xs text-slate-900 mb-1 leading-none">
                <div className="bg-slate-100 w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold text-slate-500 border border-slate-200">
                  AD
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-normal text-slate-700">
                    adruvasolution.com
                  </span>
                  <span className="text-[8px] text-slate-500">
                    blog &gt; {slug || "post-slug"}
                  </span>
                </div>
              </div>
              <div className="text-blue-800 text-[16px] leading-tight hover:underline cursor-pointer font-medium mb-1 truncate">
                {seoTitle || title || "Specify Title"} | Adruva Blog
              </div>
              <div className="text-slate-600 text-xs leading-normal">
                {seoDesc ||
                  "Please enter a meta description snippet. If left empty, Google will automatically summarize your content..."}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── Media Library Browser Modal ────────────────────────────────────── */}
      {isMediaOpen && (
        <div
          className="fixed inset-0 bg-black/75 z-[999999] flex items-center justify-center p-4 backdrop-blur-[2px]"
          onClick={() => setIsMediaOpen(false)}
        >
          <div
            className="bg-white dark:bg-[#151f32] border border-slate-200 dark:border-slate-800 rounded-xl w-full max-w-3xl max-h-[80vh] flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white font-poppins">
                  Media Library Browser
                </h3>
                <p className="text-[10px] text-slate-500 font-medium">
                  Browse and select previously uploaded blog images to insert
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsMediaOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-base"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-grow">
              {getBlogImages().length === 0 ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
                  No images found in existing blog posts.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {getBlogImages().map((src, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        const altText =
                          window.prompt("Enter Image Alt Text (SEO):") || "";
                        insertAndSelectImage(src, altText);
                        setIsMediaOpen(false);
                      }}
                      className="aspect-square w-full rounded-lg overflow-hidden border border-slate-200 dark:border-slate-855 cursor-pointer relative group hover:scale-[1.02] hover:border-brand-orange transition-all duration-200"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={src}
                        alt="Library item"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="px-2 py-1 bg-white text-slate-900 text-[10px] font-bold rounded shadow">
                          Select
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 text-right text-[10px] text-slate-500 font-medium font-inter">
              Click on an image to insert it directly at your current cursor
              position.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
