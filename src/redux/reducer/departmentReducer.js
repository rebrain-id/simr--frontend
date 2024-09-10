import {
    FETCH_DEPARTMENT_REQUEST,
    FETCH_DEPARTMENT_SUCCESS,
    FETCH_DEPARTMENT_FAILURE
} from '../actions/departmentAction'

const initialState = {
    departments: [],
    loading: false,
    error: 'Program Studi not found'
}

const departmentReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DEPARTMENT_REQUEST:
            return {
                ...state,
                loading: true

            }
        case FETCH_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                departments: action.payload,
                error: ''
            }
        case FETCH_DEPARTMENT_FAILURE:
            return {
                ...state,
                loadng: false,
                departments: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default departmentReducer