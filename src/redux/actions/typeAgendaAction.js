import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	destroyTypeAgenda,
	editTypeAgenda,
	getTypeAgenda,
	postTypeAgenda,
} from '../../services/typeAgenda';
import {
	createTypeAgendaSuccess,
	deleteTypeAgendaSuccess,
	fetchTypeAgendaFailure,
	fetchTypeAgendaRequest,
	fetchTypeAgendaSuccess,
	message,
	updateTypeAgendaSuccess,
} from '../slices/typeAgendaSlice';

export const fetchTypeAgenda = createAsyncThunk(
	'typeAgenda/fetchTypeAgenda',
	async (_, { dispatch }) => {
		try {
			dispatch(fetchTypeAgendaRequest());
			const data = await getTypeAgenda();

			dispatch(fetchTypeAgendaSuccess(data));
		} catch (error) {
			dispatch(fetchTypeAgendaFailure(error));
		}
	},
);

export const createTypeAgenda = createAsyncThunk(
	'typeAgenda/createTypeAgenda',
	async ({ data }, { dispatch }) => {
		try {
			const response = await postTypeAgenda(data);

			if (response && response.statusCode === 201) {
				dispatch(
					message({
						status: 'success',
						message: 'berhasil menambah data jenis agenda baru',
					}),
				);

				dispatch(createTypeAgendaSuccess(response));
			} else {
				dispatch(
					message({
						status: 'error',
						message:
							'terjadi kesalahan dalam menambah jenis agenda baru',
					}),
				);
			}

			return response;
		} catch (error) {
			console.log(error);
		}
	},
);

export const updateTypeAgenda = createAsyncThunk(
	'typeAgenda/updateTypeAgenda',
	async ({ data, uuid }, { dispatch }) => {
		try {
			const response = await editTypeAgenda(uuid, data);

			if (response && response.statusCode === 200) {
				dispatch(
					message({
						status: 'success',
						message: 'jenis agenda berhasil diperbarui',
					}),
				);

				dispatch(updateTypeAgendaSuccess(response));
			} else {
				dispatch(
					message({
						status: 'error',
						message: 'terdapat kesalahan dalam memperbarui data',
					}),
				);
			}
		} catch (error) {
			console.log(error);
		}
	},
);

export const deleteTypeAgenda = createAsyncThunk(
	'typeAgenda/deleteTypeAgenda',
	async ({ uuid }, { dispatch }) => {
		try {
			const response = await destroyTypeAgenda(uuid);

			if (response && response.statusCode === 200) {
				dispatch(deleteTypeAgendaSuccess(response));
				dispatch(
					message({
						status: 'success',
						message: 'data berhasil dihapus',
					}),
				);
			} else {
				dispatch(
					message({
						status: 'error',
						message: 'terdapat kesalahan dalam menghapus data',
					}),
				);
			}

			return response;
		} catch (error) {
			console.log(error);
		}
	},
);
