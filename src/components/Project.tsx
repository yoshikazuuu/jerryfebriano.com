import { shuffle } from "@/utils/shuffle";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import {
  SiC,
  SiDiscord,
  SiExpress,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiRedis,
  SiSpotify,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

interface Project {
  title: string;
  description: string;
  link: string;
  stack?: React.ReactNode;
}

export default function Projects() {
  return (
    <div>
      <h2 className="font-mono text-lg font-bold text-muted-foreground">
        PROJECTS {projects.length}
      </h2>
      <div className="flex flex-col gap-1 py-5">
        {shuffle(projects).map((project, index) => (
          <Project key={index} {...project} />
        ))}
      </div>
    </div>
  );
}

const Project = ({ title, description, link, stack }: Project) => {
  return (
    <Link
      href={link}
      className="group flex flex-col gap-2 rounded-md p-5 text-gray-200 transition-colors duration-200 hover:bg-gray-200/10 hover:decoration-white"
    >
      <div className="flex gap-2 underline decoration-gray-700 underline-offset-2 transition-colors duration-300 group-hover:decoration-white">
        {title.toUpperCase()}{" "}
        <MoveUpRight
          size={16}
          className="text-gray-700 transition-colors duration-500 group-hover:text-white"
        />
      </div>
      <p className="font-mono text-sm text-gray-700 transition-colors duration-700 group-hover:text-muted-foreground">
        {description}
      </p>

      <div className="flex gap-2 text-gray-700 transition-colors duration-1000 group-hover:text-muted-foreground">
        {stack}
      </div>
    </Link>
  );
};

const projects: Project[] = [
  {
    title: "Cursed Todo List",
    description:
      "🏫 This is a calendar based appointment and todo-list. Created using the low-level library (ncurses.h) and it's resizeable.",
    link: "https://github.com/yoshikazuuu/cursed-todolist",
    stack: (
      <>
        <SiC />
      </>
    ),
  },
  {
    title: "Haya-chan",
    description:
      "🤖 Discord bot that related to https://socs1.binus.ac.id/quiz. Written in Python.",
    link: "https://github.com/yoshikazuuu/hayachan",
    stack: (
      <>
        <SiPython />
        <SiDiscord />
      </>
    ),
  },
  {
    title: "PHP-MySQL Todo List",
    description: "🏫 To-do-list using SQL and PHP with user authentication.",
    link: "https://github.com/yoshikazuuu/MidProject-BackendDevelopment-2022",
    stack: (
      <>
        <SiPhp />
        <SiMysql />
      </>
    ),
  },
  {
    title: "Manga Downloader",
    description: "🔗 Mangadex and nHentai downloader using Express.js",
    link: "https://github.com/yoshikazuuu/manga-downloader",
    stack: (
      <>
        <SiJavascript />
        <SiExpress />
      </>
    ),
  },
  {
    title: "Mizuki",
    description: "🎀 Mizuki is a multi purposes bot that has cute side to it.",
    link: "https://mizuki.yoshi.moe/",
    stack: (
      <>
        <SiJavascript />
        <SiDiscord />
      </>
    ),
  },
  {
    title: "Aihime",
    description: "🎀 Spotify API implementation and Next.js based website.",
    link: "https://aihime.yoshi.moe/",
    stack: (
      <>
        <SiJavascript />
        <SiNextdotjs />
        <SiSpotify />
      </>
    ),
  },
  {
    title: "Ena",
    description: "📚 Redis key-value store implementation.",
    link: "https://ena.yoshi.moe/",
    stack: (
      <>
        <SiTypescript />
        <SiRedis />
        <SiNextdotjs />
      </>
    ),
  },
  {
    title: "AOL Database",
    description: "🏫 CRUD database operations for final project.",
    link: "https://aol-database.yoshi.moe/",
    stack: (
      <>
        <SiTypescript />
        <SiPostgresql />
        <SiNextdotjs />
      </>
    ),
  },
  {
    title: "AOL Algorithm Design and Analysis",
    description:
      "🏫 Coin change problem visualization, based on dynamic programming approach.",
    link: "https://aol-ada.yoshi.moe/",
    stack: (
      <>
        <SiTypescript />
        <SiNextdotjs />
      </>
    ),
  },
  {
    title: "Genshiken ITB",
    description:
      "🌎 Community website for Genshiken ITB, a community for pop-culture enthusiasts. Complete with Authentication.",
    link: "https://new.genshiken-itb.org/",
    stack: (
      <>
        <SiTypescript />
        <SiNextdotjs />
        <SiTailwindcss />
        <SiPostgresql />
        <SiPrisma />
        <SiDiscord />
      </>
    ),
  },
];
