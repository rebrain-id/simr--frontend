import {
    FETCH_LECTURER_REQUEST,
    FETCH_LECTURER_SUCCESS,
    FETCH_LECTURER_FAILURE,
    POST_LECTURER_REQUEST,
    POST_LECTURER_SUCCESS,
    POST_LECTURER_FAILURE,
    UPDATE_LECTURER_REQUEST,
    UPDATE_LECTURER_SUCCESS,
    UPDATE_LECTURER_FAILURE,
    DELETE_LECTURER_REQUEST,
    DELETE_LECTURER_SUCCESS,
    DELETE_LECTURER_FAILURE
} from '../actions/lecturerAction'

const initialState = {
    lecturers: [],
    loading: false,
    error: 'Dosen not found'
}

const lecturerReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_LECTURER_REQUEST:
            return {
                ...state,
                loading: true

            }
        case FETCH_LECTURER_SUCCESS:
            return {
                ...state,
                loading: false,
                lecturers: action.payload,
                error: ''
            }
        case FETCH_LECTURER_FAILURE:
            return {
                ...state,
                loadng: false,
                lecturers: [],
                error: action.payload
            }
        case POST_LECTURER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case POST_LECTURER_SUCCESS:
            return {
                ...state,
                loading: false,
                lecturers: action.payload,
                error: ''
            }
        case POST_LECTURER_FAILURE:
            return {
                ...state,
                loading: false,
                lecturers: '',
                error: action.payload
            }
        case UPDATE_LECTURER_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case UPDATE_LECTURER_SUCCESS:
            return {
                ...state,
                loading: false,
                lecturers: state.lecturers.map((lecturers) => lecturers.uuid === action.payload.uuid ? action.payload : lecturers),
                error: ''
            }
        case UPDATE_LECTURER_FAILURE:
            return {
                ...state,
                loading: false,
                lecturers: '',
                error: action.payload
            }
        case DELETE_LECTURER_REQUEST:
            return {
                ...state,
                loading: true,
                error: ''
            }
        case DELETE_LECTURER_SUCCESS:
            return {
                ...state,
                loading: false,
                lecturers: state.lecturers.filter((lecturers) => lecturers.uuid !== action.payload),
                error: ''
            }
        case DELETE_LECTURER_FAILURE:
            return {
                ...state,
                loading: false,
                lecturers: '',
                error: action.payload
            }
        default:
            return state
    }
}

export default lecturerReducer