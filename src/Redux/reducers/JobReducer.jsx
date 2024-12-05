import {GET_JOB_DETAIL, SET_JOBS} from "../types/JobType";

const initialState = {
    jobs: [],
};

export const JobReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_JOBS:
            return {
                ...state,
                jobs: action.payload.content,
                totalElements: action.payload.totalElements,
                pageSize: action.payload.pageSize,
                currentPage: action.payload.currentPage,
            };
        case GET_JOB_DETAIL:
            return {
                ...state,
                selectedJobDetail: action.payload,
            };
        default:
            return {...state};
    }
};
