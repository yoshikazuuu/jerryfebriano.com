import React, { useState, forwardRef } from "react";
import Image, { ImageProps } from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const SmoothBlurImage = forwardRef<HTMLDivElement, ImageProps>(
  ({ src, alt, width, height, ...props }, ref) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
      <div className="relative">
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ filter: "blur(40px)" }}
              animate={{ filter: "blur(30px)" }}
              exit={{ filter: "blur(0px)" }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
              }}
              className="absolute inset-0 rounded-md overflow-hidden"
            >
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="w-full h-full object-cover"
                placeholder="blur"
              />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          initial={{ filter: "blur(10px)", opacity: 0 }}
          animate={{
            filter: "blur(0px)",
            opacity: isLoading ? 0 : 1,
          }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            onLoad={() => setIsLoading(false)}
            {...props}
            className={`rounded-md drop-shadow-lg ${props.className || ""}`}
            placeholder="blur"
          />
        </motion.div>
      </div>
    );
  }
);

SmoothBlurImage.displayName = "SmoothBlurImage";

export default SmoothBlurImage;
