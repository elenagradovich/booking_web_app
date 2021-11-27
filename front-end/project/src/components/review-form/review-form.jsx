import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { submitComment } from '../../store/actions';
import { connect } from 'react-redux';
import RatingElement from '../rating-element/rating-element';

function ReviewForm ({ hotelId, onSubmitComment }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const clickRatingHandler = (e) => {
    setRating(e.target.value);
  };

  const changeCommentHandler = (e) => {
    setComment(e.target.value);
  };

  const submitClickHandler = (e) => {
    e.preventDefault();
    if(comment && rating) {
      onSubmitComment(
        hotelId,
        comment,
        rating,
      );
    }
  };

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Ваш отзыв</label>
      <div className="reviews__rating-form form__rating">
        {<RatingElement clickHandler={clickRatingHandler}/>}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Расскажите о ваших впечатлениях и чтобы Вы хотели улучшить"
        value={comment}
        onChange={changeCommentHandler}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          Чтобы отправить отзыв, убедитесь,
          <span className="reviews__star">выставлен рейтинг</span> и
          описание содержит минимум <b className="reviews__text-amount">50 символов</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled=""
          onClick={submitClickHandler}
        >
          Отправить
        </button>
      </div>
    </form>
  );
}

ReviewForm.propTypes = {
  onSubmitComment: PropTypes.func,
  hotelId: PropTypes.string,
};

const mapDispatchToProps = (dispatch) => ({
  onSubmitComment(hotelId, comment,rating ) {
    dispatch(submitComment(hotelId, comment, rating ));
  },
});

export { ReviewForm };
export default connect(
  null,
  mapDispatchToProps,
)(ReviewForm);
