import React from 'react';
import Review from '../review/review';
import ReviewForm from '../review-form/review-form';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { AuthorizationStatus } from '../../constants/authorization-status';

function Reviews ({ hotelId, comments, authorizationStatus }) {
  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{comments?.length}</span></h2>
      <ul className="reviews__list">
        {comments && comments.map((review) => <Review review={review} key={review.id}/>)}
      </ul>
      {authorizationStatus === AuthorizationStatus.AUTH && <ReviewForm hotelId={hotelId} />}
    </section>
  );
}


Reviews.propTypes = {
  comments: PropTypes.array,
  hotelId: PropTypes.number,
  authorizationStatus: PropTypes.string,
};

const mapStateToProps = (state) => ({
  comments: state.comments,
  authorizationStatus: state.authorizationStatus,
});

export { Reviews };
export default connect(
  mapStateToProps,
  null,
)(Reviews);
