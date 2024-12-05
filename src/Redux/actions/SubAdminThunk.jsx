import {toast} from "react-toastify";
import {STATUS_CODE} from "../../Utils/Setting/Config";
import {subAdminService} from "../../Service/AdminService/SubAdminService";
import {
    ALL_SUB_ADMIN,
    CREATE_SUB_ADMIN,
    DELETE_SUB_ADMIN,
    DETAIL_SUB_ADMIN,
    PAGING_SUB_ADMIN,
    UPDATE_SUB_ADMIN
} from "../types/SubAdminType";

export const create_sub_admin = (formData) => {
    return async (dispatch) => {
        try {
            const res = await subAdminService.create(formData);
            console.log(res)
            if (res === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: CREATE_SUB_ADMIN,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const update_sub_admin = (formData) => {
    return async (dispatch) => {
        try {
            const res = await subAdminService.update_sub_admin(formData);
            console.log(res.data)
            dispatch({
                type: UPDATE_SUB_ADMIN,
                payload: res.data
            })
        } catch (error) {
            toast.error(error.data.message)
        }
    }
}
export const delete_sub_admin = (id) => {
    return async (dispatch) => {
        try {
            const res = await subAdminService.delete_sub_admin(id);
            console.log(res.data)
            dispatch({
                type: DELETE_SUB_ADMIN,
                payload: res.data
            })
        } catch (error) {
            toast.error(error.data.message)
        }
    }
}
export const get_detail_sub_admin = (id) => {
    return async (dispatch) => {
        try {
            const res = await subAdminService.get_detail_sub_admin(id);
            console.log(res.data);
            dispatch({
                type: DETAIL_SUB_ADMIN,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_all_sub_admin = () => {
    return async (dispatch) => {
        try {
            const res = await subAdminService.get_all();
            console.log(res.data)
            dispatch({
                type: ALL_SUB_ADMIN,
                payload: res.data,
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_all_paging_sub_admin = (page, pageSize) => {
    return async (dispatch) => {
        try {
            const res = await subAdminService.get_paging_sub_admin(page, pageSize);
            dispatch({
                type: PAGING_SUB_ADMIN,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

