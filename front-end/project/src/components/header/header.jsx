import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MAIN, LOGIN, BOOKED_HOTELS, REGISTRATION } from '../../constants/route-pathes';
import { AuthorizationStatus } from '../../constants/authorization-status';
import { logout } from '../../store/actions';


function Header ({ authInfo, authorizationStatus, onLogout }) {
  const isLogged = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={ MAIN }>
              <img className="header__logo" src="img/logo.svg" alt="cities logo" width="81" height="41"></img>
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                {isLogged
                  ? (
                    <Link className="header__nav-link header__nav-link--profile" to={ BOOKED_HOTELS }>
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__user-name user__name">{authInfo?.email}</span>
                    </Link>)
                  : (
                    <div className="header__nav-link-wrapper">
                      <Link className="header__nav-link header__nav-link--profile" to={ LOGIN }>
                        <span className="header__login">Войти</span>
                      </Link>
                      <Link className="header__nav-link header__nav-link--profile" to={ REGISTRATION }>
                        <span className="header__login">Регистрация</span>
                      </Link>
                    </div>)}
              </li>
              {isLogged && (
                <li className="header__nav-item">
                  <button className="header__nav-link" onClick={onLogout}>
                    <span className="header__signout">Выйти</span>
                  </button>
                </li>)}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  authInfo: PropTypes.shape({
    email: PropTypes.string,
  }),
  authorizationStatus: PropTypes.string,
};

const mapStateToProps = (state) => ({
  authInfo: state.USER.authInfo,
  authorizationStatus: state.USER.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout() {
    dispatch(logout());
  },
});

export { Header };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
