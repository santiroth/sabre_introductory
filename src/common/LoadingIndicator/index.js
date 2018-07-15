import { connect } from 'react-redux';

import getLoadingIndicatorStatus from './LoadingIndicator.selectors';

import LoadingIndicator from './LoadingIndicator';

const mapStateToProps = state => ({
  isLoading: getLoadingIndicatorStatus(state),
});

export default connect(mapStateToProps)(LoadingIndicator);
