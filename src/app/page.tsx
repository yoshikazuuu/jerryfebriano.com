import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  SiC,
  SiDiscord,
  SiExpress,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiRedis,
  SiSpotify,
  SiTypescript,
} from "react-icons/si";

interface Project {
  title: string;
  description: string;
  link: string;
  stack?: React.ReactNode;
}

export default function Home() {
  function shuffle(array: any[]) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  return (
    <div className="grid max-w-screen-xl grid-cols-1 gap-10 p-20 md:grid-cols-2">
      <div className="flex flex-col gap-4 font-mono text-gray-300">
        <h1 className="font-sans text-4xl font-extrabold tracking-tighter text-white">
          Jerry Febriano
        </h1>
        <p>
          Your average comp-sci undergraduate that addicted to black theme.
          Doing some side projects here and there.
        </p>

        <p>
          Currently learning:{" "}
          <Link
            target="_blank"
            className="font-bold text-white underline-offset-2 hover:underline"
            href="https://expo.dev"
          >
            Expo
          </Link>
        </p>

        <div className="flex gap-2 font-light text-gray-600 underline-offset-2">
          <Link
            target="_blank"
            href="https://github.com/yoshikazuuu"
            className="underline transition-colors duration-200 hover:text-white"
          >
            GitHub
          </Link>
          <p className="no-underline">•</p>
          <Link
            target="_blank"
            href="https://www.linkedin.com/in/jerryfebriano/"
            className="underline transition-colors duration-200 hover:text-white"
          >
            LinkedIn
          </Link>
        </div>
      </div>
      <div>
        <h2 className="font-mono text-lg font-bold text-gray-400">
          PROJECTS {projects.length}
        </h2>
        <div className="flex flex-col gap-1 py-5">
          {shuffle(projects).map((project, index) => (
            <Project key={index} {...project} />
          ))}
        </div>
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
      <div className="flex gap-2 underline decoration-gray-700 underline-offset-2 transition-colors duration-200 group-hover:decoration-white">
        {title.toUpperCase()}{" "}
        <MoveUpRight
          size={16}
          className="text-gray-700 transition-colors duration-200 group-hover:text-white"
        />
      </div>
      <p className="font-mono text-sm text-gray-700 transition-colors duration-200 group-hover:text-gray-400">
        {description}
      </p>

      <div className="flex gap-2 text-gray-700 group-hover:text-gray-400">
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
];
