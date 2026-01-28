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
                // Explicitly excluding payload for performance and simplified view
            },
        });

        return NextResponse.json({ runs });
    } catch (error) {
        console.error("Failed to fetch workflow runs:", error);
        return NextResponse.json(
            { error: "Failed to fetch runs" },
            { status: 500 }
        );
    }
}
