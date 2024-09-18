import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	department: [],
	loading: false,
	error: null,
};

const departmentSlice = createSlice({
	name: 'department',
	initialState,
	reducers: {
		fetchDepartmentRequest(state) {
			state.loading = true;
		},
		fetchDepartmentSuccess(state, action) {
			state.loading = false;
			state.department = action.payload;
		},
		fetchDepartmentFailure(state, action) {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	fetchDepartmentRequest,
	fetchDepartmentSuccess,
	fetchDepartmentFailure,
} = departmentSlice.actions;

export default departmentSlice.reducer;
