
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        const count = await prisma.workflowRun.count();
        console.log(`Total WorkflowRuns: ${count}`);

        const runs = await prisma.workflowRun.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { user: true }
        });

        console.log("Recent Runs:", JSON.stringify(runs, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
