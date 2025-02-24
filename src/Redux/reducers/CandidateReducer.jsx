import {SET_CANDIDATE, SET_CANDIDATE_DETAILS} from "../types/CandidateType";

const initialState = {
    candidate: {},
    candidateDetails: {},
}
export const CandidateReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CANDIDATE:
            return {
                ...state,
                candidate: action.payload // Lưu dữ liệu vào `candidate` trong state
            };
        case SET_CANDIDATE_DETAILS:
            return {
                ...state,
                candidateDetails: action.payload[0] // Lưu dữ liệu vào `candidate` trong state
            };

        default:
            return {...state}
    }
}