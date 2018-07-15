import React from 'react';
import PropTypes from 'prop-types';

import SearchTool from './SearchTool';
import PlayersTable from './PlayersTable';
import LoadingIndicator from '../Common/LoadingIndicator';

class FootballPlayersFinder extends React.Component {
  static defaultProps = {
    filteredPlayersList: [],
    playersPositions: [],
    loadFootballPlayers: () => null,
    loadFilteredFootballPlayers: () => null,
  };

  static propTypes = {
    loadFootballPlayers: PropTypes.func,
    loadFilteredFootballPlayers: PropTypes.func,
    filteredPlayersList: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
    })),
    playersPositions: PropTypes.arrayOf(PropTypes.string),
  };

  state = {
    isValidAgeRange: true,
  };

  async componentDidMount() {
    await this.props.loadFootballPlayers();
  }

  sanitizeInput = (input) => {
    const { mode } = input.attributes;

    if (mode && mode.value === 'text') {
      return input.value.replace(/[^a-z\s]/ig, '');
    }

    if (mode && mode.value === 'numeric') {
      return input.value.replace(/\D/g, '');
    }

    return input.value;
  };

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: this.sanitizeInput(event.target),
    });
  };

  validateAgeRange = () => {
    if ((this.state.dateOfBirth >= 18 && this.state.dateOfBirth <= 40) || !this.state.dateOfBirth) {
      this.setState({
        isValidAgeRange: true,
      });

      return true;
    }

    this.setState({
      isValidAgeRange: false,
    });

    return false;
  };

  handleSearchAction = () => {
    if (this.validateAgeRange()) {
      const { name = '', position = '', dateOfBirth = '' } = this.state;

      this.props.loadFilteredFootballPlayers({ name, position, dateOfBirth });
    }
  };

  render() {
    return (
      <div>
        <h1>Football Player Finder</h1>
        <SearchTool
          handleInputChange={this.handleInputChange}
          handleSearchAction={this.handleSearchAction}
          playerNameValue={this.state.name}
          playerAgeValue={this.state.dateOfBirth}
          playersPositions={this.props.playersPositions}
          isValidAgeRange={this.state.isValidAgeRange}
        />
        <PlayersTable
          playersList={this.props.filteredPlayersList}
        />
        <LoadingIndicator />
      </div>
    );
  }
}

export default FootballPlayersFinder;
