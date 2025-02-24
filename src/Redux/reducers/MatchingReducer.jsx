import {
    GET_ALL_JOBS_APPLY, STATUS_JOB
} from "../types/MatchingType";
import {GET_ALL_JOBS} from "../types/AdminJobType";
const initialState = {
   matchingList: [],
    totalElements: 0,
    totalJob: [],
    status : null
};


export const MatchingReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_JOBS_APPLY:
            return {
                ...state,
                matchingList: action.payload.content,
                totalElements: action.payload.totalElements,

            }
        case STATUS_JOB:
            return {
                ...state,
                status: action.payload.data
            }
        case GET_ALL_JOBS:
            return {
                ...state,
                totalJob: action.payload
            }
        default:
            return state;
    }
};
