import axios from 'axios';
import { API_URL } from './config';
import { jwtDecode } from 'jwt-decode';

const access_token = sessionStorage.getItem('access_token');
const decodeToken = access_token && jwtDecode(access_token);

export const getLecturer = async () => {
	const getAllLecturer = `${API_URL()}/v1/lecturer?username=${decodeToken.username}`;
	const getLecturerByDepartment = `${API_URL()}/v1/lecturer?username=${decodeToken.username}&department=${decodeToken.username}`;

	const url =
		decodeToken.role === 'FAKULTAS'
			? getAllLecturer
			: getLecturerByDepartment;

	try {
		const response = await axios({
			method: 'get',
			url: url,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});
		return response.data.data;
	} catch (err) {
		console.log(err);
	}
};

export const postLecturer = async (body) => {
	const url = `${API_URL()}/v1/lecturer`;

	try {
		const response = await axios({
			method: 'post',
			url: url,
			data: body,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		return response.data;
	} catch (err) {
		console.log(err);
	}
};

export const updateLecturer = async (uuid, body) => {
	const url = `${API_URL()}/v1/lecturer/${uuid}`;

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

export const deleteLecturer = async (uuid) => {
	const url = `${API_URL()}/v1/lecturer/${uuid}`;

	const response = await axios({
		method: 'delete',
		url: url,
		data: uuid,
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
