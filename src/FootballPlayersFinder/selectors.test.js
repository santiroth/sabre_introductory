import {
  footballPlayersSelector,
  footballPlayersPositionsSelector,
  filteredFootballPlayersSelector,
} from './selectors';

describe('footballPlayersSelector', () => {
  it('should return an empty array if `playersList` is not found in state', () => {
    const state = {
      footballPlayers: {},
    };

    expect(footballPlayersSelector(state)).toEqual(expect.any(Array));
  });

  it('should return the `playersList` array from state with calculated age', () => {
    const state = {
      footballPlayers: {
        playersList: [
          {
            name: 'Lionel Messi',
            position: 'Forward',
            dateOfBirth: '1987-06-24',
          },
        ],
      },
    };

    expect(footballPlayersSelector(state)).toEqual([{
      name: 'Lionel Messi',
      position: 'Forward',
      dateOfBirth: '1987-06-24',
      age: 31,
    }]);
  });
});

describe('footballPlayersPositionsSelector', () => {
  it('should return an empty array if `playersList` is not found in state', () => {
    const state = {
      footballPlayers: {},
    };

    expect(footballPlayersPositionsSelector(state)).toEqual(expect.any(Array));
  });

  it('should return an array with the players positions with no duplicates', () => {
    const state = {
      footballPlayers: {
        playersList: [
          {
            name: 'Lionel Messi',
            position: 'Forward',
            dateOfBirth: '1987-06-24',
          },
          {
            name: 'Sergio Romero',
            position: 'Keeper',
            dateOfBirth: '1987-02-22',
          },
          {
            name: 'Joel Pereira',
            position: 'Keeper',
            dateOfBirth: '1996-06-28',
          },
        ],
      },
    };

    expect(footballPlayersPositionsSelector(state)).toEqual(['Forward', 'Keeper']);
  });
});

describe('filteredFootballPlayersSelector', () => {
  it('should return an empty array if `filterPlayersList` is not found in state', () => {
    const state = {
      footballPlayers: {},
    };

    expect(filteredFootballPlayersSelector(state)).toEqual(expect.any(Array));
  });

  it('should return the `filterPlayersList` array from state with calculated age', () => {
    const state = {
      footballPlayers: {
        filteredPlayersList: [
          {
            name: 'Lionel Messi',
            position: 'Forward',
            dateOfBirth: '1987-06-24',
          },
        ],
      },
    };

    expect(filteredFootballPlayersSelector(state)).toEqual([{
      name: 'Lionel Messi',
      position: 'Forward',
      dateOfBirth: '1987-06-24',
      age: 31,
    }]);
  });
});
