import {candidateService} from "../../Service/CandidateService/CandidateService";
import {SET_CANDIDATE, UPDATE_CANDIDATE, SET_CANDIDATE_DETAILS} from "../types/CandidateType";
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
