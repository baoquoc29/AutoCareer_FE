import {GET_INDUSTRIES_DETAIL, CREATE_INDUSTRIES, SET_INDUSTRIES, SET_INDUSTRY_OPTIONS} from "../types/IndustryType";

const initialState = {
    industries: [],
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
        case GET_INDUSTRIES_DETAIL:
            return {
                ...state,
                industryDetail: action.payload, // Lưu chi tiết ngành vào state
            };
        default:
            return {...state};
    }
};
