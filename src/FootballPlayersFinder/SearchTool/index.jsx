import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from '../../Common/Dropdown';

import './SearchTool.css';

const SearchTool = ({
  handleInputChange,
  handleSearchAction,
  playerNameValue,
  playerAgeValue,
  playersPositions,
  isValidAgeRange,
}) => (
  <section className="search-tool">
    <input
      type="text"
      name="name"
      mode="text"
      value={playerNameValue}
      onChange={handleInputChange}
    />
    <Dropdown
      name="position"
      placeHolder="Any Position"
      items={playersPositions}
      handleOnChange={handleInputChange}
    />
    <div className="age">
      <input
        className={isValidAgeRange ? '' : 'input-alert'}
        type="text"
        name="dateOfBirth"
        mode="numeric"
        value={playerAgeValue}
        onChange={handleInputChange}
        maxLength="2"
      />
      {!isValidAgeRange &&
      <span className="alert">
        Min allowed age: 18<br />
        Max allowed age: 40
      </span>}
    </div>
    <button
      onClick={handleSearchAction}
    >
      Search
    </button>
  </section>
);

SearchTool.defaultProps = {
  playerNameValue: '',
  playerAgeValue: '',
  isValidAgeRange: true,
};

SearchTool.propTypes = {
  playerNameValue: PropTypes.string,
  playerAgeValue: PropTypes.string,
  isValidAgeRange: PropTypes.bool,
  handleInputChange: PropTypes.func.isRequired,
  handleSearchAction: PropTypes.func.isRequired,
  playersPositions: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchTool;
