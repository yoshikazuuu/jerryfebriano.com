"use client";

import { useState, useEffect } from "react"

// Hook to detect user's motion preference
export function useReducedMotion(): boolean {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
        setPrefersReducedMotion(mediaQuery.matches)

        const handler = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(event.matches)
        }

        mediaQuery.addEventListener('change', handler)
        return () => mediaQuery.removeEventListener('change', handler)
    }, [])

    return prefersReducedMotion
}

// Helper to get motion-aware transition duration
export function getMotionDuration(duration: number, reducedMotion: boolean): number {
    return reducedMotion ? Math.min(duration * 0.3, 0.2) : duration
}

// Helper to get motion-aware spring config
export function getMotionSpring(reducedMotion: boolean) {
    return reducedMotion
        ? { type: "tween", duration: 0.2, ease: "easeOut" }
        : { type: "spring", stiffness: 300, damping: 25 }
}

// Helper to get motion-aware transition config
export function getMotionTransition(config: any, reducedMotion: boolean) {
    if (reducedMotion) {
        return {
            type: "tween",
            duration: 0.15,
            ease: "easeOut"
        }
    }
    return config
} 