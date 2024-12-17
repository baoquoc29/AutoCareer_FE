import {GET_ALL_JOB_LIST} from "../types/PortalType";


const initialState = {
    jobList: [],
    totalElements: 0,
}

export const PortalReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_JOB_LIST:
            return {
                ...state,
                jobList: action.payload.content,
                totalElements: action.payload.totalElements,
            }
        default:
            return { ...state }
    }
}