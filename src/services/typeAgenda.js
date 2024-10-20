import axios from 'axios';
import { API_URL } from './config';

const access_token = sessionStorage.getItem('access_token');

export const getTypeAgenda = async () => {
	const url = `${API_URL()}/v1/type-agendas`;

	const response = await axios({
		method: 'get',
		url: url,
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	})
		.then((res) => {
			return res.data.data;
		})
		.catch((err) => {
			console.log(err);
		});

	return response;
};

export const postTypeAgenda = async (body) => {
	const url = `${API_URL()}/v1/type-agendas`;

	const response = await axios({
		method: 'post',
		url: url,
		data: body,
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});

	return response;
};

export const editTypeAgenda = async (uuid, body) => {
	const url = `${API_URL()}/v1/type-agendas/${uuid}`;

	const response = await axios({
		method: 'patch',
		url: url,
		data: body,
		headers: {
			Authorization: `Bearer ${access_token}`,
		},
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		});

	return response;
};
