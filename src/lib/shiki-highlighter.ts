import { codeToHtml } from 'shiki'

interface HighlightOptions {
    lang?: string
    theme?: 'catppuccin-latte' | 'catppuccin-frappe' | 'catppuccin-macchiato' | 'catppuccin-mocha'
}

export async function highlightCode(
    code: string,
    options: HighlightOptions = {}
): Promise<string> {
    const { lang = 'javascript', theme = 'catppuccin-mocha' } = options

    try {
        const html = await codeToHtml(code, {
            lang,
            theme,
            transformers: [
                {
                    pre(node) {
                        // Add custom classes to the pre element
                        this.addClassToHast(node, 'overflow-x-auto')
                        this.addClassToHast(node, 'rounded-lg')
                        this.addClassToHast(node, 'p-4')
                        this.addClassToHast(node, 'my-4')
                    },
                    code(node) {
                        // Add custom classes to the code element
                        this.addClassToHast(node, 'text-sm')
                    }
                }
            ]
        })
        return html
    } catch (error) {
        console.error('Syntax highlighting failed:', error)
        // Fallback to plain code block
        return `<pre class="overflow-x-auto rounded-lg p-4 my-4 bg-gray-100 dark:bg-gray-800"><code class="text-sm">${escapeHtml(code)}</code></pre>`
    }
}

// Helper function to detect language from className (e.g., "language-tsx" -> "tsx")
export function detectLanguage(className?: string): string {
    if (!className) return 'text'

    const match = className.match(/language-(\w+)/)
    return match ? match[1] : 'text'
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    }
    return text.replace(/[&<>"']/g, (m) => map[m])
}

// Theme-aware highlighting function
export async function highlightCodeWithTheme(
    code: string,
    lang?: string,
    isDark: boolean = true
): Promise<string> {
    const theme = isDark ? 'catppuccin-mocha' : 'catppuccin-latte'
    return highlightCode(code, { lang, theme })
} 