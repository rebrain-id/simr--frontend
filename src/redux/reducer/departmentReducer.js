import {
    FETCH_DEPARTMENT_REQUEST,
    FETCH_DEPARTMENT_SUCCESS,
    FETCH_DEPARTMENT_FAILURE,
    POST_DEPARTMENT_REQUEST,
    POST_DEPARTMENT_SUCCESS,
    POST_DEPARTMENT_FAILURE,
    UPDATE_DEPARTMENT_REQUEST,
    UPDATE_DEPARTMENT_SUCCESS,
    UPDATE_DEPARTMENT_FAILURE,
    DELETE_DEPARTMENT_REQUEST,
    DELETE_DEPARTMENT_SUCCESS,
    DELETE_DEPARTMENT_FAILURE,
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
                loading: true,
                error: ''

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
                loading: false,
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
                department: action.payload,
                error: ''
            }
        case POST_DEPARTMENT_FAILURE:
            return {
                ...state,
                loading: false,
                department: '',
                error: action.payload
            }
        case UPDATE_DEPARTMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case UPDATE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                departments: state.departments.map((departments) => departments.uuid === action.payload.uuid ? action.payload : departments),
                error: ''
            }
        case UPDATE_DEPARTMENT_FAILURE:
            return {
                ...state,
                loading: false,
                departments: '',
                error: action.payload
            }
        case DELETE_DEPARTMENT_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case DELETE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                departments: state.departments.filter((departments) => departments.uuid !== action.payload),
                error: ''
            }
        case DELETE_DEPARTMENT_FAILURE:
            return {
                ...state,
                loading: false,
                departments: '',
                error: action.payload
            }
        default:
            return state
    }
}

export default departmentReducer