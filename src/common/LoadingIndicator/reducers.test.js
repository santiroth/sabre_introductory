import loadingIndicator from './reducers';

import {
  SHOW_LOADING_INDICATOR,
  HIDE_LOADING_INDICATOR,
} from './actionTypes';

describe('loadingIndicator Reducer', () => {
  it('should return an object as default state', () => {
    expect(loadingIndicator({}, {})).toEqual({});
  });

  describe('when an inexistent action is given', () => {
    it('should return the default state', () => {
      const state = {
        testState: {},
      };
      const action = {
        type: 'UNKNOWN_ACTION',
        data: {},
      };

      expect(loadingIndicator(state, action)).toEqual({ testState: {} });
    });
  });

  describe('when action type is `SHOW_LOADING_INDICATOR`', () => {
    it('should return an `isLoading` boolean as true', () => {
      const state = {};
      const action = {
        type: SHOW_LOADING_INDICATOR,
        isLoading: true,
      };

      expect(loadingIndicator(state, action)).toEqual({ isLoading: true });
    });
  });

  describe('when action type is `HIDE_LOADING_INDICATOR`', () => {
    it('should return an `isLoading` boolean as false', () => {
      const state = {};
      const action = {
        type: HIDE_LOADING_INDICATOR,
        isLoading: false,
      };

      expect(loadingIndicator(state, action)).toEqual({ isLoading: false });
    });
  });
});
