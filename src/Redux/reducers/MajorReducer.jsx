import {CREATE_MAJOR, DELETE_MAJOR_ID, SET_MAJOR, SET_MAJOR_ID, UPDATE_MAJOR_ID} from "../types/MajorType";


const initialState = {
    majors: [],
    majorId: null
}

export const MajorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MAJOR:
            state.majors = action.payload;
            return {...state,};
        case SET_MAJOR_ID:
            state.majorId = action.payload;
            return {...state,};
        case CREATE_MAJOR:
            return {
                ...state
            }
        case DELETE_MAJOR_ID:
            return {
                ...state,
                majorsId: action.payload
            }
        case UPDATE_MAJOR_ID:
            return {
                ...state,
                majorId: action.payload
            }
        default:
            return {...state}
    }
}