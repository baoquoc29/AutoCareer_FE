import {
    GET_ALL_LOCATION,
    GET_ALL_DISTRICT_BY_ID,
    GET_ALL_WARD_BY_ID_DISTRICT,
} from "../types/LocationType";
import {CLEAR_RESPONSE} from "../../Utils/Setting/Config";

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
        case CLEAR_RESPONSE:
            return {
                ...state,
                responseWorkShop: null,
            }

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
