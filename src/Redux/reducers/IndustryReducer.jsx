import {
    GET_INDUSTRIES_DETAIL,
    CREATE_INDUSTRIES,
    SET_INDUSTRIES,
    SET_INDUSTRY_OPTIONS,
    SET_INDUSTRIES_NO_PAG,
    SET_INDUSTRIES_ALL, SET_INDUSTRIES_ALL_PAG, UPDATE_INDUSTRY_SUCCESS,
} from "../types/IndustryType";

const initialState = {
    industries: [],
    industryOptions: [], // Dữ liệu cho Select
    industriesNoPag: [],
    industriesAll: [],
    industryDetail:{},
    industriesAllPag: []

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
                industriesNoPag: action.payload,
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
                industriesAll: action.payload,
            };
        case SET_INDUSTRIES_ALL_PAG:
            return {
                ...state,
                industriesAllPag: action.payload.content,
                totalElements: action.payload.totalElements,
                pageSize: action.payload.pageSize,
                currentPage: action.payload.currentPage,
            };
        case GET_INDUSTRIES_DETAIL:
            return {
                ...state,
                industryDetail: action.payload, // Lưu chi tiết ngành vào state
            };
        case UPDATE_INDUSTRY_SUCCESS:
            return {
                ...state,
                industriesAllPag: state.industriesAllPag.map((industry) =>
                    industry.id === action.payload.id ? action.payload : industry
                ),
            };
        default:
            return {...state};
    }
};

