import React, { useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../header/header';
import Reviews from '../reviews/reviews';
import BookForm from '../book-form/book-form';
//import NearPlaces from '../near-places/near-places';
import Map from '../map/map';
import { connect } from 'react-redux';
import { RATING_SCALE } from '../../constants/offers';
import { loadHotelsNearby, loadHotelComments, loadHotelById } from '../../store/actions';
import { AuthorizationStatus } from '../../constants/authorization-status';
import { LOGIN } from '../../constants/route-pathes';

function Room({ nearPlaces, onLoadHotelsNearby, hotel, onLoadComments, onLoadHotel, authorizationStatus }) {
  const { id } = useParams();
  const [isBookformVisible, setVisibilityBookForm] = useState(false);

  useEffect(() => {
    //onLoadHotelsNearby(id);
    onLoadComments(id);
    onLoadHotel(id);
  }, []);


  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {hotel && hotel.images?.map((source) => (
                <div className="property__image-wrapper" key={source}>
                  <img className="property__image" src={source} alt="Photo studio"></img>
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {hotel && hotel?.isPremium && <div className="property__mark"><span>Premium</span></div>}
              <div className="property__name-wrapper">
                <h1 className="property__name">{hotel && hotel?.title}</h1>
                <button className={`property__bookmark-button ${hotel && hotel?.isFavorite && 'property__bookmark-button--active'} button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use href="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${hotel && hotel?.rating * RATING_SCALE}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{hotel && hotel?.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {hotel && hotel?.type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {`${hotel && hotel?.bedrooms} комнат`}
                </li>
                <li className="property__feature property__feature--adults">
                  {`Максимальное количтво гостей ${hotel && hotel?.maxAdults}`}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value"> {hotel && `${hotel?.price} BYN`}</b>
                <span className="property__price-text">&nbsp;ночь</span>
              </div>
              {authorizationStatus === AuthorizationStatus.AUTH
                ? <div>
                  {!isBookformVisible && <button className="property__book-button" onClick={() => setVisibilityBookForm(true)}>Забронировать</button>}
                  {isBookformVisible && <BookForm hotelId={id} setVisibilityBookForm={setVisibilityBookForm} price={hotel && hotel?.price} />}
                </div>
                : <div>
                  <Link className="property__book-button" to={LOGIN} style={{textAlign: 'center'}}>Для бронирования пройдите авторизацию =></Link>
                </div>}
              <div className="property__inside">
                <h2 className="property__inside-title">Предлагаемые удобства</h2>
                <ul className="property__inside-list">
                  {hotel && hotel.goods?.map((item) => <li className="property__inside-item" key={item}>{item}</li>)}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">{hotel && hotel.hostId?.name}</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper"
                    style={
                      { backgroundImage: `url(${hotel?.hostId?.avatarUrl})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        width: "74px", 
                        height: "74px",
                        borderRadius: "50%",
                      }
                    }
                  />
                  {hotel && hotel.hostId?.isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {hotel && hotel?.description}
                  </p>
                </div>
              </div>
              <Reviews hotelId={id} />
            </div>
          </div>
          <section className="property__map map">
            {hotel && Object.keys(hotel).length &&
              <Map hotel={hotel} />}
          </section>
        </section>
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
  authorizationStatus: PropTypes.string,
};


const mapStateToProps = (state) => ({
  authorizationStatus: state.USER.authorizationStatus,
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
    dispatch(loadHotelById(id));
  },
});

export { Room };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Room);
