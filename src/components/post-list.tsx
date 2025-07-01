"use client";

import { motion } from "framer-motion";
import { FileText, Clock } from "lucide-react";
import Link from "next/link";
import { FolderData } from "../types/blog";
import { containerVariants } from "@/lib/transitions";

interface PostListProps {
  posts: FolderData[];
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function PostList({ posts }: PostListProps) {
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
