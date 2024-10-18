const containerVariants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
            filter: { duration: 1 },
        },
    },
    exit: { opacity: 0, filter: "blur(50px)", transition: { duration: 0.5 } },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0, filter: "blur(5px)" },
    visible: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: { type: "spring", stiffness: 100, filter: { duration: 0.3 } },
    },
};

export { containerVariants, itemVariants };