import { registerRequest } from '../../services/auth';
import {
	getDepartment,
	postDepartment,
	updateDepartment,
	deleteDepartment,
	getDepartmentOption,
} from '../../services/department';
export const FETCH_DEPARTMENT_REQUEST = 'FETCH_DEPARTMENT_REQUEST';
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS';
export const FETCH_DEPARTMENT_OPTIONS_SUCCESS =
	'FETCH_DEPARTMENT_OPTIONS_SUCCESS';
export const POST_DEPARTMENT_SUCCESS = 'POST_DEPARTMENT_SUCCESS';
export const UPDATE_DEPARTMENT_SUCCESS = 'UPDATE_DEPARTMENT_SUCCESS';
export const DELETE_DEPARTMENT_SUCCESS = 'DELETE_DEPARTMENT_SUCCESS';
export const MESSAGE = 'MESSAGE';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const FETCH_DEPARTMENT_FAILURE = 'FETCH_DEPARTMENT_FAILURE';

export const fetchDepartmentsRequest = () => ({
	type: 'FETCH_DEPARTMENT_REQUEST',
});

export const fetchDepartmentsSuccess = (department) => ({
	type: 'FETCH_DEPARTMENT_SUCCESS',
	payload: department,
});

export const fetchDepartmentsOptionsSuccess = (department) => ({
	type: 'FETCH_DEPARTMENT_OPTIONS_SUCCESS',
	payload: department,
});

export const postDepartmentsSuccess = (department) => ({
	type: 'POST_DEPARTMENT_SUCCESS',
	payload: department,
});

export const updateDepartmentsSuccess = (department) => ({
	type: 'UPDATE_DEPARTMENT_SUCCESS',
	payload: department,
});

export const deleteDepartmentsSuccess = (department) => ({
	type: 'DELETE_DEPARTMENT_SUCCESS',
	payload: department,
});

export const fetchDepartmentsMessage = (message) => ({
	type: 'MESSAGE',
	payload: message,
});

export const fetchDepartmentsModal = (uuid) => ({
	type: 'OPEN_MODAL',
	payload: uuid,
});

export const fetchDepartmentsCloseModal = () => ({
	type: 'CLOSE_MODAL',
});

export const fetchDepartmentsFailure = (error) => ({
	type: 'FETCH_DEPARTMENT_FAILURE',
	payload: error,
});

export const fetchDepartments = () => {
	return async (dispatch) => {
		dispatch(fetchDepartmentsRequest());
		try {
			const response = await getDepartment();
			dispatch(fetchDepartmentsSuccess(response));
		} catch (error) {
			dispatch(fetchDepartmentsFailure(error.message));
		}
	};
};

export const fetchDepartmentsOptions = () => {
	return async (dispatch) => {
		dispatch(fetchDepartmentsRequest());
		try {
			const response = await getDepartmentOption();
			dispatch(fetchDepartmentsOptionsSuccess(response));
		} catch (error) {
			dispatch(fetchDepartmentsFailure(error.message));
		}
	};
};

export const postDepartmentData = (department) => {
	return async (dispatch) => {
		dispatch(fetchDepartmentsRequest());

		const departmentRequest = {
			name: department.name,
		};

		try {
			const departmentResponse = await postDepartment(departmentRequest);

			if (departmentResponse && departmentResponse.statusCode === 201) {
				const userRequest = {
					username: department.username,
					password: department.password,
					departmentUuid: departmentResponse.data.uuid,
					isAdmin: false,
				};

				const userResponse = await registerRequest(userRequest);

				if (userResponse && userResponse.statusCode === 201) {
					dispatch(
						fetchDepartmentsMessage({
							status: 'success',
							message: 'Berhasil menambahkan program studi',
						}),
					);
				} else {
					const response = await deleteDepartment(
						departmentResponse.data.uuid,
					);

					if (response && response.statusCode === 200) {
						dispatch(
							fetchDepartmentsMessage({
								status: 'error',
								message: 'Gagal menambahkan program studi',
							}),
						);
					}
				}
				return userResponse;
			}
		} catch (error) {
			dispatch(fetchDepartmentsFailure(error.message));
		}
	};
};

export const updateDepartmentData = (uuid, department) => {
	return async (dispatch) => {
		dispatch(fetchDepartmentsRequest());
		try {
			const response = await updateDepartment(uuid, department);

			if (response && response.statusCode === 200) {
				dispatch(
					fetchDepartmentsMessage({
						status: 'success',
						message: 'Berhasil memperbarui program studi',
					}),
				);
			} else {
				dispatch(
					fetchDepartmentsMessage({
						status: 'error',
						message: 'Gagal memperbarui program studi',
					}),
				);
			}
			return response;
		} catch (error) {
			dispatch(fetchDepartmentsFailure(error.message));
		}
	};
};

export const deleteDepartmentData = (department) => {
	return async (dispatch) => {
		dispatch(fetchDepartmentsRequest());
		try {
			const response = await deleteDepartment(department);

			if (response && response.statusCode === 200) {
				dispatch(
					fetchDepartmentsMessage({
						status: 'success',
						message: 'Berhasil menghapus program studi',
					}),
				);
			} else {
				dispatch(
					fetchDepartmentsMessage({
						status: 'error',
						message: 'Gagal menghapus program studi',
					}),
				);
			}
			return response;
		} catch (error) {
			dispatch(fetchDepartmentsFailure(error.message));
		}
	};
};
