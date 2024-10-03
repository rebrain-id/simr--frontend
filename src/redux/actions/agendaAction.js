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
	getHistoryAgenda,
	updateAgenda,
} from '../../services/agenda';
import { getTypeAgenda } from '../../services/typeAgenda';
import { jwtDecode } from 'jwt-decode';

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

			const start = moment()
				.startOf('day')
				.format('YYYY-MM-DD HH:mm:ss')
				.replace(/:/g, '%3A');
			const finish = moment()
				.endOf('day')
				.format('YYYY-MM-DD HH:mm:ss')
				.replace(/:/g, '%3A');

			const dataGetAgenda = {
				start: start,
				finish: finish,
			};

			const dataset = await getAgenda(dataGetAgenda);

			const data = await convertAgendaData(dataset);

			dispatch(fetchAgendaTodaySuccess(data));
		} catch (error) {
			dispatch(fetchAgendaFailure(error));
		}
	},
);

export const fetchAgendaThisMonth = createAsyncThunk(
	'agenda/fetchAgendaThisMonth',
	async ({ year, month }, { dispatch }) => {
		const start = moment(`${year}-${month + 1}`, 'YYYY-MM')
			.startOf('month')
			.format('YYYY-MM-DD HH:mm:ss')
			.replace(/:/g, '%3A');

		const finish = moment(`${year}-${month + 1}`, 'YYYY-MM')
			.endOf('month')
			.format('YYYY-MM-DD HH:mm:ss')
			.replace(/:/g, '%3A');

		const dataGetAgenda = {
			start: start,
			finish: finish,
		};

		try {
			const dataset = await getAgenda(dataGetAgenda);

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
		const start = moment(
			`${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`,
			'YYYY-MM-DD',
		)
			.startOf('day')
			.format('YYYY-MM-DD HH:mm:ss')
			.replace(/:/g, '%3A');

		const finish = moment(
			`${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`,
			'YYYY-MM-DD',
		)
			.endOf('day')
			.format('YYYY-MM-DD HH:mm:ss')
			.replace(/:/g, '%3A');

		const dataGetAgenda = {
			start: start,
			finish: finish,
		};

		try {
			const dataset = await getAgenda(dataGetAgenda);

			const dataByDate = await convertAgendaData(dataset);

			dispatch(fetchAgendaByDateSuccess(dataByDate));
		} catch (error) {
			dispatch(fetchAgendaFailure(error.message));
		}
	},
);

export const fetchAgendaHistory = createAsyncThunk(
	'agenda/fetchAgendaHistory',
	async ({ dateFrom, dateTo, type, skip, take }, { dispatch }) => {
		// dispatch(fetchAgendaRequest());
		const typeAgenda = await getTypeAgenda();

		const dataGetAgenda = {
			start: dateFrom,
			finish: dateTo,
			typeAgenda: type ? type : typeAgenda[0].uuid,
			skip: skip ? skip : 1,
			take: take ? take : 10,
		};

		console.log(dataGetAgenda);

		try {
			let data = await getHistoryAgenda(dataGetAgenda);

			data = {
				...data,
				data: await convertAgendaData(data.data),
			};

			dispatch(fetchAgendaHistorySuccess(data));
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
	const access_token = localStorage.getItem('access_token')
		? localStorage.getItem('access_token')
		: sessionStorage.getItem('access_token');

	const username = jwtDecode(access_token).username;

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
			isAuthor: item.author.username === username ? true : false,
		};
	});
};
