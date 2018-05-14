import { connect } from 'react-redux';

import getLoadingIndicatorStatus from './selectors';

import LoadingIndicator from './LoadingIndicator';

const mapStateToProps = state => ({
  isLoading: getLoadingIndicatorStatus(state),
});

export default connect(mapStateToProps)(LoadingIndicator);
