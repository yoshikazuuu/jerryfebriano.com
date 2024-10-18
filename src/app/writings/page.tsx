"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/transitions";

// Mock data for blog posts
const blogPosts = [];

export default function WritingsPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-svh flex flex-col justify-center items-center p-5"
    >
      <motion.div
        variants={itemVariants}
        className="grid max-w-sm w-full grid-cols-1 gap-10"
      >
        <div className="flex flex-col text-sm gap-4 font-mono font-light text-muted-foreground">
          <motion.h1
            variants={itemVariants}
            className="text-2xl font-bold text-foreground mb-4"
          >
            Writings
          </motion.h1>
          {blogPosts.length === 0 ? (
            <p className="text-muted-foreground">
              No posts available at the moment.
            </p>
          ) : (
            blogPosts.map((post) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Link
                  href={`/writings/${post.id}`}
                  className="flex items-start gap-4 group"
                >
                  <div className="flex flex-col">
                    <h2 className="text-foreground group-hover:underline transition-colors duration-200">
                      {post.title}
                    </h2>
                    <p className="text-xs text-muted-foreground">{post.date}</p>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
