import { combineReducers } from 'redux';

import footballPlayers from '../FootballPlayersFinder/reducers';
import loadingIndicator from '../common/LoadingIndicator/reducers';

const rootReducer = combineReducers({
  footballPlayers,
  loadingIndicator,
});

export default rootReducer;
