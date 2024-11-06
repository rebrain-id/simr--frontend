import axios from 'axios';
import { API_URL } from './config';

export const getUserRequest = async () => {
	const url = `${API_URL()}/v1/user`;

	try {
		const response = await axios({
			method: 'get',
			url: url,
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
			},
		});

		return response.data;
	} catch (error) {
		console.log(error);
		return error;
	}
};

export const registerRequest = async (data) => {
	const url = `${API_URL()}/v1/user/register`;

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

export const updateUserRequest = async (username, data) => {
	const access_token = sessionStorage.getItem('access_token');
	const url = `${API_URL()}/v1/user/${username}`;

	try {
		const response = await axios({
			method: 'patch',
			url: url,
			data: data,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		console.log(response);

		if (response && response.data.statusCode === 200) {
			sessionStorage.setItem(
				'access_token',
				response.data.data.access_token,
			);
			sessionStorage.getItem('refresh_token')
				? sessionStorage.setItem(
						'refresh_token',
						response.data.data.access_token,
					)
				: localStorage.setItem(
						'refresh_token',
						response.data.data.access_token,
					);
			return response.data;
		}

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteUserRequest = (username) => {
	const access_token = sessionStorage.getItem('access_token');
	const url = `${API_URL()}/v1/user/${username}`;

	try {
		const response = axios({
			method: 'delete',
			url: url,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const refreshTokenRequest = async () => {
	const url = `${API_URL()}/v1/auth/get-access`;
	const refreshToken =
		localStorage.getItem('refresh_token') ||
		sessionStorage.getItem('refresh_token');

	try {
		const response = await axios({
			method: 'post',
			url: url,
			data: {
				refreshToken: refreshToken,
			},
			headers: {
				Authorization: `Bearer ${refreshToken}`,
				'Content-Type': 'application/json',
			},
		});

		console.log(response);

		if (response && response.data.statusCode === 200) {
			sessionStorage.setItem(
				'access_token',
				response.data.data.access_token,
			);
		}
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
