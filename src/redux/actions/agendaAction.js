import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import dataJson from '../../../data.json';
import {
	fetchAgendaRequest,
	fetchAgendaSuccess,
	fetchAgendaTodaySuccess,
	fetchAgendaThisMonthSuccess,
	fetchAgendaFailure,
} from '../slices/agendaSlice';

export const fetchAgenda = createAsyncThunk(
	'agenda/fetchAgenda',
	async (_, { dispatch }) => {
		try {
			dispatch(fetchAgendaRequest());
			const data = convertAgendaData(dataJson);
			dispatch(fetchAgendaSuccess(data));
		} catch (error) {
			dispatch(fetchAgendaFailure(error));
		}
	},
);

export const fetchAgendaToday = createAsyncThunk(
	'agenda/fetchAgendaToday',
	async (_, { dispatch }) => {
		try {
			dispatch(fetchAgendaRequest());

			const data = convertAgendaData(dataJson);
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
			const dataThisMonth = convertAgendaData(dataJson);

			const filteredAgenda = dataThisMonth.filter(
				(item) =>
					item.month.start == String(month + 1).padStart(2, '0') &&
					item.year.start == year,
			);
			console.log(filteredAgenda);

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
			console.log(groupByDate);

			dispatch(fetchAgendaThisMonthSuccess(groupByDate));
		} catch (error) {
			dispatch(fetchAgendaFailure(error.message));
		}
	},
);

const convertAgendaData = (data) => {
	return data.map((item) => {
		const startTime = moment(item.start);
		const finishTime = moment(item.finish);

		return {
			...item,
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
