import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const dynamic = 'force-dynamic';

export async function GET(request: Request, context: any) {
    try {
        // Get the authenticated user
        const { userId } = await auth();

        // If no user is authenticated, return empty array
        if (!userId) {
            return NextResponse.json({ runs: [] });
        }

        // Note: We currently ignore the `id` param because the WorkflowRun model
        // does not link to a Workflow model in this assignment context.
        const id = context?.params?.id || (await context?.params)?.id;

        // Fetch runs for the authenticated user
        const runs = await prisma.workflowRun.findMany({
            where: {
                userId: userId,
            },
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

        // Format runs to match the expected format by RunHistorySidebar
        const formattedRuns = runs.map((run: any) => {
            // Parse output if it's a string (SQLite)
            let output = run.output;
            if (typeof output === 'string') {
                try {
                    output = JSON.parse(output);
                } catch (e) {
                    output = {};
                }
            }

            return {
                id: run.id,
                createdAt: run.createdAt.toISOString(),
                status: run.status,
                scope: 'full', // Default scope
                payload: {
                    results: output?.results || {},
                    llmResponse: output?.llmResponse,
                },
            };
        });

        return NextResponse.json({ runs: formattedRuns });
    } catch (error) {
        console.error("Failed to fetch workflow runs:", error);
        // Return empty array instead of error to prevent UI breaking
        return NextResponse.json({ runs: [] });
    }
}
