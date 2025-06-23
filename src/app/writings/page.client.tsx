"use client";

import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/transitions";

export default function WritingsPageClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-svh flex items-center flex-col justify-center p-5"
    >
      <motion.div
        variants={itemVariants}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col text-sm gap-4 font-light text-muted-foreground">
          <motion.div
            variants={itemVariants}
            className="flex gap-2 items-center"
          >
            <h1 className="font-serif text-foreground cursor-pointer text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Writings
            </h1>
          </motion.div>
          <div className="font-sans leading-relaxed space-y-8">
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
