"use client";

import { Home, FileText, Wrench } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconToggle } from "./ModeToggle";
import { useTheme } from "next-themes";

export function FloatingNavbar() {
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Writings", href: "/writings", icon: FileText },
    { name: "Uses", href: "/uses", icon: Wrench },
    { name: "Mode", href: "#", icon: IconToggle },
  ];

  return (
    <motion.div
      className="fixed bottom-6 transform z-50 w-full flex justify-center"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 20 }}
    >
      <nav className="flex items-center justify-center space-x-1 bg-background/20 backdrop-filter backdrop-blur-md rounded-full p-1 shadow-lg border border-white/20">
        {navItems.map((item) => (
          <Link key={item.name} href={item.href} passHref>
            <motion.div
              className="relative p-3 rounded-full transition-colors duration-300"
              onMouseEnter={() => setHoveredIcon(item.name)}
              onMouseLeave={() => setHoveredIcon(null)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                item.name === "Mode" &&
                setTheme(theme === "dark" ? "light" : "dark")
              }
            >
              <item.icon
                className={`w-6 h-6 transition-colors duration-300 ${pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
                  }`}
              />
              <AnimatePresence>
                {hoveredIcon === item.name && (
                  <motion.span
                    className="absolute inset-0 bg-primary/20 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {hoveredIcon === item.name && (
                  <motion.span
                    className="absolute flex justify-center left-1/2 transform -translate-x-1/2 -top-8 bg-background text-primary px-2 py-1 rounded text-sm font-medium shadow-lg"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        ))}
      </nav>
    </motion.div>
  );
}
