import {APPROVE_COOPERATION, REJECT_COOPERATION, SET_COOPERATION} from "../types/CooperationType";

const initialState = {
    cooperation: [],
    cooperationId: null,
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

        default:
            return {...state}
    }
}