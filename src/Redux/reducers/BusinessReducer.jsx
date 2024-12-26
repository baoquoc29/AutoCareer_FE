import {} from "../types/SectionType";
import {SET_BUSINESS, SET_BUSINESS_PAGE, UPDATE_BUSINESS} from "../types/BusinessType";

const initialState = {
    business: {},
    resultSearchBusiness: [],
}
export const BusinessReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUSINESS:
            return {
                ...state,
                business: action.payload // Lưu dữ liệu vào `business` trong state
            };
        case UPDATE_BUSINESS:
            return {
                ...state,
                businessUpdate: action.payload // Cập nhật state với payload từ action
            };
        case SET_BUSINESS_PAGE:
            return {
                ...state,
                resultSearchBusiness: action.payload, // Lưu dữ liệu vào `businesses` trong state
                totalElements: action.payload.totalElements,
                pageSize: action.payload.pageSize,
                currentPage: action.payload.currentPage,
                keyword: action.payload.keyword,
            };
        default:
            return {...state}
    }
}