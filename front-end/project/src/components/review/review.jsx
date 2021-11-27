import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { RATING_SCALE } from '../../constants/offers';

const DateTypes = {
  MONTH_YEAR: 'month_year',
  YEAR_MONTH_DAY: 'year_month_day',
};

const getDateInFormat = (date, type) => {
  switch (type) {
    case DateTypes.MONTH_YEAR:
      return dayjs(date).format('MMMM YYYY');
    case DateTypes.YEAR_MONTH_DAY:
      return dayjs(date).format('YYYY-MM-DD');
    default:
      return dayjs(date).format('YYYY-MM-DD');
  }
};

function Review ({ review }) {

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        {/* <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={review?.userId?.avatar} width="54" height="54" alt="Reviews avatar"></img>
        </div> */}
        <span className="reviews__user-name"><b>{review && review?.userId?.name}</b></span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${review && review?.rating * RATING_SCALE}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{review?.comment}</p>
        <time className="reviews__time" dateTime={getDateInFormat(review?.date, DateTypes.YEAR_MONTH_DAY)}>{getDateInFormat(review && review?.date, DateTypes.MONTH_YEAR)}</time>
      </div>
    </li>
  );
}

Review.defaultProps = {
  review: {},
};

Review.propTypes = {
  review: PropTypes.shape({
    comment: PropTypes.string,
    date: PropTypes.string,
    id: PropTypes.string,
    rating: PropTypes.number,
    userId: PropTypes.shape({
      name: PropTypes.string,
    }),
  }),
};

export default Review;
