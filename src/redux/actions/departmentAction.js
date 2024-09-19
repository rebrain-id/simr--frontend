import { getDepartment, postDepartment, deleteDepartment } from "../../services/department"
export const FETCH_DEPARTMENT_REQUEST = 'FETCH_DEPARTMENT_REQUEST'
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS'
export const FETCH_DEPARTMENT_FAILURE = 'FETCH_DEPARTMENT_FAILURE'
export const POST_DEPARTMENT_REQUEST = 'POST_DEPARTMENT_REQUEST'
export const POST_DEPARTMENT_SUCCESS = 'POST_DEPARTMENT_SUCCESS'
export const POST_DEPARTMENT_FAILURE = 'POST_DEPARTMENT_FAILURE'
export const DELETE_DEPARTMENT_REQUEST = 'DELETE_DEPARTMENT_REQUEST'
export const DELETE_DEPARTMENT_SUCCESS = 'DELETE_DEPARTMENT_SUCCESS'
export const DELETE_DEPARTMENT_FAILURE = 'DELETE_DEPARTMENT_FAILURE'


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

export const postDepartmentSuccess = (department) => ({
	type: 'POST_DEPARTMENT_SUCCESS',
	payload: department
})

export const postDepartmentFailure = (error) => ({
	type: 'POST_DEPARTMENT_FAILURE',
	payload: error
})

export const deleteDepartmentRequest = () => ({
	type: 'DELETE_DEPARTMENT_REQUEST'
})

export const deleteDepartmentSuccess = (uuid) => ({
	type: 'DELETE_DEPARTMENT_SUCCESS',
	payload: uuid
})

export const deleteDepartmentFailure = (error) => ({
	type: 'DELETE_DEPARTMENT_FAILURE',
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

export const postDepartmentData = (department) => {
	return async (dispatch) => {
		dispatch(postDepartmentRequest());
		try {
			const response = await postDepartment(department);
			console.log(response);
			dispatch(postDepartmentSuccess(response));
		} catch (error) {
			dispatch(postDepartmentFailure(error.message));
		}
	};
}

export const deleteDepartmentData = (uuid) => {
	return async (dispatch) => {
		dispatch(deleteDepartmentRequest());
		try {
			const response = await deleteDepartment(uuid);
			console.log(response);
			dispatch(deleteDepartmentSuccess(response));
			dispatch
		} catch (error) {
			dispatch(deleteDepartmentFailure(error.message));
		}
	};
}