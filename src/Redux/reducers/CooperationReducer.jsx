import {
    APPROVE_COOPERATION, CANCEL_REQUEST, DETAIL_COOPERATION,
    REJECT_COOPERATION,
    SET_COOPERATION,
    SET_COOPERATION_BUSINESS,
    TOTAL_COOPERATION
} from "../types/CooperationType";

const initialState = {
    cooperation: [],
    cooperationId: null,
    totalCooperation:0,
    cooperationBusiness:[],
    cooperationDetail: {},
}

export const CooperationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COOPERATION:
            return {
                ...state,
                cooperation: action.payload.content,
                totalElements: action.payload.totalElements,
                pageSize: action.payload.pageSize,
                currentPage: action.payload.currentPage,
                keyword: action.payload.keyword,
                statusConnected: action.payload.statusConnected,
            };
        case SET_COOPERATION_BUSINESS:
            return {
                ...state,
                cooperationBusiness: action.payload.content,
                totalElements: action.payload.totalElements,
                pageSize: action.payload.pageSize,
                currentPage: action.payload.currentPage,
                keyword: action.payload.keyword,
                statusConnected: action.payload.statusConnected,
            };
        case APPROVE_COOPERATION:
            return {
                ...state,
            };
        case REJECT_COOPERATION:
            return {
                ...state,
            };

        case TOTAL_COOPERATION:
            return {
                ...state,
                totalCooperation: action.payload,
            };
        case CANCEL_REQUEST:
            return {
                ...state,
            };
        case DETAIL_COOPERATION:
            return {
                ...state,
                cooperationDetail: action.payload,
            }
        default:
            return {...state}
    }
}