import {
    FETCH_DEPARTMENT_REQUEST,
    FETCH_DEPARTMENT_SUCCESS,
    FETCH_DEPARTMENT_FAILURE,
    POST_DEPARTMENT_REQUEST,
    POST_DEPARTMENT_SUCCESS,
    POST_DEPARTMENT_FAILURE
} from '../actions/departmentAction'

const initialState = {
    departments: [],
    data: null,
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
        case POST_DEPARTMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case POST_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ''
            }
        case POST_DEPARTMENT_FAILURE:
            return {
                ...state,
                loadng: false,
                data: null,
                error: action.payload
            }
        default:
            return state
    }
}

export default departmentReducer