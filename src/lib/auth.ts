import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

/**
 * Get authenticated user from Clerk
 * Throws if not authenticated
 */
export async function requireAuth() {
  const session = await auth();
  
  if (!session || !session.userId) {
    throw new Error('Unauthorized');
  }
  
  return session.userId;
}

/**
 * Get or create user in database from Clerk user
 */
export async function getOrCreateUser(clerkId: string, email: string) {
  let user = await (prisma as any).user.findUnique({ where: { clerkId } });

  if (!user) {
    user = await (prisma as any).user.create({ data: { clerkId, email } });
  }

  return user;
}

/**
 * Get current user with database record
 */
export async function getCurrentUser() {
  const clerkId = await requireAuth();
  const session = await auth();
  
  const user = await getOrCreateUser(clerkId, session?.sessionClaims?.email as string);
  return user;
}
