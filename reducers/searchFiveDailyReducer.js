import {
    SEARCH_FIVE_DAILY_REQUEST,
    SEARCH_FIVE_DAILY_SUCCESS,
    SEARCH_FIVE_DAILY_FAILURE
} from '../constants';

const initialState = {
    isLoading: false,
    error: false,
    dailyData: {},
};

const search = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_FIVE_DAILY_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case SEARCH_FIVE_DAILY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                dailyData: action.payload,
                error: null,
            };
        case SEARCH_FIVE_DAILY_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        default:
            return state;
    }
};
export default search