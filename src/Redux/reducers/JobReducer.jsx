import {GET_JOB_DETAIL, SET_JOBS, CREATE_JOB, UPDATE_JOB, INACTIVE_JOB} from "../types/JobType";

const initialState = {
    jobs: [],
    selectedJobDetail: {}
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
        case CREATE_JOB:
            return {
                ...state,
                jobs: [...state.jobs, action.payload], // Thêm job mới vào danh sách
            };
        case UPDATE_JOB:
            return {
                ...state,
                jobs: state.jobs.map((job) =>
                    job.jobId === action.payload.jobId ? action.payload : job
                ),
            };
        case INACTIVE_JOB:
            return {
                ...state,
                jobs: state.jobs.map((job) =>
                    job.jobId === action.payload.jobId ? {...job, status: 'INACTIVE'} : job
                ),
            };
        default:
            return {...state};
    }
};
