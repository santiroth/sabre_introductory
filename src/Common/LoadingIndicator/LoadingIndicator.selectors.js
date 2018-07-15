const getLoadingIndicatorStatus = state =>
  (state.loadingIndicator && state.loadingIndicator.isLoading) || false;

export default getLoadingIndicatorStatus;
