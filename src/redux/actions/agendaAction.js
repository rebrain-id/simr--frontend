import { createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';
import dataJson from '../../../data.json';
import {
	fetchAgendaRequest,
	fetchAgendaSuccess,
	fetchAgendaTodaySuccess,
	fetchAgendaThisMonthSuccess,
	fetchAgendaByDateSuccess,
	fetchAgendaHistorySuccess,
	fetchAgendaFailure,
} from '../slices/agendaSlice';

export const fetchAgenda = createAsyncThunk(
	'agenda/fetchAgenda',
	async (_, { dispatch }) => {
		try {
			dispatch(fetchAgendaRequest());
			const data = convertAgendaData(dataJson.agenda);

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

			const data = convertAgendaData(dataJson.agenda);
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
			const dataThisMonth = convertAgendaData(dataJson.agenda);

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

			const dataByDate = convertAgendaData(dataJson.agenda);

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

			const data = dataJson.agenda;
			const today = moment();
			const convertDateFrom = dateFrom ? moment(dateFrom) : moment(0);
			const convertDateTo = dateTo ? moment(dateTo) : today;

			const filteredAgenda = data.filter((item) => {
				const finishedDate = moment(item.finish);

				if (dateFrom && dateTo) {
					if (type && type == 'all') {
						return (
							finishedDate.isBetween(
								convertDateFrom,
								convertDateTo,
								null,
								'[)',
							) && item.isDone === true
						);
					} else if (type) {
						return (
							finishedDate.isBetween(
								convertDateFrom,
								convertDateTo,
								null,
								'[)',
							) &&
							item.typeAgenda.name == `Rapat ${type}` &&
							item.isDone === true
						);
					} else {
						return (
							finishedDate.isBetween(
								convertDateFrom,
								convertDateTo,
								null,
								'[)',
							) &&
							item.typeAgenda.name == `Rapat Internal` &&
							item.isDone === true
						);
					}
				} else {
					if (type && type == 'all') {
						return (
							finishedDate.isBefore(convertDateTo) &&
							item.isDone === true
						);
					} else if (type) {
						return (
							finishedDate.isBefore(convertDateTo) &&
							item.typeAgenda.name == `Rapat ${type}` &&
							item.isDone === true
						);
					} else {
						return (
							finishedDate.isBefore(convertDateTo) &&
							item.typeAgenda.name == `Rapat Internal` &&
							item.isDone === true
						);
					}
				}
			});

			const sortedAgenda = filteredAgenda.sort((a, b) => {
				const dateA = moment(a.finish);
				const dateB = moment(b.finish);
				if (asc) {
					return dateA - dateB;
				} else {
					return dateB - dateA;
				}
			});

			dispatch(
				fetchAgendaHistorySuccess(convertAgendaData(sortedAgenda)),
			);
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
