'use client';

import { useState } from 'react';
import BlogCard from '@/components/blog-card/blog-card';
import { blogs } from '@/constants/blogs-data';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { blogCTA } from '@/constants/cta-data';
import CTAsection from '@/components/cta-section/cta-section';

const categories = ['All', 'HTML', 'CSS', 'JavaScript'];

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('newest');

  const filteredBlogs =
    activeCategory === 'All'
      ? blogs
      : blogs.filter(
          (blog) =>
            blog.category.toUpperCase() === activeCategory.toUpperCase(),
        );

  const sortedBlogs = [...filteredBlogs].sort((a, b) =>
    sortBy === 'newest' ? b.id - a.id : a.id - b.id,
  );

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
      <section className="flex flex-col gap-5 md:flex-row md:justify-between items-center mb-12">
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={clsx(
                'px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 border',
                activeCategory === category
                  ? 'bg-foreground text-background border-foreground shadow-lg'
                  : 'bg-foreground/5 text-muted-foreground border-foreground/10 hover:border-foreground/30 hover:bg-foreground/10',
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <label
          htmlFor="sort-by"
          className="flex items-center gap-2 ml-auto sm:ml-0"
        >
          Sort by:
          <select
            name="sort-by"
            id="sort-by"
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 border"
          >
            <option disabled value="">
              Select
            </option>

            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </label>
      </section>

      {/* --- BLOGS GRID --- */}
      <motion.section layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sortedBlogs.length > 0 ? (
          sortedBlogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} index={index} />
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
