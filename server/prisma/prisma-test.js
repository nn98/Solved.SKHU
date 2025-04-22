const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const result = prisma.user.findMany({
        orderBy: { skhurank: 'asc' }
    }).then();
    console.log(result)
}

main();
