import {CREATE_SECTION, DELETE_SECTION, SET_SECTIONS, UPDATE_SECTION_ID} from "../types/SectionType";


const initialState = {
    sections: [],
    sectionId: null
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
        default:
            return {...state}
    }
}
