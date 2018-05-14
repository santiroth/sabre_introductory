import React from 'react';
import PropTypes from 'prop-types';

import './Dropdown.css';

const Dropdown = ({
  name,
  placeHolder,
  items,
  handleOnChange,
}) => (
  <div className="dropdown">
    <select
      name={name}
      className="dropdown-selector"
      onChange={handleOnChange}
    >
      <option value="">{placeHolder}</option>
      {items.map(item => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
  </div>
);

Dropdown.defaultProps = {
  name: '',
  placeHolder: 'Select an option',
};

Dropdown.propTypes = {
  name: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleOnChange: PropTypes.func.isRequired,
  placeHolder: PropTypes.string,
};

export default Dropdown;
