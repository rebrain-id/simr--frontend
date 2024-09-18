import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	fetchDepartmentFailure,
	fetchDepartmentSuccess,
} from '../slices/departmentSlice';
import { getDepartment } from '../../services/department';

export const fetchDepartment = createAsyncThunk(
	'department/fetchDepartment',

	async (_, { dispatch }) => {
		try {
			const data = await getDepartment();

			dispatch(fetchDepartmentSuccess(data));
		} catch (error) {
			dispatch(fetchDepartmentFailure(error));
		}
	},
);
