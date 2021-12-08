import { ActionTypes } from '../action-types';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  cityId: '',
  cityOffers: [],
  hotels: [],
  nearPlaces: [],
  comments: [],
  orders: [],
  favoriteHotels: [],
  isDataLoaded: false,
  hotel: {},
  isReviewFormVisible: false,
  constranedDates: [],
  errorMessage: null,
});

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.USER_LOGOUT:{
      return {
        ...state,
        orders: initialState.orders,
        comments: initialState.comments,
        hotel: initialState.hotel,
      };
    }
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
        isReviewFormVisible: false,
      };
    case ActionTypes.LOAD_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
        isDataLoaded: true,
      };
    case ActionTypes.LOAD_CONSTRANED_DATES:{
      return {
        ...state,
        constranedDates: action.payload.dates,
        isDataLoaded: true,
      };}
    case ActionTypes.REVIEW_FORM_VISIBLE:
      return {
        ...state,
        isReviewFormVisible: true,
      };
    case ActionTypes.SHOW_ERROR_MESSAGE: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }
    default:
      return state;
  }
};

