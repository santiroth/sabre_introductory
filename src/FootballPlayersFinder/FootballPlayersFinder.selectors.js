import { createSelector } from 'reselect';

const convertDateOfBirthToAge = dateOfBirth =>
  (new Date().getFullYear()) - (+dateOfBirth.substr(0, 4));

const getFootballPlayers = state => state.footballPlayers.playersList || [];
const getFilteredFootballPlayers = state => state.footballPlayers.filteredPlayersList || [];

const footballPlayersPositionsSelector = createSelector(
  getFootballPlayers,
  playersList => Array.from(new Set(playersList.map(player => player.position))).sort(),
);

const filteredFootballPlayersSelector = createSelector(
  getFilteredFootballPlayers,
  filteredPlayersList => filteredPlayersList.map(player => ({
    ...player,
    age: convertDateOfBirthToAge(player.dateOfBirth),
  })),
);

export {
  footballPlayersPositionsSelector,
  filteredFootballPlayersSelector,
};
