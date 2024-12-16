import {GET_ALL_JOB_LIST} from "../types/PortalType";


const initialState = {
    jobList: [],
}

export const PortalReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_JOB_LIST:
            return {
                ...state,
                jobList: action.payload,
            }
        default:
            return { ...state }
    }
}