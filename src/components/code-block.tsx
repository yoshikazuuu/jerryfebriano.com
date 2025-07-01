"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Copy, Check } from "lucide-react";
import { highlightCodeWithTheme, detectLanguage } from "@/lib/shiki-highlighter";

interface CodeBlockProps {
    children: string;
    className?: string;
}

export function CodeBlock({ children, className }: CodeBlockProps) {
    const [highlightedCode, setHighlightedCode] = useState<string>("");
    const [copied, setCopied] = useState(false);
    const { theme, systemTheme } = useTheme();
    const isDark = theme === "dark" || (theme === "system" && systemTheme === "dark");

    useEffect(() => {
        const highlightAsync = async () => {
            const lang = detectLanguage(className);
            const highlighted = await highlightCodeWithTheme(children, lang, isDark);
            setHighlightedCode(highlighted);
        };

        highlightAsync();
    }, [children, className, isDark]);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    // Show loading state while highlighting
    if (!highlightedCode) {
        return (
            <div className="relative group">
                <pre className="overflow-x-auto rounded-lg p-4 my-4 bg-secondary animate-pulse">
                    <code className="text-sm">{children}</code>
                </pre>
                <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 p-2 rounded-md bg-background/80 hover:bg-background border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    title="Copy code"
                >
                    {copied ? (
                        <Check className="h-4 w-4 text-green-500" />
                    ) : (
                        <Copy className="h-4 w-4 text-muted-foreground" />
                    )}
                </button>
            </div>
        );
    }

    return (
        <div className="relative group">
            <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
            <button
                onClick={copyToClipboard}
                className="absolute top-2 right-2 p-2 rounded-md bg-background/80 hover:bg-background border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                title="Copy code"
            >
                {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                ) : (
                    <Copy className="h-4 w-4 text-muted-foreground" />
                )}
            </button>
        </div>
    );
}

interface InlineCodeProps {
    children: React.ReactNode;
    className?: string;
}

export function InlineCode({ children, className, ...props }: InlineCodeProps & React.ComponentPropsWithoutRef<"code">) {
    return (
        <code
            className="bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded text-sm font-mono"
            {...props}
        >
            {children}
        </code>
    );
} 