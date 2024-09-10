import dataJson from "../../../data.json"
export const FETCH_DEPARTMENT_REQUEST = 'FETCH_DEPARTMENT_REQUEST'
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS'
export const FETCH_DEPARTMENT_FAILURE = 'FETCH_DEPARTMENT_FAILURE'

export const fetchDepartmentsRequest = () => ({
    type: 'FETCH_DEPARTMENT_REQUEST'
})

export const fetchDepartmentsSuccess = (departments) => ({
    type: 'FETCH_DEPARTMENT_SUCCESS',
    payload: departments
})

export const fetchDepartmentsFailure = (error) => ({
    type: 'FETCH_DEPARTMENT_FAILURE',
    payload: error
})

export const fetchDepartments = () => {
	return async (dispatch) => {
		dispatch(fetchDepartmentsRequest());
		try {
			const data = await dataJson.prodi;
            console.log(data);
			dispatch(fetchDepartmentsSuccess(data));
		} catch (error) {
			dispatch(fetchDepartmentsFailure(error.message));
		}
	};
};
