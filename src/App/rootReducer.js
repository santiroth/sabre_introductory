import { combineReducers } from 'redux';

import footballPlayers from '../FootballPlayersFinder/FootballPlayersFinder.reducers';
import loadingIndicator from '../Common/LoadingIndicator/LoadingIndicator.reducers';

const rootReducer = combineReducers({
  footballPlayers,
  loadingIndicator,
});

export default rootReducer;
