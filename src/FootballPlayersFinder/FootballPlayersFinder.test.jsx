import React from 'react';
import { shallow } from 'enzyme';

import FootballPlayersFinder from './FootballPlayersFinder';

describe('<FootballPlayersFinder />', () => {
  describe('Rendering', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<FootballPlayersFinder />);

      expect(wrapper.is('div')).toBe(true);
    });

    it('should render `SearchTool` component', () => {
      const wrapper = shallow(<FootballPlayersFinder />);
      const searchTool = wrapper.find('SearchTool');

      expect(searchTool.is('SearchTool')).toBe(true);
    });

    it('should render `PlayersTable` component', () => {
      const wrapper = shallow(<FootballPlayersFinder />);
      const playersTable = wrapper.find('PlayersTable');

      expect(playersTable.is('PlayersTable')).toBe(true);
    });

    it('should render a connected `LoadingIndicator` component', () => {
      const wrapper = shallow(<FootballPlayersFinder />);
      const loadingIndicator = wrapper.find('Connect(LoadingIndicator)');

      expect(loadingIndicator.is('Connect(LoadingIndicator)')).toBe(true);
    });
  });

  describe('Behavior', () => {
    const getInstance = props => shallow(<FootballPlayersFinder {...props} />).instance();

    it('should call `loadFootballPlayers` on mount', () => {
      const loadFootballPlayersMock = jest.fn();

      shallow(<FootballPlayersFinder loadFootballPlayers={loadFootballPlayersMock} />);

      expect(loadFootballPlayersMock).toHaveBeenCalledTimes(1);
    });

    describe('when `handleInputChange` is called', () => {
      it('should set the input value in state with its name', () => {
        const testEvent = {
          target: {
            name: 'testInput',
            value: 'input test',
            attributes: {},
          },
        };
        const wrapperInstance = getInstance();

        wrapperInstance.handleInputChange(testEvent);

        expect(wrapperInstance.state.testInput).toBe('input test');
      });

      describe('when `mode` attribute is set to `text`', () => {
        it('should set value in state removing non letters characters', () => {
          const testEvent = {
            target: {
              name: 'testInput',
              value: '%1234input test5678!',
              attributes: {
                mode: {
                  value: 'text',
                },
              },
            },
          };
          const wrapperInstance = getInstance();

          wrapperInstance.handleInputChange(testEvent);

          expect(wrapperInstance.state.testInput).toBe('input test');
        });
      });

      describe('when `mode` attribute is set to `numeric`', () => {
        it('should set value in state removing non numeric characters', () => {
          const testEvent = {
            target: {
              name: 'testInput',
              value: '%1234input test5678!',
              attributes: {
                mode: {
                  value: 'numeric',
                },
              },
            },
          };
          const wrapperInstance = getInstance();

          wrapperInstance.handleInputChange(testEvent);

          expect(wrapperInstance.state.testInput).toBe('12345678');
        });
      });
    });

    describe('when `handleSearchAction` is called', () => {
      it('should not call `loadFilteredFootballPlayers` if age is less than 18', () => {
        const loadFilteredFootballPlayersMock = jest.fn();
        const testEvent = {
          target: {
            name: 'dateOfBirth',
            value: '12',
            attributes: {
              mode: {
                value: 'numeric',
              },
            },
          },
        };
        const wrapperInstance = getInstance({
          loadFilteredFootballPlayers: loadFilteredFootballPlayersMock,
        });

        wrapperInstance.handleInputChange(testEvent);
        wrapperInstance.handleSearchAction();

        expect(loadFilteredFootballPlayersMock).not.toHaveBeenCalled();
      });

      it('should not call `loadFilteredFootballPlayers` if age is greater than 40', () => {
        const loadFilteredFootballPlayersMock = jest.fn();
        const testEvent = {
          target: {
            name: 'dateOfBirth',
            value: '45',
            attributes: {
              mode: {
                value: 'numeric',
              },
            },
          },
        };
        const wrapperInstance = getInstance({
          loadFilteredFootballPlayers: loadFilteredFootballPlayersMock,
        });

        wrapperInstance.handleInputChange(testEvent);
        wrapperInstance.handleSearchAction();

        expect(loadFilteredFootballPlayersMock).not.toHaveBeenCalled();
      });

      describe('when `age` has a valid range', () => {
        it('should call `loadFilteredFootballPlayers`', () => {
          const loadFilteredFootballPlayersMock = jest.fn();
          const testEvent = {
            target: {
              name: 'dateOfBirth',
              value: '30',
              attributes: {
                mode: {
                  value: 'numeric',
                },
              },
            },
          };
          const wrapperInstance = getInstance({
            loadFilteredFootballPlayers: loadFilteredFootballPlayersMock,
          });

          wrapperInstance.handleInputChange(testEvent);
          wrapperInstance.handleSearchAction();

          expect(loadFilteredFootballPlayersMock).toHaveBeenCalledTimes(1);
        });
      });

      it('should call `loadFootballPlayers` when `loadFilteredFootballPlayers` is fired', () => {
        const loadFootballPlayersMock = jest.fn();
        const wrapperInstance = getInstance({
          loadFootballPlayers: loadFootballPlayersMock,
        });

        wrapperInstance.props.loadFilteredFootballPlayers();

        expect(loadFootballPlayersMock).toHaveBeenCalled();
      });

      it('should call `loadFilteredFootballPlayers` with empty string filters when no inputs are set', () => {
        const loadFilteredFootballPlayersMock = jest.fn();
        const wrapperInstance = getInstance({
          loadFilteredFootballPlayers: loadFilteredFootballPlayersMock,
        });

        wrapperInstance.handleSearchAction();

        expect(loadFilteredFootballPlayersMock).toHaveBeenCalledWith({ name: '', position: '', dateOfBirth: '' });
      });
    });
  });
});
