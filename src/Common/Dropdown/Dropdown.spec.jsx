import React from 'react';
import { shallow } from 'enzyme';

import Dropdown from './';

const renderDropdown = (props) => {
  const defaultTestProps = {
    items: [],
    handleOnChange: jest.fn(),
  };

  return shallow(<Dropdown {...defaultTestProps} {...props} />);
};

describe('<Dropdown />', () => {
  describe('Rendering', () => {
    it('should render correctly', () => {
      const wrapper = renderDropdown();

      expect(wrapper.is('div')).toBe(true);
    });

    it('should render a default option based on `placeHolder` prop', () => {
      const wrapper = renderDropdown({ placeHolder: 'Select Test' });
      const defaultOption = wrapper.find('option').at(0);

      expect(defaultOption.text()).toBe('Select Test');
    });

    it('should render options based on `items` prop array', () => {
      const testItems = [
        'Option 1',
        'Option 2',
        'Option 3',
      ];
      const wrapper = renderDropdown({ items: testItems });
      const optionElements = wrapper.find('option');

      expect(optionElements.at(1).text()).toBe('Option 1');
      expect(optionElements.at(2).text()).toBe('Option 2');
      expect(optionElements.at(3).text()).toBe('Option 3');
    });
  });

  describe('Behavior', () => {
    it('should call `handleOnChange` prop when an option is selected', () => {
      const handleOnChangeMock = jest.fn();
      const testItems = [
        'Option 1',
        'Option 2',
        'Option 3',
      ];
      const wrapper = renderDropdown({ items: testItems, handleOnChange: handleOnChangeMock });
      const selectElement = wrapper.find('select');

      selectElement.simulate('change', { target: { value: 'Option 1' } });

      expect(handleOnChangeMock).toHaveBeenCalledWith({ target: { value: 'Option 1' } });
    });
  });
});
