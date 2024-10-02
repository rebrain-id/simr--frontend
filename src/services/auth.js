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

		sessionStorage.setItem('access_token', response.data.data.access_token);

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const refreshTokenRequest = async () => {
	const url = `${API_URL()}/v1/auth/get-access`;
	const refreshToken =
		localStorage.getItem('refresh_token') ||
		sessionStorage.getItem('refresh_token');
	const accessToken = sessionStorage.getItem('access_token');

	try {
		const response = await axios({
			method: 'post',
			url: url,
			body: {
				refreshToken: refreshToken,
			},
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		sessionStorage.setItem('access_token', response.data.data.access_token);
		localStorage.setItem('refresh_token', response.data.data.refresh_token)
			? localStorage.setItem(
					'refresh_token',
					response.data.data.refresh_token,
				)
			: sessionStorage.setItem(
					'refresh_token',
					response.data.data.refresh_token,
				);

		return response;
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
