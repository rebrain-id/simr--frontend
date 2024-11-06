import axios from 'axios';
import { API_URL } from './config';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';
import { refreshTokenRequest } from './auth';

const access_token = localStorage.getItem('access_token')
	? localStorage.getItem('access_token')
	: sessionStorage.getItem('access_token');

export const getAgenda = async (data) => {
	const username = jwtDecode(access_token).username;
	const url = `${API_URL()}/v1/detail-agendas?username=${username}&start=${data.start}&finish=${data.finish}&page=${1}&limit=${100}`;

	try {
		const response = await axios({
			method: 'get',
			url: url,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		// console.log(response);

		return response.data.data;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			console.log('call');
			try {
				const refresh = await refreshTokenRequest();

				console.log(refresh);

				if (refresh && refresh.statusCode === 200) {
					const response = await axios({
						method: 'get',
						url: url,
						headers: {
							Authorization: `Bearer ${access_token}`,
						},
					});
					return response.data.data;
				}
			} catch (error) {
				console.log(error);

				return error;
			}
		}
		console.log(error);

		return error;
	}
};

export const getSearchAgenda = async (data) => {
	const username = jwtDecode(access_token).username;

	const url = `${API_URL()}/v1/detail-agendas?username=${username}&keyword=${data}`;

	try {
		const response = await axios({
			method: 'get',
			url: url,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			try {
				await refreshTokenRequest();

				const response = await axios({
					method: 'get',
					url: url,
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				});

				return response.data.data;
			} catch (error) {
				console.log(error);
				return error;
			}
		}
		console.log(error);
		return error;
	}
};

export const getHistoryAgenda = async (data) => {
	const username = jwtDecode(access_token).username;

	const url = `${API_URL()}/v1/detail-agendas?username=${username}&start=${data.start}&finish=${data.finish}&page=${data.skip}&limit=${data.take}`;

	try {
		const response = await axios({
			method: 'get',
			url: url,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			try {
				await refreshTokenRequest();

				const response = await axios({
					method: 'get',
					url: url,
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				});

				return response.data.data;
			} catch (error) {
				console.log(error);
				return error;
			}
		}
		console.log(error);
		return error;
	}
};

export const getDetailAgenda = async (uuid) => {
	const url = `${API_URL()}/v1/detail-agendas/${uuid}`;

	try {
		const response = await axios({
			method: 'get',
			url: url,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		return response.data.data;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			try {
				await refreshTokenRequest();

				const response = await axios({
					method: 'get',
					url: url,
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				});

				return response.data.data;
			} catch (error) {
				console.log(error);
				return error;
			}
		}
		console.log(error);
		return error;
	}
};

export const createDataAgenda = async (data) => {
	const url = `${API_URL()}/v1/detail-agendas`;

	try {
		const response = await axios({
			method: 'post',
			url: url,
			data: data,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			try {
				await refreshTokenRequest();

				const response = await axios({
					method: 'post',
					url: url,
					data: data,
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				});

				return response.data.data;
			} catch (error) {
				console.log(error);
				throw error;
			}
		}
		console.log(error);
		throw error;
	}
};

export const checkAgenda = async (data, type) => {
	const url =
		type === 'add'
			? `${API_URL()}/v1/agendas/check`
			: `${API_URL()}/v1/agendas/check-update`;

	try {
		const response = await axios({
			method: 'post',
			url: url,
			data: data,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});

		return response;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			try {
				await refreshTokenRequest();

				const response = await axios({
					method: 'post',
					url: url,
					data: data,
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				});

				return response.data.data;
			} catch (error) {
				console.log(error);
				throw error;
			}
		}
		console.log(error);
		throw error;
	}
};

export const updateAgenda = async (uuid, data) => {
	const url = `${API_URL()}/v1/detail-agendas/${uuid}`;
	const form = new FormData();

	form.append('title', data.title);
	form.append('description', data.description);
	form.append('start', moment.utc(data.start).format('YYYY-MM-DD HH:mm:ss'));
	form.append(
		'finish',
		moment.utc(data.finish).format('YYYY-MM-DD HH:mm:ss'),
	);
	form.append('location', data.location);
	form.append('absent', data.attendees);
	form.append('notulen', data.notulens);
	form.append('typeAgendaUuid', data.typeAgenda);
	if (data.isDone) {
		form.append('isDone', data.isDone);
	}

	// if (Array.isArray(data.department)) {
	// 	data.department.forEach((deptUuid) => {
	// 		form.append('departmentsUuid[]', deptUuid);
	// 	});
	// }

	// form.forEach((value, key) => {
	// 	console.log(`${key}: ${value}`);
	// });

	try {
		const response = await axios({
			method: 'patch',
			url: url,
			data: form,
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${access_token}`,
			},
		})
			.then((res) => {
				// console.log(res);
				return res.data;
			})
			.catch((err) => {
				console.error(err);
			});
		return response;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			try {
				await refreshTokenRequest();

				const response = await axios({
					method: 'patch',
					url: url,
					data: form,
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${access_token}`,
					},
				});

				return response;
			} catch (error) {
				console.log(error);
				throw error;
			}
		}
		console.log(error);
		throw error;
	}
};

export const updateMemberAgenda = async (data) => {
	const url = `${API_URL()}/v1/agendas/departments`;

	try {
		const response = await axios({
			method: 'patch',
			url: url,
			data: data,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});
		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			try {
				await refreshTokenRequest();

				const response = await axios({
					method: 'patch',
					url: url,
					data: data,
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				});

				return response.data;
			} catch (error) {
				console.log(error);
				throw error;
			}
		}
	}
};

export const deleteAgenda = async (uuid) => {
	const url = `${API_URL()}/v1/detail-agendas/${uuid}`;

	try {
		const response = await axios({
			method: 'delete',
			url: url,
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
		});
		return response.data;
	} catch (error) {
		if (error.response && error.response.status === 401) {
			try {
				await refreshTokenRequest();

				const response = await axios({
					method: 'delete',
					url: url,
					headers: {
						Authorization: `Bearer ${access_token}`,
					},
				});

				return response.data;
			} catch (error) {
				console.log(error);
				throw error;
			}
		}
		console.log(error);
		throw error;
	}
};
