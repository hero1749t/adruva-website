import React from "react";
import { TiptapNode } from "@/lib/blog-data";

interface BlogContentRendererProps {
  node: TiptapNode;
}

const renderTextNode = (node: TiptapNode) => {
  let element: React.ReactNode = node.text || "";
  if (node.marks) {
    for (const mark of node.marks) {
      if (mark.type === "bold") {
        element = (
          <strong className="font-bold text-secondary dark:text-white">
            {element}
          </strong>
        );
      } else if (mark.type === "italic") {
        element = <em className="italic">{element}</em>;
      } else if (mark.type === "code") {
        element = (
          <code className="bg-secondary/10 dark:bg-white/10 px-1.5 py-0.5 rounded text-primary text-sm font-mono">
            {element}
          </code>
        );
      } else if (mark.type === "link") {
        const href = (mark.attrs?.href as string) || "#";
        element = (
          <a
            href={href}
            className="text-primary hover:text-orange-hover underline font-medium transition-colors duration-200"
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {element}
          </a>
        );
      } else if (mark.type === "underline") {
        element = <span className="underline">{element}</span>;
      } else if (mark.type === "highlight") {
        element = (
          <mark className="bg-yellow-200 dark:bg-yellow-900/60 rounded px-1 text-slate-900 dark:text-white">
            {element}
          </mark>
        );
      }
    }
  }
  return element;
};

const renderNode = (node: TiptapNode, index: number): React.ReactNode => {
  if (node.type === "text") {
    return <React.Fragment key={index}>{renderTextNode(node)}</React.Fragment>;
  }

  const children = node.content
    ? node.content.map((child, idx) => renderNode(child, idx))
    : null;

  switch (node.type) {
    case "doc":
      return <div className="space-y-4">{children}</div>;
    case "paragraph":
      return (
        <p
          key={index}
          className="text-lg leading-relaxed text-text-secondary dark:text-gray-300 font-inter mb-4"
        >
          {children}
        </p>
      );
    case "heading": {
      const level = (node.attrs?.level as number) || 1;
      if (level === 2) {
        return (
          <h2
            key={index}
            className="text-2xl md:text-3xl font-bold font-poppins text-secondary dark:text-white mt-10 mb-4 first:mt-0"
          >
            {children}
          </h2>
        );
      }
      if (level === 3) {
        return (
          <h3
            key={index}
            className="text-xl md:text-2xl font-semibold font-poppins text-secondary dark:text-white mt-8 mb-3"
          >
            {children}
          </h3>
        );
      }
      return (
        <h4
          key={index}
          className="text-lg md:text-xl font-semibold font-poppins text-secondary dark:text-white mt-6 mb-2"
        >
          {children}
        </h4>
      );
    }
    case "bulletList":
      return (
        <ul
          key={index}
          className="list-disc pl-6 space-y-2 mb-6 text-text-secondary dark:text-gray-300 font-inter text-lg"
        >
          {children}
        </ul>
      );
    case "orderedList":
      return (
        <ol
          key={index}
          className="list-decimal pl-6 space-y-2 mb-6 text-text-secondary dark:text-gray-300 font-inter text-lg"
        >
          {children}
        </ol>
      );
    case "listItem":
      return (
        <li key={index} className="leading-relaxed">
          {children}
        </li>
      );
    case "blockquote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-primary bg-secondary/5 dark:bg-secondary/15 px-6 py-4 my-6 italic text-text-secondary dark:text-gray-300 rounded-r font-inter text-lg whitespace-pre-line"
        >
          {children}
        </blockquote>
      );
    case "alertBox": {
      const type = (node.attrs?.type as string) || "note";
      const typeColors: Record<string, string> = {
        note: "border-blue-500 bg-blue-500/5 dark:bg-blue-500/10 text-blue-900 dark:text-blue-100",
        tip: "border-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
        warning:
          "border-amber-500 bg-amber-500/5 dark:bg-amber-500/10 text-amber-900 dark:text-amber-100",
        caution:
          "border-red-500 bg-red-500/5 dark:bg-red-500/10 text-red-900 dark:text-red-100",
      };
      const alertClass = typeColors[type] || typeColors.note;
      return (
        <div
          key={index}
          className={`p-4 border-l-4 rounded-r-lg my-5 font-inter text-base ${alertClass}`}
        >
          {children}
        </div>
      );
    }
    case "iframe": {
      const src = (node.attrs?.src as string) || "";
      const height = (node.attrs?.height as string) || "450px";
      return (
        <div
          key={index}
          className="w-full my-6 overflow-hidden rounded-xl shadow-md clear-both"
        >
          <iframe
            src={src}
            width="100%"
            height={height}
            frameBorder="0"
            allowFullScreen
            className="w-full"
          />
        </div>
      );
    }
    case "image": {
      const src = (node.attrs?.src as string) || "";
      const alt = (node.attrs?.alt as string) || "";
      const align = (node.attrs?.align as string) || "center";
      const width = (node.attrs?.width as string) || "100%";
      const caption = (node.attrs?.caption as string) || "";
      const href = (node.attrs?.href as string) || "";

      const isFull = width === "100%" || !width;
      let alignClass = "mx-auto block";
      if (align === "left") alignClass = "float-left mr-6 mb-4";
      if (align === "right") alignClass = "float-right ml-6 mb-4";

      const imgElement = (
        <figure
          key={index}
          className={`my-6 max-w-full clear-both ${alignClass}`}
          style={{ width }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            className="rounded-xl border border-slate-200 dark:border-slate-800 w-full object-cover shadow-sm"
          />
          {caption && (
            <figcaption className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2 font-inter">
              {caption}
            </figcaption>
          )}
        </figure>
      );

      if (href) {
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block max-w-full"
          >
            {imgElement}
          </a>
        );
      }
      return imgElement;
    }
    case "table":
      return (
        <div
          key={index}
          className="w-full overflow-x-auto my-6 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm clear-both"
        >
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-sm">
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-[#151f32]">
              {children}
            </tbody>
          </table>
        </div>
      );
    case "tableRow":
      return <tr key={index}>{children}</tr>;
    case "tableHeader":
      return (
        <th
          key={index}
          className="px-4 py-3 bg-slate-50 dark:bg-slate-900/30 text-left text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider border border-slate-200 dark:border-slate-800"
        >
          {children}
        </th>
      );
    case "tableCell":
      return (
        <td
          key={index}
          className="px-4 py-3 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800"
        >
          {children}
        </td>
      );
    case "hardBreak":
      return <br key={index} />;
    default:
      return <React.Fragment key={index}>{children}</React.Fragment>;
  }
};

export const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({
  node,
}) => {
  return (
    <article className="prose prose-lg dark:prose-invert max-w-none">
      {renderNode(node, 0)}
    </article>
  );
};
