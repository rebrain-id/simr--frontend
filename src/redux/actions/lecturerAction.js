import {
	getLecturer,
	postLecturer,
	updateLecturer,
	deleteLecturer,
} from '../../services/lecturer';
export const FETCH_LECTURER_REQUEST = 'FETCH_LECTURER_REQUEST';
export const FETCH_LECTURER_SUCCESS = 'FETCH_LECTURER_SUCCESS';
export const FETCH_LECTURER_FAILURE = 'FETCH_LECTURER_FAILURE';
export const POST_LECTURER_REQUEST = 'POST_LECTURER_REQUEST';
export const POST_LECTURER_SUCCESS = 'POST_LECTURER_SUCCESS';
export const POST_LECTURER_FAILURE = 'POST_LECTURER_FAILURE';
export const UPDATE_LECTURER_REQUEST = 'UPDATE_LECTURER_REQUEST';
export const UPDATE_LECTURER_SUCCESS = 'UPDATE_LECTURER_SUCCESS';
export const UPDATE_LECTURER_FAILURE = 'UPDATE_LECTURER_FAILURE';
export const DELETE_LECTURER_REQUEST = 'DELETE_LECTURER_REQUEST';
export const DELETE_LECTURER_SUCCESS = 'DELETE_LECTURER_SUCCESS';
export const DELETE_LECTURER_FAILURE = 'DELETE_LECTURER_FAILURE';

export const fetchLecturersRequest = () => ({
	type: 'FETCH_LECTURER_REQUEST',
});

export const fetchLecturersSuccess = (lecturers) => ({
	type: 'FETCH_LECTURER_SUCCESS',
	payload: lecturers,
});

export const fetchLecturersFailure = (error) => ({
	type: 'FETCH_LECTURER_FAILURE',
	payload: error,
});

export const postLecturerRequest = () => ({
	type: 'POST_LECTURER_REQUEST',
});

export const postLecturerSuccess = (lecturer) => ({
	type: 'POST_LECTURER_SUCCESS',
	payload: lecturer,
});

export const postLecturerFailure = (error) => ({
	type: 'POST_LECTURER_FAILURE',
	payload: error,
});

export const updateLecturerRequest = () => ({
	type: 'UPDATE_LECTURER_REQUEST',
});

export const updateLecturerSuccess = (lecturer) => ({
	type: 'UPDATE_LECTURER_SUCCESS',
	payload: lecturer,
});

export const updateLecturerFailure = (error) => ({
	type: 'UPDATE_LECTURER_FAILURE',
	payload: error,
});

export const deleteLecturerRequest = () => ({
	type: 'DELETE_LECTURER_REQUEST',
});

export const deleteLecturerSuccess = (lecturer) => ({
	type: 'DELETE_LECTURER_SUCCESS',
	payload: lecturer,
});

export const deleteLecturerFailure = (error) => ({
	type: 'DELETE_LECTURER_FAILURE',
	payload: error,
});

export const fetchLecturers = () => {
	return async (dispatch) => {
		dispatch(fetchLecturersRequest());
		try {
			const data = await getLecturer();
			console.log(data);
			dispatch(fetchLecturersSuccess(data));
		} catch (error) {
			dispatch(fetchLecturersFailure(error.message));
		}
	};
};

export const postLecturerData = (lecturer) => {
	return async (dispatch) => {
		dispatch(postLecturerRequest());
		try {
			const response = await postLecturer(lecturer);
			console.log(response);
			dispatch(postLecturerSuccess(response));
		} catch (error) {
			dispatch(postLecturerFailure(error.message));
		}
	};
};

export const updateLecturerData = (uuid, lecturer) => {
	return async (dispatch) => {
		dispatch(updateLecturerRequest());
		try {
			const response = await updateLecturer(uuid, lecturer);
			console.log(response);
			dispatch(updateLecturerSuccess(response));
		} catch (error) {
			dispatch(updateLecturerFailure(error.message));
		}
	};
};

export const deleteLecturerData = (lecturer) => {
	return async (dispatch) => {
		dispatch(deleteLecturerRequest());
		try {
			const response = await deleteLecturer(lecturer);
			console.log(response);
			dispatch(deleteLecturerSuccess(response));
		} catch (error) {
			dispatch(deleteLecturerFailure(error.message));
		}
	};
};
