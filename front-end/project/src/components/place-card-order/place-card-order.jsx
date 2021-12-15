import React from 'react';
import PropTypes from 'prop-types';
import { RATING_SCALE } from '../../constants/offers';
// import {Link} from 'react-router-dom';
// import { getOfferLink } from '../../constants/route-pathes';
import { DateFormat } from '../../constants/calendar';
import { getDateInFormat } from '../../utils/common';
import { cancelBooking } from '../../store/actions';
import { connect } from 'react-redux';

function PlaceCardOrder ({ order, onCancelBooking }) {
  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <img className="place-card__image" src={order?.previewImage} width="150" height="110" alt="Place image"></img>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b>BYN{order?.price}</b>
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
            <span style={{width: `${order?.rating * RATING_SCALE}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">{order?.title}</h2>
        <div>
          <span>Дата бронирования:</span>
          <span>{order && getDateInFormat(order?.date, DateFormat.DATE_SLASH)}</span>
        </div>
        <div className="place-card__date" style={{border: '1px solid grey', borderRadius: '4px', padding: '5px'}}>
          <span>{order && getDateInFormat(order?.dateFrom, DateFormat.DATE_SLASH)}</span>
          <span>  -  </span>
          <span>{order && getDateInFormat(order?.dateTo, DateFormat.DATE_SLASH)}</span>
        </div>
        <p>Гостей: {order?.guestsAmount}</p>
        <p>Итого: <b className="place-card__price-value">{order?.total}BYN</b></p>
        <div>
          <button className='reviews__show-form-button button'
            onClick={() => {
              onCancelBooking(order?.id);
            }}
          >ОТМЕНИТЬ БРОНь
          </button>
        </div>
      </div>
    </article>
  );
}

PlaceCardOrder.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string,
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
  onCancelBooking: PropTypes.func,
};


const mapDispatchToProps = (dispatch) => ({
  onCancelBooking(orderId) {
    dispatch(cancelBooking(orderId));
  },
});

export { PlaceCardOrder };
export default connect(
  null,
  mapDispatchToProps,
)(PlaceCardOrder);
