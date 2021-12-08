import { ActionTypes } from './action-types';
import * as APIRoutes from '../constants/route-pathes';
import { AuthorizationStatus } from '../constants/authorization-status';
import { getHotelCommentsLink, getHotelLink, getNearbyHotelsLink, MAIN, getHotelBookLink } from '../constants/route-pathes';

import humps from 'humps';

export const showErrorMessage = (err) => ({
  type: ActionTypes.SHOW_ERROR_MESSAGE,
  payload: err,
});

export const startLoading = () => ({
  type: ActionTypes.START_LOADING,
});

export const setReviewFormVisible = () => ({
  type: ActionTypes.REVIEW_FORM_VISIBLE,
});

export const updateCity = (city) => ({
  type: ActionTypes.CHANGE_ACTIVE_CITY,
  payload: city,
});

export const loadHotels = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.HOTELS)
    .then(({data}) => {
      const hotels = humps.camelizeKeys(data);
      dispatch({ type: ActionTypes.LOAD_HOTELS, payload: hotels });
    })
);

export const loadHotelById = (id) => (dispatch, _getState, api) => (
  api.get(getHotelLink(id), {headers: {
    'Authorization': `BEARER ${localStorage.getItem('token') ?? ''}`,
  }})
    .then(({data}) => {
      const hotel = humps.camelizeKeys(data);
      dispatch({ type: ActionTypes.LOAD_HOTEL, payload: { hotel }});
    })
);

export const requireAuthorization = (status) => ({
  type: ActionTypes.REQUIRED_AUTHORIZATION,
  payload: status,
});

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.LOGIN_API)
    .then(({data}) => {
      const authInfo = humps.camelizeKeys(data);
      dispatch({ type: ActionTypes.LOAD_AUTH_INFO, payload: authInfo });
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
    })
);

export const redirectToRoute = (url) => ({
  type: ActionTypes.REDIRECT_TO_ROUTE,
  payload: url,
});


export const signIn = ({email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoutes.LOGIN_API, {email, password})
    .then(({data}) => {
      localStorage.setItem('token', data.authInfo.token);
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(
        {
          type: ActionTypes.LOAD_AUTH_INFO,
          payload: data.authInfo,
        });
    })
    .then(() => dispatch(redirectToRoute(MAIN)))
);

export const signUp = ({name, email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoutes.REGISTRATION_API, {name, email, password})
    .then(({data}) => {
      localStorage.setItem('token', data.authInfo.token);
      dispatch(
        {
          type: ActionTypes.LOAD_AUTH_INFO,
          payload: data.authInfo,
        });
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
    })
    .then(() => dispatch(redirectToRoute(MAIN)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.get(APIRoutes.LOGOUT_API)
    .then(() => {
      localStorage.removeItem('token');
      dispatch({type: ActionTypes.USER_LOGOUT});
      dispatch(requireAuthorization(AuthorizationStatus.NO_AUTH));
      dispatch({type: ActionTypes.LOAD_AUTH_INFO, payload: {}});
    })
    .then(() => dispatch(redirectToRoute(MAIN)))
);

export const loadHotelsNearby = (id) => (dispatch, _getState, api) => (
  api.get(getNearbyHotelsLink(id))
    .then(({data}) => {
      const hotels = humps.camelizeKeys(data);
      dispatch({ type: ActionTypes.LOAD_HOTELS_NEARBY, payload: { hotels }});
    })
);

export const loadHotelComments = (hotelId) => (dispatch, _getState, api) => (
  api.get(getHotelCommentsLink(hotelId), {headers: {
    'Authorization': `BEARER ${localStorage.getItem('token') ?? ''}`,
  }})
    .then(({data}) => {
      const comments = humps.camelizeKeys(data);
      dispatch({ type: ActionTypes.LOAD_HOTEL_COMMENTS, payload: { comments }});
    })
);

export const submitComment = (hotelId, comment, rating ) => (dispatch, _getState, api) => (
  api.post(getHotelCommentsLink(hotelId), { comment, rating }, {headers: {
    'Authorization': `BEARER ${localStorage.getItem('token') ?? ''}`,
  }})
    .then(({data}) => {
      const comments = humps.camelizeKeys(data);
      dispatch({ type: ActionTypes.LOAD_HOTEL_COMMENTS, payload: { comments }});
    })
);

export const submitBooking = (hotelId, bookingInfo) => (dispatch, _getState, api) => {
  api.post(getHotelBookLink(hotelId), bookingInfo, {headers: {
    'Authorization': `BEARER ${localStorage.getItem('token') ?? ''}`,
  }})
    .then(({data}) => {
      const orders = humps.camelizeKeys(data);
      dispatch({ type: ActionTypes.LOAD_ORDERS, payload: { orders }});
      dispatch(redirectToRoute(APIRoutes.ORDERS));
    });
};

export const loadOrders = () => (dispatch, _getState, api) => {
  api.get(APIRoutes.ORDERS_API, {headers: {
    'Authorization': `BEARER ${localStorage.getItem('token') ?? ''}`,
  }})
    .then(({data}) => {
      const orders = humps.camelizeKeys(data);
      dispatch({ type: ActionTypes.LOAD_ORDERS, payload: { orders }});
    });
};

export const loadConstranedDates = (id) => (dispatch, _getState, api) => {
  api.get(APIRoutes.getConstranedLink(id), {headers: {
    'Authorization': `BEARER ${localStorage.getItem('token') ?? ''}`,
  }})
    .then(({data}) => {
      const dates = humps.camelizeKeys(data);
      dispatch({ type: ActionTypes.LOAD_CONSTRANED_DATES, payload: { dates }});
    });
};
