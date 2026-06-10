import React from 'react';
import { TiptapNode } from '@/lib/blog-data';

interface BlogContentRendererProps {
  node: TiptapNode;
}

const renderTextNode = (node: TiptapNode) => {
  let element: React.ReactNode = node.text || '';
  if (node.marks) {
    for (const mark of node.marks) {
      if (mark.type === 'bold') {
        element = <strong className="font-bold text-secondary dark:text-white">{element}</strong>;
      } else if (mark.type === 'italic') {
        element = <em className="italic">{element}</em>;
      } else if (mark.type === 'code') {
        element = (
          <code className="bg-secondary/10 dark:bg-white/10 px-1.5 py-0.5 rounded text-primary text-sm font-mono">
            {element}
          </code>
        );
      } else if (mark.type === 'link') {
        const href = (mark.attrs?.href as string) || '#';
        element = (
          <a
            href={href}
            className="text-primary hover:text-orange-hover underline font-medium transition-colors duration-200"
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          >
            {element}
          </a>
        );
      }
    }
  }
  return element;
};

const renderNode = (node: TiptapNode, index: number): React.ReactNode => {
  if (node.type === 'text') {
    return <React.Fragment key={index}>{renderTextNode(node)}</React.Fragment>;
  }

  const children = node.content ? node.content.map((child, idx) => renderNode(child, idx)) : null;

  switch (node.type) {
    case 'doc':
      return <div className="space-y-4">{children}</div>;
    case 'paragraph':
      return <p key={index} className="text-lg leading-relaxed text-text-secondary dark:text-gray-300 font-inter mb-4">{children}</p>;
    case 'heading': {
      const level = (node.attrs?.level as number) || 1;
      if (level === 2) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-bold font-poppins text-secondary dark:text-white mt-10 mb-4 first:mt-0">
            {children}
          </h2>
        );
      }
      if (level === 3) {
        return (
          <h3 key={index} className="text-xl md:text-2xl font-semibold font-poppins text-secondary dark:text-white mt-8 mb-3">
            {children}
          </h3>
        );
      }
      return (
        <h4 key={index} className="text-lg md:text-xl font-semibold font-poppins text-secondary dark:text-white mt-6 mb-2">
          {children}
        </h4>
      );
    }
    case 'bulletList':
      return (
        <ul key={index} className="list-disc pl-6 space-y-2 mb-6 text-text-secondary dark:text-gray-300 font-inter text-lg">
          {children}
        </ul>
      );
    case 'orderedList':
      return (
        <ol key={index} className="list-decimal pl-6 space-y-2 mb-6 text-text-secondary dark:text-gray-300 font-inter text-lg">
          {children}
        </ol>
      );
    case 'listItem':
      return (
        <li key={index} className="leading-relaxed">
          {children}
        </li>
      );
    case 'blockquote':
      return (
        <blockquote key={index} className="border-l-4 border-primary bg-secondary/5 dark:bg-secondary/15 px-6 py-4 my-6 italic text-text-secondary dark:text-gray-300 rounded-r font-inter text-lg whitespace-pre-line">
          {children}
        </blockquote>
      );
    case 'hardBreak':
      return <br key={index} />;
    default:
      return <React.Fragment key={index}>{children}</React.Fragment>;
  }
};

export const BlogContentRenderer: React.FC<BlogContentRendererProps> = ({ node }) => {
  return <article className="prose prose-lg dark:prose-invert max-w-none">{renderNode(node, 0)}</article>;
};
