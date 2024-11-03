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
        <p className="font-sans text-foreground cursor-pointer text-4xl font-extrabold tracking-tighter">
          Uses
        </p>
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
        className="grid w-full  grid-cols-1 gap-10"
      >
        <div className="flex flex-col items-center text-left text-sm gap-4 font-mono font-light text-muted-foreground">
          <p className="mb-6">Some of my stuffs.</p>
          <ul className="space-y-4">
            <li>
              <span className="bg-secondary px-2 py-1 rounded font-semibold">
                Workstation:
              </span>{" "}
              Macbook Pro 14
              <ul className="ml-6 mt-2 space-y-2">
                <li>
                  <span className="font-semibold">Processor:</span> M1 Pro
                </li>
                <li>
                  <span className="font-semibold">RAM:</span> 16GB
                </li>
                <li>
                  <span className="font-semibold">Storage:</span> 512GB
                </li>
              </ul>
            </li>
            <li>
              <span className="bg-secondary px-2 py-1 rounded font-semibold">
                Operating System:
              </span>{" "}
              macOS Sonoma
            </li>
            <li>
              <span className="bg-secondary px-2 py-1 rounded font-semibold">
                Development Tools:
              </span>
              <ul className="ml-6 mt-2 space-y-2">
                <li>
                  <span className="font-semibold">Editor:</span> Visual Studio
                  Code
                </li>
                <li>
                  <span className="font-semibold">Terminal:</span> kitty (
                  <Link
                    href="https://www.reddit.com/r/KittyTerminal/comments/13ephdh/comment/jjsha90/"
                    target="_blank"
                    className="text-blue-400 hover:underline"
                  >
                    set to xterm-256color
                  </Link>
                  )
                </li>
                <li>
                  <span className="font-semibold">Shell:</span> zsh with omz
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}
