import { connect } from 'react-redux';

import {
  loadFootballPlayers,
  loadFilteredFootballPlayers,
} from './actions';

import FootballPlayersFinder from './FootballPlayersFinder';

import {
  footballPlayersSelector,
  footballPlayersPositionsSelector,
  filteredFootballPlayersSelector,
} from './selectors';

const mapStateToProps = state => ({
  playersList: footballPlayersSelector(state),
  playersPositions: footballPlayersPositionsSelector(state),
  filteredPlayersList: filteredFootballPlayersSelector(state),
});

const mapDispatchToProps = {
  loadFootballPlayers,
  loadFilteredFootballPlayers,
};

export default connect(mapStateToProps, mapDispatchToProps)(FootballPlayersFinder);
