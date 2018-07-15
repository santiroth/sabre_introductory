import fetchFootballPlayers from './FootballPlayersFinder.api';
import {
  loadFootballPlayers,
  loadFilteredFootballPlayers,
} from './FootballPlayersFinder.actions';

jest.mock('./FootballPlayersFinder.api');

describe('loadFootballPlayers thunk', () => {
  it('should return a function', () => {
    expect(loadFootballPlayers()).toEqual(expect.any(Function));
  });

  describe('the returned function', () => {
    it('should dispatch `SHOW_LOADING_INDICATOR`', async () => {
      const dispatch = jest.fn();
      fetchFootballPlayers.mockReturnValueOnce(Promise.resolve({ response: { ok: true } }));

      await loadFootballPlayers()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'SHOW_LOADING_INDICATOR' }));
    });

    it('should dispatch `HIDE_LOADING_INDICATOR`', async () => {
      const dispatch = jest.fn();
      fetchFootballPlayers.mockReturnValueOnce(Promise.resolve({ response: { ok: true } }));

      await loadFootballPlayers()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'HIDE_LOADING_INDICATOR' }));
    });
  });

  describe('when `loadFootballPlayers` fails', () => {
    it('should dispatch an object with the error message', async () => {
      global.alert = jest.fn();
      const dispatch = jest.fn();
      const responseMock = new Response(
        new Blob(['{}']),
        {
          ok: false,
          status: 400,
          statusText: 'Not Found',
        },
      );

      fetchFootballPlayers.mockReturnValueOnce(responseMock);

      await loadFootballPlayers()(dispatch);

      expect(global.alert).toHaveBeenCalledWith(expect.stringContaining('Not Found'));
    });
  });

  describe('when `loadFootballPlayers` success', () => {
    it('should dispatch an object with the fetched players list', async () => {
      const dispatch = jest.fn();
      const responseData = [
        {
          contractUntil: '2022-06-30',
          dateOfBirth: '1993-05-13',
          jerseyNumber: 9,
          name: 'Romelu Lukaku',
          nationality: 'Belgium',
          position: 'Centre-Forward',
        },
      ];
      const responseMock = new Response(
        new Blob([JSON.stringify(responseData)]),
        {
          type: 'application/json',
        },
      );
      fetchFootballPlayers.mockReturnValueOnce(responseMock);

      await loadFootballPlayers()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
        playersList: [{
          contractUntil: '2022-06-30',
          dateOfBirth: '1993-05-13',
          jerseyNumber: 9,
          name: 'Romelu Lukaku',
          nationality: 'Belgium',
          position: 'Centre-Forward',
        }],
      }));
    });

    it('should dispatch `FETCH_FOOTBALL_PLAYERS_SUCCESS` as action type', async () => {
      const dispatch = jest.fn();
      const responseMock = new Response(
        new Blob(['{}']),
        {
          type: 'application/json',
        },
      );
      fetchFootballPlayers.mockReturnValueOnce(responseMock);
      await loadFootballPlayers()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'FETCH_FOOTBALL_PLAYERS_SUCCESS' }));
    });
  });
});

describe('loadFilteredFootballPlayers thunk', () => {
  it('should return a function', () => {
    expect(loadFilteredFootballPlayers()).toEqual(expect.any(Function));
  });

  describe('the returned function', () => {
    it('should dispatch `SHOW_LOADING_INDICATOR`', async () => {
      const dispatch = jest.fn();
      const responseMock = new Response(
        new Blob(['{}']),
        {
          type: 'application/json',
        },
      );
      fetchFootballPlayers.mockReturnValueOnce(responseMock);

      await loadFilteredFootballPlayers()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'SHOW_LOADING_INDICATOR' }));
    });

    it('should dispatch `HIDE_LOADING_INDICATOR`', async () => {
      const dispatch = jest.fn();
      const responseMock = new Response(
        new Blob(['{}']),
        {
          type: 'application/json',
        },
      );
      fetchFootballPlayers.mockReturnValueOnce(responseMock);

      await loadFilteredFootballPlayers()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'HIDE_LOADING_INDICATOR' }));
    });

    it('should dispatch `FILTER_FOOTBALL_PLAYERS` containing the filters payload', async () => {
      const dispatch = jest.fn();
      const filter = {
        name: 'Lionel Messi',
        position: 'Forward',
        dateOfBirth: 30,
      };
      const responseMock = new Response(
        new Blob(['{}']),
        {
          type: 'application/json',
        },
      );
      fetchFootballPlayers.mockReturnValueOnce(responseMock);

      await loadFilteredFootballPlayers(filter)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
        type: 'FILTER_FOOTBALL_PLAYERS',
        filter: {
          name: 'Lionel Messi',
          position: 'Forward',
          dateOfBirth: 30,
        },
      }));
    });
  });
});
