import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getOfferLink } from '../../constants/route-pathes';
import { RATING_SCALE } from '../../constants/offers';

function PlaceCardNear ({ hotel }) {
  const {
    id,
    title,
    type,
    rating,
    isFavorite,
    price,
    previewImage,
  } = hotel;
  return (
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <Link to={getOfferLink(id)}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place image"></img>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;ночь</span>
          </div>
          <button className={`place-card__bookmark-button ${isFavorite ? 'place-card__bookmark-button--active' : ''} button`} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${rating * RATING_SCALE}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to="#">{title}</Link>
        </h2>
      </div>
    </article>
  );
}

PlaceCardNear.defaultProps = {
  hotel: [],
};

PlaceCardNear.propTypes = {
  hotel: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    previewImage: PropTypes.string,
    price: PropTypes.number,
    isFavorite: PropTypes.bool,
    description: PropTypes.string,
    type: PropTypes.string,
    rating: PropTypes.number,
  }),
};

export default PlaceCardNear;
