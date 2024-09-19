import { getDepartment, postDepartment } from "../../services/department"
export const FETCH_DEPARTMENT_REQUEST = 'FETCH_DEPARTMENT_REQUEST'
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS'
export const FETCH_DEPARTMENT_FAILURE = 'FETCH_DEPARTMENT_FAILURE'
export const POST_DEPARTMENT_REQUEST = 'POST_DEPARTMENT_REQUEST'
export const POST_DEPARTMENT_SUCCESS = 'POST_DEPARTMENT_SUCCESS'
export const POST_DEPARTMENT_FAILURE = 'POST_DEPARTMENT_FAILURE'

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

export const postDepartmentRequest = () => ({
	type: 'POST_DEPARTMENT_REQUEST'
})

export const postDepartmentSuccess = (data) => ({
	type: 'POST_DEPARTMENT_SUCCESS',
	payload: data
})

export const postDepartmentFailure = (error) =>({
	type: 'POST_DEPARTMENT_FAILURE',
	payload: error
})

export const fetchDepartments = () => {
	return async (dispatch) => {
		dispatch(fetchDepartmentsRequest());
		try {
			const data = await getDepartment();
            console.log(data);
			dispatch(fetchDepartmentsSuccess(data));
		} catch (error) {
			dispatch(fetchDepartmentsFailure(error.message));
		}
	};
};

export const postDepartmentData = (data) => {
	return async (dispatch) => {
		dispatch(postDepartmentRequest());
		try {
			const response = await postDepartment(data);
			console.log(response);
			dispatch(postDepartmentSuccess(response));
		} catch (error) {
			dispatch(postDepartmentFailure(error.message));
		}
	};
}