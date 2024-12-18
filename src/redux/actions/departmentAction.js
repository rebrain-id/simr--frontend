import { deleteUserRequest, registerRequest } from '../../services/auth';
import {
	getDepartment,
	postDepartment,
	updateDepartment,
	deleteDepartment,
	getDepartmentOption,
} from '../../services/department';
import { openMessage } from './messageAction';
export const FETCH_DEPARTMENT_REQUEST = 'FETCH_DEPARTMENT_REQUEST';
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS';
export const FETCH_DEPARTMENT_OPTIONS_SUCCESS =
	'FETCH_DEPARTMENT_OPTIONS_SUCCESS';
export const POST_DEPARTMENT_SUCCESS = 'POST_DEPARTMENT_SUCCESS';
export const UPDATE_DEPARTMENT_SUCCESS = 'UPDATE_DEPARTMENT_SUCCESS';
export const DELETE_DEPARTMENT_SUCCESS = 'DELETE_DEPARTMENT_SUCCESS';
export const MESSAGE = 'MESSAGE';
export const CLOSE_MESSAGE = 'CLOSE_MESSAGE';
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

export const fetchDepartmentsCloseMessage = () => ({
	type: 'CLOSE_MESSAGE',
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
			let response = await getDepartment();

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
			if (department.username) {
				const departmentResponse =
					await postDepartment(departmentRequest);

				if (
					departmentResponse &&
					departmentResponse.statusCode === 201
				) {
					const userRequest = {
						username: department.username,
						password: department.password,
						departmentUuid: departmentResponse.data.uuid,
						isAdmin: false,
						jabatanValue: 4,
					};

					const userResponse = await registerRequest(userRequest);

					if (userResponse && userResponse.statusCode === 201) {
						const sekretarisRequest = {
							username: department.username + '-sek',
							password: department.password,
							departmentUuid: departmentResponse.data.uuid,
							isAdmin: false,
							jabatanValue: 5,
						};
						const sekretarisResponse =
							await registerRequest(sekretarisRequest);

						if (
							sekretarisResponse &&
							sekretarisResponse.statusCode === 201
						) {
							dispatch(
								openMessage({
									page: 'department',
									status: 'success',
									message:
										'Berhasil menambahkan program studi',
								}),
							);
						} else {
							const deleteUser = await deleteUserRequest(
								department.username,
							);

							if (deleteUser && deleteUser.statusCode === 200) {
								await deleteDepartment(
									departmentResponse.data.uuid,
								);

								dispatch(
									openMessage({
										page: 'department',
										status: 'error',
										message:
											'Gagal menambahkan program studi, periksa kembali data username',
									}),
								);
							}
						}
					} else if (userResponse && userResponse.status === 400) {
						const response = await deleteDepartment(
							departmentResponse.data.uuid,
						);

						if (response && response.statusCode === 200) {
							dispatch(
								openMessage({
									page: 'department',
									status: 'error',
									message:
										'Gagal menambahkan program studi, periksa kembali data username',
								}),
							);
						}
					}
					return userResponse;
				} else {
					dispatch(
						openMessage({
							page: 'department',
							status: 'error',
							message:
								'Gagal menambahkan program studi, nama program studi tidak boleh sama',
						}),
					);
				}
			} else {
				dispatch(
					openMessage({
						page: 'department',
						status: 'error',
						message:
							'Gagal menambahkan program studi, pastikan username dan password telah terisi',
					}),
				);
			}
		} catch (error) {
			dispatch(
				openMessage({
					page: 'department',
					status: 'error',
					message: 'Gagal menambahkan program studi',
				}),
			);
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
					openMessage({
						page: 'department',
						status: 'success',
						message: 'Berhasil memperbarui program studi',
					}),
				);
			} else {
				dispatch(
					openMessage({
						page: 'department',
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
					openMessage({
						page: 'department',
						status: 'success',
						message: 'Berhasil menghapus program studi',
					}),
				);
			} else {
				dispatch(
					openMessage({
						page: 'department',
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
