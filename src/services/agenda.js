import axios from 'axios';
import { API_URL } from './config';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';

const access_token = localStorage.getItem('access_token')
	? localStorage.getItem('access_token')
	: sessionStorage.getItem('access_token');

export const getAgenda = async (data) => {
	const username = jwtDecode(access_token).username;
	const url = !data.typeAgenda
		? `${API_URL()}/v1/detail-agendas/filter?username=${username}&start=${data.start}&finish=${data.finish}`
		: `${API_URL()}/v1/detail-agendas?username=${username}&start=${data.start}&finish=${data.finish}&type-agenda=${data.typeAgenda}&skip=${data.skip}&take=${data.take}`;

	try {
		const response = await axios({
			method: 'get',
			url: url,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		return response.data.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};

export const getHistoryAgenda = async (data) => {
	const username = jwtDecode(access_token).username;

	const url = `${API_URL()}/v1/detail-agendas/filter?username=${username}&start=${data.start}&finish=${data.finish}&skip=${data.skip}&take=${data.take}`;

	try {
		const response = await axios({
			method: 'get',
			url: url,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		return response.data;
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
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
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
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
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
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
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
			Authorization: `Bearer ${access_token}`,
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
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error);
		throw error;
	}
};
