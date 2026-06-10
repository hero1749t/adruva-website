'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { BlogPost, blogPosts } from '@/lib/blog-data';
import { BlogContentRenderer } from '@/components/blog/BlogContentRenderer';
import { Calendar, Clock, ArrowLeft, Share2, Copy, Check, User } from 'lucide-react';

interface BlogPostClientProps {
  post: BlogPost;
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const [copied, setCopied] = useState(false);

  // Get up to 3 related posts (same category first, excluding current post, filled with others if needed)
  const relatedPosts = React.useMemo(() => {
    const sameCategory = blogPosts.filter((p) => p.category === post.category && p.slug !== post.slug);
    const otherCategories = blogPosts.filter((p) => p.category !== post.category && p.slug !== post.slug);
    return [...sameCategory, ...otherCategories].slice(0, 3);
  }, [post]);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getShareUrls = () => {
    if (typeof window === 'undefined') return { linkedin: '', twitter: '', whatsapp: '' };
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(post.title);
    return {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      whatsapp: `https://api.whatsapp.com/send?text=${title}%20${url}`,
    };
  };

  const shareUrls = getShareUrls();

  return (
    <div className="w-full">
      {/* Breadcrumb / Back Navigation */}
      <div className="bg-muted/30 py-4 border-b border-border transition-colors duration-300">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-text-muted">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-primary transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-text-primary dark:text-white font-medium max-w-[200px] md:max-w-[400px] truncate">
                {post.title}
              </span>
            </div>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-orange-hover transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </Container>
      </div>

      {/* Main Content Area */}
      <Section className="py-12 md:py-16">
        <Container>
          <div className="max-w-[760px] mx-auto">
            {/* Metadata Header */}
            <div className="space-y-6 text-center md:text-left">
              <Badge className="bg-primary text-white border-none py-1 px-3 hover:bg-primary font-semibold text-xs tracking-wider uppercase">
                {post.category}
              </Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-poppins text-secondary dark:text-white leading-tight tracking-tight">
                {post.title}
              </h1>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-y border-border/60">
                {/* Author Card */}
                <div className="flex items-center justify-center md:justify-start space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-sm font-bold text-primary">
                    {post.author.avatarInitials}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-text-primary dark:text-white flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-text-muted" />
                      {post.author.name}
                    </p>
                    <p className="text-xs text-text-muted">{post.author.role}</p>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="flex items-center justify-center space-x-4 text-sm text-text-muted font-inter">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary/80" />
                    {post.publishedDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary/80" />
                    {post.readingTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Cover Gradient Graphic */}
            <div className="my-8 relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-lg border border-border/50">
              <div className={`absolute inset-0 bg-gradient-to-br ${post.coverGradient}`} />
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Rich Text Body */}
            <div className="mt-8 font-inter">
              <BlogContentRenderer node={post.content} />
            </div>

            {/* Share & Actions Row */}
            <div className="mt-12 pt-6 border-t border-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-secondary dark:text-white">
                <Share2 className="w-4 h-4 text-primary" />
                Share this article:
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {/* LinkedIn */}
                <a
                  href={shareUrls.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] border border-[#0077b5]/20 transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
                {/* Twitter / X */}
                <a
                  href={shareUrls.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-secondary dark:text-white border border-border transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  Twitter
                </a>
                {/* WhatsApp */}
                <a
                  href={shareUrls.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#25d366]/10 hover:bg-[#25d366]/20 text-[#25d366] border border-[#25d366]/20 transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.004 0C5.378 0 .004 5.373.004 12c0 2.112.551 4.164 1.6 5.976L.004 24l6.19-1.624c1.769.965 3.765 1.472 5.81 1.472 6.626 0 12-5.373 12-12s-5.374-12-12-12zm6.606 17.075c-.274.767-1.357 1.424-2.196 1.516-.576.064-1.328.096-2.129-.16-3.238-1.033-5.323-4.329-5.485-4.545-.162-.216-1.309-1.745-1.309-3.328 0-1.583.829-2.361 1.125-2.679.296-.318.647-.398.864-.398.216 0 .432.008.62.016.196.008.459-.072.716.551.274.663.935 2.279 1.015 2.44.08.16.134.348.026.559-.108.211-.162.344-.324.532-.162.188-.344.42-.491.564-.162.156-.332.328-.14.659.192.331.855 1.408 1.832 2.279.864.771 1.593 1.258 1.916 1.42.324.162.513.136.705-.084.192-.22.829-.964 1.05-1.296.221-.332.441-.276.745-.164.304.112 1.936.912 2.26 1.076.324.164.54.244.62.38.08.136.08.788-.194 1.556z" />
                  </svg>
                  WhatsApp
                </a>
                {/* Copy Link */}
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 transition-colors duration-200"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-500 animate-pulse" />
                      <span className="text-green-600 dark:text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      Copy Link
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <Section className="bg-muted/10 border-t border-border/60 py-16">
          <Container>
            <div className="max-w-[760px] mx-auto md:max-w-none">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                  <Badge variant="outline" className="px-3 py-1 text-primary border-primary/20 bg-primary/5 uppercase tracking-wider text-[10px] font-bold">
                    RECOMMENDED
                  </Badge>
                  <h2 className="text-2xl md:text-3xl font-bold font-poppins text-secondary dark:text-white mt-2">
                    Related Articles
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-primary hover:text-orange-hover flex items-center gap-1 group transition-colors duration-200"
                >
                  View all insights
                  <ArrowLeft className="w-4 h-4 rotate-180 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.slug}
                    className="flex flex-col group overflow-hidden border-border/80 bg-card hover:border-primary/40 dark:hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 rounded-xl"
                  >
                    {/* Related Cover */}
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="block relative aspect-[16/9] w-full overflow-hidden"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${relatedPost.coverGradient} transform group-hover:scale-105 transition-transform duration-500`} />
                      <div className="absolute inset-0 bg-black/10" />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-primary text-white border-none py-0.5 px-2 text-[10px] hover:bg-primary font-medium">
                          {relatedPost.category}
                        </Badge>
                      </div>
                    </Link>

                    <CardHeader className="p-5 pb-2 space-y-2">
                      <div className="flex items-center space-x-3 text-[10px] text-text-muted font-inter">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-primary/70" />
                          {relatedPost.publishedDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-primary/70" />
                          {relatedPost.readingTime}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="block group-hover:text-primary transition-colors duration-200"
                      >
                        <h3 className="text-base font-bold font-poppins text-secondary dark:text-white line-clamp-2 leading-snug">
                          {relatedPost.title}
                        </h3>
                      </Link>
                    </CardHeader>

                    <CardContent className="p-5 pt-0 flex-grow">
                      <p className="text-xs text-text-muted dark:text-gray-300 line-clamp-2 leading-relaxed font-inter">
                        {relatedPost.summary}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}
