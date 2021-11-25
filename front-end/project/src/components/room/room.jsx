import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../header/header';
import Reviews from '../reviews/reviews';
import NearPlaces from '../near-places/near-places';
import Map from '../map/map';
import { connect } from 'react-redux';
import { RATING_SCALE } from '../../constants/offers';
import { loadHotelsNearby, loadHotelComments, loadHotel } from '../../store/actions';

function Room({ nearPlaces, hotel, onLoadHotelsNearby, onLoadComments, onLoadHotel }) {
  const { id } = useParams();
  useEffect(() => {
    onLoadHotelsNearby(id);
    onLoadComments(id);
    onLoadHotel(id);
  }, []);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            {/* <div className="property__gallery">
              {hotel && hotel?.images.map((source) => (
                <div className="property__image-wrapper" key={source}>
                  <img className="property__image" src={source} alt="Photo studio"></img>
                </div>
              ))}
            </div> */}
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {hotel?.isPremium && <div className="property__mark"><span>Premium</span></div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">{hotel?.title}</h1>
                <button className={`property__bookmark-button ${hotel?.isFavorite && 'property__bookmark-button--active'} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use href="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${hotel?.rating * RATING_SCALE}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{hotel?.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {hotel?.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${hotel?.bedrooms} Bedrooms`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Max ${hotel?.maxAdults} adults`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{hotel?.price}</b>
                <span className="property__price-text">&nbsp;ночь</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                {/* <ul className="property__inside-list">
                  {hotel && hotel?.goods.map((item) => <li className="property__inside-item" key={item}>{item}</li>)}
                </ul> */}
              </div>
              <div className="property__host">
                <h2 className="property__host-title">{hotel?.host.name}</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={hotel?.host.avatarUrl} width="74" height="74" alt="Host avatar"></img>
                  </div>
                  <span className="property__user-name">
                    {hotel?.host.name}
                  </span>
                  {hotel?.host.isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {hotel?.description}
                  </p>
                </div>
              </div>
              <Reviews hotelId={+id} />
            </div>
          </div>
          <section className="property__map map">
            {/* {hotel && Object.keys(hotel).length && nearPlaces &&
              <Map
                currentOfferId={+id}
                cityOffers={[...nearPlaces, hotel]}
              />} */}
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Предложения рядом</h2>
            <NearPlaces places={nearPlaces} />
          </section>
        </div>
      </main>
    </div>
  );
}

Room.propTypes = {
  nearPlaces: PropTypes.array,
  onLoadHotelsNearby: PropTypes.func,
  onLoadComments: PropTypes.func,
  onLoadHotel: PropTypes.func,
  hotel: PropTypes.object,
};


const mapStateToProps = (state) => ({
  authInfo: state.USER.authInfo,
  comments: state.DATA.comments,
  nearPlaces: state.DATA.nearPlaces,
  hotel: state.DATA.hotel,
});

const mapDispatchToProps = (dispatch) => ({
  onLoadHotelsNearby(id) {
    dispatch(loadHotelsNearby(id));
  },
  onLoadComments(id) {
    dispatch(loadHotelComments(id));
  },
  onLoadHotel(id) {
    dispatch(loadHotel(id));
  },
});

export { Room };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Room);
