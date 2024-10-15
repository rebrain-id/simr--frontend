import axios from 'axios';
import { API_URL } from './config';
import { jwtDecode } from 'jwt-decode';

const access_token = sessionStorage.getItem('access_token')

export const getLecturer = async () => {
	const role = jwtDecode(access_token).role
	const username = jwtDecode(access_token).username
	console.log("Lecturer " + role);
	console.log("Lecturer " + username);

	const getAllLecturer = `${API_URL()}/v1/lecturer`;
	const getLecturerByDepartment = `${API_URL()}/v1/lecturer?department=${username}`;

	const url = role === 'FAKULTAS' ? getAllLecturer : getLecturerByDepartment;

	try {
		const response = await axios({
			method: 'get',
			url: url,
			headers: {
				Authorization: `Bearer ${access_token}`,
			}
		});
		console.log(response.data.data);
		return response.data.data;
	} catch (err) {
		console.log(err);
	}

}

export const getLecturerByDepartment = async () => {
	const url = `${API_URL()}/v1/lecturer`;

	const response = await axios({
		method: 'get',
		url: url,
		headers: {
			Authorization:
				`Bearer ${access_token}`,
		}
	})
		.then((res) => {
			return res.data.data
		})
		.catch((err) => {
			console.log(err);
			throw err;
		})

	return response
}

export const postLecturer = async (body) => {
	const url = `${API_URL()}/v1/lecturer`;

	const response = await axios({
		method: 'post',
		url: url,
		data: body,
		headers: {
			Authorization:
				`Bearer ${access_token}`,
		}
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

export const updateLecturer = async (uuid, body) => {
	const url = `${API_URL()}/v1/lecturer/${uuid}`;
	
	const response = await axios({
		method: 'patch',
		url: url,
		data: body,
		headers: {
			Authorization:
				`Bearer ${access_token}`,
		}
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		})
	
	return response
}

export const deleteLecturer = async (uuid) => {
	const url = `${API_URL()}/v1/lecturer/${uuid}`;

	const response = await axios({
		method: 'delete',
		url: url,
		data: uuid,
		headers: {
			Authorization:
				`Bearer ${access_token}`,
		}
	})
		.then((res) => {
			return res.data;
		})
		.catch((err) => {
			console.log(err);
		})

	return response
}