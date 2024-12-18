import { createSlice } from '@reduxjs/toolkit';
import {
	checkMemberAgenda,
	createAgenda,
	deleteDetailAgenda,
	updateDepartmentAgenda,
	updateDetailAgenda,
} from '../actions/agendaAction';
import moment from 'moment';

const initialState = {
	agenda: [],
	agendaToday: [],
	agendaThisMonth: [],
	agendaByDate: [],
	agendaHistory: [],
	updateMember: [],
	detailAgenda: [],
	showSidebar: false,
	loading: false,
	isUpdated: false,
	message: [],
	date: moment().format('YYYY-MM-DD'),
	addAnggota: [],
	error: null,
};

const agendaSlice = createSlice({
	name: 'agenda',
	initialState,
	reducers: {
		fetchAgendaRequest(state) {
			state.loading = true;
			state.agenda = [];
			state.agendaThisMonth = [];
			state.agendaByDate = [];
			state.agendaHistory = [];
		},
		fetchAgendaSuccess(state, action) {
			state.loading = false;
			state.agenda = action.payload;
		},
		fetchAgendaSearchSuccess(state, action) {
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
			state.isUpdated = false;
			state.agendaToday = action.payload;
		},
		fetchAgendaThisMonthSuccess(state, action) {
			state.loading = false;
			// state.isUpdated = false;
			state.agendaThisMonth = action.payload;
		},
		fetchAgendaByDateSuccess(state, action) {
			state.loading = false;
			state.isUpdated = false;
			state.agendaByDate = action.payload;
		},
		fetchAgendaHistorySuccess(state, action) {
			state.loading = false;
			state.isUpdated = false;
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
		getDateSuccess(state, action) {
			state.date = action.payload;
		},
		timeAddAnggotaSuccess(state, action) {
			state.addAnggota = action.payload;
		},
		updateDetailAgendaSuccess(state) {
			state.loading = false;
		},
		fetchAgendaFailure(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		updateStatus(state) {
			state.isUpdated = state.isUpdated ? false : true;
		},
		changeStatus(state) {
			state.isUpdated = false;
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
				state.error = action.payload;
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
			})
			.addCase(updateDetailAgenda.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(updateDepartmentAgenda.fulfilled, (state, action) => {
				state.loading = false;
				state.agenda.push(action.payload.data);

				if (
					state.detailAgenda.uuid === action.payload.detailAgendaUuid
				) {
					state.detailAgenda.members = action.payload.updatedMembers;
				}
			})
			.addCase(updateDepartmentAgenda.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			.addCase(deleteDetailAgenda.pending, (state) => {
				state.loading = true;
				state.isUpdated = state.isUpdated ? false : true;
				state.error = null;
			})
			.addCase(deleteDetailAgenda.fulfilled, (state, action) => {
				state.loading = false;
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
	fetchAgendaSearchSuccess,
	createAgendaSuccess,
	checkMemberAgendaSuccess,
	fetchAgendaTodaySuccess,
	fetchAgendaThisMonthSuccess,
	fetchAgendaByDateSuccess,
	fetchAgendaHistorySuccess,
	fetchDetailAgendaSuccess,
	closeDetailAgendaSuccess,
	updateDetailAgendaSuccess,
	updateStatus,
	timeAddAnggotaSuccess,
	changeStatus,
	getDateSuccess,
	fetchAgendaFailure,
} = agendaSlice.actions;

export default agendaSlice.reducer;
