import {STATUS_CODE} from "../../Utils/Setting/Config";
import {adminBusinessService} from "../../Service/AdminService/AdminBusinessService";
import {toast} from "react-toastify";
import {
    APPROVED_BUSINESS, GET_ALL_BUSINESSES,
    GET_APPROVED_BUSINESSES, GET_DATE_TOTAL,
    GET_PENDING_BUSINESSES,
    GET_REJECTED_BUSINESSES, GET_TOTAL,
    REJECTED_BUSINESS,
} from "../types/AdminBusinessType";

export const approved_business = (req) => {
    return async (dispatch) => {
        try {
            const res = await adminBusinessService.approved_business(req);
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Phê duyệt thành công");
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
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Từ chối thành công")
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
export const get_statistic_admin = () => {
    return async (dispatch) => {
        try {
            const res = await adminBusinessService.get_total();
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_TOTAL,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const get_date_total_admin = (startDate, endDate) => {
    return async (dispatch)=>{
        try {
            const res = await adminBusinessService.get_date_total(startDate, endDate);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_DATE_TOTAL,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}




