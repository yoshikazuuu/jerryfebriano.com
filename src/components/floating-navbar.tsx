"use client";

import { HomeIcon } from "@/components/ui/home";
import { FileTextIcon } from "@/components/ui/file-text";
import { LayersIcon } from "@/components/ui/layers";
import { BookIcon } from "@/components/ui/book";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useReducedMotion, getMotionSpring, getMotionDuration } from "@/lib/motion-utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ModeToggle } from "./mode-toggle";

export function FloatingNavbar() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const navItems = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Writings", href: "/writings", icon: FileTextIcon },
    { name: "Portfolio", href: "/portfolio", icon: LayersIcon },
    { name: "Guestbook", href: "/guestbook", icon: BookIcon },
    { name: "Mode", href: "#", icon: ModeToggle },
  ];

  return (
    <motion.div
      className="fixed bottom-6 transform z-50 w-full flex justify-center"
      initial={reducedMotion ? { opacity: 1 } : { y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={getMotionSpring(reducedMotion)}
    >
      <TooltipProvider>
        <nav className="flex items-center justify-center space-x-1 bg-background/20 backdrop-filter backdrop-blur-md rounded-full p-1 shadow-lg border border-white/20">
          {navItems.map((item) => {
            if (item.name === "Mode") {
              return (
                <Tooltip key={item.name}>
                  <TooltipTrigger asChild>
                    <item.icon
                      onMouseEnter={() => setHoveredIcon(item.name)}
                      onMouseLeave={() => setHoveredIcon(null)}
                      className="relative"
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.name}</p>
                  </TooltipContent>
                </Tooltip>
              );
            }

            return (
              <Tooltip key={item.name}>
                <TooltipTrigger asChild>
                  <Link href={item.href} passHref>
                    <motion.div
                      className="relative p-3 rounded-full transition-colors duration-300"
                      whileHover={reducedMotion ? {} : { scale: 1.1 }}
                      whileTap={reducedMotion ? {} : { scale: 0.95 }}
                    >
                      <item.icon
                        size={24}
                        className={`transition-colors duration-300 ${pathname === item.href
                          ? "text-primary"
                          : "text-muted-foreground"
                          }`}
                        onMouseEnter={() => setHoveredIcon(item.name)}
                        onMouseLeave={() => setHoveredIcon(null)}
                      />
                      <AnimatePresence>
                        {hoveredIcon === item.name && (
                          <motion.span
                            className="absolute inset-0 bg-primary/20 rounded-full pointer-events-none"
                            initial={reducedMotion ? { opacity: 1 } : { scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={reducedMotion ? { opacity: 0 } : { scale: 0, opacity: 0 }}
                            transition={{ duration: getMotionDuration(0.2, reducedMotion) }}
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </TooltipProvider>
    </motion.div>
  );
}
