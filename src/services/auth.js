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
