import getLoadingIndicatorStatus from './LoadingIndicator.selectors';

describe('getLoadingIndicatorStatus selector', () => {
  it('should return false by default', () => {
    const state = {
      loadingIndicator: {},
    };

    expect(getLoadingIndicatorStatus(state)).toBe(false);
  });

  it('should return false if `loadingIndicator` object does not exists', () => {
    const state = {};

    expect(getLoadingIndicatorStatus(state)).toBe(false);
  });

  it('should return the `isLoading` property', () => {
    const state = {
      loadingIndicator: {
        isLoading: true,
      },
    };

    expect(getLoadingIndicatorStatus(state)).toBe(true);
  });
});
