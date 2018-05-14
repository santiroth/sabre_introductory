/* eslint-disable no-alert */

import fetchFootballPlayers from './api';

import {
  FETCH_FOOTBALL_PLAYERS_SUCCESS,
  FILTER_FOOTBALL_PLAYERS,
} from './actionTypes';

import {
  showLoadingIndicator,
  hideLoadingIndicator,
} from '../common/LoadingIndicator/actions';

const loadFootballPlayersSuccess = playersList => ({
  type: FETCH_FOOTBALL_PLAYERS_SUCCESS,
  playersList,
});

const filterFootballPlayers = filter => ({
  type: FILTER_FOOTBALL_PLAYERS,
  filter,
});

const loadFootballPlayers = () =>
  async (dispatch) => {
    dispatch(showLoadingIndicator());
    const response = await fetchFootballPlayers();
    dispatch(hideLoadingIndicator());

    if (response.ok) {
      dispatch(loadFootballPlayersSuccess(await response.json()));
    } else {
      alert(`Error trying to fetch resources:\n${response.statusText || response} \nplease contact technical support`);
    }
  };

const loadFilteredFootballPlayers = filter =>
  async (dispatch) => {
    await loadFootballPlayers()(dispatch);
    dispatch(filterFootballPlayers(filter));
  };

export {
  loadFootballPlayers,
  loadFilteredFootballPlayers,
};
