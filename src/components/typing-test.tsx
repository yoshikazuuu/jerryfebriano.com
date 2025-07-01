"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Trophy, User } from "lucide-react";
import { nanoid } from "nanoid";

interface TypingTestProps {
    onComplete: (name: string, wpm: number, accuracy: number, userId: string) => void;
}

const testTexts = [
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet and is perfect for testing typing skills.",
    "Programming is not about what you know; it is about what you can figure out. The best programmers are not necessarily the fastest typists.",
    "In a world where technology constantly evolves, the ability to adapt and learn new skills becomes more valuable than memorizing fixed knowledge.",
    "The art of debugging is figuring out what you really told your program to do rather than what you thought you told it to do.",
    "Good code is its own best documentation. As you are about to add a comment, ask yourself if there is a way to improve the code.",
];

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: { opacity: 0, y: -20 }
};

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

export function TypingTest({ onComplete }: TypingTestProps) {
    const [currentText, setCurrentText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isStarted, setIsStarted] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [errors, setErrors] = useState(0);
    const [showNameInput, setShowNameInput] = useState(false);
    const [guestName, setGuestName] = useState("");
    const [userId, setUserId] = useState("");

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        // Initialize with a random text
        const randomText = testTexts[Math.floor(Math.random() * testTexts.length)];
        setCurrentText(randomText);

        // Load user session from localStorage
        const storedSession = localStorage.getItem("typingTestSession");
        if (storedSession) {
            const { name, id } = JSON.parse(storedSession);
            setGuestName(name);
            setUserId(id);
        } else {
            // Generate new user ID if none exists
            const newUserId = nanoid();
            setUserId(newUserId);
        }

        // Focus the input field
        inputRef.current?.focus();
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
        setGuestName("");
    }, []);

    const calculateWPM = useCallback((timeElapsed: number, correctChars: number) => {
        const minutes = timeElapsed / 60000; // Convert ms to minutes
        const words = correctChars / 5; // Standard: 5 characters = 1 word
        return Math.round(words / minutes);
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Auto-start the test when user begins typing
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
            setShowNameInput(true);
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

            if (timeElapsed > 1000) { // Only calculate after 1 second
                const correctChars = value.length - currentErrors;
                const currentWpm = calculateWPM(timeElapsed, correctChars);
                const currentAccuracy = value.length > 0 ? Math.round((correctChars / value.length) * 100) : 100;

                setWpm(currentWpm);
                setAccuracy(currentAccuracy);
            }
        }
    }, [isStarted, isFinished, currentText, startTime, errors, calculateWPM]);

    const handleSubmit = useCallback(() => {
        if (guestName.trim()) {
            // Save session
            localStorage.setItem("typingTestSession", JSON.stringify({
                name: guestName.trim(),
                id: userId
            }));

            onComplete(guestName.trim(), wpm, accuracy, userId);
            resetTest();
        }
    }, [guestName, wpm, accuracy, userId, onComplete, resetTest]);

    const renderText = () => {
        return currentText.split("").map((char, index) => {
            let className = "text-muted-foreground";

            if (index < userInput.length) {
                className = userInput[index] === char ? "text-green-500" : "text-red-500 bg-red-500/20";
            } else if (index === currentIndex) {
                className = "text-foreground border-b-2 border-primary animate-pulse";
            }

            return (
                <span key={index} className={className}>
                    {char}
                </span>
            );
        });
    };

    if (showNameInput && !guestName) {
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-center space-y-6 bg-secondary/50 rounded-lg p-8 backdrop-blur-sm"
            >
                <motion.div variants={itemVariants} className="space-y-2">
                    <Trophy className="mx-auto text-yellow-500" size={48} />
                    <h2 className="text-2xl font-bold text-foreground">Test Complete!</h2>
                    <div className="text-muted-foreground space-y-1">
                        <p>WPM: <span className="text-foreground font-semibold">{wpm}</span></p>
                        <p>Accuracy: <span className="text-foreground font-semibold">{accuracy}%</span></p>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-4">
                    <div>
                        <label htmlFor="guestName" className="block text-sm font-medium text-muted-foreground mb-2">
                            Enter your name to join the leaderboard:
                        </label>
                        <div className="relative max-w-sm mx-auto">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <input
                                id="guestName"
                                type="text"
                                value={guestName}
                                onChange={(e) => setGuestName(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-center"
                                placeholder="Your name"
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleSubmit}
                            disabled={!guestName.trim()}
                            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                        >
                            Join Leaderboard
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={resetTest}
                            className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 font-medium"
                        >
                            Try Again
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key="typing-test"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="space-y-6"
            >
                {/* Stats Display */}
                {isStarted && (
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center gap-8 text-sm"
                    >
                        <div className="text-center">
                            <div className="text-2xl font-bold text-foreground">{wpm}</div>
                            <div className="text-muted-foreground">WPM</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-foreground">{accuracy}%</div>
                            <div className="text-muted-foreground">Accuracy</div>
                        </div>
                    </motion.div>
                )}

                {/* Text Display */}
                <motion.div
                    variants={itemVariants}
                    className="bg-secondary/50 rounded-lg p-6 backdrop-blur-sm"
                >
                    <div className="text-lg leading-relaxed font-mono max-w-3xl mx-auto">
                        {renderText()}
                    </div>
                </motion.div>

                {/* Input Field */}
                <motion.div variants={itemVariants} className="space-y-4">
                    <input
                        ref={inputRef}
                        type="text"
                        value={userInput}
                        onChange={handleInputChange}
                        disabled={isFinished}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-center font-mono"
                        placeholder="Start typing to begin the test..."
                        autoFocus
                    />

                    <div className="flex justify-center gap-4">
                        {isStarted && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={resetTest}
                                className="flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 font-medium"
                            >
                                <RotateCcw size={20} />
                                Reset
                            </motion.button>
                        )}
                    </div>
                </motion.div>

                {guestName && (
                    <motion.div
                        variants={itemVariants}
                        className="text-center text-sm text-muted-foreground"
                    >
                        Playing as: <span className="font-medium text-foreground">{guestName}</span>
                    </motion.div>
                )}
            </motion.div>
        </AnimatePresence>
    );
} 