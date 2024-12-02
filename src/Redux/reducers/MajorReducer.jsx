import {CREATE_MAJOR, DELETE_MAJOR_ID, SET_MAJOR, SET_MAJOR_ID} from "../types/MajorType";


const initialState = {
    majors: [],
    majorId: {}
}

export const MajorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MAJOR:
            return {
                ...state,
                majors: action.payload
            };
        case SET_MAJOR_ID:
            return {
                ...state,
                majorsId: action.payload
            };
        case CREATE_MAJOR:
            return {
                ...state
            }
        case DELETE_MAJOR_ID:
            return {
                ...state,
                majorsId: action.payload
            }
        default:
            return {...state}
    }
}