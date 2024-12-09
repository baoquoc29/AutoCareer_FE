import {SET_BUSINESS, UPDATE_BUSINESS} from "../types/BusinessType.jsx";
import {DISPLAY_LOADING, HIDE_LOADING, STATUS_CODE} from "../../Utils/Setting/Config";
import {businessService} from "../../Service/BusinessService/BusinessService";


export const get_business_by_id = (id) => {
    return async (dispatch) => {
        try {
            const res = await businessService.get_business_by_id(id);
            dispatch({
                type: SET_BUSINESS,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const update_business = (id, formData) => {
    return async (dispatch) => {
        dispatch({type: DISPLAY_LOADING})
        await new Promise(resolve => setTimeout(resolve, 1000));
        try {
            const res = await businessService.update_university_id(id, formData);
            if (res.code === STATUS_CODE.SUCCESS) {
                console.log("Update successful", res.data); // Thêm log
                dispatch({
                    type: UPDATE_BUSINESS,
                    payload: res.data
                })
            }
        } catch (error) {
            console.log("Update successful", error); // Thêm log
        }
        dispatch({type: HIDE_LOADING})
    }

}