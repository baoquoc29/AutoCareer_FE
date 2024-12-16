import {instructionalService} from "../../Service/UniversityService/InstructionalService";
import {SET_INSTRUCTIONAL} from "../types/InstructionalType";
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
            dispatch({
                type: SET_INSTRUCTIONAL,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    }
}
export const stop_instructional = (id) => {
    return async (dispatch) => {
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
    return async (dispatch) => {
        try {
            const res = await instructionalService.set_start_instructional_by_id(id);
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Cập nhật trạng thái thành công")
            }
            console.log(res.data)
        } catch (error) {
            console.log(error);
        }
    }
}