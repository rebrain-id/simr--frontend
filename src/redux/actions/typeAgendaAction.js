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
	updateTypeAgendaSuccess,
} from '../slices/typeAgendaSlice';
import { openMessage } from './messageAction';

export const fetchTypeAgenda = createAsyncThunk(
	'typeAgenda/fetchTypeAgenda',
	async (_, { dispatch }) => {
		try {
			dispatch(fetchTypeAgendaRequest());
			const data = await getTypeAgenda();

			dispatch(fetchTypeAgendaSuccess(data));
		} catch (error) {
			// dispatch(
			// 	openMessage({
			// 		page: 'type-agenda',
			// 		status: 'error',
			// 		message:
			// 			'Gagal memuat data jenis agenda, jaringan anda tidak stabil',
			// 	}),
			// );
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
					openMessage({
						page: 'type-agenda',
						status: 'success',
						message: 'berhasil menambah data jenis agenda baru',
					}),
				);

				dispatch(createTypeAgendaSuccess(response));
			} else {
				dispatch(
					openMessage({
						page: 'type-agenda',
						status: 'error',
						message:
							'terjadi kesalahan dalam menambah jenis agenda baru, periksa kembali data yang anda masukkan',
					}),
				);
			}

			return response;
		} catch (error) {
			dispatch(
				openMessage({
					page: 'type-agenda',
					status: 'error',
					message:
						'terjadi kesalahan dalam menambah jenis agenda baru, periksa kembali data yang anda masukkan',
				}),
			);
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
					openMessage({
						page: 'type-agenda',
						status: 'success',
						message: 'jenis agenda berhasil diperbarui',
					}),
				);

				dispatch(updateTypeAgendaSuccess(response));
			} else {
				dispatch(
					openMessage({
						page: 'type-agenda',
						status: 'error',
						message:
							'terdapat kesalahan dalam memperbarui data, periksa kembali data yang anda masukkan',
					}),
				);
			}
		} catch (error) {
			dispatch(
				openMessage({
					page: 'type-agenda',
					status: 'error',
					message:
						'terdapat kesalahan dalam memperbarui data, periksa kembali data yang anda masukkan',
				}),
			);
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
					openMessage({
						page: 'type-agenda',
						status: 'success',
						message: 'data berhasil dihapus',
					}),
				);
			} else {
				dispatch(
					openMessage({
						page: 'type-agenda',
						status: 'error',
						message: 'terdapat kesalahan dalam menghapus data',
					}),
				);
			}

			return response;
		} catch (error) {
			dispatch(
				openMessage({
					page: 'type-agenda',
					status: 'error',
					message: 'terdapat kesalahan dalam menghapus data',
				}),
			);
			console.log(error);
		}
	},
);
