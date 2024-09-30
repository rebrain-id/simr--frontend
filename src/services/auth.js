import axios from 'axios';
import { API_URL } from './config';

export const loginRequest = async (data) => {
	const url = `${API_URL()}/v1/auth/login`;

	try {
		const response = await axios({
			method: 'post',
			url: url,
			data: data,
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const logoutRequest = async (data) => {
	const access_token = localStorage.getItem('access_token')
		? localStorage.getItem('access_token')
		: sessionStorage.getItem('access_token');

	const url = `${API_URL()}/v1/auth/logout/${data}`;

	try {
		const response = await axios({
			method: 'post',
			url: url,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		return response.data;
	} catch (error) {
		console.log(error);
	}
};
