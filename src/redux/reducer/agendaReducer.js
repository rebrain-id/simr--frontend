import {
	FETCH_AGENDA_REQUEST,
	FETCH_AGENDA_SUCCESS,
	FETCH_AGENDA_TODAY_SUCCESS,
	FETCH_AGENDA_THIS_MONTH_SUCCESS,
	FETCH_AGENDA_BY_DATE_SUCCESS,
} from '../actions/agendaAction';

const initialState = {
	agenda: [],
	agendaToday: [],
	agendaThisMonth: [],
	agendaByDate: [],
};

const agendaReducer = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_AGENDA_REQUEST:
			return {
				...state,
			};
		case FETCH_AGENDA_SUCCESS:
			return {
				...state,
				agenda: action.payload,
			};
		case FETCH_AGENDA_TODAY_SUCCESS:
			return {
				...state,
				agendaToday: action.payload,
			};
		case FETCH_AGENDA_THIS_MONTH_SUCCESS:
			return {
				...state,
				agendaThisMonth: [...action.payload],
			};
		case FETCH_AGENDA_BY_DATE_SUCCESS:
			return {
				...state,
				agendaByDate: [...action.payload],
			};
		default:
			return state;
	}
};

export default agendaReducer;
