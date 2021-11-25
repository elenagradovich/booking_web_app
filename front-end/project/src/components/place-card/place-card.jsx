import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getOfferLink } from '../../constants/route-pathes';
import { RATING_SCALE } from '../../constants/offers';
import { connect } from 'react-redux';

function PlaceCard ({ hotel }) {
  return (
    <article
      className="cities__place-card place-card"
    >
      {hotel?.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>)}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to="#">
          <img className="place-card__image" src="/img/studio-01.jpg" width="260" height="200" alt="Place"></img>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">BYN{hotel?.price}</b>
            <span className="place-card__price-text">&nbsp;ночь</span>
          </div>
          <button className={`place-card__bookmark-button${hotel?.isFavorite && '--active'} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${hotel?.rating * RATING_SCALE}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={getOfferLink(hotel?.id)}>
            {hotel?.title}
          </Link>
        </h2>
      </div>
    </article>
  );
}

PlaceCard.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
    rating: PropTypes.number,
    isPremium: PropTypes.bool,
    isFavorite: PropTypes.bool,
    price: PropTypes.number,
    previewImage: PropTypes.string,
    city: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

const mapStateToProps = (state) => ({
  hotels: state.hotels,
});


export { PlaceCard };

export default connect(
  mapStateToProps,
  null,
)(PlaceCard);
