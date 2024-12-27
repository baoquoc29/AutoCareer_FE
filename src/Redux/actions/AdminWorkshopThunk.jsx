import {STATUS_CODE} from "../../Utils/Setting/Config";
import {toast} from "react-toastify";
import {
    APPROVED_WORKSHOP, GET_ALL_WORKSHOPS,
    GET_APPROVED_WORKSHOPS, GET_DETAIL_WORKSHOP,
    GET_PENDING_WORKSHOPS,
    GET_REJECTED_WORKSHOPS,
    REJECTED_WORKSHOP,
} from "../types/AdminWorkshopType";
import {adminWorkshopService} from "../../Service/AdminService/AdminWorkshopService";


export const approved_workshop = (id) => {
    return async (dispatch) => {
        try {
            const res = await adminWorkshopService.approved_workshop(id);
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Phê duyệt thành công");
                dispatch({
                    type: APPROVED_WORKSHOP,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export const rejected_workshop = (id) => {
    return async (dispatch) => {
        try {
            const res = await adminWorkshopService.rejected_workshop(id);
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Từ chối thành công");
                dispatch({
                    type: REJECTED_WORKSHOP,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const get_all_workshops = (pageNo, pageSize, keyword) => {
    return async (dispatch) => {
        try {
            const res = await adminWorkshopService.get_all_workshops(pageNo, pageSize, keyword);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_ALL_WORKSHOPS,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const get_approved_workshops = (pageNo, pageSize, keyword) => {
    return async (dispatch) => {
        try {
            const res = await adminWorkshopService.get_approved_workshops(pageNo, pageSize, keyword);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_APPROVED_WORKSHOPS,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const get_pending_workshops = (pageNo, pageSize, keyword) => {
    return async (dispatch) => {
        try {
            const res = await adminWorkshopService.get_pending_workshops(pageNo, pageSize, keyword);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_PENDING_WORKSHOPS,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const get_rejected_workshops = (pageNo, pageSize, keyword) => {
    return async (dispatch) => {
        try {
            const res = await adminWorkshopService.get_rejected_workshops(pageNo, pageSize, keyword);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_REJECTED_WORKSHOPS,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export const get_detail_workshop = (id) => {
    return async (dispatch) => {
        try {
            const res = await adminWorkshopService.get_detail_workshop(id);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_DETAIL_WORKSHOP,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}




