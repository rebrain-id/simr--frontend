import {
	FETCH_AUTH_FAILURE,
	FETCH_AUTH_REQUEST,
	FETCH_LOGIN_SUCCESS,
	FETCH_LOGOUT_SUCCESS,
	FETCH_UPDATE_SUCCESS,
} from '../actions/authAction';

const initialState = {
	loading: false,
	auth: [],
	error: null,
	isLogin: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_AUTH_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_LOGIN_SUCCESS:
			return {
				...state,
				loading: false,
				isLogin: true,
			};
		case FETCH_UPDATE_SUCCESS:
			return {
				...state,
				isLogin: true,
			};
		case FETCH_LOGOUT_SUCCESS:
			return {
				...state,
				auth: action.payload,
				loading: false,
				isLogin: false,
			};
		case FETCH_AUTH_FAILURE:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default authReducer;
