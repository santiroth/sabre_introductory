import React from 'react';
import { shallow } from 'enzyme';

import PlayersTable from './';

describe('<PlayersTable />', () => {
  describe('Rendering', () => {
    it('should render correctly', () => {
      const wrapper = shallow(<PlayersTable />);

      expect(wrapper.is('table')).toBe(true);
    });

    it('should render the table rows based on `playersList` array', () => {
      const testPlayerList = [
        {
          name: 'Lionel Messi',
          position: 'Forward',
          age: 30,
        },
        {
          name: 'Cristiano Ronaldo',
          position: 'Forward',
          age: 33,
        },
      ];
      const wrapper = shallow(<PlayersTable playersList={testPlayerList} />);
      const tableRows = wrapper.find('table > tbody > tr');

      expect(tableRows.at(0).text()).toContain('Lionel Messi');
      expect(tableRows.at(1).text()).toContain('Cristiano Ronaldo');
    });
  });
});
