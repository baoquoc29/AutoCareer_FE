import {
    CREATE_WORK_SHOP,
    SET_WORK_SHOP,
    GET_ALL_LOCATION,
    GET_ALL_DISTRICT_BY_ID,
    GET_ALL_WARD_BY_ID_DISTRICT,
    DELETE_WORK_SHOP,
    UPDATE_WORK_SHOP,
    GET_ALL_COMPANY_PENDING,
    GET_ALL_COMPANY_ACCEPT,
    GET_TOTAL_WORK_SHOP,
    GET_STATUS_WORK_SHOP,
    GET_WORK_SHOP_BUSINESS,
    GET_COUNT_APPROVED_WORK_SHOP
} from "../types/WorkShopType";
import {CLEAR_RESPONSE} from "../../Utils/Setting/Config";

const initialState = {
    workshops: [],
    workshopsBusiness: [],
    provinces: [],
    districts: [],
    wards: [],
    totalRecords: 0,
    pendingCompany: [],
    acceptCompany: [],
    responseWorkShop: null,
    totalWorkShop: 0,
    statusWorkShop: [],
    totalApprovedWorkShop: [],
};


export const WorkShopReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_WORK_SHOP:
            return {
                ...state,
                workshops: action.payload.workshops,

                totalRecords: action.payload.totalRecords,
            };
        case GET_WORK_SHOP_BUSINESS:
            return {
                ...state,
                workshopsBusiness: action.payload.content,

                totalRecords: action.payload.totalElements,
            };

        case CREATE_WORK_SHOP:
            return {
                ...state,
                responseWorkShop: action.payload,
                workshops: [...state.workshops, action.payload],
            };
        case UPDATE_WORK_SHOP:
            if (action.payload && action.payload.code === 200) {
                return {
                    ...state,
                    responseWorkShop: action.payload,
                    workshops: state.workshops.map(workshop =>
                        workshop.id === action.payload.data.id ? action.payload.data : workshop
                    ),
                };
            } else {
                return {
                    ...state,
                    responseWorkShop: action.payload, // Lưu response để kiểm tra lỗi nếu cần
                };
            }

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
        case DELETE_WORK_SHOP:
            return {
                ...state,
                workshops: state.workshops.filter(workshop => workshop.id !== action.payload),
            };
        case GET_TOTAL_WORK_SHOP:
            return {
               ...state,
                totalWorkShop: action.payload,
            };
        case GET_STATUS_WORK_SHOP:
            return {
               ...state,
                statusWorkShop: action.payload,
            };
        case GET_COUNT_APPROVED_WORK_SHOP:
            return {
               ...state,
                totalApprovedWorkShop: action.payload,
            };
        default:
            return state;
    }
};
