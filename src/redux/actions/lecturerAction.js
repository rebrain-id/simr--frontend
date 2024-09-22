import { getLecturer, postLecturer, updateLecturer, deleteLecturer } from "../../services/lecturer";
export const FETCH_LECTURER_REQUEST = 'FETCH_LECTURER_REQUEST'
export const FETCH_LECTURER_SUCCESS = 'FETCH_LECTURER_SUCCESS'
export const POST_LECTURER_SUCCESS = 'POST_LECTURER_SUCCESS'
export const UPDATE_LECTURER_SUCCESS = 'UPDATE_LECTURER_SUCCESS'
export const DELETE_LECTURER_SUCCESS = 'DELETE_LECTURER_SUCCESS'
export const FETCH_LECTURER_FAILURE = 'FETCH_LECTURER_FAILURE'

export const fetchLecturersRequest = () => ({
    type: 'FETCH_LECTURER_REQUEST'
})

export const fetchLecturersSuccess = (lecturer) => ({
    type: 'FETCH_LECTURER_SUCCESS',
    payload: lecturer
})
export const postLecturersSuccess = (lecturer) => ({
    type: 'POST_LECTURER_SUCCESS',
    payload: lecturer
})
export const updateLecturersSuccess = (lecturer) => ({
    type: 'UPDATE_LECTURER_SUCCESS',
    payload: lecturer
})
export const deleteLecturersSuccess = (lecturer) => ({
    type: 'DELETE_LECTURER_SUCCESS',
    payload: lecturer
})

export const fetchLecturersFailure = (error) => ({
    type: 'FETCH_LECTURER_FAILURE',
    payload: error
})

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
		dispatch(fetchLecturersRequest())
		try {
			const response = await postLecturer(lecturer)
			console.log(response);
			dispatch(postLecturersSuccess(response))
		} catch (error) {
			dispatch(fetchLecturersFailure(error.message))
		}
	}
}

export const updateLecturerData = (uuid, lecturer) => {
	return async (dispatch) => {
		dispatch(fetchLecturersRequest())
		try {
			const response = await updateLecturer(uuid, lecturer)
			console.log(response);
			dispatch(updateLecturersSuccess(response))
		} catch (error) {
			dispatch(fetchLecturersFailure(error.message))
		}
	}
}

export const deleteLecturerData = (lecturer) => {
	return async (dispatch) => {
		dispatch(fetchLecturersRequest())
		try {
			const response = await deleteLecturer(lecturer)
			console.log(response);
			dispatch(deleteLecturersSuccess(response))
		} catch (error) {
			dispatch(fetchLecturersFailure(error.message))
		}
	}
}
