import {} from "../types/SectionType";
import {SET_BUSINESS, UPDATE_BUSINESS} from "../types/BusinessType";

const initialState = {
    business: {}
}
export const BusinessReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUSINESS:
            return {
                ...state,
                business: action.payload[0] // Lưu dữ liệu vào `business` trong state
            };
        case UPDATE_BUSINESS:
            return {
                ...state,
                business: action.payload // Cập nhật state với payload từ action
            };
        default:
            return {...state}
    }
}