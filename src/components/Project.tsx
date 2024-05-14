import { MoveUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  SiC,
  SiDiscord,
  SiDjango,
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
  SiTrpc,
  SiTypescript,
} from "react-icons/si";

interface Project {
  title: string;
  description: string;
  link: string;
  stack?: React.ReactNode;
  image?: string;
}

export default function Projects() {
  return (
    <div>
      <h2 className="font-mono text-lg font-bold text-muted-foreground">
        PROJECTS {projects.length}
      </h2>
      <div className="flex flex-col gap-1 py-5">
        {projects.map((project, index) => (
          <Project key={index} {...project} />
        ))}
      </div>
    </div>
  );
}

const Project = ({ title, description, link, stack, image }: Project) => {
  return (
    <Link
      href={link}
      target="_blank"
      className="group flex flex-col gap-2 rounded-md p-5 text-gray-200 transition-colors duration-200 hover:bg-gray-200/10 hover:decoration-white"
    >
      {image && (
        <Image
          src={image}
          width={640}
          height={480}
          alt={title}
          className="rounded-md"
        />
      )}
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
    title: "Genshiken ITB",
    description:
      "🌎 Community website for Genshiken ITB, a community for pop-culture enthusiasts. Complete with Authentication.",
    link: "https://new.genshiken-itb.org/",
    image: "/genshiken.png",
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
  {
    title: "binus/ai",
    description:
      "🏫 Emotion analysis using BERT Model. Final project for Artificial Intelligence course.",
    link: "https://aol-ai.yoshi.moe",
    image: "/aol-ai.png",
    stack: (
      <>
        <SiTypescript />
        <SiPython />
        <SiNextdotjs />
        <SiDjango />
        <SiTailwindcss />
        <SiPostgresql />
        <SiPrisma />
        <SiTrpc />
      </>
    ),
  },
  {
    title: "Mizuki",
    description: "🎀 Mizuki is a multi purposes bot that has cute side to it.",
    link: "https://mizuki.yoshi.moe/",
    image: "/mizuki.png",
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
    image: "/aihime.png",
    stack: (
      <>
        <SiJavascript />
        <SiNextdotjs />
        <SiSpotify />
      </>
    ),
  },
  {
    title: "Cursed Todo List",
    description:
      "🏫 This is a calendar based appointment and todo-list. Created using the low-level library (ncurses.h) and it's resizeable.",
    link: "https://github.com/yoshikazuuu/cursed-todolist",
    image: "/cursed-todolist.png",
    stack: (
      <>
        <SiC />
      </>
    ),
  },
  {
    title: "PHP-MySQL Todo List",
    description: "🏫 To-do-list using SQL and PHP with user authentication.",
    link: "https://github.com/yoshikazuuu/MidProject-BackendDevelopment-2022",
    image: "/php-mysql-todolist.png",
    stack: (
      <>
        <SiPhp />
        <SiMysql />
      </>
    ),
  },
  {
    title: "AOL Database",
    description: "🏫 CRUD database operations for final project.",
    link: "https://aol-database.yoshi.moe/",
    image: "/aol-database.png",
    stack: (
      <>
        <SiTypescript />
        <SiNextdotjs />
        <SiPostgresql />
        <SiTrpc />
      </>
    ),
  },
  {
    title: "AOL Algorithm Design and Analysis",
    description:
      "🏫 Coin change problem visualization, based on dynamic programming approach.",
    link: "https://aol-ada.yoshi.moe/",
    image: "/aol-ada.png",
    stack: (
      <>
        <SiTypescript />
        <SiNextdotjs />
      </>
    ),
  },
  {
    title: "Haya-chan",
    description:
      "🤖 Discord bot that related to https://socs1.binus.ac.id/quiz. Written in Python.",
    link: "https://github.com/yoshikazuuu/hayachan",
    image: "/hayachan.png",
    stack: (
      <>
        <SiPython />
        <SiDiscord />
      </>
    ),
  },
  {
    title: "Manga Downloader",
    description: "🔗 Mangadex and nHentai downloader using Express.js",
    link: "https://github.com/yoshikazuuu/manga-downloader",
    image: "/manga-downloader.png",
    stack: (
      <>
        <SiJavascript />
        <SiExpress />
      </>
    ),
  },
  {
    title: "Ena",
    description: "📚 Redis key-value store implementation.",
    link: "https://ena.yoshi.moe/",
    image: "/ena.png",
    stack: (
      <>
        <SiTypescript />
        <SiRedis />
        <SiNextdotjs />
      </>
    ),
  },
];
