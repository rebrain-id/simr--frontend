import { jwtDecode } from 'jwt-decode';
import {
	deleteUserRequest,
	getUserRequest,
	loginRequest,
	logoutRequest,
	registerRequest,
	updateUserRequest,
} from '../../services/auth';
import { openMessage } from './messageAction';

export const FETCH_AUTH_REQUEST = 'FETCH_AUTH_REQUEST';
export const FETCH_GET_AUTH_SUCCESS = 'FETCH_GET_AUTH_SUCCESS';
export const FETCH_REGISTER_SUCCESS = 'FETCH_REGISTER_SUCCESS';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_UPDATE_SUCCESS = 'FETCH_UPDATE_SUCCESS';
export const FETCH_LOGOUT_SUCCESS = 'FETCH_LOGOUT_SUCCESS';
export const FETCH_DELETE_SUCCESS = 'FETCH_DELETE_SUCCESS';
export const FETCH_AUTH_FAILURE = 'FETCH_AUTH_FAILURE';
export const MESSAGE = 'MESSAGE';
export const CLOSE_MESSAGE = 'CLOSE_MESSAGE';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const fetchAuthRequest = () => ({
	type: FETCH_AUTH_REQUEST,
});

export const fetchGetAuthSuccess = (response) => ({
	type: FETCH_GET_AUTH_SUCCESS,
	payload: response,
});

export const fetchRegisterSuccess = (response) => ({
	payload: response,
	type: FETCH_REGISTER_SUCCESS,
});

export const fetchLoginSuccess = () => ({
	type: FETCH_LOGIN_SUCCESS,
});

export const fetchUpdateUserSuccess = () => ({
	type: FETCH_UPDATE_SUCCESS,
});

export const fetchLogoutSuccess = (response) => ({
	password: response,
	type: FETCH_LOGOUT_SUCCESS,
});

export const fetchDeleteUserSuccess = (response) => ({
	payload: response,
	type: FETCH_DELETE_SUCCESS,
});

export const fetchAuthFailure = () => ({
	type: FETCH_AUTH_FAILURE,
});

export const fetchMessage1 = (message) => ({
	type: MESSAGE,
	payload: message,
});

export const closeMessage = () => ({
	type: CLOSE_MESSAGE,
});

export const openModal = (username) => ({
	payload: username,
	type: OPEN_MODAL,
});

export const closeModal = () => ({ type: CLOSE_MODAL });

export const fetchUser = () => {
	return async (dispatch) => {
		dispatch(fetchAuthRequest());

		try {
			const response = await getUserRequest();

			if (response.code === 'ERR_NETWORK') {
				dispatch(
					openMessage({
						page: 'user',
						status: 'error',
						message: 'Jaringan internet anda tidak stabil',
					}),
				);
			}

			const groupedData = response.data.reduce((acc, item) => {
				const departmentName = item.department.name;
				const existingGroup = acc.find(
					(group) => group.department === departmentName,
				);

				if (existingGroup) {
					existingGroup.user.push(item);
				} else {
					acc.push({
						department: departmentName,
						user: [item],
					});
				}
				return acc;
			}, []);

			dispatch(fetchGetAuthSuccess(groupedData));
		} catch (error) {
			// dispatch(
			// 	openMessage({
			// 		page: 'user',
			// 		status: 'error',
			// 		message:
			// 			'Gagal memuat data pengguna, jaringan internet anda tidak stabil',
			// 	}),
			// );
			console.log(error);
		}
	};
};

export const postRegister = (data) => {
	return async (dispatch) => {
		dispatch(fetchAuthRequest());

		const requestData = {
			username: data.username,
			password: data.password,
			departmentUuid: data.departmentUuid,
			jabatanValue: Number(data.jabatanValue),
		};

		try {
			const response = await registerRequest(requestData);

			if (response && response.statusCode === 201) {
				dispatch(
					openMessage({
						page: 'user',
						status: 'success',
						message: 'Berhasil mendaftarkan akun',
					}),
				);
			} else {
				dispatch(
					openMessage({
						page: 'user',
						status: 'error',
						message:
							'Gagal mendaftarkan akun, periksa kembali username dan data lainnya',
					}),
				);
			}

			dispatch(fetchRegisterSuccess(response));

			return response;
		} catch (error) {
			dispatch(
				openMessage({
					page: 'user',
					status: 'error',
					message:
						'Gagal mendaftarkan akun, periksa kembali username dan data lainnya',
				}),
			);
			console.log(error);
		}
	};
};

export const postLogin = (data) => {
	return async (dispatch) => {
		dispatch(fetchAuthRequest());

		try {
			const requestData = {
				username: data.username,
				password: data.password,
			};

			const response = await loginRequest(requestData);

			if (data.rememberme) {
				localStorage.setItem(
					'refresh_token',
					response.data.refresh_token,
				);
			} else {
				sessionStorage.setItem(
					'refresh_token',
					response.data.refresh_token,
				);
			}

			return response;
		} catch (error) {
			console.log(error);
		}
	};
};

export const updateUser = (data) => {
	const access_token = sessionStorage.getItem('access_token');
	const username = jwtDecode(access_token).username;

	return async (dispatch) => {
		dispatch(fetchAuthRequest());

		// data = {
		// 	...data,
		// };

		try {
			const response = await updateUserRequest(username, data);

			console.log(response);

			if (response && response.statusCode === 200) {
				dispatch(
					openMessage({
						page: 'change-password',
						status: 'success',
						message: 'Berhasil memperbarui password',
					}),
				);
			} else {
				dispatch(
					openMessage({
						page: 'change-password',
						status: 'error',
						message:
							'Gagal memperbarui password, periksa kembali password anda',
					}),
				);
			}

			return response;
		} catch (error) {
			dispatch(
				openMessage({
					page: 'change-password',
					status: 'error',
					message:
						'Gagal memperbarui password, periksa kembali password anda',
				}),
			);
			console.log(error);
		}
	};
};

export const updateDataUser = (username, data) => {
	return async (dispatch) => {
		dispatch(fetchAuthRequest());

		try {
			const response = await updateUserRequest(username, data);

			console.log(response);

			if (response && response.statusCode === 200) {
				dispatch(
					openMessage({
						page: 'change-password',
						status: 'success',
						message: 'Berhasil memperbarui username',
					}),
				);
			} else {
				dispatch(
					openMessage({
						page: 'change-password',
						status: 'error',
						message:
							'Gagal memperbarui username, periksa kembali data anda',
					}),
				);
			}

			return response;
		} catch (error) {
			console.log(error);
		}
	};
};

export const postLogout = () => {
	return async () => {
		// dispatch(fetchAuthRequest());

		const access_token = sessionStorage.getItem('access_token');

		const decodeToken = jwtDecode(access_token);

		try {
			const response = await logoutRequest(decodeToken.username);

			if (response && response.statusCode == 200) {
				localStorage.removeItem('access_token');
				sessionStorage.removeItem('access_token');
				localStorage.removeItem('refresh_token');
				sessionStorage.removeItem('refresh_token');
			} else {
				localStorage.removeItem('access_token');
				sessionStorage.removeItem('access_token');
				localStorage.removeItem('refresh_token');
				sessionStorage.removeItem('refresh_token');
			}

			return response;
		} catch (error) {
			console.log(error);
		}
	};
};

export const deleteUser = (username) => {
	return async (dispatch) => {
		dispatch(fetchAuthRequest());

		try {
			const response = await deleteUserRequest(username);

			dispatch(closeModal());

			if (response && response.data.statusCode == 200) {
				dispatch(
					openMessage({
						page: 'user',
						status: 'success',
						message: 'Berhasil menghapus akun',
					}),
				);
			} else {
				dispatch(
					openMessage({
						page: 'user',
						status: 'error',
						message: 'Gagal menghapus akun',
					}),
				);
			}

			dispatch(fetchDeleteUserSuccess(response));
			return response.data;
		} catch (error) {
			dispatch(
				openMessage({
					page: 'user',
					status: 'error',
					message: 'Gagal menghapus akun',
				}),
			);
			console.log(error);
		}
	};
};
