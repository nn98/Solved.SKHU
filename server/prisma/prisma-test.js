const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    try {
        // 실제 존재하는 테이블/모델명으로 테스트
        const result = await prisma.problem.findMany({ take: 1 });
        console.log('쿼리 결과:', result);
    } catch (e) {
        console.error('에러:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
