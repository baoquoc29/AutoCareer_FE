import {
    COUNT_STUDENT_MAJOR,
    CREATE_MAJOR,
    DELETE_MAJOR_ID,
    SET_MAJOR,
    SET_MAJOR_ID,
    TOTAL_MAJOR,
    TOTAL_STUDENT,
    UPDATE_MAJOR_ID
} from "../types/MajorType";


const initialState = {
    majors: [],
    majorId: null,
    totalMajor: 0,
    totalStudent: 0,
    countStudentMajor: {}
}

export const MajorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MAJOR:
            state.majors = action.payload;
            return {...state};
        case SET_MAJOR_ID:
            state.majorId = action.payload;
            return {...state,};
        case CREATE_MAJOR:
            return {
                ...state
            }
        case DELETE_MAJOR_ID:
            return {
                ...state,
                majorsId: action.payload
            }
        case UPDATE_MAJOR_ID:
            return {
                ...state,
                majorId: action.payload
            }
        case TOTAL_MAJOR :
            return {
                ...state,
                totalMajor: action.payload,
            }
        case TOTAL_STUDENT:
            return {
                ...state,
                totalStudent: action.payload,
            };
        case COUNT_STUDENT_MAJOR:
            state.countStudentMajor = action.payload;
            return {...state};
        default:
            return {...state}
    }
}