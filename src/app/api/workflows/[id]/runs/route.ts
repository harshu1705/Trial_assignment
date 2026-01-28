import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // Note: We currently ignore the `id` param because the WorkflowRun model
        // does not link to a Workflow model in this assignment context.
        const { id } = await params;

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
                payload: true, // Include payload for node details
            },
        });

        const formattedRuns = runs.map(run => ({
            ...run,
            payload: run.payload ? JSON.parse(run.payload) : null,
        }));

        return NextResponse.json({ runs: formattedRuns });
    } catch (error) {
        console.error("Failed to fetch workflow runs:", error);
        return NextResponse.json(
            { error: "Failed to fetch runs" },
            { status: 500 }
        );
    }
}
