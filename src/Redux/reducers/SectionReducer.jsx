import {
    COUNT_SECTION_MAJOR,
    CREATE_SECTION,
    DELETE_SECTION,
    SET_SECTIONS,
    TOTAL_SECTION,
    UPDATE_SECTION_ID
} from "../types/SectionType";


const initialState = {
    sections: [],
    sectionId: null,
    totalSections: 0,
    countMajor: {},
}

export const SectionReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_SECTIONS:
            return {
                ...state,
                sections: action.payload // Lưu dữ liệu vào `sections` trong state
            };
        case CREATE_SECTION:
            return {
                ...state
            }
        case UPDATE_SECTION_ID:
            state.sectionId = action.payload;
            return {...state}
        case DELETE_SECTION:
            return {
                ...state
            }
        case TOTAL_SECTION:
            return {
                ...state,
                totalSections: action.payload, // Lưu dữ liệu vào `totalSections` trong state
            };
        case COUNT_SECTION_MAJOR:
            return {
                ...state,
                countMajor: action.payload,
            };
        default:
            return {...state}
    }
}
