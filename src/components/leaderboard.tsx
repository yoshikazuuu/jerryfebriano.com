"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Award, Clock, Target } from "lucide-react";
import { createItemVariants } from "@/lib/transitions";
import { useReducedMotion } from "@/lib/motion-utils";

interface GuestEntry {
    id: string;
    name: string;
    wpm: number;
    accuracy: number;
    timestamp: string;
}

interface LeaderboardProps {
    entries: GuestEntry[];
    isLoading: boolean;
}

export function Leaderboard({ entries, isLoading }: LeaderboardProps) {
    const reducedMotion = useReducedMotion();
    const itemVariants = createItemVariants(reducedMotion);

    const getRankIcon = (index: number) => {
        switch (index) {
            case 0:
                return <Trophy className="text-yellow-500" size={20} />;
            case 1:
                return <Medal className="text-gray-400" size={20} />;
            case 2:
                return <Award className="text-amber-600" size={20} />;
            default:
                return <span className="text-muted-foreground font-bold">{index + 1}</span>;
        }
    };

    const getTimeAgo = (timestamp: string) => {
        const now = new Date();
        const time = new Date(timestamp);
        const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));

        if (diffInMinutes < 1) return "Just now";
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
        return `${Math.floor(diffInMinutes / 1440)}d ago`;
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-foreground mb-4">Leaderboard</h2>
                    <div className="animate-spin mx-auto h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                </div>
            </div>
        );
    }

    if (entries.length === 0) {
        return (
            <motion.div
                variants={itemVariants}
                className="text-center space-y-4 bg-secondary/50 rounded-lg p-8"
            >
                <Trophy className="mx-auto text-muted-foreground" size={48} />
                <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Leaderboard</h2>
                    <p className="text-muted-foreground">
                        No entries yet! Be the first to complete a typing test and join the guestbook.
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div variants={itemVariants} className="space-y-6">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-foreground mb-2">Leaderboard</h2>
                <p className="text-muted-foreground">
                    Top typists who&apos;ve signed the guestbook
                </p>
            </div>

            {/* Top 3 Podium */}
            {entries.length >= 3 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center items-end gap-4 mb-8"
                >
                    {/* Second Place */}
                    <div className="bg-secondary/50 rounded-lg p-4 text-center min-w-[120px]">
                        <Medal className="mx-auto text-gray-400 mb-2" size={32} />
                        <div className="font-bold text-foreground">{entries[1]?.name}</div>
                        <div className="text-2xl font-bold text-primary">{entries[1]?.wpm}</div>
                        <div className="text-xs text-muted-foreground">WPM</div>
                        <div className="text-xs text-muted-foreground">{entries[1]?.accuracy}% acc</div>
                    </div>

                    {/* First Place */}
                    <div className="bg-gradient-to-b from-yellow-500/20 to-secondary/50 rounded-lg p-6 text-center min-w-[140px] transform scale-110">
                        <Trophy className="mx-auto text-yellow-500 mb-2" size={40} />
                        <div className="font-bold text-foreground">{entries[0]?.name}</div>
                        <div className="text-3xl font-bold text-primary">{entries[0]?.wpm}</div>
                        <div className="text-sm text-muted-foreground">WPM</div>
                        <div className="text-sm text-muted-foreground">{entries[0]?.accuracy}% acc</div>
                    </div>

                    {/* Third Place */}
                    <div className="bg-secondary/50 rounded-lg p-4 text-center min-w-[120px]">
                        <Award className="mx-auto text-amber-600 mb-2" size={32} />
                        <div className="font-bold text-foreground">{entries[2]?.name}</div>
                        <div className="text-2xl font-bold text-primary">{entries[2]?.wpm}</div>
                        <div className="text-xs text-muted-foreground">WPM</div>
                        <div className="text-xs text-muted-foreground">{entries[2]?.accuracy}% acc</div>
                    </div>
                </motion.div>
            )}

            {/* Full Leaderboard */}
            <div className="space-y-2">
                {entries.map((entry, index) => (
                    <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${index < 3
                            ? "bg-gradient-to-r from-primary/10 to-secondary/50 border-primary/20"
                            : "bg-secondary/30 border-border hover:bg-secondary/50"
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center w-8 h-8">
                                {getRankIcon(index)}
                            </div>

                            <div>
                                <div className="font-semibold text-foreground">{entry.name}</div>
                                <div className="text-sm text-muted-foreground flex items-center gap-4">
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {getTimeAgo(entry.timestamp)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-6 text-right">
                            <div>
                                <div className="text-xl font-bold text-primary">{entry.wpm}</div>
                                <div className="text-xs text-muted-foreground">WPM</div>
                            </div>
                            <div>
                                <div className="text-lg font-semibold text-foreground flex items-center gap-1">
                                    <Target size={14} />
                                    {entry.accuracy}%
                                </div>
                                <div className="text-xs text-muted-foreground">Accuracy</div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Stats Summary */}
            {entries.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-secondary/30 rounded-lg p-4 text-center"
                >
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                            <div className="text-lg font-bold text-foreground">
                                {Math.round(entries.reduce((sum, entry) => sum + entry.wpm, 0) / entries.length)}
                            </div>
                            <div className="text-muted-foreground">Avg WPM</div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-foreground">
                                {Math.round(entries.reduce((sum, entry) => sum + entry.accuracy, 0) / entries.length)}%
                            </div>
                            <div className="text-muted-foreground">Avg Accuracy</div>
                        </div>
                        <div>
                            <div className="text-lg font-bold text-foreground">{entries.length}</div>
                            <div className="text-muted-foreground">Total Entries</div>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
} 