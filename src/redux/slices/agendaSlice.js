import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	agenda: [],
	agendaToday: [],
	agendaThisMonth: [],
	agendaByDate: [],
	agendaHistory: [],
	detailAgenda: [],
	showSidebar: false,
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
		createAgendaSuccess(state, action) {
			state.loading = false;
			state.agenda = action.payload;
		},
		checkMemberAgendaSuccess(state, action) {
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
		fetchAgendaHistorySuccess(state, action) {
			state.loading = false;
			state.agendaHistory = action.payload;
		},
		fetchDetailAgendaSuccess(state, action) {
			state.loading = false;
			state.showSidebar = true;
			state.detailAgenda = action.payload;
		},
		closeDetailAgendaSuccess(state) {
			state.showSidebar = false;
			state.detailAgenda = null;
		},
		updateDetailAgendaSuccess(state, action) {
			state.loading = false;
			state.detailAgenda = action.payload;
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
	createAgendaSuccess,
	checkMemberAgendaSuccess,
	fetchAgendaTodaySuccess,
	fetchAgendaThisMonthSuccess,
	fetchAgendaByDateSuccess,
	fetchAgendaHistorySuccess,
	fetchDetailAgendaSuccess,
	closeDetailAgendaSuccess,
	updateDetailAgendaSuccess,
	fetchAgendaFailure,
} = agendaSlice.actions;

export default agendaSlice.reducer;
