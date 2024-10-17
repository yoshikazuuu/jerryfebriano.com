"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon } from "lucide-react";

export function Title() {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.h1
      onClick={toggleTheme}
      className={cn(
        "font-sans cursor-pointer text-4xl font-extrabold tracking-tighter",
        theme === "dark" ? "text-white" : "text-black"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Jerry Febriano
    </motion.h1>
  );
}

export function IconToggle() {
  const { theme } = useTheme();

  return theme === "dark" ? <SunIcon /> : <MoonIcon />;
}
