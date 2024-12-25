import {
    APPROVED_WORKSHOP,
    GET_ALL_WORKSHOPS,
    GET_APPROVED_WORKSHOPS, GET_DETAIL_WORKSHOP,
    GET_PENDING_WORKSHOPS,
    GET_REJECTED_WORKSHOPS,
    REJECTED_WORKSHOP

} from "../types/AdminWorkshopType";


const initialState = {
    workshops: [],
    workshop: {},
}

export const AdminWorkshopReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_WORKSHOPS:
            return {
                ...state,
                workshops: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                pageSize: action.payload.pageSize,
                pageNo: action.payload.currentPage,
            };
        case GET_DETAIL_WORKSHOP:
            return {
                ...state,
                workshop: action.payload,
            };
        case GET_APPROVED_WORKSHOPS:
            return {
                ...state,
                workshops: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                pageSize: action.payload.pageSize,
                pageNo: action.payload.currentPage,
            };
        case GET_PENDING_WORKSHOPS:
            return {
                ...state,
                workshops: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                pageSize: action.payload.pageSize,
                pageNo: action.payload.currentPage,
            }
        case GET_REJECTED_WORKSHOPS:
            return {
                ...state,
                workshops: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                pageSize: action.payload.pageSize,
                pageNo: action.payload.currentPage,
            }
        case APPROVED_WORKSHOP:
            return {
                ...state,
            };
        case REJECTED_WORKSHOP:
            return {
                ...state,
            };
        default:
            return {...state}
    }
}