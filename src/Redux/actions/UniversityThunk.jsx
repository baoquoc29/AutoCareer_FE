import {universityService} from "../../Service/UniversityService/UniversityService";
import {SET_UNIVERSITY, UPDATE_UNIVERSITY} from "../types/UniversityType";
import {DISPLAY_LOADING, HIDE_LOADING, STATUS_CODE} from "../../Utils/Setting/Config";


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
export const update_university = (id, formData) => {
    return async (dispatch) => {
        dispatch({type: DISPLAY_LOADING})
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const res = await universityService.update_university_id(id, formData);
            if (res.code === STATUS_CODE.SUCCESS) {
                console.log("Update successful", res.data); // Thêm log
                dispatch({
                    type: UPDATE_UNIVERSITY,
                    payload: res.data
                })
            }
        } catch (error) {
            console.log("Update successful", error); // Thêm log
        }
        dispatch({type: HIDE_LOADING})
    }

}