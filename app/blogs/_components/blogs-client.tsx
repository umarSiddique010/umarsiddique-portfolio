'use client';

import { useState } from 'react';
import BlogCard from '@/components/blog-card/blog-card';
import { blogsData } from '@/constants/blogs-data';
import { motion } from 'motion/react';
import { blogCTA } from '@/constants/cta-data';
import CTAsection from '@/components/cta-section/cta-section';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

const categories = [
  'All',
  ...new Set(blogsData.map((blog) => blog.category).reverse()),
];

export default function BlogsClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [blogSortBy, setBlogSortBy] = useState('newest');

  const filteredBlogs =
    activeCategory === 'All'
      ? blogsData
      : blogsData.filter(
          (blog) =>
            blog.category.toUpperCase() === activeCategory.toUpperCase(),
        );

  const sortedBlogs = [...filteredBlogs].sort((a, b) => {
    const aId = Number(a.id);
    const bId = Number(b.id);
    return blogSortBy === 'newest' ? bId - aId : aId - bId;
  });

  return (
    <section className="w-full max-w-6xl mx-auto px-6 pt-20 -pb-20 md:pt-32 md:-pb-20">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Engineering Essays.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Long-form analysis of web architecture, language design, and scalable
          production systems — grounded in practical engineering decisions and
          real-world trade-offs.
        </p>
      </header>

      {/* --- CATEGORY AND SORT BY FILTER BUTTONS --- */}
      <section className="flex flex-col items-end justify-center gap-3 md:flex-row md:justify-between md:items-center mb-12">
        <h3 className="font-bold mr-13 md:mr-0">Filter Posts</h3>
        <div className="flex flex-col gap-6 md:flex-row md:justify-end items-end md:items-center">
          {/* Category Filter */}
          <div className="flex flex-col items-start justify-center md:flex-row md:items-center gap-3">
            <Label
              htmlFor="project-category"
              className="whitespace-nowrap font-semibold"
            >
              Category:
            </Label>
            <Select value={activeCategory} onValueChange={setActiveCategory}>
              <SelectTrigger
                className="w-35 sm:w-45 border border-foreground/10 bg-accent/40 hover:bg-accent/70 hover:border-foreground/20 transition-all duration-300 ease-in-out"
                id="project-category"
              >
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category</SelectLabel>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* Sort By Filter */}
          <div className="flex flex-col items-start justify-center md:flex-row md:items-center gap-3">
            <Label
              htmlFor="project-sort-by"
              className="whitespace-nowrap font-semibold"
            >
              Sort by:
            </Label>
            <Select value={blogSortBy} onValueChange={setBlogSortBy}>
              <SelectTrigger
                className="w-35 sm:w-45 border border-foreground/10 bg-accent/40 hover:bg-accent/70 hover:border-foreground/20 transition-all duration-300 ease-in-out"
                id="project-sort-by"
              >
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort by</SelectLabel>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="oldest">Oldest</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* --- BLOGS GRID --- */}
      <motion.section layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sortedBlogs.length > 0 ? (
          sortedBlogs.map((blog, index) => (
            <BlogCard
              key={`${blog.id}-${activeCategory}-${blogSortBy}`}
              loading={index < 2 ? 'eager' : 'lazy'}
              blog={blog}
              index={index}
            />
          ))
        ) : (
          <div className="col-span-full py-20 text-center border border-dashed border-foreground/10 bg-accent/5 rounded-2xl">
            <p className="text-muted-foreground italic">
              No engineering logs found for this category yet.
            </p>
          </div>
        )}
      </motion.section>

      <CTAsection {...blogCTA} />
    </section>
  );
}
