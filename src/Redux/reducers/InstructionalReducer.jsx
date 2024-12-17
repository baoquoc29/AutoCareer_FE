import {SET_INSTRUCTIONAL} from "../types/InstructionalType";

const initialState = {
    instructional: [],
    totalElements: 0,
    pageSize:7,
    currentPage: 1,
    selectedIds: [], // Thêm trường selectedIds
}
export const InstructionalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INSTRUCTIONAL:
            return {
                ...state,
                instructional: action.payload.content,
                totalElements: action.payload.totalElements,
                pageSize: action.payload.pageSize,
                currentPage: action.payload.currentPage,
            };
        default:
            return {...state}
    }
}