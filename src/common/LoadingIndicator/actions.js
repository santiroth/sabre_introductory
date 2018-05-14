import {
  SHOW_LOADING_INDICATOR,
  HIDE_LOADING_INDICATOR,
} from './actionTypes';

const showLoadingIndicator = () => ({
  type: SHOW_LOADING_INDICATOR,
  isLoading: true,
});

const hideLoadingIndicator = () => ({
  type: HIDE_LOADING_INDICATOR,
  isLoading: false,
});

export {
  showLoadingIndicator,
  hideLoadingIndicator,
};
