import FOOTBALL_PLAYERS_URL from './constants';

const fetchFootballPlayers = async () => {
  try {
    return await fetch(FOOTBALL_PLAYERS_URL);
  } catch (error) {
    return error;
  }
};

export default fetchFootballPlayers;
