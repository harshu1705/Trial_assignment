import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const CreateWorkflowSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  nodes: z.array(z.any()),
  edges: z.array(z.any()),
});

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    const workflows = await (prisma as any).workflow.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        description: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
        runs: {
          select: { id: true, status: true },
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    
    return NextResponse.json({
      success: true,
      workflows,
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch workflows' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const { name, description, nodes, edges } = CreateWorkflowSchema.parse(body);
    
    const workflow = await (prisma as any).workflow.create({
      data: {
        userId: user.id,
        name,
        description,
        nodes,
        edges,
      },
    });
    
    return NextResponse.json({
      success: true,
      workflow,
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create workflow' },
      { status: 500 }
    );
  }
}
