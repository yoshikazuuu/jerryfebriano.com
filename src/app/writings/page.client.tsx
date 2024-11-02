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
      className="min-h-svh flex flex-col justify-center items-center p-5"
    >
      <motion.div
        variants={itemVariants}
        className="grid max-w-xl w-full grid-cols-1 gap-10"
      >
        <div className="flex flex-col text-sm gap-4 font-mono font-light text-muted-foreground">
          <motion.div
            variants={itemVariants}
            className="flex gap-2 items-center"
          >
            <p className="font-sans text-foreground cursor-pointer text-4xl font-extrabold tracking-tighter">
              Writings
            </p>
          </motion.div>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
