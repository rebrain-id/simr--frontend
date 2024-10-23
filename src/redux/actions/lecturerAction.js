import {
	getLecturer,
	postLecturer,
	updateLecturer,
	deleteLecturer,
} from '../../services/lecturer';
export const FETCH_LECTURER_REQUEST = 'FETCH_LECTURER_REQUEST';
export const FETCH_LECTURER_SUCCESS = 'FETCH_LECTURER_SUCCESS';
export const POST_LECTURER_SUCCESS = 'POST_LECTURER_SUCCESS';
export const UPDATE_LECTURER_SUCCESS = 'UPDATE_LECTURER_SUCCESS';
export const DELETE_LECTURER_SUCCESS = 'DELETE_LECTURER_SUCCESS';
export const MESSAGE = 'MESSAGE';
export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const FETCH_LECTURER_FAILURE = 'FETCH_LECTURER_FAILURE';

export const fetchLecturersRequest = () => ({
	type: 'FETCH_LECTURER_REQUEST',
});

export const fetchLecturersSuccess = (lecturer) => ({
	type: 'FETCH_LECTURER_SUCCESS',
	payload: lecturer,
});

export const postLecturersSuccess = (lecturer) => ({
	type: 'POST_LECTURER_SUCCESS',
	payload: lecturer,
});

export const updateLecturersSuccess = (lecturer) => ({
	type: 'UPDATE_LECTURER_SUCCESS',
	payload: lecturer,
});

export const deleteLecturersSuccess = (lecturer) => ({
	type: 'DELETE_LECTURER_SUCCESS',
	payload: lecturer,
});

export const fetchMessage = (message) => ({
	type: 'MESSAGE',
	payload: message,
});

export const fetchOpenModal = (uuid) => ({
	type: 'OPEN_MODAL',
	payload: uuid,
});

export const fetchCloseModal = () => ({
	type: 'CLOSE_MODAL',
});

export const fetchLecturersFailure = (error) => ({
	type: 'FETCH_LECTURER_FAILURE',
	payload: error,
});

export const fetchLecturers = () => {
	return async (dispatch) => {
		dispatch(fetchLecturersRequest());
		try {
			const response = await getLecturer();

			const groupLecturerByDepartment = response.reduce((acc, item) => {
				const lecturerByDepartment = item.department.name;
				const groupByDepartment = acc.find(
					(group) => group.department === lecturerByDepartment,
				);

				if (groupByDepartment) {
					groupByDepartment.lecturer.push(item);
				} else {
					acc.push({
						department: lecturerByDepartment,
						lecturer: [item],
					});
				}

				return acc;
			}, []);

			dispatch(fetchLecturersSuccess(groupLecturerByDepartment));
		} catch (error) {
			dispatch(fetchLecturersFailure(error.message));
		}
	};
};

export const postLecturerData = (lecturer) => {
	return async (dispatch) => {
		dispatch(fetchLecturersRequest());
		try {
			const response = await postLecturer(lecturer);

			if (response && response.statusCode === 201) {
				dispatch(
					fetchMessage({
						status: 'success',
						message: 'Berhasil menambahkan data dosen',
					}),
				);
			} else {
				dispatch(
					fetchMessage({
						status: 'error',
						message: 'Gagal menambahkan data dosen',
					}),
				);
			}
			console.log(response);
			return response;
		} catch (error) {
			dispatch(fetchLecturersFailure(error.message));
		}
	};
};

export const updateLecturerData = (uuid, lecturer) => {
	return async (dispatch) => {
		dispatch(fetchLecturersRequest());
		try {
			const response = await updateLecturer(uuid, lecturer);

			if (response && response.statusCode === 200) {
				dispatch(
					fetchMessage({
						status: 'success',
						message: 'Berhasil memperbarui data dosen',
					}),
				);
			} else {
				dispatch(
					fetchMessage({
						status: 'error',
						message:
							'Gagal memperbarui data dosen, pastikan data yang anda masukkan sesuai',
					}),
				);
			}
			return response;
		} catch (error) {
			dispatch(fetchLecturersFailure(error.message));
		}
	};
};

export const deleteLecturerData = (lecturer) => {
	return async (dispatch) => {
		dispatch(fetchLecturersRequest());
		try {
			const response = await deleteLecturer(lecturer);

			if (response && response.statusCode === 200) {
				dispatch(
					fetchMessage({
						status: 'success',
						message: 'Berhasil menghapus data dosen',
					}),
				);
			} else {
				dispatch(
					fetchMessage({
						status: 'error',
						message: 'Gagal menghapus data dosen',
					}),
				);
			}
			return response;
		} catch (error) {
			dispatch(fetchLecturersFailure(error.message));
		}
	};
};
