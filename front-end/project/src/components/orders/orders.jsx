import React from 'react';
import PropTypes from 'prop-types';
import { MAIN } from '../../constants/route-pathes';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PlaceCardOrder from '../place-card-order/place-card-order';
import Header from '../header/header';

function Orders ({ bookedHotels }) {
  const isEmpty = !bookedHotels?.length;//Optional chaining operator

  return (
    <div className={`page ${isEmpty && 'pages--favorites-empty'}`}>
      <Header />
      <main className={`page__main page__main--favorites ${isEmpty && 'page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          {!isEmpty && (
            <section className="favorites">
              <h1 className="favorites__title">Забронированные варианты</h1>
              <ul className="favorites__list">
                {[...bookedHotels.keys()].map((location) => (
                  <li className="favorites__locations-items" key={location}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to="#">
                          <span>{`${location[0]}${location.toLowerCase().slice(1)}`}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {bookedHotels.get(location).map((hotel) => <PlaceCardOrder hotel={hotel} key={hotel.id}/>)}
                    </div>
                  </li>))}
              </ul>
            </section>)}
          {isEmpty &&
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites</h1>
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
  bookedHotels: PropTypes.array,
};

const mapStateToProps = (state) => ({
  bookedHotels: state.DATA.bookedHotels,
});

export { Orders };
export default connect(
  mapStateToProps,
  null,
)(Orders);
