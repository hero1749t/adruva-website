"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Search, Calendar, Clock, User, ArrowRight } from "lucide-react";
import { blogPosts, BlogPost } from "@/lib/blog-data";

const CATEGORIES: Array<BlogPost["category"] | "All"> = [
  "All",
  "AI & Tech",
  "Web Dev",
  "Marketing",
  "Design",
  "Company News",
];

interface BlogPageClientProps {
  initialPosts?: BlogPost[];
}

export function BlogPageClient({ initialPosts }: BlogPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    BlogPost["category"] | "All"
  >("All");

  const posts = initialPosts || blogPosts;

  // Filtered posts based on search query and category
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full">
      {/* Breadcrumb section */}
      <div className="bg-muted/30 py-4 border-b border-border transition-colors duration-300">
        <Container>
          <div className="flex items-center space-x-2 text-sm text-text-muted">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-text-primary dark:text-white font-medium">
              Blog
            </span>
          </div>
        </Container>
      </div>

      {/* Hero Section */}
      <Section className="pb-8">
        <Container>
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <Badge
              variant="outline"
              className="px-3 py-1 text-primary border-primary/20 bg-primary/5 uppercase tracking-wider text-xs font-semibold"
            >
              Insights
            </Badge>
            <h1 className="text-4xl md:text-5xl font-extrabold font-poppins text-secondary dark:text-white tracking-tight">
              Insights & Resources
            </h1>
            <p className="text-lg md:text-xl text-text-secondary dark:text-gray-300 font-space leading-relaxed">
              Articles on AI, web development, digital marketing, and business
              growth.
            </p>
          </div>
        </Container>
      </Section>

      {/* Filter and Search Section */}
      <section className="w-full pb-8">
        <Container>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/20 p-4 md:p-6 rounded-xl border border-border/60 shadow-sm backdrop-blur-sm">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 items-center">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-white shadow-md shadow-primary/20 scale-105"
                      : "bg-background hover:bg-muted text-text-secondary border border-border/50"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full bg-background border-border/80 focus-visible:ring-primary"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Blog Listing Grid */}
      <Section className="pt-0 pb-20">
        <Container>
          <AnimatePresence mode="popLayout">
            {filteredPosts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredPosts.map((post) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={post.slug}
                    className="flex"
                  >
                    <Card className="flex flex-col w-full group overflow-hidden border-border/80 bg-card hover:border-primary/40 dark:hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 rounded-xl">
                      {/* Card Cover Image or Gradient */}
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block relative aspect-[16/9] w-full overflow-hidden"
                      >
                        {post.coverGradient.startsWith("http") ||
                        post.coverGradient.startsWith("/") ? (
                          <Image
                            src={post.coverGradient}
                            alt={post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${post.coverGradient} transform group-hover:scale-105 transition-transform duration-500`}
                          />
                        )}
                        <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-primary text-white border-none py-1 px-3 hover:bg-primary">
                            {post.category}
                          </Badge>
                        </div>
                      </Link>

                      <CardHeader className="p-6 pb-2 space-y-3">
                        <div className="flex items-center space-x-4 text-xs text-text-muted">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-primary/80" />
                            {post.publishedDate}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-primary/80" />
                            {post.readingTime}
                          </span>
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="block group-hover:text-primary transition-colors duration-200"
                        >
                          <h3 className="text-xl font-bold font-poppins text-secondary dark:text-white line-clamp-2 leading-tight">
                            {post.title}
                          </h3>
                        </Link>
                      </CardHeader>

                      <CardContent className="p-6 pt-0 flex-grow">
                        <p className="text-sm text-text-secondary dark:text-gray-300 line-clamp-3 leading-relaxed font-inter">
                          {post.summary}
                        </p>
                      </CardContent>

                      <CardFooter className="p-6 pt-0 border-t border-border/40 flex flex-col items-start gap-4 bg-muted/5">
                        {/* Author row */}
                        <div className="flex items-center space-x-3 w-full">
                          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary">
                            {post.author.avatarInitials}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-text-primary dark:text-white flex items-center gap-1">
                              <User className="w-3 h-3 text-text-muted" />
                              {post.author.name}
                            </span>
                            <span className="text-[10px] text-text-muted leading-none mt-0.5">
                              {post.author.role}
                            </span>
                          </div>
                        </div>

                        {/* Read link */}
                        <Link
                          href={`/blog/${post.slug}`}
                          className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-orange-hover group/link mt-1"
                        >
                          Read Article
                          <ArrowRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16 bg-muted/10 rounded-2xl border border-dashed border-border"
              >
                <Search className="w-12 h-12 text-text-muted mx-auto mb-4" />
                <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">
                  No articles found
                </h3>
                <p className="text-text-secondary dark:text-gray-400">
                  We couldn&apos;t find any articles matching &quot;
                  {searchQuery}&quot; in category &quot;{selectedCategory}
                  &quot;.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-orange-hover transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </Section>
    </div>
  );
}
