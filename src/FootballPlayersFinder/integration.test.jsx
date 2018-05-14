import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import configureStore from '../store/configureStore';

import FootballPlayersFinder from './';

const store = configureStore();

const mockedData = [
  {
    name: 'Lionel Messi',
    dateOfBirth: '1987-06-24',
    position: 'Forward',
  },
  {
    name: 'Cristiano Ronaldo',
    dateOfBirth: '1985-02-05',
    position: 'Forward',
  },
  {
    name: 'Manuel Neuer',
    dateOfBirth: '1986-03-27',
    position: 'Keeper',
  },
];

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve(new Response(
    new Blob(
      [JSON.stringify(mockedData)],
      {
        type: 'application/json',
      },
    ),
    {
      ok: true,
      status: 200,
      statusText: 'OK',
      type: 'application/json',
    },
  )));

describe('FootballPlayersFinder', () => {
  let wrapper = '';

  beforeEach(async () => {
    wrapper = await mount(<Provider store={store}><FootballPlayersFinder /></Provider>);
    await flushPromises();
    wrapper.update();
  });

  it('should render one `name` <input>', () => {
    const nameInput = wrapper.find('input[name="name"]');

    expect(nameInput.length).toBe(1);
  });

  describe('the `name` input', () => {
    const getNameInput = () => wrapper.find('input[name="name"]');

    it('should allow only letters', () => {
      const mockdedInputEvent = {
        target: {
          name: 'name',
          value: 'test_123!"$%&/()',
          attributes: {
            mode: {
              value: 'text',
            },
          },
        },
      };

      getNameInput().simulate('change', mockdedInputEvent);
      wrapper.update();

      expect(getNameInput().prop('value')).toBe('test');
    });
  });

  it('should render one `dateOfBirth` <input>', () => {
    const dateOfBirthInput = wrapper.find('input[name="dateOfBirth"]');

    expect(dateOfBirthInput.length).toBe(1);
  });

  describe('the `dateOfBirth` input', () => {
    const getBirthInput = () => wrapper.find('input[name="dateOfBirth"]');

    it('should allow only numbers', () => {
      const mockdedInputEvent = {
        target: {
          name: 'dateOfBirth',
          value: 'test_123!"$%&/()',
          attributes: {
            mode: {
              value: 'numeric',
            },
          },
        },
      };

      getBirthInput().simulate('change', mockdedInputEvent);
      wrapper.update();

      expect(getBirthInput().prop('value')).toBe('123');
    });
  });

  it('should render one `position` <select>', () => {
    const positionDropwdown = wrapper.find('select[name="position"]');

    expect(positionDropwdown.length).toBe(1);
  });

  it('should render one `playersTable`', () => {
    const playersTable = wrapper.find('.players-table');

    expect(playersTable.length).toBe(1);
  });

  describe('the `playersTable`', () => {
    it('should contain the players data fetched from the api', () => {
      const playersTable = wrapper.find('.players-table');
      const tableRows = playersTable.find('tbody > tr');

      expect(tableRows.at(0).text()).toEqual(expect.stringContaining('Lionel Messi'));
      expect(tableRows.at(1).text()).toEqual(expect.stringContaining('Cristiano Ronaldo'));
      expect(tableRows.at(2).text()).toEqual(expect.stringContaining('Manuel Neuer'));
    });
  });

  it('should render one `search` button', () => {
    const searchButton = wrapper.find('button');

    expect(searchButton.text()).toBe('Search');
  });

  describe('when the `search` button is clicked', () => {
    it('should display an alert if given age value is less than 18', () => {
      const birthInput = wrapper.find('[name="dateOfBirth"]');
      const searchButton = wrapper.find('button');
      const mockdedInputEvent = {
        target: {
          name: 'dateOfBirth',
          value: '10',
          attributes: {
            mode: {
              value: 'numeric',
            },
          },
        },
      };

      birthInput.simulate('change', mockdedInputEvent);
      searchButton.simulate('click');
      wrapper.update();

      expect(wrapper.find('.alert').text()).toEqual(expect.stringContaining('Min allowed age: 18'));
    });

    it('should display an alert if given age value is greater than 40', () => {
      const birthInput = wrapper.find('[name="dateOfBirth"]');
      const searchButton = wrapper.find('button');
      const mockdedInputEvent = {
        target: {
          name: 'dateOfBirth',
          value: '41',
          attributes: {
            mode: {
              value: 'numeric',
            },
          },
        },
      };

      birthInput.simulate('change', mockdedInputEvent);
      searchButton.simulate('click');
      wrapper.update();

      expect(wrapper.find('.alert').text()).toEqual(expect.stringContaining('Max allowed age: 40'));
    });

    it('should update the `playersTable` based on inputs values', async () => {
      const nameInput = wrapper.find('[name="name"]');
      const positionDropdown = wrapper.find('select[name="position"]');
      const birthInput = wrapper.find('[name="dateOfBirth"]');
      const searchButton = wrapper.find('button');
      const nameInputEvent = {
        target: {
          name: 'name',
          value: 'Lionel',
          attributes: {
            mode: {
              value: 'text',
            },
          },
        },
      };
      const positionDropdownEvent = {
        target: {
          name: 'position',
          value: 'Forward',
          attributes: {},
        },
      };
      const birthInputEvent = {
        target: {
          name: 'dateOfBirth',
          value: '31',
          attributes: {
            mode: {
              value: 'numeric',
            },
          },
        },
      };

      nameInput.simulate('change', nameInputEvent);
      positionDropdown.simulate('change', positionDropdownEvent);
      birthInput.simulate('change', birthInputEvent);
      searchButton.simulate('click');
      await flushPromises();
      wrapper.update();

      const playersTable = wrapper.find('.players-table');
      const tableRows = playersTable.find('tbody > tr');

      expect(tableRows.length).toBe(1);
      expect(tableRows.text()).toEqual(expect.stringContaining('Lionel Messi'));
    });
  });
});
