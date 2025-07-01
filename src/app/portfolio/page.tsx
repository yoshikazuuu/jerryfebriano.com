"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { createContainerVariants, createItemVariants } from "@/lib/transitions";
import { useReducedMotion, getMotionDuration } from "@/lib/motion-utils";
import { ExternalLink, Calendar } from "lucide-react";
import { useState } from "react";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiPrisma,
  SiSwift,
  SiPython,
  SiDjango,
  SiJavascript,
  SiNodedotjs,
  SiDiscord,
  SiC,
} from "react-icons/si";

interface Project {
  title: string;
  description: string;
  overview: string;
  image: string;
  role: string;
  technologies: string[];
  year: string;
  url?: string;
}

const projects: Project[] = [
  {
    title: "Genshiken ITB's New Website",
    description: "A dynamic platform to facilitate university club activities, engaging over 500+ users in promoting and documenting events and initiatives.",
    overview: "As the lead developer for the Genshiken ITB New Website, I developed the site from the ground up to ensure robustness and user-friendliness for over 500 club members. I significantly enhanced site performance, improving load times by more than 200% as confirmed by Google Lighthouse, which is crucial for user satisfaction and site accessibility. Additionally, I integrated a comprehensive authentication and content management system that streamlined operations and improved content handling.",
    image: "/genshiken.png",
    role: "Full-Stack Developer",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Prisma", "PostgreSQL"],
    year: "2023",
    url: "https://genshiken-itb.org/"
  },
  {
    title: "Ayo Baca",
    description: "An innovative iOS application designed to empower children with dyslexia in Indonesia, transforming reading challenges into engaging and inclusive learning adventures.",
    overview: "As an iOS developer on this project, I am responsible for implementing the user interface using SwiftUI and creating seamless user experiences with modern iOS frameworks including SwiftData for data persistence and Speech Framework for pronunciation feedback. The application features interactive learning modules including spelling practice with speech-to-text integration, writing practice with Core Graphics canvas implementation, and gamified syllable and word building activities.",
    image: "/ayobaca.png",
    role: "Mobile Developer",
    technologies: ["SwiftUI", "Speech Framework (AVFoundation)", "Core Graphics", "SwiftUI Canvas"],
    year: "2025",
    url: "https://testflight.apple.com/join/Q4kTSYYF"
  },
  {
    title: "binus/ai",
    description: "An innovative emotion recognition application that leverages the power of the BERT model, capable of recognizing five distinct emotions.",
    overview: "By meticulously using two configurations of the BERT model—BERTBASE and BERTLARGE—the application processes and interprets the nuances behind sentences to provide accurate emotion analysis. The development involved fine-tuning the BERT model on a large dataset that includes over 720 sentences, 3,524 paragraphs, 14,722 words, and 674,923 characters, ensuring the model's deep understanding of language and context.",
    image: "/aol-ai.png",
    role: "Full-Stack Developer",
    technologies: ["TypeScript", "Next.js", "Tailwind CSS", "Prisma", "PostgreSQL", "Python", "PyTorch", "Pandas", "Django", "tRPC"],
    year: "2023",
    url: "https://aol-ai.jer.ee"
  },
  {
    title: "Mizuki Discord Bot",
    description: "A versatile Discord bot characterized by its charming and cute aesthetic, offering a wide range of functionalities tailored to enhance user interaction and management within Discord servers.",
    overview: "Mizuki is a multi-purpose Discord bot launched in 2022, characterized by its appealing cute aesthetic. It integrates a variety of features designed to enhance interaction within Discord servers. The bot's functionalities range from general user and server commands to unique features like manga reading, fun interactive 'bonk' commands, and a tool for finding image sources. Additionally, Mizuki supports anonymous confessions and utilizes ChatGPT for generating code snippets and answering questions.",
    image: "/mizuki.png",
    role: "Sole Developer",
    technologies: ["JavaScript", "Node.js", "Discord API", "OpenAI API"],
    year: "2022",
    url: "https://mizuki.jer.ee"
  },
  {
    title: "Cursed To Do List",
    description: "A robust calendar-based system designed to manage appointments and to-do lists effectively, leveraging the low-level ncurses library for text-based user interfaces in a terminal environment.",
    overview: "This calendar-based appointment and to-do list system utilizes the ncurses library to offer a dynamic user interface that adjusts seamlessly to varying terminal window sizes, enhancing user experience by maintaining functionality regardless of screen dimensions. The system enables efficient appointment management, allowing users to schedule, view, and manage their appointments directly within the calendar interface, thus simplifying the tracking of important dates and events.",
    image: "/cursed-todolist.png",
    role: "Managing signal and terminal logic",
    technologies: ["C programming", "ncurses library"],
    year: "2023",
    url: "https://github.com/yoshikazuuu/cursed-todolist"
  }
];

const getTechIcon = (tech: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    "TypeScript": <SiTypescript className="text-blue-500" />,
    "Next.js": <SiNextdotjs className="text-black dark:text-white" />,
    "Tailwind CSS": <SiTailwindcss className="text-cyan-500" />,
    "Prisma": <SiPrisma className="text-blue-600" />,
    "PostgreSQL": <SiPostgresql className="text-blue-700" />,
    "SwiftUI": <SiSwift className="text-orange-500" />,
    "Python": <SiPython className="text-yellow-500" />,
    "Django": <SiDjango className="text-green-700" />,
    "JavaScript": <SiJavascript className="text-yellow-400" />,
    "Node.js": <SiNodedotjs className="text-green-500" />,
    "Discord API": <SiDiscord className="text-indigo-500" />,
    "C programming": <SiC className="text-blue-600" />,
  };

  return iconMap[tech] || <span className="w-4 h-4 bg-gray-500 rounded-full" />;
};

const ProjectCard = ({
  project,
  index,
  reducedMotion,
  itemVariants
}: {
  project: Project;
  index: number;
  reducedMotion: boolean;
  itemVariants: any;
}) => {
  const isEven = index % 2 === 0;
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  return (
    <motion.div
      variants={itemVariants}
      className="py-12"
    >
      <div className={`flex flex-col md:flex-row items-center gap-12 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
        {/* Project Visual */}
        <div className="flex-1 flex justify-center w-full">
          <div className="w-full max-w-md md:max-w-lg aspect-video relative rounded-lg overflow-hidden border border-border shadow-lg">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 40vw"
              priority={index < 2}
            />
          </div>
        </div>

        {/* Project Content */}
        <div className="flex-1 space-y-6">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 w-fit">
                <h3 className="font-serif text-3xl font-bold text-foreground w-fit">
                  {project.title}
                </h3>
                {project.url && (
                  <Link
                    href={project.url}
                    target="_blank"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </Link>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar size={14} />
                {project.year}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <span className="font-semibold text-foreground">Role: </span>
              <span className="text-muted-foreground">{project.role}</span>
            </div>

            <div>
              <span className="font-semibold text-foreground mb-3 block">Technologies:</span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <div key={techIndex} className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-md text-sm">
                    {getTechIcon(tech)}
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <motion.button
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className="cursor-pointer text-blue-400 hover:text-blue-300 transition-colors font-medium"
              whileHover={reducedMotion ? {} : { scale: 1.02 }}
              whileTap={reducedMotion ? {} : { scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                View Details
                <motion.span
                  animate={{ rotate: isDetailsOpen ? 90 : 0 }}
                  transition={{ duration: getMotionDuration(0.2, reducedMotion) }}
                >
                  ›
                </motion.span>
              </span>
            </motion.button>
            <AnimatePresence>
              {isDetailsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{
                    duration: getMotionDuration(0.3, reducedMotion),
                    ease: "easeInOut"
                  }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-secondary/50 rounded-md">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {project.overview}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function PortfolioPage() {
  const reducedMotion = useReducedMotion();
  const containerVariants = createContainerVariants(reducedMotion);
  const itemVariants = createItemVariants(reducedMotion);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-svh flex flex-col justify-center items-center p-5 pb-16 md:pb-20"
    >
      <motion.div
        variants={itemVariants}
        className="w-full max-w-4xl"
      >
        <div className="flex flex-col gap-8">
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="font-serif text-foreground text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
              Portfolio
            </h1>
            <p className="text-muted-foreground text-balance text-sm max-w-2xl mx-auto">
              A collection of projects I&apos;ve built, ranging from web applications to mobile apps and terminal utilities.
            </p>
          </motion.div>

          <div className="space-y-0">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                reducedMotion={reducedMotion}
                itemVariants={itemVariants}
              />
            ))}
          </div>

          <motion.div variants={itemVariants} className="text-center">
            <p className="text-sm text-muted-foreground">
              Want to see more? Check out my{" "}
              <Link
                href="https://github.com/yoshikazuuu"
                target="_blank"
                className="text-blue-400 hover:text-blue-300 transition-colors font-medium underline underline-offset-2"
              >
                GitHub
              </Link>{" "}
              for additional projects and contributions.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
