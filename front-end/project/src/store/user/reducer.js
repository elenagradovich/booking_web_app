import { ActionTypes } from '../action-types';
import { AuthorizationStatus } from '../../constants/authorization-status';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
  authInfo: {},
  isDataLoaded: false,
  authorizationStatus: AuthorizationStatus.NO_AUTH,
});

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.START_LOADING: {
      return {
        ...state,
        isDataLoaded: false,
      };
    }
    case ActionTypes.REQUIRED_AUTHORIZATION:
      return {
        ...state,
        authorizationStatus: action.payload,
      };
    case ActionTypes.LOAD_AUTH_INFO:
      return {
        ...state,
        authInfo: action.payload,
      };
    default:
      return state;
  }
};
