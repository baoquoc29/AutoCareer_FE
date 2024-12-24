import {SET_COOPERATION, TOTAL_COOPERATION} from "../types/CooperationType";

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
            }
        case TOTAL_COOPERATION:
            return {
                ...state,
                totalCooperation: action.payload,
            }
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