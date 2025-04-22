const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    prisma.qna.create({
        data: {
            content : 'test',
            userip: '155',
            user_id: 'test',
            problem: 1000,
        }
    });
}

main();
