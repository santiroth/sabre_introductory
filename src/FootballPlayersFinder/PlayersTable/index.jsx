import React from 'react';
import PropTypes from 'prop-types';

import './PlayersTable.css';

const PlayersTable = ({ playersList }) => (
  <table className="players-table">
    <thead>
      <tr>
        <th>Player</th>
        <th>Position</th>
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
      {playersList.map(player => (
        <tr key={player.name}>
          <td>{player.name}</td>
          <td>{player.position}</td>
          <td>{player.age}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

PlayersTable.defaultProps = {
  playersList: [],
};

PlayersTable.propTypes = {
  playersList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  })),
};

export default PlayersTable;
