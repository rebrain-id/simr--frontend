import {
	CLOSE_DETAIL_AGENDA,
	SET_SELECTED_AGENDA,
} from '../actions/detailAgendaAction';

const initialState = {
	selectedAgenda: null,
	showDetailAgenda: false,
};

const detailAgendaReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SELECTED_AGENDA:
			return {
				...state,
				selectedAgenda: action.payload,
				showDetailAgenda: true,
			};
		case CLOSE_DETAIL_AGENDA:
			return {
				...state,
				selectedAgenda: null,
				showDetailAgenda: false,
			};
		default:
			return state;
	}
};

export default detailAgendaReducer;
