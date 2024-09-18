import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTypeAgenda } from '../../services/typeAgenda';
import {
	fetchTypeAgendaFailure,
	fetchTypeAgendaSuccess,
} from '../slices/typeAgendaSlice';

export const fetchTypeAgenda = createAsyncThunk(
	'typeAgenda/fetchTypeAgenda',
	async (_, { dispatch }) => {
		try {
			const data = await getTypeAgenda();

			dispatch(fetchTypeAgendaSuccess(data));
		} catch (error) {
			dispatch(fetchTypeAgendaFailure(error));
		}
	},
);
