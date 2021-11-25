import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../header/header';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from '../../store/actions';

function Filters({ onSubmitData }) {
  const bedroomRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmitData({
      email: emailRef.current.value,
      password: passwordRef.current.value,
    });
  };

  return (
    <div className="page page--gray page--login">
      <Header />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Вход</h1>
            <form className="login__form form" action="#" onSubmit={handleSubmit} method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={emailRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required=""
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required=""
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Отправить</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="/">
                <span>На главную</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
SignIn.propTypes = {
  onSubmitData: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmitData(authData) {
    dispatch(signIn(authData));
  },
});

export { SignIn };
export default connect(
  null,
  mapDispatchToProps,
)(SignIn);

