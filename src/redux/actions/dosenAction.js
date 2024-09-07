import dataJson from "../../../data.json"
export const FETCH_DOSEN_REQUEST = 'FETCH_DOSEN_REQUEST'
export const FETCH_DOSEN_SUCCESS = 'FETCH_DOSEN_SUCCESS'
export const FETCH_DOSEN_FAILURE = 'FETCH_DOSEN_FAILURE'

export const fetchDosensRequest = () => ({
    type: 'FETCH_DOSEN_REQUEST'
})

export const fetchDosensSuccess = (dosens) => ({
    type: 'FETCH_DOSEN_SUCCESS',
    payload: dosens
})

export const fetchDosensFailure = (error) => ({
    type: 'FETCH_DOSEN_FAILURE',
    payload: error
})

export const fetchDosens = () => {
	return async (dispatch) => {
		dispatch(fetchDosensRequest());
		try {
			const data = await dataJson.dosen;
            console.log(data);
			dispatch(fetchDosensSuccess(data));
		} catch (error) {
			dispatch(fetchDosensFailure(error.message));
		}
	};
};
