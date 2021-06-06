import {
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_FAILURE,
    SEARCH_RESET
} from '../constants';

const initialState = {
    isLoading: false,
    error: false,
    data: {},
};

const search = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case SEARCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                data: action.payload,
                error: null,
            };
        case SEARCH_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: true,
            };
        case SEARCH_RESET:
            return {
                ...state,
                data: {},
                isLoading: false,
                error: false,
            };
        default:
            return state;
    }
};
export default search