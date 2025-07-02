"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Trophy, User, Zap } from "lucide-react";
import { createItemVariants } from "@/lib/transitions";
import { useReducedMotion } from "@/lib/motion-utils";
import { getUserSession, updateUserSessionName } from "@/lib/session-utils";

interface TypingTestProps {
    onComplete: (name: string, wpm: number, accuracy: number, sessionId: string) => void;
}

const testTexts = [
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is perfect for testing typing skills.",
    "Programming is not about what you know; it is about what you can figure out. The best programmers are not necessarily the fastest typists.",
    "In a world where technology constantly evolves, the ability to adapt and learn new skills becomes more valuable than memorizing fixed knowledge.",
    "The art of debugging is figuring out what you really told your program to do rather than what you thought you told it to do.",
    "Good code is its own best documentation. As you are about to add a comment, ask yourself if there is a way to improve the code.",
];

export function TypingTest({ onComplete }: TypingTestProps) {
    const reducedMotion = useReducedMotion();
    const itemVariants = createItemVariants(reducedMotion);

    // Core test state
    const [currentText, setCurrentText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [errors, setErrors] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);

    // Session and name management
    const [userSession, setUserSession] = useState<any>(null);
    const [showNameInput, setShowNameInput] = useState(false);
    const [tempName, setTempName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    // Initialize session and test
    useEffect(() => {
        try {
            console.log('🚀 Initializing typing test...');
            const session = getUserSession();
            console.log('👤 Session:', { hasSession: !!session, hasName: !!session?.name });
            setUserSession(session);

            if (session?.name) {
                setTempName(session.name);
            }

            // Initialize with a random text
            const randomText = testTexts[Math.floor(Math.random() * testTexts.length)];
            setCurrentText(randomText);
            console.log('📝 Text initialized:', randomText.substring(0, 50) + '...');

            // Focus the input field
            setTimeout(() => inputRef.current?.focus(), 100);
            setIsInitialized(true);
        } catch (error) {
            console.error('❌ Failed to initialize typing test:', error);
            // Fallback initialization without session
            const randomText = testTexts[Math.floor(Math.random() * testTexts.length)];
            setCurrentText(randomText);
            setIsInitialized(true);
        }
    }, []);

    const resetTest = useCallback(() => {
        const randomText = testTexts[Math.floor(Math.random() * testTexts.length)];
        setCurrentText(randomText);
        setIsStarted(false);
        setIsFinished(false);
        setUserInput("");
        setCurrentIndex(0);
        setStartTime(null);
        setWpm(0);
        setAccuracy(100);
        setErrors(0);
        setShowNameInput(false);
        setIsSubmitting(false);

        // Don't reset tempName if user already has a saved name
        if (!userSession?.name && tempName) {
            setTempName("");
        }

        setTimeout(() => inputRef.current?.focus(), 100);
    }, [userSession?.name, tempName]);

    const calculateWPM = useCallback((timeElapsed: number, correctChars: number) => {
        const minutes = timeElapsed / 60000;
        const words = correctChars / 5;
        return Math.round(words / minutes);
    }, []);

    const handleInputChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if (!isStarted && !isFinished && value.length > 0) {
            setIsStarted(true);
            setStartTime(new Date());
            setErrors(0);
        }

        if (isFinished) return;

        setUserInput(value);

        // Check if test is complete
        if (value === currentText) {
            const endTime = new Date();
            const timeElapsed = endTime.getTime() - (startTime?.getTime() || 0);
            const correctChars = currentText.length - errors;
            const finalWpm = calculateWPM(timeElapsed, correctChars);
            const finalAccuracy = Math.round((correctChars / currentText.length) * 100);

            setWpm(finalWpm);
            setAccuracy(finalAccuracy);
            setIsFinished(true);

            // Show name input if user doesn't have a saved name
            if (!userSession?.name) {
                setShowNameInput(true);
                setTimeout(() => nameInputRef.current?.focus(), 300);
            } else {
                // Auto-submit if user already has a name
                setIsSubmitting(true);
                try {
                    await onComplete(userSession.name, finalWpm, finalAccuracy, userSession.sessionId);
                    setTimeout(() => {
                        setIsSubmitting(false);
                        resetTest();
                    }, 1000); // Small delay to show success feedback
                } catch (error) {
                    console.error('Failed to submit test result:', error);
                    setIsSubmitting(false);
                }
            }
        } else {
            // Calculate current stats
            const currentTime = new Date();
            const timeElapsed = currentTime.getTime() - (startTime?.getTime() || 0);

            let currentErrors = 0;
            for (let i = 0; i < value.length; i++) {
                if (value[i] !== currentText[i]) {
                    currentErrors++;
                }
            }

            setErrors(currentErrors);
            setCurrentIndex(value.length);

            if (timeElapsed > 1000) {
                const correctChars = value.length - currentErrors;
                const currentWpm = calculateWPM(timeElapsed, correctChars);
                const currentAccuracy = value.length > 0 ? Math.round((correctChars / value.length) * 100) : 100;

                setWpm(currentWpm);
                setAccuracy(currentAccuracy);
            }
        }
    }, [isStarted, isFinished, currentText, startTime, errors, calculateWPM, userSession, onComplete, resetTest]);

    const handleSubmit = useCallback(async () => {
        if (tempName.trim() && userSession && !isSubmitting) {
            setIsSubmitting(true);
            try {
                updateUserSessionName(tempName.trim());
                setUserSession({ ...userSession, name: tempName.trim() });
                await onComplete(tempName.trim(), wpm, accuracy, userSession.sessionId);
                setTimeout(() => {
                    setIsSubmitting(false);
                    resetTest();
                }, 1000); // Small delay to show success feedback
            } catch (error) {
                console.error('Failed to submit test result:', error);
                setIsSubmitting(false);
            }
        }
    }, [tempName, wpm, accuracy, userSession, onComplete, resetTest, isSubmitting]);

    const renderText = () => {
        if (!currentText) {
            return <span className="text-muted-foreground">Loading text...</span>;
        }

        return currentText.split("").map((char, index) => {
            let className = "text-muted-foreground/60";

            if (index < userInput.length) {
                className = userInput[index] === char
                    ? "text-green-500 bg-green-500/10"
                    : "text-red-500 bg-red-500/20";
            } else if (index === currentIndex) {
                className = "text-foreground bg-primary/20 border-l-2 border-primary animate-pulse";
            }

            return (
                <span key={index} className={`${className} transition-colors duration-75`}>
                    {char}
                </span>
            );
        });
    };

    // Show loading state while initializing
    if (!isInitialized) {
        return (
            <motion.div
                key="initializing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
            >
                <div className="text-center space-y-4 bg-secondary/50 rounded-lg p-8">
                    <div className="animate-pulse text-muted-foreground">
                        Initializing typing test...
                    </div>
                </div>
            </motion.div>
        );
    }

    // Show loading state when submitting
    if (isSubmitting && !showNameInput) {
        return (
            <motion.div
                key="submitting"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                variants={itemVariants}
                className="space-y-8"
            >
                <motion.div
                    variants={itemVariants}
                    className="text-center space-y-6 bg-gradient-to-br from-primary/5 to-secondary/50 rounded-2xl p-8 border border-primary/10"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                        <Trophy className="mx-auto text-yellow-500 drop-shadow-lg" size={56} />
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-3">
                        <h2 className="text-3xl font-bold text-foreground">Submitting Your Score...</h2>
                        <div className="flex justify-center gap-8 text-center">
                            <div className="space-y-1">
                                <div className="text-3xl font-bold text-primary flex items-center gap-2">
                                    <Zap size={24} className="text-yellow-500" />
                                    {wpm}
                                </div>
                                <div className="text-sm text-muted-foreground font-medium">Words per minute</div>
                            </div>
                            <div className="w-px bg-border" />
                            <div className="space-y-1">
                                <div className="text-3xl font-bold text-green-500">{accuracy}%</div>
                                <div className="text-sm text-muted-foreground font-medium">Accuracy</div>
                            </div>
                        </div>
                        <p className="text-muted-foreground">Please wait while we save your score...</p>
                    </motion.div>
                </motion.div>
            </motion.div>
        );
    }

    if (showNameInput) {
        return (
            <motion.div
                key="name-input"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                variants={itemVariants}
                className="space-y-8"
            >
                <motion.div
                    variants={itemVariants}
                    className="text-center space-y-6 bg-gradient-to-br from-primary/5 to-secondary/50 rounded-2xl p-8 border border-primary/10"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                    >
                        <Trophy className="mx-auto text-yellow-500 drop-shadow-lg" size={56} />
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-3">
                        <h2 className="text-3xl font-bold text-foreground">Excellent Work!</h2>
                        <div className="flex justify-center gap-8 text-center">
                            <div className="space-y-1">
                                <div className="text-3xl font-bold text-primary flex items-center gap-2">
                                    <Zap size={24} className="text-yellow-500" />
                                    {wpm}
                                </div>
                                <div className="text-sm text-muted-foreground font-medium">Words per minute</div>
                            </div>
                            <div className="w-px bg-border" />
                            <div className="space-y-1">
                                <div className="text-3xl font-bold text-green-500">{accuracy}%</div>
                                <div className="text-sm text-muted-foreground font-medium">Accuracy</div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-4 max-w-sm mx-auto">
                        <div className="space-y-2">
                            <label htmlFor="guestName" className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <User size={16} />
                                What should we call you?
                            </label>
                            <input
                                ref={nameInputRef}
                                id="guestName"
                                type="text"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                className="w-full px-4 py-3 bg-background/80 backdrop-blur border border-border/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-center font-medium transition-all"
                                placeholder="Enter your name"
                                autoFocus
                            />
                        </div>

                        <div className="flex gap-3">
                            <motion.button
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                onClick={handleSubmit}
                                disabled={!tempName.trim() || isSubmitting}
                                className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-all disabled:hover:scale-100"
                            >
                                {isSubmitting ? "Submitting..." : "Join Leaderboard"}
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                                onClick={resetTest}
                                disabled={isSubmitting}
                                className="px-6 py-3 bg-secondary/80 text-secondary-foreground rounded-xl hover:bg-secondary font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Skip
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            key="typing-test"
            variants={itemVariants}
            className="space-y-8"
        >
            {/* Stats Display */}
            <AnimatePresence>
                {isStarted && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="flex justify-center gap-12"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-center bg-secondary/30 rounded-2xl p-4 min-w-[100px] border border-border/50"
                        >
                            <div className="text-3xl font-bold text-primary flex items-center justify-center gap-2">
                                <Zap size={20} className="text-yellow-500" />
                                {wpm}
                            </div>
                            <div className="text-sm text-muted-foreground font-medium">WPM</div>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-center bg-secondary/30 rounded-2xl p-4 min-w-[100px] border border-border/50"
                        >
                            <div className="text-3xl font-bold text-green-500">{accuracy}%</div>
                            <div className="text-sm text-muted-foreground font-medium">Accuracy</div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Text Display */}
            <motion.div
                variants={itemVariants}
                className="bg-gradient-to-br from-secondary/30 to-secondary/60 rounded-2xl p-8 border border-border/50 backdrop-blur-sm"
            >
                <div className="text-lg leading-relaxed font-mono max-w-4xl mx-auto tracking-wide">
                    {renderText()}
                </div>
            </motion.div>

            {/* Input Field and Controls */}
            <motion.div variants={itemVariants} className="space-y-6">
                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        disabled={isFinished}
                        className="w-full px-6 py-4 bg-background/80 backdrop-blur border border-border/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 text-center font-mono text-lg transition-all placeholder:text-muted-foreground/50"
                        placeholder={isStarted ? "Keep typing..." : "Click here and start typing to begin..."}
                        autoFocus
                    />
                    {!isStarted && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 pointer-events-none flex items-center justify-center"
                        >
                            <div className="text-sm text-muted-foreground/70 bg-background/90 px-3 py-1 rounded-full border border-border/30">
                                Start typing to begin the test
                            </div>
                        </motion.div>
                    )}
                </div>

                <AnimatePresence>
                    {isStarted && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="flex justify-center"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={resetTest}
                                className="flex items-center gap-2 px-6 py-3 bg-secondary/80 text-secondary-foreground rounded-xl hover:bg-secondary font-medium transition-all border border-border/50"
                            >
                                <RotateCcw size={18} />
                                Reset Test
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Welcome message for returning users */}
                {userSession?.name && !isStarted && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <p className="text-sm text-muted-foreground">
                            Welcome back, <span className="text-foreground font-medium">{userSession.name}</span>!
                            Your best scores will be automatically updated.
                        </p>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
} 