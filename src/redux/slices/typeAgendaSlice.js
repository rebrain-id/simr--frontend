import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	typeAgenda: [],
	loading: false,
	error: null,
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
	},
});

export const {
	fetchTypeAgendaRequest,
	fetchTypeAgendaSuccess,
	fetchTypeAgendaFailure,
} = typeAgendaSlice.actions;
export default typeAgendaSlice.reducer;
