import { Chart } from "@/components/Chart";
import Projects from "@/components/Project";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="grid h-fit max-w-screen-xl grid-cols-1 gap-10 p-10 md:grid-cols-2 md:p-20">
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

        <Chart />
      </div>

      <Projects />
    </div>
  );
}
