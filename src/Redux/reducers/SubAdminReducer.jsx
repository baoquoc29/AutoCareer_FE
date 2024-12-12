import {
    ALL_SUB_ADMIN,
    CREATE_SUB_ADMIN,
    DELETE_SUB_ADMIN,
    DETAIL_SUB_ADMIN,
    PAGING_SUB_ADMIN,
    UPDATE_SUB_ADMIN
} from "../types/SubAdminType";


const initialState = {
    subAdmins: [],
    subAdminId: {},
    subAdmin: {},
    admin:{}
}

export const SubAdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_SUB_ADMIN:
            return {
                ...state,
                subAdminId: action.payload,
            };
        case UPDATE_SUB_ADMIN:
            return {
                ...state,
                subAdminId: action.payload,
            };
        case DETAIL_SUB_ADMIN:
            return {
                ...state,
                subAdmin: action.payload,
            };
        case DELETE_SUB_ADMIN:
            return {
                ...state,
            };
        case ALL_SUB_ADMIN:
            return {
                ...state,
                subAdmins: action.payload,
            };
        case PAGING_SUB_ADMIN:
            return {
                ...state,
                subAdmins: action.payload,
            }
        default:
            return {...state}
    }
}