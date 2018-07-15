import {
  FETCH_FOOTBALL_PLAYERS_SUCCESS,
  FILTER_FOOTBALL_PLAYERS,
} from './FootballPlayersFinder.actionTypes';

const footballPlayers = (state = {}, { type, playersList, filter }) => {
  switch (type) {
    case FETCH_FOOTBALL_PLAYERS_SUCCESS:
      return {
        ...state,
        playersList,
        filteredPlayersList: playersList,
      };

    case FILTER_FOOTBALL_PLAYERS: {
      const filterWithDates = { ...filter };

      if (filterWithDates.dateOfBirth) {
        const currentYear = new Date().getFullYear();

        filterWithDates.dateOfBirth = (currentYear - filterWithDates.dateOfBirth).toString();
      }

      const filteredPlayersList = state.playersList.filter(player =>
        Object.keys(filterWithDates).every(key =>
          player[key].toLowerCase().includes(filterWithDates[key].toLowerCase())));

      return { ...state, filteredPlayersList };
    }

    default:
      return state;
  }
};

export default footballPlayers;
