import { jwtDecode } from 'jwt-decode';
import {
	loginRequest,
	logoutRequest,
	registerRequest,
	updateUserRequest,
} from '../../services/auth';

export const FETCH_AUTH_REQUEST = 'FETCH_AUTH_REQUEST';
export const FETCH_REGISTER_SUCCESS = 'FETCH_REGISTER_SUCCESS';
export const FETCH_LOGIN_SUCCESS = 'FETCH_LOGIN_SUCCESS';
export const FETCH_UPDATE_SUCCESS = 'FETCH_UPDATE_SUCCESS';
export const FETCH_LOGOUT_SUCCESS = 'FETCH_LOGOUT_SUCCESS';
export const FETCH_AUTH_FAILURE = 'FETCH_AUTH_FAILURE';

export const fetchAuthRequest = () => ({
	type: FETCH_AUTH_REQUEST,
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

export const fetchAuthFailure = () => ({
	type: FETCH_AUTH_FAILURE,
});

export const postRegister = (data) => {
	return async (dispatch) => {
		dispatch(fetchAuthRequest());

		try {
			const response = await registerRequest(data);

			dispatch(fetchRegisterSuccess(response));

			return response;
		} catch (error) {
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

		try {
			const response = await updateUserRequest(username, data);
			console.log(response);

			return response.data;
		} catch (error) {
			console.log(error);
		}
	};
};

export const postLogout = () => {
	return async () => {
		// dispatch(fetchAuthRequest());

		const access_token = localStorage.getItem('access_token')
			? localStorage.getItem('access_token')
			: sessionStorage.getItem('access_token');

		const decodeToken = jwtDecode(access_token);

		try {
			const response = await logoutRequest(decodeToken.username);

			if (response && response.statusCode == 200) {
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
