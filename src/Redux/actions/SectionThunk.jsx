import {sectionService} from "../../Service/SectionService";
import {CREATE_SECTION, SET_SECTIONS} from "../types/SectionType";

export const get_all_sections = () => {
    return async (dispatch) => {
        try {
            const res = await sectionService.get_section_all();
            dispatch({
                type: SET_SECTIONS,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const create_section = (formData) => {
    return async (dispatch) => {
        try {
            const res = await sectionService.create_section(formData);
            dispatch({
                type: CREATE_SECTION,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}