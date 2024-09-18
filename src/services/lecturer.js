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