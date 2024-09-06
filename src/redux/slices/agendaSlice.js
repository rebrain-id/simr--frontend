import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	agenda: [],
	agendaToday: [],
	agendaThisMonth: [],
	agendaByDate: [],
	loading: false,
	error: null,
};

const agendaSlice = createSlice({
	name: 'agenda',
	initialState,
	reducers: {
		fetchAgendaRequest(state) {
			state.loading = true;
		},
		fetchAgendaSuccess(state, action) {
			state.loading = false;
			state.agenda = action.payload;
		},
		fetchAgendaTodaySuccess(state, action) {
			state.loading = false;
			state.agendaToday = action.payload;
		},
		fetchAgendaThisMonthSuccess(state, action) {
			state.loading = false;
			state.agendaThisMonth = action.payload;
		},
		fetchAgendaByDateSuccess(state, action) {
			state.loading = false;
			state.agendaByDate = action.payload;
		},
		fetchAgendaFailure(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	fetchAgendaRequest,
	fetchAgendaSuccess,
	fetchAgendaTodaySuccess,
	fetchAgendaThisMonthSuccess,
	fetchAgendaByDateSuccess,
	fetchAgendaFailure,
} = agendaSlice.actions;

export default agendaSlice.reducer;
