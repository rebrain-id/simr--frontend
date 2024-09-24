import { getDepartment, postDepartment, updateDepartment, deleteDepartment } from "../../services/department"
export const FETCH_DEPARTMENT_REQUEST = 'FETCH_DEPARTMENT_REQUEST'
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS'
export const POST_DEPARTMENT_SUCCESS = 'POST_DEPARTMENT_SUCCESS'
export const UPDATE_DEPARTMENT_SUCCESS = 'UPDATE_DEPARTMENT_SUCCESS'
export const DELETE_DEPARTMENT_SUCCESS = 'DELETE_DEPARTMENT_SUCCESS'
export const FETCH_DEPARTMENT_FAILURE = 'FETCH_DEPARTMENT_FAILURE'


export const fetchDepartmentsRequest = () => ({
    type: 'FETCH_DEPARTMENT_REQUEST'
})

export const fetchDepartmentsSuccess = (department) => ({
    type: 'FETCH_DEPARTMENT_SUCCESS',
    payload: department
})

export const postDepartmentsSuccess = (department) => ({
	type: 'POST_DEPARTMENT_SUCCESS',
	payload: department
})

export const updateDepartmentsSuccess = (department) => ({
	type: 'UPDATE_DEPARTMENT_SUCCESS',
	payload: department
})

export const deleteDepartmentsSuccess = (department) => ({
	type: 'DELETE_DEPARTMENT_SUCCESS',
	payload: department
})

export const fetchDepartmentsFailure = (error) => ({
    type: 'FETCH_DEPARTMENT_FAILURE',
    payload: error
})


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

export const postDepartmentData = (department) => {
	return async (dispatch) => {
		dispatch(fetchDepartmentsRequest());
		try {
			const response = await postDepartment(department);
			return response
		} catch (error) {
			dispatch(fetchDepartmentsFailure(error.message));
		}
	};
}

export const updateDepartmentData = (uuid, department) => {
	return async (dispatch) => {
		dispatch(fetchDepartmentsRequest());
		try {
			const response = await updateDepartment(uuid, department);
			return response
		} catch (error) {
			dispatch(fetchDepartmentsFailure(error.message));
		}
	}
}

export const deleteDepartmentData = (department) => {
	return async (dispatch) => {
		dispatch(fetchDepartmentsRequest());
		try {
			const response = await deleteDepartment(department);
			return response
		} catch (error) {
			dispatch(fetchDepartmentsFailure(error.message));
		}
	};
}