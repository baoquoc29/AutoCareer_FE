import {sectionService} from "../../Service/UniversityService/SectionService";
import {CREATE_SECTION, DELETE_SECTION, SET_SECTIONS, UPDATE_SECTION, UPDATE_SECTION_ID} from "../types/SectionType";
import {STATUS_CODE} from "../../Utils/Setting/Config";
import {toast} from "react-toastify";

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
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Thêm khoa thành công")
                dispatch({
                    type: CREATE_SECTION,
                    payload: res.data
                })
                dispatch(get_all_sections());
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const delete_section = (id) => {
    return async (dispatch) => {
        try {
            const res = await sectionService.delete_section(id);
            console.log(res.data)
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: DELETE_SECTION,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const update_section = (id, formData) => {
    return async (dispatch) => {
        try {
            const res = await sectionService.update_section(id, formData);
            console.log('data',res.data)
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: UPDATE_SECTION_ID,
                    payload: res.data
                })
                dispatch(get_all_sections());
            }
        } catch (error) {
            toast.error(error)
        }
    }
}