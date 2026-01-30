import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const UpdateWorkflowSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  nodes: z.array(z.any()).optional(),
  edges: z.array(z.any()).optional(),
});

export async function GET(request: NextRequest, context: any) {
  try {
    const user = await getCurrentUser();
    const id = context?.params?.id || (await context?.params)?.id;
    const workflow = await (prisma as any).workflow.findUnique({
      where: { id },
      include: {
        runs: {
          select: { id: true, status: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
    
    if (!workflow) {
      return NextResponse.json(
        { success: false, error: 'Workflow not found' },
        { status: 404 }
      );
    }
    
    if (workflow.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({
      success: true,
      workflow,
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch workflow' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: any) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const updates = UpdateWorkflowSchema.parse(body);
    const id = context?.params?.id || (await context?.params)?.id;
    const workflow = await (prisma as any).workflow.findUnique({ where: { id } });
    
    if (!workflow || workflow.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    const updated = await (prisma as any).workflow.update({
      where: { id },
      data: updates,
    });
    
    return NextResponse.json({
      success: true,
      workflow: updated,
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update workflow' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: any) {
  try {
    const user = await getCurrentUser();
    const id = context?.params?.id || (await context?.params)?.id;
    const workflow = await (prisma as any).workflow.findUnique({ where: { id } });
    
    if (!workflow || workflow.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    await (prisma as any).workflow.delete({ where: { id } });
    
    return NextResponse.json({
      success: true,
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete workflow' },
      { status: 500 }
    );
  }
}
