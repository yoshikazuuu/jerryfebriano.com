"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { createContainerVariants, createItemVariants } from "@/lib/transitions";
import { useReducedMotion } from "@/lib/motion-utils";

export default function Home() {
  const reducedMotion = useReducedMotion();
  const containerVariants = createContainerVariants(reducedMotion);
  const itemVariants = createItemVariants(reducedMotion);

  return (
    <AnimatePresence>
      <motion.div
        key="content"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="min-h-svh flex flex-col justify-center items-center p-5"
      >
        <motion.div
          variants={itemVariants}
          className="grid max-w-sm grid-cols-1 gap-10"
        >
          <div className="flex flex-col gap-4 text-muted-foreground">
            <motion.div
              variants={itemVariants}
              className="flex gap-2 items-center"
            >
              <h1 className="font-serif text-foreground cursor-pointer text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Jerry Febriano
              </h1>
            </motion.div>
            <div className="font-sans text-justify leading-relaxed space-y-4">
              <p>
                Your comp-sci undergraduate with a strong preference for
                dark-themed interfaces. Passionate about developing side projects
                and continually exploring new opportunities.
              </p>
              <p>
                Possess extensive experience in web development, particularly in
                front-end technologies like{" "}
                <Link
                  className="text-blue-400 hover:underline transition-colors font-medium"
                  target="_blank"
                  href="https://react.dev"
                >
                  React
                </Link>{" "}
                and{" "}
                <Link
                  className="text-blue-400 hover:underline transition-colors font-medium"
                  target="_blank"
                  href="https://nextjs.org"
                >
                  Next.js
                </Link>
                , with some experience in{" "}
                <Link
                  className="text-blue-400 hover:underline transition-colors font-medium"
                  target="_blank"
                  href="https://expressjs.com/"
                >
                  Express.js
                </Link>{" "}
                for back-end development.
              </p>
            </div>

            <motion.p variants={itemVariants} className="font-sans">
              Currently learning:{" "}
              <Link
                target="_blank"
                className="font-semibold text-foreground underline-offset-2 hover:underline transition-colors"
                href="https://en.wikipedia.org/wiki/Self-hosting_(web_services)"
              >
                Self Hosting
              </Link>
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex gap-8 text-primary underline-offset-2 items-center justify-between font-sans"
            >
              <Link
                target="_blank"
                href="/resume.pdf"
                className="flex items-center gap-2 hover:underline transition-colors duration-200 hover:text-foreground font-medium"
              >
                <FileText size={16} />
                Resume
              </Link>
              <Link
                target="_blank"
                href="https://github.com/yoshikazuuu"
                className="flex items-center gap-2 hover:underline transition-colors duration-200 hover:text-foreground font-medium"
              >
                <SiGithub size={16} />
                GitHub
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/jerryfebriano/"
                className="flex items-center gap-2 hover:underline transition-colors duration-200 hover:text-foreground font-medium"
              >
                <SiLinkedin size={16} />
                LinkedIn
              </Link>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="flex text-xs justify-center items-center mt-10 font-sans"
        >
          <p className="text-muted-foreground">get in touch</p>
          <div className="relative flex items-center justify-center w-5 mx-1 h-5">
            <div className="absolute bg-foreground h-1/2 w-1/2 rounded-full animate-ping" />
            <div className="absolute bg-foreground h-1/2 w-1/2 rounded-full" />
          </div>
          <Link
            target="_blank"
            className="font-semibold text-foreground underline-offset-2 hover:underline transition-colors"
            href="mailto:febrianojerry@gmail.com"
          >
            febrianojerry@gmail.com
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
