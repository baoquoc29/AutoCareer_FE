import {
    APPROVED_JOB,
    GET_ALL_JOBS,
    GET_APPROVED_JOBS,
    GET_PENDING_JOBS,
    GET_REJECTED_JOBS,
    REJECTED_JOB
} from "../types/AdminJobType";


const initialState = {
    jobs: [],
}

export const AdminJobReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_JOBS:
            return {
                ...state,
                jobs: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                pageSize: action.payload.pageSize,
                pageNo: action.payload.currentPage,
            };
        case GET_APPROVED_JOBS:
            return {
                ...state,
                jobs: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                pageSize: action.payload.pageSize,
                pageNo: action.payload.currentPage,
            };
        case GET_PENDING_JOBS:
            return {
                ...state,
                jobs: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                pageSize: action.payload.pageSize,
                pageNo: action.payload.currentPage,
            }
        case GET_REJECTED_JOBS:
            return {
                ...state,
                jobs: action.payload.content,
                totalElements: action.payload.totalElements,
                totalPages: action.payload.totalPages,
                pageSize: action.payload.pageSize,
                pageNo: action.payload.currentPage,
            }
        case APPROVED_JOB:
            return {
                ...state,
            };
        case REJECTED_JOB:
            return {
                ...state,
            };
        default:
            return {...state}
    }
}