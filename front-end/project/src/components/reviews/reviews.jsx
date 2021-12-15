import React from 'react';
import Review from '../review/review';
import ReviewForm from '../review-form/review-form';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { AuthorizationStatus } from '../../constants/authorization-status';
import { setReviewFormVisible } from '../../store/actions';

function Reviews ({ hotelId, comments, authorizationStatus, isReviewFormVisible, onSetVisibleReviewForm }) {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Отзывы &middot; <span className="reviews__amount">{comments?.length}</span></h2>
      <ul className="reviews__list">
        {comments && comments.map((review) => <Review review={review} key={review.id}/>)}
      </ul>
      {authorizationStatus === AuthorizationStatus.AUTH &&
        (isReviewFormVisible
          ? <ReviewForm hotelId={hotelId} />
          : <button
            className='reviews__show-form-button button'
            onClick={onSetVisibleReviewForm}>
              ОСТАВИТЬ ОТЗЫВ
          </button>
        )}
    </section>
  );
}


Reviews.propTypes = {
  comments: PropTypes.array,
  hotelId: PropTypes.string,
  authorizationStatus: PropTypes.string,
  isReviewFormVisible: PropTypes.bool,
  onSetVisibleReviewForm: PropTypes.func,
};

const mapStateToProps = (state) => ({
  comments: state.DATA.comments,
  isReviewFormVisible: state.DATA.isReviewFormVisible,
  authorizationStatus: state.USER.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  onSetVisibleReviewForm() {
    dispatch(setReviewFormVisible());
  },
});

export { Reviews };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reviews);
