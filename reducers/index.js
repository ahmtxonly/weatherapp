import { combineReducers } from 'redux';
import search from './searchCurrentReducer';
import searchdaily from './searchFiveDailyReducer';

export default combineReducers({
    search,
    searchdaily
  });