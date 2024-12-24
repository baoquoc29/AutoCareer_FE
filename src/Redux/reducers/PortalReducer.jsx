import {
    CHECK_STATUS_REQUEST,
    CLEAR_JOBS_LIST,
    GET_ALL_BUSINESS_FEATURE,
    GET_ALL_JOB_LIST,
    GET_TOTAL_JOB_INDUSTRY,
    GET_UNIVERSITY_TOTAL,
    GET_WORK_SHOP_BY_ID,
    GET_WORK_SHOP_FEATURE, REQUEST_WORK_SHOP
} from "../types/PortalType";

const initialState = {
    jobList: [],
    totalElements: 0,
    businessFeatures: [],
    industryTotalJob: [],
    workShopFeatures: [],
    workShopDetails: {},
    universities: [],
    totalUniversities: 0,
    totalBusinessFeatures: 0,
    totalWorkShopFeatures: 0,
    totalJobFeatures: 0,
    error : null,
    statusWorkshop: null,
    requestSuccess: null,
};

export const PortalReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLEAR_JOBS_LIST:
            return {
                ...state,
                jobList: [],
                totalElements: 0,
                businessFeatures: [],
            };

        case GET_ALL_JOB_LIST:
            if (action.payload && action.payload.code === 200) {
                return {
                    ...state,
                    jobList: action.payload.data.content,
                    totalElements: action.payload.data.totalElements,
                    totalJobFeatures: action.payload.data.totalElements,
                };
            }
            return {
                ...state,
                jobList: [],
                totalElements: 0,
            };

        case GET_ALL_BUSINESS_FEATURE:
            if (action.payload && action.payload.code === 200) {
                return {
                    ...state,
                    businessFeatures: action.payload.data,
                    totalBusinessFeatures: action.payload.data.length,
                };
            }
            return {
                ...state,
                businessFeatures: [],
            };

        case GET_TOTAL_JOB_INDUSTRY:
            if (action.payload && action.payload.code === 200) {
                return {
                    ...state,
                    industryTotalJob: action.payload.data,
                };
            }
            return {
                ...state,
                industryTotalJob: [],
            };

        case GET_WORK_SHOP_FEATURE:
            if (action.payload && action.payload.code === 200) {
                return {
                    ...state,
                    workShopFeatures: action.payload.data.content,
                    totalElements: action.payload.data.totalElements,
                    totalWorkShopFeatures: action.payload.data.totalElements,
                };
            }
            return {
                ...state,
                workShopFeatures: [],
                totalElements: 0,
            };

        case GET_UNIVERSITY_TOTAL:
            if (action.payload && action.payload.code === 200) {
                return {
                    ...state,
                    universities: action.payload.data,
                    totalUniversities: action.payload.data.length,
                };
            }
            return {
                ...state,
                universities: [],
            };

        case GET_WORK_SHOP_BY_ID:
            if (action.payload && action.payload.code === 200) {
                return {
                    ...state,
                    workShopDetails: action.payload.data,
                };
            }
            return {
                ...state,
                workShopDetails: null,
            };
        case REQUEST_WORK_SHOP:
            if (action.payload && action.payload.code === 200) {
                return {
                    ...state,
                    requestSuccess: action.payload.data,
                };
            }
            return {
                ...state,
                requestSuccess: null,
            };
        case CHECK_STATUS_REQUEST:
            if (action.payload && action.payload.code === 200) {
                return {
                    ...state,
                    statusWorkshop: action.payload.data.statusConnected,
                };
            }
            return {
                ...state,
                statusWorkshop: null,
            };
        default:
            return { ...state };
    }
};
