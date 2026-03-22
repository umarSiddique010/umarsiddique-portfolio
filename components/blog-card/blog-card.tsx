'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ExternalLink, Target } from 'lucide-react';
import { BlogData } from '@/constants/blogs-data';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function BlogCard({
  blog,
  loading,
  priority,
  index = 0,
}: {
  blog: BlogData;
  loading: 'eager' | 'lazy' | undefined;
  priority: boolean;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="overflow-hidden border-foreground/10 bg-foreground/5 transition-all duration-300 ease-in-out rounded-2xl flex flex-col h-full group hover:border-foreground/20 hover:bg-foreground/10 group-hover:scale-105 shadow-xl">
        <div className="relative w-full aspect-1000/420 overflow-hidden">
          <Image
            src={blog.bannerImage}
            alt={`${blog.title} Banner`}
            fill
            loading={loading}
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-center group-hover:scale-105 transition-all duration-300 ease-in-out"
          />
        </div>

        {/* --- CARD HEADER  --- */}
        <CardHeader className="pb-4 pt-6">
          {blog.series && (
            <p className="text-xs text-foreground/70 font-medium border-l-2 border-foreground/20 my-3 pl-1 h-fit">
              {blog.series.name} • Part {blog.series.part}
            </p>
          )}
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-2xl font-bold tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 hover:underline transition-colors duration-300">
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={blog.devToUrl}
              >
                {blog.title}
              </Link>
            </CardTitle>
            <div className="flex shrink-0">
              <Button
                variant="default"
                size="icon"
                className="h-8 w-8 rounded-full shadow-md"
                asChild
              >
                <Link
                  href={blog.devToUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Read ${blog.title} on Dev.to`}
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <p className="text-foreground/70 text-sm mt-2 leading-relaxed">
            {blog.description}
          </p>
        </CardHeader>

        {/* --- CONTENT SECTION --- */}
        <CardContent className="flex flex-col grow gap-5">
          <div className="flex gap-3 p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 mt-2">
            <Target className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
            <p className="text-sm text-cyan-900 dark:text-cyan-200 leading-relaxed">
              <span className="font-semibold">Purpose:</span> {blog.purpose}
            </p>
          </div>

          {/* --- TECH STACK / TOPICS BADGES --- */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {blog.topics.map((topic, idx) => (
              <Badge
                key={`${topic}-${idx}`}
                variant="secondary"
                className="bg-background border border-foreground/10 hover:bg-foreground/5 text-xs font-medium px-2.5 py-0.5 rounded-md transition-colors"
              >
                {topic}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
