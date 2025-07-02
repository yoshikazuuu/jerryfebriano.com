import { nanoid } from "nanoid";

interface UserSession {
    sessionId: string;
    name?: string;
    createdAt: string;
    lastActive: string;
}

// Generate a browser fingerprint for additional uniqueness
function generateBrowserFingerprint(): string {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
        return 'ssr_' + Math.random().toString(16).substring(2);
    }

    try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.fillText('Browser fingerprint', 2, 2);
        }

        const fingerprint = [
            navigator.userAgent,
            navigator.language,
            screen.width + 'x' + screen.height,
            screen.colorDepth,
            new Date().getTimezoneOffset(),
            canvas.toDataURL()
        ].join('|');

        // Create a simple hash
        let hash = 0;
        for (let i = 0; i < fingerprint.length; i++) {
            const char = fingerprint.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }

        return Math.abs(hash).toString(16);
    } catch (error) {
        console.warn('Failed to generate browser fingerprint:', error);
        return 'fallback_' + Math.random().toString(16).substring(2);
    }
}

export function getUserSession(): UserSession {
    const STORAGE_KEY = 'typing_test_session';

    // Handle SSR - return a temporary session that will be replaced on client
    if (typeof window === 'undefined') {
        const tempSessionId = 'ssr_temp_' + Date.now();
        return {
            sessionId: tempSessionId,
            createdAt: new Date().toISOString(),
            lastActive: new Date().toISOString()
        };
    }

    try {
        // Try to get existing session from localStorage
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const session: UserSession = JSON.parse(stored);
            // Update last active timestamp
            session.lastActive = new Date().toISOString();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(session));

            console.log('📱 Session found:', {
                sessionId: session.sessionId.substring(0, 8) + '...',
                hasName: !!session.name,
                age: new Date().getTime() - new Date(session.createdAt).getTime()
            });

            return session;
        }
    } catch (error) {
        console.warn('❌ Failed to read session from localStorage:', error);
    }

    // Create new session
    const fingerprint = generateBrowserFingerprint();
    const sessionId = `${fingerprint}_${nanoid(12)}`;
    const now = new Date().toISOString();

    const newSession: UserSession = {
        sessionId,
        createdAt: now,
        lastActive: now
    };

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
        console.log('🆕 New session created:', {
            sessionId: sessionId.substring(0, 8) + '...',
            fingerprint: fingerprint.substring(0, 8) + '...'
        });
    } catch (error) {
        console.warn('❌ Failed to save session to localStorage:', error);
    }

    return newSession;
}

export function updateUserSessionName(name: string): void {
    const STORAGE_KEY = 'typing_test_session';

    // Skip during SSR
    if (typeof window === 'undefined') {
        return;
    }

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const session: UserSession = JSON.parse(stored);
            session.name = name;
            session.lastActive = new Date().toISOString();
            localStorage.setItem(STORAGE_KEY, JSON.stringify(session));

            console.log('👤 Session name updated:', {
                sessionId: session.sessionId.substring(0, 8) + '...',
                name: name
            });
        }
    } catch (error) {
        console.warn('❌ Failed to update session name:', error);
    }
}

export function clearUserSession(): void {
    const STORAGE_KEY = 'typing_test_session';

    // Skip during SSR
    if (typeof window === 'undefined') {
        return;
    }

    try {
        localStorage.removeItem(STORAGE_KEY);
        console.log('🗑️ Session cleared');
    } catch (error) {
        console.warn('❌ Failed to clear session:', error);
    }
} 