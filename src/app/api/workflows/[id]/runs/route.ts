import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: any) {
    try {
        // Note: We currently ignore the `id` param because the WorkflowRun model
        // does not link to a Workflow model in this assignment context.
        const id = context?.params?.id || (await context?.params)?.id;

        const runs = await (prisma as any).workflowRun.findMany({
            take: 10,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                createdAt: true,
                status: true,
                input: true,
                output: true,
                triggerId: true,
                errorMessage: true,
            },
        });

        const formattedRuns = runs.map((run: any) => ({
            id: run.id,
            createdAt: run.createdAt,
            status: run.status,
            input: run.input ?? null,
            output: run.output ?? null,
            triggerId: run.triggerId ?? null,
            errorMessage: run.errorMessage ?? null,
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
