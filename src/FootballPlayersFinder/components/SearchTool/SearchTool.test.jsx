import React from 'react';
import { shallow } from 'enzyme';

import SearchTool from './';

const renderSearchTool = (props) => {
  const defaultTestProps = {
    playerNameValue: '',
    playerAgeValue: '',
    isValidRange: true,
    handleInputChange: jest.fn(),
    handleSearchAction: jest.fn(),
    playersPositions: ['Position 1', 'Position 2'],
  };

  return shallow(<SearchTool {...defaultTestProps} {...props} />);
};

describe('<SearchTool />', () => {
  describe('Rendering', () => {
    it('should render correctly', () => {
      const wrapper = renderSearchTool();

      expect(wrapper.is('section')).toBe(true);
    });

    it('should render a name <input>', () => {
      const wrapper = renderSearchTool();

      expect(wrapper.find('input[name="name"]').length).toBe(1);
    });

    it('should render a <Dropdown /> element', () => {
      const wrapper = renderSearchTool();

      expect(wrapper.find('Dropdown').length).toBe(1);
    });

    it('should render a birth <input>', () => {
      const wrapper = renderSearchTool();

      expect(wrapper.find('input[name="dateOfBirth"]').length).toBe(1);
    });

    it('should render a search <button>', () => {
      const wrapper = renderSearchTool();

      expect(wrapper.find('button').length).toBe(1);
      expect(wrapper.find('button').text()).toBe('Search');
    });

    describe('when `isValidRange` is false', () => {
      it('should render an alert span', () => {
        const wrapper = renderSearchTool({ isValidAgeRange: false });

        expect(wrapper.find('.alert').length).toBe(1);
      });

      it('should render a message with the suggested valid age ranges', () => {
        const wrapper = renderSearchTool({ isValidAgeRange: false });

        expect(wrapper.find('.alert').text()).toEqual(expect.stringContaining('Min allowed age: 18Max allowed age: 40'));
      });
    });

    describe('when `isValidAgeRange` is true', () => {
      it('should not render an alert span', () => {
        const wrapper = renderSearchTool({ isValidAgeRange: true });

        expect(wrapper.find('.alert').length).toBe(0);
      });
    });
  });

  describe('Behavior', () => {
    it('should call `handleInputChange` prop on `name` input change', () => {
      const handleInputChangeMock = jest.fn();
      const wrapper = renderSearchTool({ handleInputChange: handleInputChangeMock });
      const nameInput = wrapper.find('input[name="name"]');

      nameInput.simulate('change', { target: { value: 'testName' } });

      expect(handleInputChangeMock).toHaveBeenCalledWith({ target: { value: 'testName' } });
    });

    it('should call `handleInputChange` prop on `Dropdown` handleOnChange', () => {
      const handleInputChangeMock = jest.fn();
      const wrapper = renderSearchTool({ handleInputChange: handleInputChangeMock });
      const dropdown = wrapper.find('Dropdown');

      dropdown.prop('handleOnChange')(['testSelect']);

      expect(handleInputChangeMock).toHaveBeenCalledWith(['testSelect']);
    });

    it('should call `handleInputChange` prop on `dateOfBirth` input change', () => {
      const handleInputChangeMock = jest.fn();
      const wrapper = renderSearchTool({ handleInputChange: handleInputChangeMock });
      const birthInput = wrapper.find('input[name="dateOfBirth"]');

      birthInput.simulate('change', { target: { value: 'testBirth' } });

      expect(handleInputChangeMock).toHaveBeenCalledWith({ target: { value: 'testBirth' } });
    });

    it('should call `handleSearchAction` on `search` button click', () => {
      const handleSearchActionMock = jest.fn();
      const wrapper = renderSearchTool({ handleSearchAction: handleSearchActionMock });
      const button = wrapper.find('button');

      button.simulate('click');

      expect(handleSearchActionMock).toHaveBeenCalledTimes(1);
    });
  });
});
