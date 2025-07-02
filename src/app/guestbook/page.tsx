"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createContainerVariants, createItemVariants } from "@/lib/transitions";
import { useReducedMotion } from "@/lib/motion-utils";
import { TypingTest } from "@/components/typing-test";
import { Leaderboard } from "@/components/leaderboard";
import { Trophy, AlertCircle, CheckCircle } from "lucide-react";

interface GuestEntry {
    id: string;
    user_session_id: string;
    name: string;
    wpm: number;
    accuracy: number;
    timestamp: string;
}

interface NotificationState {
    type: 'success' | 'error' | 'info';
    message: string;
    show: boolean;
}

export default function GuestbookPage() {
    const reducedMotion = useReducedMotion();
    const containerVariants = createContainerVariants(reducedMotion);
    const itemVariants = createItemVariants(reducedMotion);

    const [entries, setEntries] = useState<GuestEntry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [notification, setNotification] = useState<NotificationState>({
        type: 'success',
        message: '',
        show: false
    });

    // Show notification with auto-hide
    const showNotification = (type: NotificationState['type'], message: string) => {
        setNotification({ type, message, show: true });
        setTimeout(() => {
            setNotification(prev => ({ ...prev, show: false }));
        }, 4000);
    };

    // Fetch leaderboard data
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                console.log('🔄 Fetching leaderboard data...');
                const response = await fetch("/api/guestbook");
                if (response.ok) {
                    const data = await response.json();
                    setEntries(data.entries || []);
                    console.log('✅ Leaderboard loaded:', {
                        totalEntries: data.entries?.length || 0
                    });
                } else {
                    throw new Error(`HTTP ${response.status}`);
                }
            } catch (error) {
                console.error("❌ Failed to fetch leaderboard:", error);
                showNotification('error', 'Failed to load leaderboard data');
            } finally {
                setIsLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const handleTestComplete = async (name: string, wpm: number, accuracy: number, sessionId: string) => {
        try {
            console.log('🚀 Submitting test result:', {
                sessionId: sessionId.substring(0, 8) + '...',
                name,
                wpm,
                accuracy
            });

            const response = await fetch("/api/guestbook", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, wpm, accuracy, sessionId }),
            });

            if (response.ok) {
                const result = await response.json();

                // Handle both new entries and updates
                if (response.status === 201) {
                    // New entry
                    setEntries(prev => [result, ...prev].sort((a, b) => {
                        if (b.wpm !== a.wpm) return b.wpm - a.wpm;
                        return b.accuracy - a.accuracy;
                    }));
                    showNotification('success', `Welcome to the leaderboard, ${name}! 🎉`);
                    console.log('✅ New entry added to leaderboard');
                } else if (response.status === 200) {
                    // Updated entry or existing better score
                    if (result.message) {
                        showNotification('info', result.message);
                        console.log('📝 Score not improved, existing entry returned');
                    } else {
                        // Score was improved
                        setEntries(prev =>
                            prev.map(entry =>
                                entry.user_session_id === sessionId ? result : entry
                            ).sort((a, b) => {
                                if (b.wpm !== a.wpm) return b.wpm - a.wpm;
                                return b.accuracy - a.accuracy;
                            })
                        );
                        showNotification('success', `Great improvement, ${name}! New best score recorded! 🚀`);
                        console.log('✅ Entry updated with better score');
                    }
                }
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to submit score');
            }
        } catch (error) {
            console.error("❌ Failed to submit score:", error);
            showNotification('error', `Failed to submit your score. Please try again.`);
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
                {/* Notification Toast */}
                <AnimatePresence>
                    {notification.show && (
                        <motion.div
                            initial={{ opacity: 0, y: -50, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -50, scale: 0.95 }}
                            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50"
                        >
                            <div className={`
                                flex items-center gap-3 px-6 py-4 rounded-2xl border backdrop-blur-lg shadow-lg
                                ${notification.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-600' : ''}
                                ${notification.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-600' : ''}
                                ${notification.type === 'info' ? 'bg-blue-500/10 border-blue-500/20 text-blue-600' : ''}
                            `}>
                                {notification.type === 'success' && <CheckCircle size={20} />}
                                {notification.type === 'error' && <AlertCircle size={20} />}
                                {notification.type === 'info' && <AlertCircle size={20} />}
                                <span className="font-medium">{notification.message}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.div variants={itemVariants} className="space-y-12">
                    {/* Header */}
                    <div className="text-center space-y-4">
                        <motion.h1
                            variants={itemVariants}
                            className="font-serif text-4xl md:text-5xl font-bold text-foreground"
                        >
                            Guestbook
                        </motion.h1>
                        <motion.p
                            variants={itemVariants}
                            className="text-muted-foreground text-lg max-w-2xl mx-auto"
                        >
                            Test your typing speed and join the leaderboard! Complete a typing test to sign the guestbook.
                        </motion.p>
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