import dataJson from "../../../data.json"
export const FETCH_LECTURER_REQUEST = 'FETCH_LECTURER_REQUEST'
export const FETCH_LECTURER_SUCCESS = 'FETCH_LECTURER_SUCCESS'
export const FETCH_LECTURER_FAILURE = 'FETCH_LECTURER_FAILURE'


export const fetchLecturersRequest = () => ({
    type: 'FETCH_LECTURER_REQUEST'
})

export const fetchLecturersSuccess = (lecturers) => ({
    type: 'FETCH_LECTURER_SUCCESS',
    payload: lecturers
})

export const fetchLecturersFailure = (error) => ({
    type: 'FETCH_LECTURER_FAILURE',
    payload: error
})

export const fetchLecturers = () => {
	return async (dispatch) => {
		dispatch(fetchLecturersRequest());
		try {
			const data = await dataJson.dosen;
            console.log(data);
			dispatch(fetchLecturersSuccess(data));
		} catch (error) {
			dispatch(fetchLecturersFailure(error.message));
		}
	};
};
