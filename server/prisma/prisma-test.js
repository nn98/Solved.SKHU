const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const RatingModel = require('../models/ratingModel');

async function main() {
    const userId = 'q9922000';
    const skhurank = 6;
    const result =
        RatingModel.getProblemsAndUsers(userId, skhurank);
    console.log(users);
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
