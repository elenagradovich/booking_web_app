import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LOGIN } from '../../constants/route-pathes';
import { AuthorizationStatus } from '../../constants/authorization-status';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function PrivateRoute({render, path, exact, authorizationStatus}) {
  return (
    <Route
      path={path}
      exact={exact}
      render={(routeProps) => (
        authorizationStatus === AuthorizationStatus.AUTH
          ? render(routeProps)
          : <Redirect to={LOGIN}/>
      )}
    />
  );
}

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.USER.authorizationStatus,
});


export { PrivateRoute };
export default connect(mapStateToProps)(PrivateRoute);
