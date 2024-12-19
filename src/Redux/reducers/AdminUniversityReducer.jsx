import {
    APPROVED_UNIVERSITY, GET_ALL_UNIVERSITIES,
    GET_APPROVED_UNIVERSITIES,
    GET_PENDING_UNIVERSITIES,
    GET_REJECTED_UNIVERSITIES,
    REJECTED_UNIVERSITY
} from "../types/AdminUniversityType";


const initialState = {
    universities: [],
}

export const AdminUniversityReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_UNIVERSITIES:
            return {
                ...state,
                universities: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                pageSize: action.payload.pageSize,
                pageNo: action.payload.currentPage,
            };
        case GET_APPROVED_UNIVERSITIES:
            return {
                ...state,
                universities: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                pageSize: action.payload.pageSize,
                pageNo: action.payload.currentPage,
            };
        case GET_PENDING_UNIVERSITIES:
            return {
                ...state,
                universities: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                pageSize: action.payload.pageSize,
                pageNo: action.payload.currentPage,
            }
        case GET_REJECTED_UNIVERSITIES:
            return {
                ...state,
                universities: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                pageSize: action.payload.pageSize,
                pageNo: action.payload.currentPage,
            }
        case APPROVED_UNIVERSITY:
            return {
                ...state,
            };
        case REJECTED_UNIVERSITY:
            return {
                ...state,
            };
        default:
            return {...state}
    }
}