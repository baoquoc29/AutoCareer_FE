import {
    CREATE_WORK_SHOP,
    SET_WORK_SHOP,
    GET_ALL_LOCATION,
    GET_ALL_DISTRICT_BY_ID,
    GET_ALL_WARD_BY_ID_DISTRICT,
    DELETE_WORK_SHOP,
    UPDATE_WORK_SHOP,
    GET_ALL_COMPANY_PENDING, GET_ALL_COMPANY_ACCEPT
} from "../types/WorkShopType";

const initialState = {
    workshops: [],
    provinces: [],
    districts: [],
    wards: [],
    totalRecords: 0,
    pendingCompany: [],
    acceptCompany: [],
};


export const WorkShopReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WORK_SHOP:
            return {
                ...state,
                workshops: action.payload.workshops,

                totalRecords: action.payload.totalRecords,
            };
        case CREATE_WORK_SHOP:
            return {
                ...state,
                workshops: [...state.workshops, action.payload], // Add new workshop to the list
            };
        case UPDATE_WORK_SHOP:
            return {
                ...state,
                workshops: state.workshops.map(workshop =>
                    workshop.id === action.payload.id ? action.payload : workshop // Replace updated workshop
                ),
            };
        case GET_ALL_COMPANY_PENDING:
            return {
                ...state,
                pendingCompany: action.payload.businessList,
            };
        case GET_ALL_COMPANY_ACCEPT:
            return {
                ...state,
                acceptCompany: action.payload.businessList,
            };
        case GET_ALL_LOCATION:
            return {
                ...state,
                provinces: action.payload,
            };


        case GET_ALL_DISTRICT_BY_ID:
            return {
                ...state,
                districts: action.payload,
            };
        case GET_ALL_WARD_BY_ID_DISTRICT:
            return {
                ...state,
                wards: action.payload,
            };
        case DELETE_WORK_SHOP:
            return {
                ...state,
                workshops: state.workshops.filter(workshop => workshop.id !== action.payload),
            };
        default:
            return state;
    }
};
