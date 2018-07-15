import React from 'react';
import PropTypes from 'prop-types';

import './LoadingIndicator.css';

const LoadingIndicator = ({ isLoading }) => (
  isLoading &&
    <div className="overlay">
      <div className="loading-container">
        <div className="spinner" />
        <div>Loading...</div>
      </div>
    </div>
);

LoadingIndicator.defaultProps = {
  isLoading: false,
};

LoadingIndicator.propTypes = {
  isLoading: PropTypes.bool,
};

export default LoadingIndicator;
