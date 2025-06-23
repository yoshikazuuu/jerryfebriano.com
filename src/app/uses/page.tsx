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
      className="min-h-svh flex flex-col justify-center gap-4 items-center p-5"
    >
      <motion.div variants={itemVariants} className="flex gap-2 items-center">
        <h1 className="font-serif text-foreground cursor-pointer text-4xl md:text-5xl font-bold tracking-tight">
          Uses
        </h1>
      </motion.div>
      <motion.div variants={itemVariants} className="max-w-xl aspect-[15.4/10]">
        <SmoothBlurImage
          src={desktop}
          alt="my setup"
          width={616}
          height={400}
          className="relative rounded-md drop-shadow-lg"
        />
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="grid w-full grid-cols-1 gap-10"
      >
        <div className="flex flex-col items-center text-left text-sm gap-4 font-sans font-light text-muted-foreground">
          <p className="mb-6 text-center font-medium">Some of my stuffs.</p>
          <ul className="space-y-6 leading-relaxed">
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
      </motion.div>
    </motion.div>
  );
}
