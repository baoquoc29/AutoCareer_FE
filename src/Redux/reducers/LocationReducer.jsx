import {
    GET_ALL_LOCATION,
    GET_ALL_DISTRICT_BY_ID,
    GET_ALL_WARD_BY_ID_DISTRICT,
} from "../types/WorkShopType";

const initialState = {
    provinces: [],
    districts: [],
    wards: [],
};


export const LocationReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
};
