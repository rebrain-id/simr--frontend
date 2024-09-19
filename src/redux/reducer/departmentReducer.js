import {
    FETCH_DEPARTMENT_REQUEST,
    FETCH_DEPARTMENT_SUCCESS,
    FETCH_DEPARTMENT_FAILURE,
    POST_DEPARTMENT_REQUEST,
    POST_DEPARTMENT_SUCCESS,
    POST_DEPARTMENT_FAILURE,
    DELETE_DEPARTMENT_REQUEST,
    DELETE_DEPARTMENT_SUCCESS,
    DELETE_DEPARTMENT_FAILURE
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
                loading: false,
                uuid: null,
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
                data: state.data.filter((department) => department.uuid !== action.payload),
                error: ''
            }
        case DELETE_DEPARTMENT_FAILURE:
            return {
                ...state,
                loading: false,
                data: '',
                error: action.payload
            }
        default:
            return state
    }
}

export default departmentReducer