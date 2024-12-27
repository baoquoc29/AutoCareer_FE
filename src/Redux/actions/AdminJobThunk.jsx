import {STATUS_CODE} from "../../Utils/Setting/Config";
import {toast} from "react-toastify";
import {
    APPROVED_JOB,
    GET_APPROVED_JOBS,
    GET_PENDING_JOBS,
    GET_REJECTED_JOBS,
    REJECTED_JOB,
} from "../types/AdminJobType";
import {adminJobService} from "../../Service/AdminService/AdminJobService.jsx";

export const approved_job = (id) => {
    return async (dispatch) => {
        try {
            const res = await adminJobService.approved_job(id);
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Phê duyệt thành công");
                dispatch({
                    type: APPROVED_JOB,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export const rejected_job = (id) => {
    return async (dispatch) => {
        try {
            const res = await adminJobService.rejected_job(id);
            if (res.code === STATUS_CODE.SUCCESS) {
                toast.success("Từ chối thành công");
                dispatch({
                    type: REJECTED_JOB,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export const get_all_jobs = (pageNo, pageSize, keyword) => {
    return async (dispatch) => {
        try {
            const res = await adminJobService.get_all_jobs(pageNo, pageSize, keyword);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_APPROVED_JOBS,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const get_approved_jobs = (pageNo, pageSize, keyword) => {
    return async (dispatch) => {
        try {
            const res = await adminJobService.get_approved_jobs(pageNo, pageSize, keyword);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_APPROVED_JOBS,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const get_pending_jobs = (pageNo, pageSize, keyword) => {
    return async (dispatch) => {
        try {
            const res = await adminJobService.get_pending_jobs(pageNo, pageSize, keyword);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_PENDING_JOBS,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const get_rejected_jobs = (pageNo, pageSize, keyword) => {
    return async (dispatch) => {
        try {
            const res = await adminJobService.get_rejected_jobs(pageNo, pageSize, keyword);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: GET_REJECTED_JOBS,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}




