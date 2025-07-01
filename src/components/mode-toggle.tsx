"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion, getMotionDuration } from "@/lib/motion-utils";
import { SunIcon } from "@/components/ui/sun";
import { MoonIcon } from "@/components/ui/moon";

type Theme = 'light' | 'dark' | 'system';

export function IconToggle() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return theme === "dark" ? <SunIcon size={24} /> : <MoonIcon size={24} />;
}

interface ModeToggleProps {
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function ModeToggle({ className, onMouseEnter, onMouseLeave }: ModeToggleProps) {
  const { setTheme, theme: currentTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChangeTheme = (theme: Theme) => {
    if (theme === currentTheme) return;

    if (!document.startViewTransition) return setTheme(theme);
    document.startViewTransition(() => setTheme(theme));
  };

  if (!mounted) {
    return (
      <div className={cn("relative p-3 rounded-full transition-colors duration-300 cursor-pointer", className)}>
        <div className="relative w-6 h-6">
          <SunIcon size={24} className="text-muted-foreground" />
        </div>
      </div>
    );
  }

  // Handle system theme or undefined theme
  const isDark = currentTheme === 'dark';

  return (
    <motion.div
      className={cn("relative p-3 rounded-full transition-colors duration-300 cursor-pointer", className)}
      whileHover={reducedMotion ? {} : { scale: 1.1 }}
      whileTap={reducedMotion ? {} : { scale: 0.95 }}
      onClick={() =>
        handleChangeTheme(currentTheme === 'light' ? 'dark' : 'light')
      }
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon - visible in light mode */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{
            scale: isDark ? 0 : 1,
            rotate: isDark ? -90 : 0,
            opacity: isDark ? 0 : 1,
          }}
          transition={{
            duration: getMotionDuration(0.5, reducedMotion),
            ease: "easeInOut"
          }}
        >
          <SunIcon
            size={24}
            className="text-muted-foreground"
          />
        </motion.div>

        {/* Moon Icon - visible in dark mode */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : 90,
            opacity: isDark ? 1 : 0,
          }}
          transition={{
            duration: getMotionDuration(0.5, reducedMotion),
            ease: "easeInOut"
          }}
        >
          <MoonIcon
            size={24}
            className="text-muted-foreground"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
