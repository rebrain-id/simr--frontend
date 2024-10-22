import { createSlice } from '@reduxjs/toolkit';
import {
	createTypeAgenda,
	updateTypeAgenda,
} from '../actions/typeAgendaAction';

const initialState = {
	typeAgenda: [],
	loading: false,
	error: null,
	uuid: null,
	isOpen: false,
	isUpdated: false,
	message: [],
};

const typeAgendaSlice = createSlice({
	name: 'typeAgenda',
	initialState,
	reducers: {
		fetchTypeAgendaRequest(state) {
			state.loading = true;
		},
		fetchTypeAgendaSuccess(state, action) {
			state.loading = false;
			state.typeAgenda = action.payload;
		},
		fetchTypeAgendaFailure(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
		updateTypeAgendaSuccess(state) {
			state.loading = false;
			state.isUpdated = true;
		},
		createTypeAgendaSuccess(state, action) {
			state.loading = false;
			state.typeAgenda.push(action.payload.data);
		},
		deleteTypeAgendaSuccess(state, action) {
			state.loading = false;
			state.typeAgenda = state.typeAgenda.filter(
				(typeAgenda) => typeAgenda.uuid !== action.payload,
			);
			state.isUpdated = true;
		},
		message(state, action) {
			state.message = action.payload;
		},
		openModalDelete(state, action) {
			state.uuid = action.payload;
			state.isOpen = true;
		},
		closeModalDelete(state) {
			state.isOpen = false;
			state.uuid = null;
		},
		updateStatus(state) {
			state.isUpdated = true;
		},
		resetUpdatedStatus(state) {
			state.isUpdated = false;
		},
		extraReducers: (builder) => {
			builder
				.addCase(createTypeAgenda.fulfilled, (state, action) => {
					state.loading = false;
					state.typeAgenda.push(action.payload.data);
					state.isUpdated = true;
				})
				.addCase(updateTypeAgenda.fulfilled, (state) => {
					state.loading = false;
					state.isUpdated = true;
				});
		},
	},
});

export const {
	fetchTypeAgendaRequest,
	fetchTypeAgendaSuccess,
	fetchTypeAgendaFailure,
	updateTypeAgendaSuccess,
	createTypeAgendaSuccess,
	deleteTypeAgendaSuccess,
	openModalDelete,
	closeModalDelete,
	updateStatus,
	resetUpdatedStatus,
	message,
} = typeAgendaSlice.actions;
export default typeAgendaSlice.reducer;
