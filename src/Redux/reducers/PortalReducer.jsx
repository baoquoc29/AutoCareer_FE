import {CLEAR_JOBS_LIST, GET_ALL_BUSINESS_FEATURE, GET_ALL_JOB_LIST} from "../types/PortalType";


const initialState = {
    jobList: [],
    totalElements: 0,
    businessFeatures: [],
}

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
                };
            }
            return {
                ...state,
                jobList: null,
                totalElements: null,
            };
        case GET_ALL_BUSINESS_FEATURE:
            if (action.payload && action.payload.code === 200) {
                return {
                    ...state,
                    businessFeatures: action.payload.data,
                };
            }
            return {
                ...state,
                businessFeatures: null,
            };

        default:
            return { ...state }
    }
}