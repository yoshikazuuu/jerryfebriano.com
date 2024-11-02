"use client";
import { motion } from "framer-motion";
import { FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import { FolderData } from "../types/blog";
import { itemVariants } from "@/lib/transitions";

interface PostListProps {
  posts: FolderData[];
}

export function PostList({ posts }: PostListProps) {
  return (
    <motion.ul variants={itemVariants} className="space-y-6">
      {posts.map(({ folderName, metadata }) => (
        <motion.li key={folderName} variants={itemVariants}>
          <Link
            href={`/writings/${folderName}`}
            className="group block hover:bg-muted p-4 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                {metadata.title}
              </h2>
              <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors duration-200" />
            </div>
            <p className="text-muted-foreground mt-2 font-mono text-sm">
              {metadata.description}
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
              <FileText size={14} />
              <span>{metadata.readingTime || "5 min read"}</span>
            </div>
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );
}
