import {SET_COOPERATION} from "../types/CooperationType";

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
            };
        //    case SET_EMPLOYEE_ID:
        //     return {
        //         ...state,
        //         employeeId: action.payload,
        //     };
        // case CREATE_EMPLOYEE:
        //     return {
        //         ...state,
        //
        //     };
        // case UPDATE_EMPLOYEE:
        //     return {
        //         ...state,
        //     };
        // case DELETE_EMPLOYEE:
        //     return {
        //         ...state,
        //     };
        // 
        default:
            return {...state}
    }
}