const AlgorithmController = require('../../controllers/algorithmController');
const AlgorithmModel = require('../../models/algorithmModel');

// 모델 메서드 mock 처리
jest.mock('../../models/algorithmModel', () => ({
    getMaxAlgorithm: jest.fn(),
    getMinAlgorithm: jest.fn(),
    getBestAlgorithm: jest.fn(),
    getWorstAlgorithm: jest.fn(),
}));

describe('AlgorithmController', () => {
    let req, res;

    beforeEach(() => {
        req = {}; // 요청 객체 (파라미터가 없으므로 빈 객체)
        res = {
            json: jest.fn(), // res.json() 모의 함수
            status: jest.fn().mockReturnThis(), // res.status().json() 체이닝을 위해 mockReturnThis()
        };
        jest.clearAllMocks(); // 각 테스트 전 mock 초기화
    });

    describe('getMaxAlgorithm', () => {
        it('성공 시 200 상태와 결과 반환', async () => {
            const mockData = [{ problem_id: 1, namekr: '최대 알고리즘' }];
            AlgorithmModel.getMaxAlgorithm.mockResolvedValue(mockData);

            await AlgorithmController.getMaxAlgorithm(req, res);

            expect(res.status).not.toHaveBeenCalled(); // 200은 기본 상태 코드
            expect(res.json).toHaveBeenCalledWith(mockData);
        });

        it('에러 발생 시 500 상태와 에러 메시지 반환', async () => {
            const mockError = new Error('DB 오류');
            AlgorithmModel.getMaxAlgorithm.mockRejectedValue(mockError);

            await AlgorithmController.getMaxAlgorithm(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'DB 오류' });
        });
    });

    describe('getMinAlgorithm', () => {
        it('성공 시 200 상태와 결과 반환', async () => {
            const mockData = [{ problem_id: 2, namekr: '최소 알고리즘' }];
            AlgorithmModel.getMinAlgorithm.mockResolvedValue(mockData);

            await AlgorithmController.getMinAlgorithm(req, res);

            expect(res.json).toHaveBeenCalledWith(mockData);
        });

        it('에러 발생 시 500 상태와 에러 메시지 반환', async () => {
            const mockError = new Error('DB 오류');
            AlgorithmModel.getMinAlgorithm.mockRejectedValue(mockError);

            await AlgorithmController.getMinAlgorithm(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'DB 오류' });
        });
    });

    // getBestAlgorithm, getWorstAlgorithm에 대한 테스트도 동일한 패턴으로 작성
    describe('getBestAlgorithm', () => {
        it('성공 시 결과 반환', async () => {
            const mockData = [{ problem_id: 3, namekr: '최고 알고리즘' }];
            AlgorithmModel.getBestAlgorithm.mockResolvedValue(mockData);

            await AlgorithmController.getBestAlgorithm(req, res);
            expect(res.json).toHaveBeenCalledWith(mockData);
        });

        it('에러 발생 시 500 상태와 에러 메시지 반환', async () => {
            const mockError = new Error('DB 오류');
            AlgorithmModel.getBestAlgorithm.mockRejectedValue(mockError);

            await AlgorithmController.getBestAlgorithm(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'DB 오류' });
        });
    });

    describe('getWorstAlgorithm', () => {
        it('성공 시 결과 반환', async () => {
            const mockData = [{ problem_id: 4, namekr: '최악 알고리즘' }];
            AlgorithmModel.getWorstAlgorithm.mockResolvedValue(mockData);

            await AlgorithmController.getWorstAlgorithm(req, res);
            expect(res.json).toHaveBeenCalledWith(mockData);
        });

        it('에러 발생 시 500 상태와 에러 메시지 반환', async () => {
            const mockError = new Error('DB 오류');
            AlgorithmModel.getWorstAlgorithm.mockRejectedValue(mockError);

            await AlgorithmController.getWorstAlgorithm(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: 'DB 오류' });
        });
    });
});
