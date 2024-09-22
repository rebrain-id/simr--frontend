import {
    FETCH_DEPARTMENT_REQUEST,
    FETCH_DEPARTMENT_SUCCESS,
    FETCH_DEPARTMENT_FAILURE,
    POST_DEPARTMENT_SUCCESS,
    UPDATE_DEPARTMENT_SUCCESS,
    DELETE_DEPARTMENT_SUCCESS,
} from '../actions/departmentAction'

const initialState = {
    department: [],
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
                department: action.payload,
                error: ''
            }
        case POST_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                department: action.payload,
                error: ''
            }
        case UPDATE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                department: state.department.map((department) => department.uuid === action.payload.uuid ? action.payload : department),
                error: ''
            }
        case DELETE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                department: state.department.filter((department) => department.uuid !== action.payload),
                error: ''
            }
        case FETCH_DEPARTMENT_FAILURE:
            return {
                ...state,
                loading: false,
                department: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default departmentReducer