import { createSlice } from '@reduxjs/toolkit';
import {
	checkMemberAgenda,
	createAgenda,
	deleteDetailAgenda,
	updateDetailAgenda,
} from '../actions/agendaAction';

const initialState = {
	agenda: [],
	agendaToday: [],
	agendaThisMonth: [],
	agendaByDate: [],
	agendaHistory: [],
	detailAgenda: [],
	showSidebar: false,
	loading: false,
	isUpdated: false,
	message: [],
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
	extraReducers: (builder) => {
		builder
			.addCase(checkMemberAgenda.fulfilled, (state, action) => {
				state.loading = false;
				state.agenda.push(action.payload.data);
				state.message = action.payload;
			})
			.addCase(checkMemberAgenda.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload || 'terjadi kesalahan tidak terduga';
			})
			.addCase(createAgenda.fulfilled, (state, action) => {
				state.loading = false;
				state.agenda.push(action.payload.data);
				state.message = action.payload;
			})
			.addCase(createAgenda.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			})
			.addCase(updateDetailAgenda.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateDetailAgenda.fulfilled, (state) => {
				state.loading = false;
				state.isUpdated = true;
			})
			.addCase(updateDetailAgenda.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(deleteDetailAgenda.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteDetailAgenda.fulfilled, (state, action) => {
				state.loading = false;
				state.isUpdated = true;
				state.message = action.payload;
			})
			.addCase(deleteDetailAgenda.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
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
