import React, {Fragment} from 'react';
import PropTypes from 'prop-types';

function RatingElement ({clickHandler}) {
  const ratingValues = ['terribly', 'badly', 'not bad', 'good', 'perfect'];
  return ratingValues.map((item, index) => {
    const newIndex = ratingValues.length - index;
    const element = ratingValues[newIndex - 1];
    return (
      <Fragment key={element}>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value={newIndex}
          id={`${newIndex}-stars`}
          type="radio"
          onClick={(e) => clickHandler(e)}
        >
        </input>
        <label htmlFor={`${newIndex}-stars`} className="reviews__rating-label form__rating-label" title={element}>
          <svg className="form__star-image" width="37" height="33">
            <use href="#icon-star"></use>
          </svg>
        </label>
      </Fragment>
    );
  });
}

RatingElement.propTypes = {
  clickHandler: PropTypes.func,
};


export default RatingElement;
