"use client";

import { motion } from "framer-motion";
import { FileText, Clock } from "lucide-react";
import Link from "next/link";
import { FolderData } from "../types/blog";
import { createContainerVariants, createItemVariants } from "@/lib/transitions";
import { useReducedMotion } from "@/lib/motion-utils";

interface PostListProps {
  posts: FolderData[];
}

// Removed local itemVariants - now using dynamic ones from transitions

export function PostList({ posts }: PostListProps) {
  const reducedMotion = useReducedMotion();
  const containerVariants = createContainerVariants(reducedMotion);
  const itemVariants = createItemVariants(reducedMotion);

  return (
    <motion.ul
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-8"
    >
      {posts.map(({ folderName, metadata }) => (
        <motion.li key={folderName} variants={itemVariants}>
          <Link href={`/posts/${folderName}`} className="block group">
            <article className="relative">
              <h2 className="font-serif text-xl md:text-2xl w-fit font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-3 leading-tight relative">
                {metadata.title}
                <span className="block absolute left-0 -bottom-1 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </h2>
              <div className="flex items-center gap-4 text-sm text-muted-foreground font-sans">
                <div className="flex items-center gap-1.5">
                  <FileText size={14} />
                  <span className="font-medium">{metadata.readingTime || "5 min read"}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock size={14} />
                  <span className="font-medium">{new Date(metadata.date).toLocaleDateString()}</span>
                </div>
              </div>
            </article>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}
