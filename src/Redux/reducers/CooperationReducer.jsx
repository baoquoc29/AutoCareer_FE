import {APPROVE_COOPERATION, REJECT_COOPERATION, SET_COOPERATION, TOTAL_COOPERATION} from "../types/CooperationType";

const initialState = {
    cooperation: [],
    cooperationId: null,
    totalCooperation:0
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
        default:
            return {...state}
    }
}