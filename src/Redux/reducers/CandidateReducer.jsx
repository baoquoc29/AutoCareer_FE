import {
    FOLLOW_LIST,
    SET_CANDIDATE,
    SET_CANDIDATE_DETAILS
} from "../types/CandidateType";

const initialState = {
    candidate: {},
    candidateDetails: {},
    followList: {
        businesses: [],
        totalElements: 0,
    }
};

export const CandidateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CANDIDATE:
            return {
                ...state,
                candidate: action.payload
            };
        case SET_CANDIDATE_DETAILS:
            return {
                ...state,
                candidateDetails: action.payload[0]
            };
        case FOLLOW_LIST: // ✅ xử lý dữ liệu theo dõi
            return {
                ...state,
                followList: {
                    businesses: action.payload.content,
                    totalElements: action.payload.totalElements
                }
            };
        default:
            return { ...state };
    }
};
