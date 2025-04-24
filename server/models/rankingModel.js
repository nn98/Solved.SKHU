const prisma = require('../prisma/client');

class RankingModel {
    static async getAllUsersByRank() {
        return prisma.user.findMany({
            orderBy: { skhurank: 'asc' }
        });
    }
}

module.exports = RankingModel;
