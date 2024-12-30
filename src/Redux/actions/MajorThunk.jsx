import {majorService} from "../../Service/UniversityService/MajorService";
import {
    COUNT_STUDENT_MAJOR,
    CREATE_MAJOR,
    SET_MAJOR,
    SET_MAJOR_ID,
    TOTAL_MAJOR,
    TOTAL_STUDENT,
    UPDATE_MAJOR_ID
} from "../types/MajorType";
import {toast} from "react-toastify";
import {STATUS_CODE} from "../../Utils/Setting/Config";


export const get_all_majors = (universityId) => {
    return async (dispatch) => {
        try {
            const res = await majorService.get_major_all(universityId);
            dispatch({
                type: SET_MAJOR,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_major_id = (id) => {
    return async (dispatch) => {
        try {
            const res = await majorService.get_major_by_id(id);
            dispatch({
                type: SET_MAJOR_ID,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const create_major = (formData) => {
    return async (dispatch) => {
        try {
            const res = await majorService.create_major(formData);

            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Thêm chuyên ngành thành công")
                dispatch({
                    type: CREATE_MAJOR,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const delete_major = (ids) => {
    return async () => {
        try {
            const res = await majorService.delete_major(ids);
            if (res.code === STATUS_CODE.SUCCESS) {
                if (res.code === STATUS_CODE.SUCCESS) {
                    toast.success("Xóa chuyên ngành thành công")
                }
            }
        } catch (error) {
            toast.error(error.data.message)
        }
    }
}
export const update_major_id = (id, formData) => {
    return async (dispatch) => {
        try {
            const res = await majorService.update_major(id, formData);
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Cập nhật chuyên ngành thành công!")
                dispatch({
                    type: UPDATE_MAJOR_ID,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }

    }
}
export const stop_major = (id) => {
    return async () => {
        try {
            const res = await majorService.set_stop_major_by_id(id);
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Cập nhật trạng thái thành công")
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const refund_major = (id) => {
    return async () => {
        try {
            const res = await majorService.set_start_major_by_id(id);
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Cập nhật trạng thái thành công")
            }
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error)
        }
    }
}
export const get_total_major = (universityId) => {
    return async (dispatch) => {
        try {
            const res = await majorService.get_total_major(universityId);
            dispatch({
                type: TOTAL_MAJOR,
                payload: res,
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_total_student = (universityId) => {
    return async (dispatch) => {
        try {
            const res = await majorService.get_total_students(universityId);
            dispatch({
                type: TOTAL_STUDENT,
                payload: res,
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const count_student_major=(universityId) => {
    return async (dispatch) => {
        try {
            const res = await majorService.get_student_major(universityId);
            dispatch({
                type: COUNT_STUDENT_MAJOR,
                payload: res,
            })
        } catch (error) {
            console.log(error);
        }
    }
}