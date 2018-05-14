import {
  SHOW_LOADING_INDICATOR,
  HIDE_LOADING_INDICATOR,
} from './actionTypes';

import {
  showLoadingIndicator,
  hideLoadingIndicator,
} from './actions';

describe('showLoadingIndicator action creator', () => {
  it('should return an object', () => {
    expect(showLoadingIndicator()).toEqual(expect.any(Object));
  });

  it('should return the action type as `SHOW_LOADING_INDICATOR`', () => {
    expect(showLoadingIndicator()).toEqual(expect.objectContaining({
      type: SHOW_LOADING_INDICATOR,
    }));
  });

  it('should return the `isLoading` property as true', () => {
    expect(showLoadingIndicator()).toEqual(expect.objectContaining({ isLoading: true }));
  });
});

describe('hideLoadingIndicator action creator', () => {
  it('should return an object', () => {
    expect(hideLoadingIndicator()).toEqual(expect.any(Object));
  });

  it('should return the action type as `HIDE_LOADING_INDICATOR`', () => {
    expect(hideLoadingIndicator()).toEqual(expect.objectContaining({
      type: HIDE_LOADING_INDICATOR,
    }));
  });

  it('should return the `isLoading` property as false', () => {
    expect(hideLoadingIndicator()).toEqual(expect.objectContaining({ isLoading: false }));
  });
});
