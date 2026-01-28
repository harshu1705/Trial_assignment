import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic'; // Ensure no caching

export async function GET() {
    try {
        const runs = await prisma.workflowRun.findMany({
            take: 10,
            orderBy: {
                createdAt: 'desc',
            },
            select: {
                id: true,
                createdAt: true,
                status: true,
                scope: true,
                payload: true,
            }
        });

        const formattedRuns = runs.map(run => ({
            ...run,
            payload: JSON.parse(run.payload)
        }));

        return NextResponse.json({ runs: formattedRuns });
    } catch (error: any) {
        console.error("Failed to fetch runs:", error);
        return NextResponse.json(
            { error: "Failed to fetch run history" },
            { status: 500 }
        );
    }
}
