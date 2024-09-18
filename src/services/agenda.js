import axios from 'axios';
import { API_URL } from './config';

export const getAgenda = async () => {
	const url = `${API_URL()}/detail-agendas?username=informatika`;

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

export const getDetailAgenda = async (uuid) => {
	const url = `${API_URL()}/detail-agendas/${uuid}`;
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
