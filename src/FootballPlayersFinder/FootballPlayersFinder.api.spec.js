import fetchFootballPlayers from './FootballPlayersFinder.api';
import FOOTBALL_PLAYERS_URL from './FootballPlayersFinder.constants';

const mockFetch = () => {
  global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
    status: 200,
    statusText: 'OK',
    json: () => null,
  }));
};

const mockFetchSuccess = () => {
  global.fetch = jest.fn().mockImplementationOnce(() => Promise.resolve({
    status: 200,
    statusText: 'OK',
    json: () => ([
      {
        contractUntil: '2022-06-30',
        dateOfBirth: '1993-05-13',
        jerseyNumber: 9,
        name: 'Romelu Lukaku',
        nationality: 'Belgium',
        position: 'Centre-Forward',
      },
    ]),
  }));
};

const mockFetchFailure = () => {
  global.fetch = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('Internal Server Error')));
};

describe('fetchFootballPlayers function', () => {
  it('should make a request to get the football players list', () => {
    mockFetch();

    fetchFootballPlayers();

    expect(global.fetch).toHaveBeenCalledWith(FOOTBALL_PLAYERS_URL);
  });

  describe('when the request fails', () => {
    it('should return an error message', async () => {
      mockFetchFailure();

      try {
        await fetchFootballPlayers();
      } catch (error) {
        expect(error.message).toEqual('Internal Server Error');
      }
    });
  });

  describe('when the request success', () => {
    it('should return an array', async () => {
      mockFetchSuccess();

      const response = await fetchFootballPlayers();

      expect(response.json()).toEqual(expect.any(Array));
    });

    it('should resolve to an array with football players data', async () => {
      mockFetchSuccess();

      const response = await fetchFootballPlayers();

      expect(response.json()).toEqual([{
        contractUntil: '2022-06-30',
        dateOfBirth: '1993-05-13',
        jerseyNumber: 9,
        name: 'Romelu Lukaku',
        nationality: 'Belgium',
        position: 'Centre-Forward',
      }]);
    });
  });
});
