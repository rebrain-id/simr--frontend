import axios from 'axios';
import { API_URL } from './config';

export const getDepartment = async () => {
	const url = `${API_URL()}/v1/department`;

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
};
