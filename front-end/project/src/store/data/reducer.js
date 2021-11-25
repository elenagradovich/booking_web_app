import { ActionTypes } from '../action-types';
import { AuthorizationStatus } from '../../constants/authorization-status';
import Immutable from 'seamless-immutable';

const initialCityId = '017';

const initialState = Immutable({
  cityId: initialCityId,
  cityOffers: [],
  hotels: [],
  nearPlaces: [],
  comments: [],
  favoriteHotels: [],
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  hotel: {},
});

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.START_LOADING:
      return {
        ...state,
        isDataLoaded: false,
      };
    case ActionTypes.CHANGE_ACTIVE_CITY:
      return {
        ...state,
        cityId: action.payload,
      };
    case ActionTypes.CHANGE_OFFERS_OF_CITY:
      return {
        ...state,
        cityOffers: action.payload,
      };
    case ActionTypes.LOAD_HOTELS: {
      return {
        ...state,
        hotels: action.payload,
        isDataLoaded: true,
      };
    }
    case ActionTypes.LOAD_HOTEL: {
      return {
        ...state,
        hotel: action.payload.hotel,
        isDataLoaded: true,
      };
    }
    case ActionTypes.LOAD_FAVORITE_HOTELS: {
      const { favoriteHotels } = action.payload;
      return {
        ...state,
        favoriteHotels,
        isDataLoaded: true,
      };
    }
    case ActionTypes.LOAD_HOTELS_NEARBY:
      return {
        ...state,
        nearPlaces: action.payload.hotels,
        isDataLoaded: true,
      };
    case ActionTypes.LOAD_HOTEL_COMMENTS:
      return {
        ...state,
        comments: action.payload.comments,
        isDataLoaded: true,
      };
    default:
      return state;
  }
};

