"use client";

import { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../../lib/api";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Select, SelectItem, SelectValue } from "../ui/select";
import { ImageUpload } from "./ImageUpload";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Heading3,
  Quote,
  Code,
  Undo,
  Redo,
  Save,
  ArrowLeft,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";

interface Author {
  id: string;
  name: string;
}

interface BlogEditorData {
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
}

interface BlogEditorProps {
  initialData?: BlogEditorData;
  onSave: (data: BlogEditorData) => void;
  isSaving: boolean;
}

export default function BlogEditor({
  initialData,
  onSave,
  isSaving,
}: BlogEditorProps) {
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
  const [readingTime, setReadingTime] = useState(
    (initialData?.readingTimeMinutes as number) || 3,
  );

  // Fetch active team members for author dropdown
  const { data: authorsData } = useQuery({
    queryKey: ["admin", "authors"],
    queryFn: () =>
      apiFetch<{ success: boolean; data: Author[] }>("/team?all=true"),
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
      // Auto generate slug only on create
      setSlug(generateSlug(val));
    }
  };

  // Tiptap Editor config
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialData?.content || "<p>Start writing article here...</p>",
    editorProps: {
      attributes: {
        class:
          "prose dark:prose-invert focus:outline-none min-h-[350px] max-w-none text-slate-800 dark:text-slate-200 text-sm font-inter p-4",
      },
    },
  });

  // Calculate reading time when content changes
  useEffect(() => {
    if (!editor) return;
    const calculateTime = () => {
      const text = editor.getText();
      const words = text.trim().split(/\s+/).length;
      setReadingTime(Math.max(1, Math.ceil(words / 200)));
    };

    editor.on("update", calculateTime);
    return () => {
      editor.off("update", calculateTime);
    };
  }, [editor]);

  const handlePublish = () => {
    handleFormSubmit("published");
  };

  const handleSaveDraft = () => {
    handleFormSubmit("draft");
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

    const contentJson = editor?.getJSON() || {};

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
    });
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/blogs">
            <Button variant="outline" size="sm" className="px-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-xl font-bold font-poppins text-slate-900 dark:text-white">
              {initialData ? "Edit Blog Post" : "Create Blog Post"}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-inter">
              Draft and customize your article
            </p>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            disabled={isSaving}
            className="flex-1 sm:flex-none border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900"
          >
            Save Draft
          </Button>
          <Button
            type="button"
            onClick={handlePublish}
            disabled={isSaving}
            className="flex-1 sm:flex-none bg-brand-orange hover:bg-brand-orange-hover text-white flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>
              {isSaving
                ? "Saving..."
                : initialData?.status === "published"
                  ? "Update & Publish"
                  : "Publish"}
            </span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor core block */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] rounded-xl overflow-hidden shadow-sm">
            {/* Rich text Toolbar */}
            <div className="p-2.5 border-b border-slate-100 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-900/30 flex flex-wrap gap-1 items-center">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 ${editor.isActive("bold") ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-500"}`}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <Bold className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 ${editor.isActive("italic") ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-500"}`}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <Italic className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 ${editor.isActive("heading", { level: 2 }) ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-500"}`}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
              >
                <Heading2 className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 ${editor.isActive("heading", { level: 3 }) ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-500"}`}
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
              >
                <Heading3 className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 ${editor.isActive("bulletList") ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-500"}`}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 ${editor.isActive("orderedList") ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-500"}`}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className="w-4 h-4" />
              </Button>
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-1" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 ${editor.isActive("blockquote") ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-500"}`}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
              >
                <Quote className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className={`h-8 w-8 p-0 ${editor.isActive("code") ? "bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white" : "text-slate-500"}`}
                onClick={() => editor.chain().focus().toggleCode().run()}
              >
                <Code className="w-4 h-4" />
              </Button>
              <div className="flex-grow" />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-slate-500"
                onClick={() => editor.chain().focus().undo().run()}
              >
                <Undo className="w-4 h-4" />
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-slate-500"
                onClick={() => editor.chain().focus().redo().run()}
              >
                <Redo className="w-4 h-4" />
              </Button>
            </div>

            {/* Input fields */}
            <div className="p-6 space-y-4">
              <div className="space-y-1">
                <Label htmlFor="post-title" className="text-xs font-semibold">
                  Post Title
                </Label>
                <Input
                  id="post-title"
                  placeholder="Enter article title..."
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 font-semibold text-base"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="post-slug" className="text-xs font-semibold">
                  URL Slug
                </Label>
                <Input
                  id="post-slug"
                  placeholder="enter-url-slug"
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 font-mono text-xs"
                />
              </div>

              <div className="space-y-1 pt-2">
                <Label className="text-xs font-semibold">Content Body</Label>
                <div className="border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden bg-slate-50/20 dark:bg-slate-950/30">
                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar metadata panel */}
        <div className="space-y-4">
          <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] rounded-xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="category" className="text-xs font-semibold">
                  Category
                </Label>
                <Select
                  id="category"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <SelectValue placeholder="Select Category" />
                  <SelectItem value="web-development">
                    Web Development
                  </SelectItem>
                  <SelectItem value="mobile-apps">Mobile Apps</SelectItem>
                  <SelectItem value="ai-tech">AI & Automation</SelectItem>
                  <SelectItem value="marketing">Digital Marketing</SelectItem>
                  <SelectItem value="design">Design Systems</SelectItem>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="author" className="text-xs font-semibold">
                  Author
                </Label>
                <Select
                  id="author"
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-xs"
                  value={authorId}
                  onChange={(e) => setAuthorId(e.target.value)}
                >
                  <SelectValue placeholder="Select Author" />
                  {authorsData?.data?.map((author) => (
                    <SelectItem key={author.id} value={author.id}>
                      {author.name}
                    </SelectItem>
                  ))}
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="tags" className="text-xs font-semibold">
                  Tags (comma separated)
                </Label>
                <Input
                  id="tags"
                  placeholder="React, Nextjs, AI"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-semibold">
                  Reading Time (minutes)
                </Label>
                <Input
                  type="number"
                  value={readingTime}
                  onChange={(e) =>
                    setReadingTime(parseInt(e.target.value, 10) || 1)
                  }
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs"
                />
              </div>
            </CardContent>
          </Card>

          {/* Media Images Card */}
          <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] rounded-xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <ImageUpload
                folder="blogs"
                label="Cover Image"
                hint="Wide photo recommended (1200x630) — JPG, PNG, WebP up to 5MB"
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
            </CardContent>
          </Card>

          {/* SEO Metadata Card */}
          <Card className="border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#151f32] rounded-xl shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1">
                <Label htmlFor="metaTitle" className="text-xs font-semibold">
                  SEO Title
                </Label>
                <Input
                  id="metaTitle"
                  placeholder="Meta title for Google search..."
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="metaDesc" className="text-xs font-semibold">
                  SEO Description
                </Label>
                <Textarea
                  id="metaDesc"
                  rows={3}
                  placeholder="Brief summary for Google search snippet..."
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-850 text-xs"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
