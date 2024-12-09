import {
    GET_INDUSTRIES_DETAIL,
    CREATE_INDUSTRIES,
    SET_INDUSTRIES,
    SET_INDUSTRY_OPTIONS,
    SET_INDUSTRIES_NO_PAG, SET_INDUSTRIES_ALL
} from "../types/IndustryType";

const initialState = {
    industries: [],
    industriesNoPag: [],
    industryOptions: [], // Dữ liệu cho Select
};

export const IndustryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INDUSTRIES:
            return {
                ...state,
                industries: action.payload.content,
                totalElements: action.payload.totalElements,
                pageSize: action.payload.pageSize,
                currentPage: action.payload.currentPage,
                keyword: action.payload.keyword, // Lưu từ khóa tìm kiếm
            };
        case SET_INDUSTRIES_NO_PAG:
            return {
                ...state,
                industriesNoPag: action.payload, // Lưu dữ liệu vào `industries` trong state
            };
        case SET_INDUSTRY_OPTIONS:
            return {
                ...state,
                industryOptions: action.payload, // Lưu dữ liệu vào `industries` trong state
            };
        case CREATE_INDUSTRIES:
            return {
                ...state
            };
        case SET_INDUSTRIES_ALL:
            return {
                ...state,
                industriesNoPag: action.payload,
            };
        case GET_INDUSTRIES_DETAIL:
            return {
                ...state,
                industryDetail: action.payload, // Lưu chi tiết ngành vào state
            };
        default:
            return {...state};
    }
};
