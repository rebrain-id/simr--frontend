import axios from 'axios';
import { API_URL } from './config';
import moment from 'moment';

export const getAgenda = async () => {
	const username = sessionStorage.getItem('user');
	const url = `${API_URL()}/v1/detail-agendas?username=${username}`;

	try {
		const response = await axios({
			method: 'get',
			url: url,
		});

		console.log(response.data.data);
		return response.data.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getDetailAgenda = async (uuid) => {
	const url = `${API_URL()}/v1/detail-agendas/${uuid}`;

	try {
		const response = await axios({
			method: 'get',
			url: url,
		});

		return response.data.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const createDataAgenda = async (data) => {
	const url = `${API_URL()}/v1/detail-agendas`;

	try {
		const response = await axios({
			method: 'post',
			url: url,
			data: data,
		});

		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const checkAgenda = async (data) => {
	const url = `${API_URL()}/v1/agendas/check`;

	try {
		const response = await axios({
			method: 'post',
			url: url,
			data: data,
		});

		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const updateAgenda = async (uuid, data) => {
	const url = `${API_URL()}/v1/detail-agendas/${uuid}`;

	const form = new FormData();

	form.append('title', data.title);
	form.append('description', data.description);
	form.append('start', moment.utc(data.start).format('YYYY-MM-DD HH:mm:ss'));
	form.append(
		'finish',
		moment.utc(data.finish).format('YYYY-MM-DD HH:mm:ss'),
	);
	form.append('location', data.location);
	form.append('absent', data.attendees);
	form.append('notulen', data.notulens);
	form.append('isDone', data.isDone);
	// form.append('typeAgendaUuid', data.typeAgenda);
	// if (Array.isArray(data.department)) {
	// 	data.department.forEach((deptUuid) => {
	// 		form.append('departmentsUuid[]', deptUuid);
	// 	});
	// }

	form.forEach((value, key) => {
		console.log(`${key}: ${value}`);
	});

	const response = await axios({
		method: 'patch',
		url: url,
		data: form,
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
		.then((res) => {
			console.log(res);
			return res.data;
		})
		.catch((err) => {
			console.error(err);
		});
	return response;
};

export const deleteAgenda = async (uuid) => {
	const url = `${API_URL()}/v1/detail-agendas/${uuid}`;

	try {
		const response = await axios({
			method: 'delete',
			url: url,
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
