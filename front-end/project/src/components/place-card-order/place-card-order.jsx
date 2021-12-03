import React from 'react';
import PropTypes from 'prop-types';
import { RATING_SCALE } from '../../constants/offers';

function PlaceCardOrder ({ hotel }) {
  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <img className="place-card__image" src={hotel?.previewImage} width="150" height="110" alt="Place image"></img>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">BYN{hotel?.price}</b>
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
            <span style={{width: `${hotel?.rating * RATING_SCALE}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">{hotel?.title}</h2>
        <div className="place-card__date">
          <span>{hotel && hotel?.dateFrom}</span>
          <span>-</span>
          <span>{hotel && hotel?.dateTo}</span>
        </div>
      </div>
    </article>
  );
}

PlaceCardOrder.propTypes = {
  hotel: PropTypes.shape({
    title: PropTypes.string,
    type: PropTypes.string,
    rating: PropTypes.number,
    price: PropTypes.number,
    previewImage: PropTypes.string,
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
  }),
};

export default PlaceCardOrder;
