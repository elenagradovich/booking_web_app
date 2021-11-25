import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { RATING_SCALE } from '../../constants/offers';

function PlaceCardFavorite ({ hotel }) {
  const {
    previewImage,
    price,
    rating,
    title,
  } = hotel;
  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to="#">
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image"></img>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;ночь</span>
          </div>
          <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button">
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

PlaceCardFavorite.defaultProps = {
  hotel: {},
};

PlaceCardFavorite.propTypes = {
  hotel: PropTypes.shape({
    title: PropTypes.string,
    type: PropTypes.string,
    rating: PropTypes.number,
    price: PropTypes.number,
    previewImage: PropTypes.string,
  }),
};

export default PlaceCardFavorite;
