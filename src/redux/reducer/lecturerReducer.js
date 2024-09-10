import {
    FETCH_LECTURER_REQUEST,
    FETCH_LECTURER_SUCCESS,
    FETCH_LECTURER_FAILURE
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
        default:
            return state
    }
}

export default lecturerReducer