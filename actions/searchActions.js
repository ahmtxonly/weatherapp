import {
  HTTP_REQUEST,
  SEARCH,
  SEARCH_FIVE_DAILY,
  SEARCH_RESET
} from '../constants';

export const searchCurrent = search => (dispatch, getState, { fetch }) => {

  const url = `/weather?q=${search}`;

  dispatch({
    type: HTTP_REQUEST,
    payload: {
      fetch,
      method: 'GET',
      url,
      label: SEARCH,
    },
  });
};

export const resetSearchCurrent = () => (dispatch, getState, { fetch }) => {
  dispatch({ type: SEARCH_RESET });
};

export const searchFiveDaily = search => (dispatch, getState, { fetch }) => {

  const url = `/forecast?q=${search}`;

  dispatch({
    type: HTTP_REQUEST,
    payload: {
      fetch,
      method: 'GET',
      url,
      label: SEARCH_FIVE_DAILY,
    },
  });
};