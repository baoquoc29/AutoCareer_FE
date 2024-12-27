import {universityService} from "../../Service/UniversityService/UniversityService";
import {SET_UNIVERSITY, SET_UNIVERSITY_DETAILS, UPDATE_UNIVERSITY} from "../types/UniversityType";
import { STATUS_CODE} from "../../Utils/Setting/Config";
import {toast} from "react-toastify";


export const get_university_id = (id) => {
    return async (dispatch) => {
        try {
            const res = await universityService.get_university_id(id);

            dispatch({
                type: SET_UNIVERSITY,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const get_university_details = (id) => {
    return async (dispatch) => {
        try {
            const res = await universityService.get_university_details(id);
            dispatch({
                type: SET_UNIVERSITY_DETAILS,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const update_university = (id, formData) => {
    return async (dispatch) => {
        try {
            const res = await universityService.update_university_id(id, formData);
            if (res.code === STATUS_CODE.SUCCESS) {
              toast.success("Cập nhật thành công ")
                dispatch({
                    type: UPDATE_UNIVERSITY,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

}