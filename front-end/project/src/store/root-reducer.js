import { combineReducers } from 'redux';
import { reducer as dataReducer }from './data/reducer';
import { reducer as userReducer } from './user/reducer';

export default combineReducers({
  DATA: dataReducer,
  USER: userReducer,
});
