import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MAIN } from '../../constants/route-pathes';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PlaceCardOrder from '../place-card-order/place-card-order';
import { loadOrders, showErrorMessage } from '../../store/actions';
import Header from '../header/header';

function Orders ({ orders, onLoadOrders, errorMessage, onShowErrorMessage }) {
  useEffect(() => {
    onLoadOrders();
  }, []);
  const isEmpty = !orders?.length;//Optional chaining operator

  useEffect(() => {
    setTimeout(() => {
      onShowErrorMessage(null);
    }, 5000);
  }, [errorMessage, onShowErrorMessage]);

  return (
    <div className={`page ${isEmpty && 'pages--favorites-empty'}`}>
      <Header />
      {errorMessage && <p style={{color: 'red', fontWeight: 'bold'}}>{errorMessage}</p>}
      <main className={`page__main page__main--favorites ${isEmpty && 'page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          {!isEmpty && (
            <section className="favorites">
              <h1 className="favorites__title">Забронированные варианты</h1>
              <ul className="favorites__list">
                {orders.map((hotel) => <PlaceCardOrder hotel={hotel} key={hotel.id}/>)}
              </ul>
            </section>)}
          {isEmpty &&
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Orders</h1>
              <div className="favorites__status-wrapper">
                <p><b className="favorites__status">Пока список забронированных мест пуст, но мы знаем как это исправить</b></p>
                <p className="favorites__status-description">Переходи по ссылке и выбирай интересный вариант</p>
                <Link className="favorites__logo-link" to={MAIN}>
                  <img className="favorites__logo" src="img/logo.svg" alt="6 map logo" width="64" height="33"></img>
                </Link>
              </div>
            </section>}
        </div>
      </main>
    </div>
  );
}

Orders.propTypes = {
  orders: PropTypes.array,
  onLoadOrders: PropTypes.func,
  errorMessage: PropTypes.string,
  onShowErrorMessage: PropTypes.func,
};

const mapStateToProps = (state) => ({
  orders: state.DATA.orders,
  errorMessage: state.DATA.errorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadOrders() {
    dispatch(loadOrders());
  },
  onShowErrorMessage(err) {
    dispatch(showErrorMessage(err));
  },
});

export { Orders };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Orders);
