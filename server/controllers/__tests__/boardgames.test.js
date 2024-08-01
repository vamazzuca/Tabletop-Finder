import { searchBoardGame, getBoardGame } from '../boardgames';
import { getBggSearch, getBggThing } from 'bgg-xml-api-client';


jest.mock('bgg-xml-api-client', () => ({
    getBggSearch: jest.fn(),
    getBggThing: jest.fn(),
}));


const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

describe('Board Game Controller', () => {
    describe('searchBoardGame', () => {
        it('should return search results for board games', async () => {
            const req = mockRequest({ query: 'Catan' });
            const res = mockResponse();
            const mockResponseData = { games: [{ id: 1, name: 'Catan' }] };

      
            getBggSearch.mockResolvedValue(mockResponseData);

            await searchBoardGame(req, res);

            expect(getBggSearch).toHaveBeenCalledWith(
                { query: 'Catan', type: 'boardgame' },
                { timeout: 5000 }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ result: mockResponseData });
        });

        it('should handle errors', async () => {
            const req = mockRequest({ query: 'Catan' });
            const res = mockResponse();

      
            getBggSearch.mockRejectedValue(new Error('API error'));

            await searchBoardGame(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
        });
    });

    describe('getBoardGame', () => {
        it('should return board game details by id', async () => {
            const req = mockRequest({ id: 1 });
            const res = mockResponse();
            const mockResponseData = { game: { id: 1, name: 'Catan', description: '...' } };

        
            getBggThing.mockResolvedValue(mockResponseData);

            await getBoardGame(req, res);

            expect(getBggThing).toHaveBeenCalledWith(
                { id: 1 },
                { timeout: 5000 }
            );
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ result: mockResponseData });
        });

        it('should handle errors', async () => {
            const req = mockRequest({ id: 1 });
            const res = mockResponse();

            getBggThing.mockRejectedValue(new Error('API error'));

            await getBoardGame(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
        });
    });
});