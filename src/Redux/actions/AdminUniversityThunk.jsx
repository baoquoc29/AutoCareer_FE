import {STATUS_CODE} from "../../Utils/Setting/Config";
import {
    APPROVED_UNIVERSITY,
    GET_ALL_UNIVERSITIES,
    GET_APPROVED_UNIVERSITIES,
    GET_PENDING_UNIVERSITIES,
    GET_REJECTED_UNIVERSITIES, REJECTED_UNIVERSITY,
} from "../types/AdminUniversityType";
import {toast} from "react-toastify";
import {adminUniversityService} from "../../Service/AdminService/AdminUniversityService";

export const approved_university = (id) => {
    return async (dispatch) => {
        try {
            const res = await adminUniversityService.approved_university(id);
            console.log(res)
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: APPROVED_UNIVERSITY,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export const rejected_university = (req) => {
    return async (dispatch) => {
        try {
            const res = await adminUniversityService.rejected_university(req);
            console.log(res)
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: REJECTED_UNIVERSITY,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const get_all_universities = (pageNo, pageSize, keyword) => {
    return async (dispatch) => {
        try {
            const res = await adminUniversityService.get_all_universities(pageNo, pageSize, keyword);
            console.log(res)
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_ALL_UNIVERSITIES,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export const get_approved_universities = (pageNo, pageSize, keyword) => {
    return async (dispatch) => {
        try {
            const res = await adminUniversityService.get_approved_universities(pageNo, pageSize, keyword);
            console.log(res)
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_APPROVED_UNIVERSITIES,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export const get_pending_universities = (pageNo, pageSize, keyword) => {
    return async (dispatch) => {
        try {
            const res = await adminUniversityService.get_pending_universities(pageNo, pageSize, keyword);
            console.log(res)
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_PENDING_UNIVERSITIES,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const get_rejected_universities = (pageNo, pageSize, keyword) => {
    return async (dispatch) => {
        try {
            const res = await adminUniversityService.get_rejected_universities(pageNo, pageSize, keyword);
            console.log(res)
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_REJECTED_UNIVERSITIES,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}