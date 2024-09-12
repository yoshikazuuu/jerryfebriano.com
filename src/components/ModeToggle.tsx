"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <h1
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}
      className={cn(
        "font-sans cursor-pointer text-4xl font-extrabold tracking-tighter",
        theme === "dark" ? "text-white" : "text-black"
      )}
    >
      Jerry Febriano
    </h1>
  );
}
