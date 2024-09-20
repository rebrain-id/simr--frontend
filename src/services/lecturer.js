import axios from 'axios';
import { API_URL } from './config';

export const getLecturer = async () => {
	const url = `${API_URL()}/v1/lecturer`;

    const response = await axios({
		method: 'get',
		url: url,
	})
		.then((res) => {
			return res.data.data;
		})
		.catch((err) => {
			console.log(err);
		});

	return response;
}

export const postLecturer = async (body) => {
	const url = `${API_URL()}/v1/lecturer`;

	const response = await axios({
		method: 'post',
		url: url,
		data: body,
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			throw err
		})
	
	return response
}

export const updateLecturer = async (uuid, body) => {
	const url = `${API_URL()}/v1/lecturer/${uuid}`;
	
	const response = await axios({
		method: 'patch',
		url: url,
		data: body,
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		})
	
	return response
}

export const deleteLecturer = async (uuid) => {
	const url = `${API_URL()}/v1/lecturer/${uuid}`;

	const response = await axios({
		method: 'delete',
		url: url,
		data: uuid,
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		})

	return response
}