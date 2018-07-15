import {
  SHOW_LOADING_INDICATOR,
  HIDE_LOADING_INDICATOR,
} from './LoadingIndicator.actionTypes';

const loadingIndicator = (state = {}, { type, isLoading }) => {
  switch (type) {
    case SHOW_LOADING_INDICATOR:
      return { ...state, isLoading };

    case HIDE_LOADING_INDICATOR:
      return { ...state, isLoading };

    default:
      return state;
  }
};

export default loadingIndicator;
