import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './configureStore';

import FootballPlayersFinder from '../FootballPlayersFinder';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <main className="container">
      <FootballPlayersFinder />
    </main>
  </Provider>
);

export default App;
