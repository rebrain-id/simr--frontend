import axios from 'axios';
import { API_URL } from './config';
import { jwtDecode } from 'jwt-decode';

const access_token = sessionStorage.getItem('access_token') || null;
const decodeToken = access_token && jwtDecode(access_token);

export const getDepartment = async () => {
	const url = `${API_URL()}/v1/department?username=${decodeToken.username}&limit=1000`;

	const response = await axios({
		method: 'get',
		url: url,
		headers: { Authorization: `Bearer ${access_token}` },
	})
		.then((res) => {
			return res.data.data;
		})
		.catch((err) => {
			console.log(err);
		});

	return response;
};

export const getDepartmentOption = async () => {
	const url = `${API_URL()}/v1/department/options`;

	const response = await axios({
		method: 'get',
		url: url,
		headers: { Authorization: `Bearer ${access_token}` },
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
		headers: { Authorization: `Bearer ${access_token}` },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});

	return response;
};

export const updateDepartment = async (uuid, body) => {
	const url = `${API_URL()}/v1/department/${uuid}`;

	const response = await axios({
		method: 'patch',
		url: url,
		data: body,
		headers: { Authorization: `Bearer ${access_token}` },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});

	return response;
};

export const deleteDepartment = async (uuid) => {
	const url = `${API_URL()}/v1/department/${uuid}`;

	const response = await axios({
		method: 'delete',
		url: url,
		data: uuid,
		headers: { Authorization: `Bearer ${access_token}` },
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
			return err;
		});

	return response;
};
