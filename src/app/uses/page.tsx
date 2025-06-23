"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/transitions";
import desktop from "../../../public/desktop.png";
import SmoothBlurImage from "@/components/SmoothBlurImage";

export default function UsesPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-svh flex flex-col justify-center items-center p-5 pb-16 md:pb-20"
    >
      <motion.div
        variants={itemVariants}
        className="grid max-w-sm grid-cols-1 gap-10"
      >
        <div className="flex flex-col text-sm gap-4 font-light text-muted-foreground">
          <motion.div variants={itemVariants} className="flex gap-2 items-center">
            <h1 className="font-serif text-foreground cursor-pointer text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Uses
            </h1>
          </motion.div>
          <motion.div variants={itemVariants} className="aspect-[15.4/10] mb-4">
            <SmoothBlurImage
              src={desktop}
              alt="my setup"
              width={616}
              height={400}
              className="relative rounded-md drop-shadow-lg w-full"
            />
          </motion.div>
          <div className="font-sans leading-relaxed space-y-6">
            <p className="font-medium">Some of my stuffs.</p>
            <ul className="space-y-6">
              <li>
                <span className="bg-secondary px-3 py-1.5 rounded-md font-semibold text-foreground">
                  Workstation:
                </span>{" "}
                <span className="font-medium">Macbook Pro 14</span>
                <ul className="ml-6 mt-3 space-y-2 text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">Processor:</span> M1 Pro
                  </li>
                  <li>
                    <span className="font-medium text-foreground">RAM:</span> 16GB
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Storage:</span> 512GB
                  </li>
                </ul>
              </li>
              <li>
                <span className="bg-secondary px-3 py-1.5 rounded-md font-semibold text-foreground">
                  Operating System:
                </span>{" "}
                <span className="font-medium">macOS Sonoma</span>
              </li>
              <li>
                <span className="bg-secondary px-3 py-1.5 rounded-md font-semibold text-foreground">
                  Development Tools:
                </span>
                <ul className="ml-6 mt-3 space-y-2 text-muted-foreground">
                  <li>
                    <span className="font-medium text-foreground">Editor:</span> Visual Studio Code
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Terminal:</span> kitty (
                    <Link
                      href="https://www.reddit.com/r/KittyTerminal/comments/13ephdh/comment/jjsha90/"
                      target="_blank"
                      className="text-blue-400 hover:underline transition-colors font-medium"
                    >
                      set to xterm-256color
                    </Link>
                    )
                  </li>
                  <li>
                    <span className="font-medium text-foreground">Shell:</span> zsh with omz
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
