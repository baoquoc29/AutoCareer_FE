import {sectionService} from "../../Service/UniversityService/SectionService";
import {
    COUNT_SECTION_MAJOR,
    CREATE_SECTION,
    DELETE_SECTION,
    SET_SECTIONS,
    TOTAL_SECTION,
    UPDATE_SECTION_ID
} from "../types/SectionType";
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
export const delete_section = (selectedIds) => {
    return async () => {
        try {
            const res = await sectionService.delete_section(selectedIds);
            console.log(res.data)
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Xóa khoa thành công")
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
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Cập nhật thành công")
                dispatch({
                    type: UPDATE_SECTION_ID,
                    payload: res.data
                })
                dispatch(get_all_sections());
            }
        } catch (error) {
            toast.error(error.response.data.message)
            throw error;
        }
    }
}
export const stop_section = (id) => {
    return async () => {
        try {
            const res = await sectionService.set_stop_section_by_id(id);
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Cập nhật trạng thái thành công")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const refund_section = (id) => {
    return async () => {
        try {
            const res = await sectionService.set_start_section_by_id(id);
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Cập nhật trạng thái thành công")
            }
            console.log(res.data)
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_total_section = () => {
    return async (dispatch) => {
        try {
            const res = await sectionService.get_total_section();
            dispatch({
                type: TOTAL_SECTION,
                payload: res
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_count_major_by_section = () => {
    return async (dispatch) => {
        try {
            const res = await sectionService.get_major_section();
            dispatch({
                type: COUNT_SECTION_MAJOR,
                payload: res
            })
        } catch (error) {
            console.log(error);
        }
    }
}