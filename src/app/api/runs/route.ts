import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser();
        const searchParams = request.nextUrl.searchParams;
        const workflowId = searchParams.get('workflowId');
        const limit = parseInt(searchParams.get('limit') || '20');
        const skip = parseInt(searchParams.get('skip') || '0');
        
        const where: any = { userId: user.id };
        if (workflowId) {
          where.workflowId = workflowId;
        }
        
        const [runs, total] = await Promise.all([
          (prisma as any).workflowRun.findMany({
            where,
            include: {
              nodeResults: {
                select: {
                  id: true,
                  nodeId: true,
                  nodeType: true,
                  status: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
          }),
          (prisma as any).workflowRun.count({ where }),
        ]);
        
        return NextResponse.json({
          success: true,
          runs,
          total,
          hasMore: skip + limit < total,
        });
    } catch (error: any) {
        console.error("Failed to fetch runs:", error);
        return NextResponse.json(
            { error: "Failed to fetch run history" },
            { status: 500 }
        );
    }
}
