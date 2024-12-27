import {} from "../types/SectionType";
import {SET_UNIVERSITY, SET_UNIVERSITY_DETAILS, UPDATE_UNIVERSITY} from "../types/UniversityType";

const initialState = {
    university: {},
    universityDetails: {}
}
export const UniversityReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_UNIVERSITY:
            return {
                ...state,
                university: action.payload[0] // Lưu dữ liệu vào `university` trong state
            };
        case SET_UNIVERSITY_DETAILS:
            return {
                ...state,
                universityDetails: action.payload[0] // Lưu dữ liệu vào `university` trong state
            };
        case UPDATE_UNIVERSITY:
            return {
                ...state,
                university: action.payload // Cập nhật state với payload từ action
            };
        default:
            return {...state}
    }
}