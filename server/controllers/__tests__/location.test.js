import { searchLocation } from '../location';

const mockRequest = (body = {}) => ({ body });
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('searchLocation', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it('should return location data when the API call is successful', async () => {
    const req = mockRequest({ query: 'New York' });
    const res = mockResponse();
    const mockResponseData = [{ city: 'New York', country: 'USA' }];

    fetch.mockResponseOnce(JSON.stringify(mockResponseData));

    await searchLocation(req, res);

    expect(fetch).toHaveBeenCalledWith(
      'https://api.api-ninjas.com/v1/city?name=New York',
      expect.objectContaining({
        method: 'GET',
        headers: { 'x-api-key': process.env.API_KEY },
      })
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ result: mockResponseData });
  });

  it('should return a 500 error when the API call fails', async () => {
    const req = mockRequest({ query: 'InvalidCity' });
    const res = mockResponse();

    fetch.mockRejectOnce(new Error('API failure'));

    await searchLocation(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Something went wrong' });
  });
});