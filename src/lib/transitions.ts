import { getMotionDuration, getMotionTransition } from "./motion-utils";

// Fast, smooth transition configs
const createContainerVariants = (reducedMotion: boolean = false) => ({
    hidden: {
        opacity: 0,
        filter: reducedMotion ? "blur(0px)" : "blur(5px)"
    },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            staggerChildren: reducedMotion ? 0 : 0.1,
            delayChildren: reducedMotion ? 0 : 0.05,
            duration: getMotionDuration(0.3, reducedMotion),
            filter: { duration: getMotionDuration(0.4, reducedMotion) },
        },
    },
    exit: {
        opacity: 0,
        filter: reducedMotion ? "blur(0px)" : "blur(10px)",
        transition: { duration: getMotionDuration(0.2, reducedMotion) }
    },
});

const createItemVariants = (reducedMotion: boolean = false) => ({
    hidden: {
        y: reducedMotion ? 0 : 10,
        opacity: 0,
        filter: reducedMotion ? "blur(0px)" : "blur(2px)"
    },
    visible: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: getMotionTransition({
            type: "spring",
            stiffness: 200,
            damping: 20,
            filter: { duration: 0.2 }
        }, reducedMotion),
    },
});

// Layout transition variants - faster and smoother
const createLayoutVariants = (reducedMotion: boolean = false) => ({
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: {
            duration: getMotionDuration(0.15, reducedMotion),
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: getMotionDuration(0.1, reducedMotion),
            ease: "easeIn"
        }
    }
});

// Legacy exports for backward compatibility
export const containerVariants = createContainerVariants(false);
export const itemVariants = createItemVariants(false);

// New motion-aware exports
export { createContainerVariants, createItemVariants, createLayoutVariants };