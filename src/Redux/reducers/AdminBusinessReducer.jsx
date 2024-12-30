import {
    APPROVED_BUSINESS, GET_ALL_BUSINESSES,
    GET_APPROVED_BUSINESSES, GET_DATE_TOTAL,
    GET_PENDING_BUSINESSES,
    GET_REJECTED_BUSINESSES, GET_TOTAL, REJECTED_BUSINESS
} from "../types/AdminBusinessType";


const initialState = {
    businesses: [],
    approvedBusinesses: [],
    pendingBusinesses: [],
    rejectedBusinesses: [],
    businessId: {},
    business: {},
    totals: {},
    totals_date: {},
}

export const AdminBusinessReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_BUSINESSES:
            return {
                ...state,
                businesses: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                pageSize: action.payload.pageSize,
                pageNo: action.payload.currentPage,
            };
        case GET_APPROVED_BUSINESSES:
            return {
                ...state,
                businesses: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                pageSize: action.payload.pageSize,
                pageNo: action.payload.currentPage,
            };
        case GET_PENDING_BUSINESSES:
            return {
                ...state,
                businesses: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                pageSize: action.payload.pageSize,
                pageNo: action.payload.currentPage,
            }
        case GET_REJECTED_BUSINESSES:
            return {
                ...state,
                businesses: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                pageSize: action.payload.pageSize,
                pageNo: action.payload.currentPage,
            }
        case APPROVED_BUSINESS:
            return {
                ...state,
            };
        case REJECTED_BUSINESS:
            return {
                ...state,
            };
        case GET_TOTAL:
            return {
                ...state,
                totals: action.payload,
            }
        case GET_DATE_TOTAL:
            return {
                ...state,
                totals_date: action.payload,
            }
        default:
            return {...state}
    }
}