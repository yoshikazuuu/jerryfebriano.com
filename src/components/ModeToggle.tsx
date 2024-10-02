"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner, or any placeholder you prefer
  }

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
