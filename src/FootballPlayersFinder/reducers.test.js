import footballPlayers from './reducers';
import {
  FETCH_FOOTBALL_PLAYERS_SUCCESS,
  FILTER_FOOTBALL_PLAYERS,
} from './actionTypes';

describe('footballPlayers Reducer', () => {
  it('should return an array as default state', () => {
    expect(footballPlayers({}, {})).toEqual({});
  });

  describe('when an inexistent action is given', () => {
    it('should return the default state', () => {
      const state = {
        testState: [],
      };
      const action = {
        type: 'UNKNOWN_ACTION',
        data: {},
      };

      expect(footballPlayers(state, action)).toEqual({ testState: [] });
    });
  });

  describe('when action type is `FETCH_FOOTBALL_PLAYERS_SUCCESS`', () => {
    it('should return a `playersList` array', () => {
      const state = {};
      const action = {
        type: FETCH_FOOTBALL_PLAYERS_SUCCESS,
        playersList: [
          {
            name: 'Lionel Messi',
            dateOfBirth: '1987-06-24',
          },
        ],
      };
      const expectedState = {
        playersList: [{
          name: 'Lionel Messi',
          dateOfBirth: '1987-06-24',
        }],
      };

      expect(footballPlayers(state, action)).toEqual(expect.objectContaining(expectedState));
    });

    it('should return a `filteredPlayersList` array', () => {
      const state = {};
      const action = {
        type: FETCH_FOOTBALL_PLAYERS_SUCCESS,
        playersList: [
          {
            name: 'Lionel Messi',
            dateOfBirth: '1987-06-24',
          },
        ],
      };
      const expectedState = {
        filteredPlayersList: [{
          name: 'Lionel Messi',
          dateOfBirth: '1987-06-24',
        }],
      };

      expect(footballPlayers(state, action)).toEqual(expect.objectContaining(expectedState));
    });
  });

  describe('when action type is `FILTER_FOOTBALL_PLAYERS`', () => {
    it('should return a `filteredPlayersList` array based on `filter` object', () => {
      const state = {
        playersList: [
          {
            name: 'Lionel Messi',
            position: 'Forward',
            dateOfBirth: '1987-06-24',
            age: 31,
          },
          {
            name: 'Romelu Lukaku',
            position: 'Centre-Forward',
            dateOfBirth: '1993-05-13',
            age: 25,
          },
        ],
      };
      const action = {
        type: FILTER_FOOTBALL_PLAYERS,
        filter: {
          name: 'Lionel',
          position: 'Forward',
          dateOfBirth: 31,
        },
      };
      const actionWithoutDate = {
        type: FILTER_FOOTBALL_PLAYERS,
        filter: {
          name: 'Lionel',
          position: 'Forward',
          dateOfBirth: '',
        },
      };
      const expectedState = {
        filteredPlayersList: [{
          name: 'Lionel Messi',
          position: 'Forward',
          dateOfBirth: '1987-06-24',
          age: 31,
        }],
      };

      expect(footballPlayers(state, action)).toEqual(expect.objectContaining(expectedState));
      expect(footballPlayers(state, actionWithoutDate))
        .toEqual(expect.objectContaining(expectedState));
    });
  });
});
