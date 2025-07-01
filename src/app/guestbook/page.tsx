"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createContainerVariants, createItemVariants } from "@/lib/transitions";
import { useReducedMotion } from "@/lib/motion-utils";
import { TypingTest } from "@/components/typing-test";
import { Leaderboard } from "@/components/leaderboard";
import { Trophy } from "lucide-react";

interface GuestEntry {
    id: string;
    name: string;
    wpm: number;
    accuracy: number;
    timestamp: string;
}

export default function GuestbookPage() {
    const reducedMotion = useReducedMotion();
    const containerVariants = createContainerVariants(reducedMotion);
    const itemVariants = createItemVariants(reducedMotion);

    const [entries, setEntries] = useState<GuestEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch leaderboard data
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await fetch("/api/guestbook");
                if (response.ok) {
                    const data = await response.json();
                    setEntries(data.entries || []);
                }
            } catch (error) {
                console.error("Failed to fetch leaderboard:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const handleTestComplete = async (name: string, wpm: number, accuracy: number) => {
        try {
            const response = await fetch("/api/guestbook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, wpm, accuracy }),
            });

            if (response.ok) {
                const newEntry = await response.json();
                setEntries(prev => [newEntry, ...prev].sort((a, b) => b.wpm - a.wpm));
            }
        } catch (error) {
            console.error("Failed to submit score:", error);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                key="guestbook"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
                className="min-h-svh p-5 max-w-4xl mx-auto"
            >
                <motion.div variants={itemVariants} className="space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground">
                            Guestbook
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Test your typing speed and join the leaderboard! Complete a typing test to sign the guestbook.
                        </p>
                    </div>

                    {/* Typing Test */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <TypingTest onComplete={handleTestComplete} />
                    </motion.div>

                    {/* Leaderboard */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        <Leaderboard entries={entries} isLoading={isLoading} />
                    </motion.div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
} 