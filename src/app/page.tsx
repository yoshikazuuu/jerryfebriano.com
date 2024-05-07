import { Chart } from "@/components/Chart";
import Projects from "@/components/Project";
import { Dot, FileText } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SiGithub, SiLinkedin } from "react-icons/si";

export default function Home() {
  return (
    <>
      <div className="grid h-fit max-w-screen-xl grid-cols-1 gap-10 p-5 md:grid-cols-2">
        <div className="flex flex-col gap-4 font-mono text-muted-foreground">
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

          <div className="flex gap-2 font-light text-gray-300 underline-offset-2">
            <Link
              target="_blank"
              href="/resume.pdf"
              className="flex items-center gap-2 hover:underline transition-colors duration-200 hover:text-white"
            >
              <FileText size={16} />
              Resume
            </Link>
            <p className="no-underline">•</p>
            <Link
              target="_blank"
              href="https://github.com/yoshikazuuu"
              className="flex items-center gap-2 hover:underline transition-colors duration-200 hover:text-white"
            >
              <SiGithub size={16} />
              GitHub
            </Link>
            <p className="no-underline">•</p>
            <Link
              target="_blank"
              href="https://www.linkedin.com/in/jerryfebriano/"
              className="flex items-center gap-2 hover:underline transition-colors duration-200 hover:text-white"
            >
              <SiLinkedin size={16} />
              LinkedIn
            </Link>
          </div>

          <Chart />
        </div>

        <Projects />
      </div>
      <div className="flex justify-center items-center h-fit">
        <p className="text-muted-foreground">get in touch</p>
        <div className="relative flex items-center justify-center w-5 mx-1 h-5">
          <div className="absolute bg-white h-1/2 w-1/2 rounded-full animate-ping" />
          <div className="absolute bg-white h-1/2 w-1/2 rounded-full" />
        </div>
        <Link
          target="_blank"
          className="font-bold text-white underline-offset-2 hover:underline"
          href="mailto:febrianojerry@gmail.com"
        >
          febrianojerry@gmail.com
        </Link>
      </div>
    </>
  );
}
