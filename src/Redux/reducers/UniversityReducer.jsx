import {} from "../types/SectionType";
import {SET_UNIVERSITY, SET_UNIVERSITY_DETAILS, SET_UNIVERSITY_PAGE, UPDATE_UNIVERSITY} from "../types/UniversityType";

const initialState = {
    university: {},
    universityDetails: {},
    resultSearchUniversity: [],
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
        case SET_UNIVERSITY_PAGE:
            return {
                ...state,
                resultSearchUniversity: action.payload.content, // Lưu dữ liệu vào `resultSearchBusiness` trong state
                totalElements: action.payload.totalElements,
                pageSize: action.payload.pageSize,
                currentPage: action.payload.currentPage,
                keyword: action.payload.keyword,
            };

        default:
            return {...state}
    }
}