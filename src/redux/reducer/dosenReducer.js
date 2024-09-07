import {
    FETCH_DOSEN_REQUEST,
    FETCH_DOSEN_SUCCESS,
    FETCH_DOSEN_FAILURE
} from '../actions/dosenAction'

const initialState = {
    dosens: [],
    loading: false,
    error: 'Dosen not found'
}

const dosenReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DOSEN_REQUEST:
            return {
                ...state,
                loading: true

            }
        case FETCH_DOSEN_SUCCESS:
            return {
                ...state,
                loading: false,
                dosens: action.payload,
                error: ''
            }
        case FETCH_DOSEN_FAILURE:
            return {
                ...state,
                loadng: false,
                dosens: [],
                error: action.payload
            }
        default:
            return state
    }
}

export default dosenReducer