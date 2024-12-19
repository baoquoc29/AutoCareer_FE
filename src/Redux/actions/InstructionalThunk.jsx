import {instructionalService} from "../../Service/UniversityService/InstructionalService";
import {SET_INSTRUCTIONAL, UPDATE_INSTRUCTIONAL} from "../types/InstructionalType";
import {STATUS_CODE} from "../../Utils/Setting/Config";
import {toast} from "react-toastify";

export const get_all_instructional = (page, size) => {
    return async (dispatch) => {
        try {
            const res = await instructionalService.get_all_instructional(page, size);
            const {content, totalElements, pageSize, currentPage} = res.data
            dispatch({
                type: SET_INSTRUCTIONAL,
                payload: {
                    content,
                    totalElements,
                    pageSize,
                    currentPage,
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const create_instructional = (formData) => {
    return async (dispatch) => {
        try {
            const res = await instructionalService.create_instructional(formData);
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Thêm giáo vụ thành công")
                dispatch({
                    type: SET_INSTRUCTIONAL,
                    payload: res.data
                })
            }

        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}
export const delete_instructional = (selectedIds) => {
    return async () => {
        try {
            const res = await instructionalService.delete_instructional(selectedIds);
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Xóa giáo vụ thành công")
            }
            console.log(res.data)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}
export const stop_instructional = (id) => {
    return async () => {
        try {
            const res = await instructionalService.set_stop_instructional_by_id(id);
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Cập nhật trạng thái thành công")
            }
            console.log(res.data)
        } catch (error) {
            console.log(error);
        }
    }
}
export const refund_instructional = (id) => {
    return async () => {
        try {
            const res = await instructionalService.set_start_instructional_by_id(id);
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Cập nhật trạng thái thành công")
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export const update_ins = (id, formData) => {
    return async (dispatch) => {
        try {
            const res = await instructionalService.update_instructional(id, formData);
            console.log(res)
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Cập nhật giáo vụ thành công!")
                dispatch({
                    type: UPDATE_INSTRUCTIONAL,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}
export const get_all_active_ins = (page, size) => {
    return async (dispatch) => {
        try {
            const res = await instructionalService.get_all_active_instructional(page, size);
            if(res.code === STATUS_CODE.SUCCESS){
                const {content, totalElements, pageSize, currentPage} = res.data
                dispatch({
                    type: SET_INSTRUCTIONAL,
                    payload: {
                        content,
                        totalElements,
                        pageSize,
                        currentPage,
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_all_stop_ins = (page, size) => {
    return async (dispatch) => {
        try {
            const res = await instructionalService.get_all_inactive_instructional(page, size);
            const {content, totalElements, pageSize, currentPage} = res.data
            dispatch({
                type: SET_INSTRUCTIONAL,
                payload: {
                    content,
                    totalElements,
                    pageSize,
                    currentPage,
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}