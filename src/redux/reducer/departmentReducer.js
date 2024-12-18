import {
	FETCH_DEPARTMENT_REQUEST,
	FETCH_DEPARTMENT_SUCCESS,
	FETCH_DEPARTMENT_FAILURE,
	POST_DEPARTMENT_SUCCESS,
	UPDATE_DEPARTMENT_SUCCESS,
	DELETE_DEPARTMENT_SUCCESS,
	FETCH_DEPARTMENT_OPTIONS_SUCCESS,
	MESSAGE,
	OPEN_MODAL,
	CLOSE_MODAL,
	CLOSE_MESSAGE,
} from '../actions/departmentAction';

const initialState = {
	department: [],
	loading: false,
	error: 'Program Studi not found',
	isUpdated: true,
	isOpenModal: false,
	uuid: null,
	message: null,
};

const departmentReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_DEPARTMENT_REQUEST:
			return {
				...state,
				loading: true,
				error: '',
			};
		case FETCH_DEPARTMENT_SUCCESS:
			return {
				...state,
				loading: false,
				department: action.payload,
				error: '',
			};
		case FETCH_DEPARTMENT_OPTIONS_SUCCESS:
			return {
				...state,
				loading: false,
				department: action.payload,
				error: '',
			};
		case POST_DEPARTMENT_SUCCESS:
			return {
				...state,
				loading: false,
				department: action.payload,
				error: '',
				isUpdated: true,
			};
		case UPDATE_DEPARTMENT_SUCCESS:
			return {
				...state,
				loading: false,
				department: action.payload,
				error: '',
			};
		case DELETE_DEPARTMENT_SUCCESS:
			return {
				...state,
				loading: false,
				department: state.department.filter(
					(department) => department.uuid !== action.payload,
				),
				error: '',
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
				uuid: action.payload,
			};
		case CLOSE_MODAL:
			return {
				...state,
				isOpenModal: false,
				uuid: null,
			};
		case FETCH_DEPARTMENT_FAILURE:
			return {
				...state,
				loading: false,
				department: [],
				error: action.payload,
			};
		default:
			return state;
	}
};

export default departmentReducer;
