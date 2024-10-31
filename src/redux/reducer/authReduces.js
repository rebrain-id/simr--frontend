import {
	CLOSE_MESSAGE,
	CLOSE_MODAL,
	FETCH_AUTH_FAILURE,
	FETCH_AUTH_REQUEST,
	FETCH_DELETE_SUCCESS,
	FETCH_GET_AUTH_SUCCESS,
	FETCH_LOGIN_SUCCESS,
	FETCH_LOGOUT_SUCCESS,
	FETCH_REGISTER_SUCCESS,
	FETCH_UPDATE_SUCCESS,
	MESSAGE,
	OPEN_MODAL,
} from '../actions/authAction';

const initialState = {
	loading: false,
	auth: [],
	error: null,
	isLogin: false,
	message: null,
	isUpdated: false,
	isOpenModal: false,
	username: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_AUTH_REQUEST:
			return {
				...state,
				loading: true,
			};
		case FETCH_GET_AUTH_SUCCESS:
			return {
				...state,
				loading: false,
				auth: action.payload,
			};
		case FETCH_REGISTER_SUCCESS:
			return {
				...state,
				loading: false,
				isLogin: true,
				isUpdated: true,
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
		case FETCH_DELETE_SUCCESS:
			return {
				...state,
				loading: false,
				isLogin: false,
				isUpdated: true,
			};
		case FETCH_AUTH_FAILURE:
			return {
				...state,
				error: action.payload,
			};
		case MESSAGE:
			return {
				...state,
				message: action.payload,
			};
		case CLOSE_MESSAGE:
			return {
				...state,
				message: null,
			};
		case OPEN_MODAL:
			return {
				...state,
				isOpenModal: true,
				username: action.payload,
			};
		case CLOSE_MODAL:
			return {
				...state,
				isOpenModal: false,
				username: null,
			};
		default:
			return state;
	}
};

export default authReducer;
