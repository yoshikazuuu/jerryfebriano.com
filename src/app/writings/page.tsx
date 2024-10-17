"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";

// Mock data for blog posts
const blogPosts = [
  { id: 1, title: "Getting Started with React", date: "2023-05-15" },
  { id: 2, title: "Advanced Next.js Techniques", date: "2023-06-22" },
  { id: 3, title: "The Art of Self-Hosting", date: "2023-07-30" },
  { id: 4, title: "Mastering Tailwind CSS", date: "2023-08-14" },
  { id: 5, title: "Building Accessible Web Applications", date: "2023-09-05" },
];

export default function WritingsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  if (!mounted) {
    return null;
  }

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
          {blogPosts.map((post) => (
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
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
