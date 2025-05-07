const AlgorithmModel = require('../../models/algorithmModel');
const prisma = require('../../prisma/client');

// prisma.$queryRaw를 mock 처리
jest.mock('../../prisma/client', () => ({
    $queryRaw: jest.fn(),
}));

describe('AlgorithmModel', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getMaxAlgorithm: 쿼리 결과 반환', async () => {
        const mockResult = [{ problem_id: 1, namekr: '문제1', sum: 100 }];
        prisma.$queryRaw.mockResolvedValue(mockResult);

        const result = await AlgorithmModel.getMaxAlgorithm();
        expect(prisma.$queryRaw).toHaveBeenCalled();
        expect(result).toEqual(mockResult);
    });

    it('getMinAlgorithm: 쿼리 결과 반환', async () => {
        const mockResult = [{ problem_id: 2, namekr: '문제2', sum: 1 }];
        prisma.$queryRaw.mockResolvedValue(mockResult);

        const result = await AlgorithmModel.getMinAlgorithm();
        expect(prisma.$queryRaw).toHaveBeenCalled();
        expect(result).toEqual(mockResult);
    });

    it('getBestAlgorithm: 쿼리 결과 반환', async () => {
        const mockResult = [{ problem_id: 3, namekr: '문제3', rate: '99', solved_rank: 1 }];
        prisma.$queryRaw.mockResolvedValue(mockResult);

        const result = await AlgorithmModel.getBestAlgorithm();
        expect(prisma.$queryRaw).toHaveBeenCalled();
        expect(result).toEqual(mockResult);
    });

    it('getWorstAlgorithm: 쿼리 결과 반환', async () => {
        const mockResult = [{ problem_id: 4, namekr: '문제4', rate: '1', solved_rank: 10 }];
        prisma.$queryRaw.mockResolvedValue(mockResult);

        const result = await AlgorithmModel.getWorstAlgorithm();
        expect(prisma.$queryRaw).toHaveBeenCalled();
        expect(result).toEqual(mockResult);
    });
});
