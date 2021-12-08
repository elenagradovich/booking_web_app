import React from 'react';
import PropTypes from 'prop-types';
import { RATING_SCALE } from '../../constants/offers';
// import {Link} from 'react-router-dom';
// import { getOfferLink } from '../../constants/route-pathes';
import { DateFormat } from '../../constants/calendar';
import { getDateInFormat } from '../../utils/common';

function PlaceCardOrder ({ hotel }) {
  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <img className="place-card__image" src={hotel?.previewImage} width="150" height="110" alt="Place image"></img>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b>BYN{hotel?.price}</b>
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
        <div>
          <span>Дата заказа:</span>
          <span>{hotel && getDateInFormat(hotel?.date, DateFormat.DATE_SLASH)}</span>
        </div>
        <div className="place-card__date" style={{border: '1px solid grey', borderRadius: '4px', padding: '5px'}}>
          <span>{hotel && getDateInFormat(hotel?.dateFrom, DateFormat.DATE_SLASH)}</span>
          <span>  -  </span>
          <span>{hotel && getDateInFormat(hotel?.dateTo, DateFormat.DATE_SLASH)}</span>
        </div>
        <p>Гостей: {hotel?.guestsAmount}</p>
        <p>Итого: <b className="place-card__price-value">{hotel?.total}BYN</b></p>
        {/* <div>
          <Link to={getOfferLink(hotel?._id)} style={{marginLeft: 'auto'}}><b>Подробнее</b></Link>
        </div> */}
      </div>
    </article>
  );
}

PlaceCardOrder.propTypes = {
  hotel: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.string,
    rating: PropTypes.number,
    price: PropTypes.number,
    total: PropTypes.number,
    previewImage: PropTypes.string,
    dateFrom: PropTypes.string,
    dateTo: PropTypes.string,
    date: PropTypes.string,
    guestsAmount: PropTypes.number,
  }),
};

export default PlaceCardOrder;
