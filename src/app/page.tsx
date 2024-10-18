"use client";

import { FileText } from "lucide-react";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { motion, AnimatePresence } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/transitions";

export default function Home() {
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
          <div className="flex flex-col text-sm gap-4 font-mono font-light text-muted-foreground">
            <motion.div
              variants={itemVariants}
              className="flex gap-2 items-center"
            >
              <p className="font-sans text-foreground cursor-pointer text-4xl font-extrabold tracking-tighter">
                Jerry Febriano
              </p>
            </motion.div>
            <motion.p variants={itemVariants} className="text-justify">
              Your comp-sci undergraduate with a strong preference for
              dark-themed interfaces. Passionate about developing side projects
              and continually exploring new opportunities.
              <br />
              <br />
              Possess extensive experience in web development, particularly in
              front-end technologies like{" "}
              <Link
                className="text-blue-400 hover:underline"
                target="_blank"
                href="https://react.dev"
              >
                React
              </Link>{" "}
              and{" "}
              <Link
                className="text-blue-400 hover:underline"
                target="_blank"
                href="https://nextjs.org"
              >
                Next.js
              </Link>
              , with some experience in{" "}
              <Link
                className="text-blue-400 hover:underline"
                target="_blank"
                href="https://expressjs.com/"
              >
                Express.js
              </Link>{" "}
              for back-end development.
            </motion.p>

            <motion.p variants={itemVariants}>
              Currently learning:{" "}
              <Link
                target="_blank"
                className="font-bold text-foreground underline-offset-2 hover:underline"
                href="https://en.wikipedia.org/wiki/Self-hosting_(web_services)"
              >
                Self Hosting
              </Link>
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex gap-2 text-primary underline-offset-2"
            >
              <Link
                target="_blank"
                href="/resume.pdf"
                className="flex items-center gap-2 hover:underline transition-colors duration-200 hover:text-foreground"
              >
                <FileText size={16} />
                Resume
              </Link>
              <p className="no-underline">•</p>
              <Link
                target="_blank"
                href="https://github.com/yoshikazuuu"
                className="flex items-center gap-2 hover:underline transition-colors duration-200 hover:text-foreground"
              >
                <SiGithub size={16} />
                GitHub
              </Link>
              <p className="no-underline">•</p>
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/jerryfebriano/"
                className="flex items-center gap-2 hover:underline transition-colors duration-200 hover:text-foreground"
              >
                <SiLinkedin size={16} />
                LinkedIn
              </Link>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          variants={itemVariants}
          className="flex text-xs justify-center items-center mt-10"
        >
          <p className="text-muted-foreground">get in touch</p>
          <div className="relative flex items-center justify-center w-5 mx-1 h-5">
            <div className="absolute bg-foreground h-1/2 w-1/2 rounded-full animate-ping" />
            <div className="absolute bg-foreground h-1/2 w-1/2 rounded-full" />
          </div>
          <Link
            target="_blank"
            className="font-bold text-foreground underline-offset-2 hover:underline"
            href="mailto:febrianojerry@gmail.com"
          >
            febrianojerry@gmail.com
          </Link>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
