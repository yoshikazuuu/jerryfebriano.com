import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";

export const runtime = 'edge';

interface GuestEntry {
    id: string;
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
            return NextResponse.json(
                { error: "Database not available" },
                { status: 500 }
            );
        }

        // Query entries sorted by WPM descending, then accuracy descending
        const { results } = await db.prepare(`
            SELECT id, name, wpm, accuracy, timestamp 
            FROM guestbook_entries 
            ORDER BY wpm DESC, accuracy DESC
            LIMIT 100
        `).all();

        return NextResponse.json({ entries: results || [] });
    } catch (error) {
        console.error("Error fetching guestbook:", error);
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
            console.error("Database connection failed");
            return NextResponse.json(
                { error: "Database not available" },
                { status: 500 }
            );
        }

        const { name, wpm, accuracy, userId } = await request.json();

        console.log(`Submission attempt - Name: ${name}, WPM: ${wpm}, Accuracy: ${accuracy}, UserId: ${userId}`);

        // Validate input
        if (!name || typeof name !== "string" || name.trim().length === 0) {
            console.warn("Invalid name submitted:", name);
            return NextResponse.json(
                { error: "Name is required" },
                { status: 400 }
            );
        }

        if (!userId) {
            console.warn("No userId provided for submission");
            return NextResponse.json(
                { error: "User ID is required" },
                { status: 400 }
            );
        }

        if (typeof wpm !== "number" || wpm < 0 || wpm > 500) {
            return NextResponse.json(
                { error: "Invalid WPM value" },
                { status: 400 }
            );
        }

        if (typeof accuracy !== "number" || accuracy < 0 || accuracy > 100) {
            return NextResponse.json(
                { error: "Invalid accuracy value" },
                { status: 400 }
            );
        }

        // Sanitize name
        const sanitizedName = name.trim().substring(0, 50);

        // Create new entry
        const id = nanoid();
        const timestamp = new Date().toISOString();
        const roundedWpm = Math.round(wpm);
        const roundedAccuracy = Math.round(accuracy);

        // Insert new entry into database
        await db.prepare(`
            INSERT INTO guestbook_entries (id, name, wpm, accuracy, timestamp)
            VALUES (?, ?, ?, ?, ?)
        `).bind(id, sanitizedName, roundedWpm, roundedAccuracy, timestamp).run();

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
            name: sanitizedName,
            wpm: roundedWpm,
            accuracy: roundedAccuracy,
            timestamp,
        };

        // Log successful submission
        console.log(`New entry saved - ID: ${id}, User: ${sanitizedName}, UserId: ${userId}`);

        return NextResponse.json(newEntry, { status: 201 });
    } catch (error) {
        console.error("Error saving guestbook entry:", error);
        return NextResponse.json(
            { error: "Failed to save guestbook entry" },
            { status: 500 }
        );
    }
} 