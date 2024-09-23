import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import {
	fetchAgendaRequest,
	fetchAgendaSuccess,
	fetchAgendaTodaySuccess,
	fetchAgendaThisMonthSuccess,
	fetchAgendaByDateSuccess,
	fetchAgendaHistorySuccess,
	fetchDetailAgendaSuccess,
	closeDetailAgendaSuccess,
	fetchAgendaFailure,
} from '../slices/agendaSlice';
import {
	checkAgenda,
	createDataAgenda,
	deleteAgenda,
	getAgenda,
	getDetailAgenda,
	updateAgenda,
} from '../../services/agenda';
import { getTypeAgenda } from '../../services/typeAgenda';

export const fetchAgenda = createAsyncThunk(
	'agenda/fetchAgenda',
	async (_, { dispatch }) => {
		try {
			dispatch(fetchAgendaRequest());

			const dataset = await getAgenda();

			const data = await convertAgendaData(dataset);

			dispatch(fetchAgendaSuccess(data));
		} catch (error) {
			dispatch(fetchAgendaFailure(error));
		}
	},
);

export const createAgenda = createAsyncThunk(
	'agenda/createAgenda',

	async ({ data }, { dispatch }) => {
		try {
			dispatch(fetchAgendaRequest());

			const response = await createDataAgenda(data);

			return {
				data: response,
				status: 'success',
				message: 'Berhasil membuat agenda baru',
			};
		} catch (error) {
			dispatch(fetchAgendaFailure(error));
		}
	},
);

export const checkMemberAgenda = createAsyncThunk(
	'agenda/checkMemberAgenda',

	async ({ departmentsUuid, start, finish }, { rejectWithValue }) => {
		try {
			const data = {
				departmentsUuid: departmentsUuid,
				start: moment(start).format('YYYY-MM-DD HH:mm:ss'),
				finish: moment(finish).format('YYYY-MM-DD HH:mm:ss'),
			};

			const response = await checkAgenda(data);

			return response;
		} catch (error) {
			console.log(error);
			rejectWithValue(error);
		}
	},
);

export const fetchAgendaToday = createAsyncThunk(
	'agenda/fetchAgendaToday',
	async (_, { dispatch }) => {
		try {
			dispatch(fetchAgendaRequest());

			const dataset = await getAgenda();

			const data = await convertAgendaData(dataset);

			const today = moment().format('DD');
			const thisMonth = moment().format('MM');

			const filteredAgenda = data.filter((item) => {
				return (
					item.date.start == today && item.month.start == thisMonth
				);
			});
			dispatch(fetchAgendaTodaySuccess(filteredAgenda));
		} catch (error) {
			dispatch(fetchAgendaFailure(error));
		}
	},
);

export const fetchAgendaThisMonth = createAsyncThunk(
	'agenda/fetchAgendaThisMonth',
	async ({ year, month }, { dispatch }) => {
		try {
			dispatch(fetchAgendaRequest());
			const dataset = await getAgenda();

			const dataThisMonth = await convertAgendaData(dataset);

			const filteredAgenda = dataThisMonth.filter(
				(item) =>
					item.month.start == String(month + 1).padStart(2, '0') &&
					item.year.start == year,
			);

			const groupByDate = filteredAgenda.reduce((acc, item) => {
				const date = item.date.start;
				const existingGroup = acc.find((group) => group.date === date);

				if (existingGroup) {
					existingGroup.data.push(item);
				} else {
					acc.push({ date, data: [item] });
				}

				return acc;
			}, []);

			dispatch(fetchAgendaThisMonthSuccess(groupByDate));
		} catch (error) {
			dispatch(fetchAgendaFailure(error.message));
		}
	},
);

export const fetchAgendaByDate = createAsyncThunk(
	'agenda/fetchAgendaByDate',
	async ({ year, month, date }, { dispatch }) => {
		try {
			dispatch(fetchAgendaRequest());
			const dataset = await getAgenda();

			const dataByDate = await convertAgendaData(dataset);

			const filteredAgenda = dataByDate.filter(
				(item) =>
					item.date.start == String(date).padStart(2, '0') &&
					item.month.start == String(month).padStart(2, '0') &&
					item.year.start == year,
			);

			dispatch(fetchAgendaByDateSuccess(filteredAgenda));
		} catch (error) {
			dispatch(fetchAgendaFailure(error.message));
		}
	},
);

export const fetchAgendaHistory = createAsyncThunk(
	'agenda/fetchAgendaHistory',
	async ({ dateFrom, dateTo, type, asc = false }, { dispatch }) => {
		try {
			dispatch(fetchAgendaRequest());

			let data = await getAgenda();
			const typeAgenda = await getTypeAgenda();
			const today = moment();
			const convertDateFrom = dateFrom ? moment(dateFrom) : moment(0);
			const convertDateTo = dateTo ? moment(dateTo) : today;

			data = data.map((item) => {
				return {
					...item,
					typeAgenda: {
						uuid: item.typeAgenda.uuid,
						name: typeAgenda.find(
							(type) => type.uuid == item.typeAgenda.uuid,
						).name,
					},
				};
			});

			const filteredAgenda = data.filter((item) => {
				const finishedDate = moment(item.finish);

				if (dateFrom && dateTo) {
					if (type && type == 'all') {
						return finishedDate.isBetween(
							convertDateFrom,
							convertDateTo,
							null,
							'[)',
						);
						// && item.isDone === true
					} else if (type) {
						return (
							finishedDate.isBetween(
								convertDateFrom,
								convertDateTo,
								null,
								'[)',
							) && item.typeAgenda.name == `Rapat ${type}`
							// && item.isDone === true
						);
					} else {
						return (
							finishedDate.isBetween(
								convertDateFrom,
								convertDateTo,
								null,
								'[)',
							) && item.typeAgenda.name == `Rapat Internal`
							// && item.isDone === true
						);
					}
				} else {
					if (type && type == 'all') {
						return finishedDate.isBefore(convertDateTo);
						// && item.isDone === true
					} else if (type) {
						return (
							finishedDate.isBefore(convertDateTo) &&
							item.typeAgenda.name == `Rapat ${type}`
							// && item.isDone === true
						);
					} else {
						return (
							finishedDate.isBefore(convertDateTo) &&
							item.typeAgenda.name == `Rapat Internal`
							// && item.isDone === true
						);
					}
				}
			});

			const sortedAgenda = filteredAgenda.sort((a, b) => {
				const dateA = moment.utc(a.finish);
				const dateB = moment.utc(b.finish);
				if (asc) {
					return dateA - dateB;
				} else {
					return dateB - dateA;
				}
			});

			dispatch(
				fetchAgendaHistorySuccess(
					await convertAgendaData(sortedAgenda),
				),
			);
		} catch (error) {
			dispatch(fetchAgendaFailure(error.message));
		}
	},
);

export const fetchDetailAgenda = createAsyncThunk(
	'agenda/fetchDetailAgenda',
	async ({ uuid }, { dispatch }) => {
		try {
			dispatch(fetchAgendaRequest());

			const data = await getDetailAgenda(uuid);

			dispatch(fetchDetailAgendaSuccess(data));
		} catch (error) {
			dispatch(fetchAgendaFailure(error.message));
		}
	},
);

export const closeDetailAgenda = createAsyncThunk(
	'agenda/closeDetailAgenda',
	async (_, { dispatch }) => {
		dispatch(closeDetailAgendaSuccess());
	},
);

export const updateDetailAgenda = createAsyncThunk(
	'agenda/updateDetailAgenda',

	async ({ data }, { dispatch, rejectWithValue }) => {
		try {
			const response = await updateAgenda(data.uuid, data);

			return response;
		} catch (error) {
			console.log(error);
			dispatch(fetchAgendaFailure(error.message));

			return rejectWithValue(error.message);
		}
	},
);

export const deleteDetailAgenda = createAsyncThunk(
	'agenda/deleteDetailAgenda',

	async ({ uuid }, { dispatch, rejectWithValue }) => {
		try {
			const response = await deleteAgenda(uuid);

			return {
				data: response,
				status: 'success',
				message: 'Agenda berhasil dihapus',
			};
		} catch (error) {
			dispatch(fetchAgendaFailure(error.message));

			return rejectWithValue(error.message);
		}
	},
);

const convertAgendaData = async (data) => {
	const typeAgendaData = await getTypeAgenda();

	return data.map((item) => {
		const startTime = moment.utc(item.start);
		const finishTime = moment.utc(item.finish);

		return {
			...item,
			typeAgenda: {
				uuid: item.typeAgenda.uuid,
				name: typeAgendaData.find(
					(type) => type.uuid == item.typeAgenda.uuid,
				).name,
			},
			time: {
				start: startTime.format('HH:mm'),
				finish: finishTime.format('HH:mm'),
			},
			date: {
				start: startTime.format('DD'),
				finish: finishTime.format('DD'),
			},
			month: {
				start: startTime.format('MM'),
				finish: finishTime.format('MM'),
			},
			year: {
				start: startTime.format('YYYY'),
				finish: finishTime.format('YYYY'),
			},
		};
	});
};
