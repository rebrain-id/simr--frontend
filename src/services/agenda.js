import axios from 'axios';
import { API_URL } from './config';

export const getAgenda = async () => {
	const url = `${API_URL()}/detail-agendas?username=informatika`;

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

export const getDetailAgenda = async (uuid) => {
	const url = `${API_URL()}/detail-agendas/${uuid}`;

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
	const url = `${API_URL()}/detail-agendas`;

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
	const url = `${API_URL()}/agendas/check`;

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
	const url = `${API_URL()}/detail-agendas/${uuid}`;

	const form = new FormData();

	form.append('title', data.title);
	form.append('description', data.description);
	form.append('start', data.start);
	form.append('finish', data.finish);
	form.append('location', data.location);
	form.append('typeAgendaUuid', data.typeAgenda);
	if (Array.isArray(data.department)) {
		data.department.forEach((deptUuid) => {
			form.append('departmentsUuid[]', deptUuid);
		});
	}

	form.forEach((value, key) => {
		console.log(`${key}: ${value}`);
	});

	const response = await axios({
		method: 'patch',
		url: url,
		data: form,
	})
		.then((res) => {
			console.log(res);
			return res.data.data;
		})
		.catch((err) => {
			console.error(err);
		});
	return response;
};
