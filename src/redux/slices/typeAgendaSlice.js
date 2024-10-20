import { createSlice } from '@reduxjs/toolkit';
import {
	createTypeAgenda,
	updateTypeAgenda,
} from '../actions/typeAgendaAction';

const initialState = {
	typeAgenda: [],
	loading: false,
	error: null,
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
		message(state, action) {
			state.message = action.payload;
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
	updateStatus,
	resetUpdatedStatus,
	message,
} = typeAgendaSlice.actions;
export default typeAgendaSlice.reducer;
