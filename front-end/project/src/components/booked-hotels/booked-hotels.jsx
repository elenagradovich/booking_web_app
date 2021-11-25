import React from 'react';
import PropTypes from 'prop-types';
import { MAIN } from '../../constants/route-pathes';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PlaceCardFavorite from '../place-card-favorite/place-card-favorite';
import Header from '../header/header';

function BookedHotels ({ favoriteHotels }) {
  const isEmpty = !favoriteHotels?.length;//Optional chaining operator

  return (
    <div className={`page ${isEmpty && 'pages--favorites-empty'}`}>
      <Header />
      <main className={`page__main page__main--favorites ${isEmpty && 'page__main--favorites-empty'}`}>
        <div className="page__favorites-container container">
          {!isEmpty && (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {[...favoriteHotels.keys()].map((location) => (
                  <li className="favorites__locations-items" key={location}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to="#">
                          <span>{`${location[0]}${location.toLowerCase().slice(1)}`}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {favoriteHotels.get(location).map((hotel) => <PlaceCardFavorite hotel={hotel} key={hotel.id}/>)}
                    </div>
                  </li>))}
              </ul>
            </section>)}
          {isEmpty &&
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>}
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={MAIN}>
          <img className="footer__logo" src="img/logo.svg" alt="6 map logo" width="64" height="33"></img>
        </Link>
      </footer>
    </div>
  );
}

BookedHotels.propTypes = {
  favoriteHotels: PropTypes.array,
};

const mapStateToProps = (state) => ({
  favoriteHotels: state.favoriteHotels,
});

export { BookedHotels };
export default connect(
  mapStateToProps,
  null,
)(BookedHotels);
