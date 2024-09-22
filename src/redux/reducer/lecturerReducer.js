import {
    FETCH_LECTURER_REQUEST,
    FETCH_LECTURER_SUCCESS,
    FETCH_LECTURER_FAILURE,
    POST_LECTURER_SUCCESS,
    UPDATE_LECTURER_SUCCESS,
    DELETE_LECTURER_SUCCESS,
} from '../actions/lecturerAction'

const initialState = {
    lecturer: [],
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
                lecturer: action.payload,
                error: ''
            }
        case POST_LECTURER_SUCCESS:
            return {
                ...state,
                loading: false,
                lecturer: action.payload,
                error: ''
            }
        case UPDATE_LECTURER_SUCCESS:
            return {
                ...state,
                loading: false,
                lecturer: state.lecturer.map((lecturer) => lecturer.uuid === action.payload.uuid ? action.payload : lecturer),
                error: ''
            }
        case DELETE_LECTURER_SUCCESS:
            return {
                ...state,
                loading: false,
                lecturer: state.lecturer.filter((lecturer) => lecturer.uuid !== action.payload),
                error: ''
            }
        case FETCH_LECTURER_FAILURE:
            return {
                ...state,
                loadng: false,
                lecturer: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default lecturerReducer