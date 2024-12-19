import {STATUS_CODE} from "../../Utils/Setting/Config";
import {adminBusinessService} from "../../Service/AdminService/AdminBusinessService";
import {toast} from "react-toastify";
import {
    APPROVED_BUSINESS, GET_ALL_BUSINESSES,
    GET_APPROVED_BUSINESSES,
    GET_PENDING_BUSINESSES,
    GET_REJECTED_BUSINESSES,
    REJECTED_BUSINESS,
} from "../types/AdminBusinessType";

export const approved_business = (req) => {
    return async (dispatch) => {
        try {
            const res = await adminBusinessService.approved_business(req);
            console.log(res)
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: APPROVED_BUSINESS,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export const rejected_business = (req) => {
    return async (dispatch) => {
        try {
            const res = await adminBusinessService.rejected_business(req);
            console.log(res)
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: REJECTED_BUSINESS,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export const get_all_businesses = (pageNo, pageSize, keyword) => {
    return async (dispatch) => {
        try {
            const res = await adminBusinessService.get_all_businesses(pageNo, pageSize, keyword);
            console.log(res.data.content);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_ALL_BUSINESSES,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export const get_approved_businesses = (pageNo, pageSize, keyword) => {
    return async (dispatch) => {
        try {
            const res = await adminBusinessService.get_approved_businesses(pageNo, pageSize, keyword);
            console.log(res)
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_APPROVED_BUSINESSES,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const get_pending_businesses = (pageNo, pageSize, keyword) => {
    return async (dispatch) => {
        try {
            const res = await adminBusinessService.get_pending_businesses(pageNo, pageSize, keyword);
            console.log(res)
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_PENDING_BUSINESSES,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const get_rejected_businesses = (pageNo, pageSize, keyword) => {
    return async (dispatch) => {
        try {
            const res = await adminBusinessService.get_rejected_businesses(pageNo, pageSize, keyword);
            console.log(res)
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_REJECTED_BUSINESSES,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}




