import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export const runtime = 'edge';

interface GuestEntry {
    id: string;
    user_session_id: string;
    name: string;
    wpm: number;
    accuracy: number;
    timestamp: string;
}

// Get Cloudflare D1 database binding
function getDB() {
    // @ts-ignore - Cloudflare D1 binding
    return globalThis.DB || process.env.DB;
}

export async function GET() {
    try {
        const db = getDB();

        if (!db) {
            console.error('❌ Database not available in GET request');
            return NextResponse.json(
                { error: "Database not available" },
                { status: 500 }
            );
        }

        // Query entries sorted by WPM descending, then accuracy descending
        const { results } = await db.prepare(`
            SELECT id, user_session_id, name, wpm, accuracy, timestamp 
            FROM guestbook_entries 
            ORDER BY wpm DESC, accuracy DESC
            LIMIT 100
        `).all();

        console.log('📊 Leaderboard fetched:', {
            totalEntries: results?.length || 0,
            topWpm: results?.[0]?.wpm || 0
        });

        return NextResponse.json({ entries: results || [] });
    } catch (error) {
        console.error("❌ Error fetching guestbook:", error);
        return NextResponse.json(
            { error: "Failed to fetch guestbook data" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const db = getDB();

        if (!db) {
            console.error('❌ Database not available in POST request');
            return NextResponse.json(
                { error: "Database not available" },
                { status: 500 }
            );
        }

        const { name, wpm, accuracy, sessionId } = await request.json();

        console.log('📝 New submission attempt:', {
            sessionId: sessionId?.substring(0, 8) + '...' || 'missing',
            name: name || 'missing',
            wpm,
            accuracy
        });

        // Validate input
        if (!sessionId || typeof sessionId !== "string" || sessionId.trim().length === 0) {
            console.warn('❌ Missing or invalid session ID');
            return NextResponse.json(
                { error: "Session ID is required" },
                { status: 400 }
            );
        }

        if (!name || typeof name !== "string" || name.trim().length === 0) {
            console.warn('❌ Missing or invalid name');
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400 }
            );
        }

        if (typeof wpm !== "number" || wpm < 0 || wpm > 500) {
            console.warn('❌ Invalid WPM value:', wpm);
            return NextResponse.json(
                { error: "Invalid WPM value" },
                { status: 400 }
            );
        }

        if (typeof accuracy !== "number" || accuracy < 0 || accuracy > 100) {
            console.warn('❌ Invalid accuracy value:', accuracy);
            return NextResponse.json(
                { error: "Invalid accuracy value" },
                { status: 400 }
            );
        }

        // Check if user already has an entry
        const existingEntry = await db.prepare(`
            SELECT id, name, wpm, accuracy FROM guestbook_entries 
            WHERE user_session_id = ?
        `).bind(sessionId).first();

        if (existingEntry) {
            console.log('🔄 User already has entry:', {
                sessionId: sessionId.substring(0, 8) + '...',
                existingWpm: existingEntry.wpm,
                newWpm: wpm,
                isImprovement: wpm > existingEntry.wpm
            });

            // Update existing entry if new score is better
            if (wpm > existingEntry.wpm || (wpm === existingEntry.wpm && accuracy > existingEntry.accuracy)) {
                const sanitizedName = name.trim().substring(0, 50);
                const roundedWpm = Math.round(wpm);
                const roundedAccuracy = Math.round(accuracy);
                const timestamp = new Date().toISOString();

                await db.prepare(`
                    UPDATE guestbook_entries 
                    SET name = ?, wpm = ?, accuracy = ?, timestamp = ?
                    WHERE user_session_id = ?
                `).bind(sanitizedName, roundedWpm, roundedAccuracy, timestamp, sessionId).run();

                const updatedEntry: GuestEntry = {
                    id: existingEntry.id,
                    user_session_id: sessionId,
                    name: sanitizedName,
                    wpm: roundedWpm,
                    accuracy: roundedAccuracy,
                    timestamp,
                };

                console.log('✅ Entry updated with better score');
                return NextResponse.json(updatedEntry, { status: 200 });
            } else {
                console.log('📝 Score not better, returning existing entry');
                return NextResponse.json({
                    ...existingEntry,
                    user_session_id: sessionId,
                    message: "You already have a better score!"
                }, { status: 200 });
            }
        }

        // Sanitize input
        const sanitizedName = name.trim().substring(0, 50);
        const roundedWpm = Math.round(wpm);
        const roundedAccuracy = Math.round(accuracy);

        // Create new entry
        const id = nanoid();
        const timestamp = new Date().toISOString();

        // Insert new entry into database
        await db.prepare(`
            INSERT INTO guestbook_entries (id, user_session_id, name, wpm, accuracy, timestamp)
            VALUES (?, ?, ?, ?, ?, ?)
        `).bind(id, sessionId, sanitizedName, roundedWpm, roundedAccuracy, timestamp).run();

        // Clean up old entries - keep only top 100
        await db.prepare(`
            DELETE FROM guestbook_entries 
            WHERE id NOT IN (
                SELECT id FROM guestbook_entries 
                ORDER BY wpm DESC, accuracy DESC 
                LIMIT 100
            )
        `).run();

        const newEntry: GuestEntry = {
            id,
            user_session_id: sessionId,
            name: sanitizedName,
            wpm: roundedWpm,
            accuracy: roundedAccuracy,
            timestamp,
        };

        console.log('✅ New entry created:', {
            sessionId: sessionId.substring(0, 8) + '...',
            name: sanitizedName,
            wpm: roundedWpm,
            accuracy: roundedAccuracy
        });

        return NextResponse.json(newEntry, { status: 201 });
    } catch (error) {
        console.error("❌ Error saving guestbook entry:", error);
        return NextResponse.json(
            { error: "Failed to save guestbook entry" },
            { status: 500 }
        );
    }
} 