import { CLOSE_MESSAGE, OPEN_MESSAGE } from '../actions/messageAction';

const initialState = {
	messages: null,
	isOpen: false,
};

const messageReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_MESSAGE:
			return {
				...state,
				message: action.payload,
				isOpen: true,
			};
		case CLOSE_MESSAGE:
			return {
				...state,
				message: null,
				isOpen: false,
			};
		default:
			return {
				...state,
			};
	}
};

export default messageReducer;
