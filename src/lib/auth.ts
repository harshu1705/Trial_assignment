import { auth, currentUser } from '@clerk/nextjs/server';
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
  let user = await prisma.user.findUnique({ where: { clerkId } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId,
        email
      }
    });
  }

  return user;
}

/**
 * Get current user with database record
 */
export async function getCurrentUser() {
  const clerkId = await requireAuth();

  // Try to find user in DB first
  let user = await prisma.user.findUnique({ where: { clerkId } });

  if (user) {
    return user;
  }

  // If not found, fetch details from Clerk to create
  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress;

  if (!email) {
    throw new Error("Email not found for user");
  }

  return await getOrCreateUser(clerkId, email);
}
