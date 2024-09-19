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

export const postDepartment = async (body) => {
	const url = `${API_URL()}/v1/department/`;

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

export const deleteDepartment = async (uuid) => {
	const url = `${API_URL()}/v1/department/${uuid}`

	const response = await axios({
		method: 'delete',
		url: url,
		data: uuid,
	})
		.then((res) => {
			return res.data
		})
		.catch((err) => {
			console.log(err);
			throw err
		})

	return response
}