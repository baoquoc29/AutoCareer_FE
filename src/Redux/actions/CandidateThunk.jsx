import {candidateService} from "../../Service/CandidateService/CandidateService";
import {
    SET_CANDIDATE,
    UPDATE_CANDIDATE,
    SET_CANDIDATE_DETAILS,
    FOLLOW_SUCCESS,
    FOLLOW_CHECK, FOLLOW_COUNT, FOLLOW_LIST
} from "../types/CandidateType";
import { STATUS_CODE} from "../../Utils/Setting/Config";
import {toast} from "react-toastify";


export const get_candidate_id = (id) => {
    return async (dispatch) => {
        try {
            const res = await candidateService.get_candidate_id(id);

            dispatch({
                type: SET_CANDIDATE,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const count_total_candidate = () => {
    return async (dispatch) => {
        try {
            const res = await candidateService.count_candidate();

            dispatch({
                type: "COUNT_CANDIDATE",
                payload: res.data
            })
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
}


export const get_candidate_details = (id) => {
    return async (dispatch) => {
        try {
            const res = await candidateService.get_candidate_details(id);
            dispatch({
                type: SET_CANDIDATE_DETAILS,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const update_candidate = (id, formData) => {
    return async (dispatch) => {
        try {
            const res = await candidateService.update_candidate_id(id, formData);
            if (res.code === STATUS_CODE.SUCCESS) {
              toast.success("Cập nhật thành công ")
                dispatch({
                    type: UPDATE_CANDIDATE,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const post_follow = (businessId,candidateId) => {
    return async (dispatch) => {
        try {
            const res = await candidateService.post_follow_business(businessId,candidateId);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: FOLLOW_SUCCESS,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export const check_follow = (businessId, candidateId) => {
    return async (dispatch) => {
        try {
            const res = await candidateService.check_follow_business(businessId, candidateId);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: FOLLOW_CHECK,
                    payload: res
                });
                return { success: true, payload: res };
            } else {
                return { success: false, payload: res }; // nên return cả khi không success
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}
export const un_follow = (businessId,candidateId) => {
    return async (dispatch) => {
        try {
            const res = await candidateService.un_follow_business(businessId,candidateId);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: FOLLOW_SUCCESS,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const count_follower = (businessId) => {
    return async (dispatch) => {
        try {
            const res = await candidateService.count_follow_business(businessId);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: FOLLOW_COUNT,
                    payload: res
                });
                return { success: true, payload: res };
            } else {
                return { success: false, payload: res }; // nên return cả khi không success
            }
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}
export const list_follow = (candidateId,keyword,page,size) => {
    return async (dispatch) => {
        try {
            const res = await candidateService.list_follow_business_by_candidate(candidateId,keyword,page,size);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: FOLLOW_LIST,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}