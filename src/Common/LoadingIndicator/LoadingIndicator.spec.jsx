import React from 'react';
import { shallow } from 'enzyme';

import LoadingIndicator from './LoadingIndicator';

describe('<LoadingIndicator />', () => {
  describe('Rendering', () => {
    describe('when `isLoading` prop is true', () => {
      it('should render correctly', () => {
        const wrapper = shallow(<LoadingIndicator isLoading />);

        expect(wrapper.is('div')).toBe(true);
      });
    });

    describe('when `isLoading` prop is false', () => {
      it('should not render', () => {
        const wrapper = shallow(<LoadingIndicator isLoading={false} />);

        expect(wrapper.is('div')).toBe(false);
      });
    });
  });
});
