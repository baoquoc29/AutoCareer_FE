import {majorService} from "../../Service/UniversityService/MajorService";
import {CREATE_MAJOR, DELETE_MAJOR_ID, SET_MAJOR, SET_MAJOR_ID} from "../types/MajorType";
import {toast} from "react-toastify";
import {STATUS_CODE} from "../../Utils/Setting/Config";

export const get_all_majors = () => {
    return async (dispatch) => {
        try {
            const res = await majorService.get_major_all();
            dispatch({
                type: SET_MAJOR,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_major_id = (id) => {
    return async (dispatch) => {
        try {
            const res = await majorService.get_major_by_id(id);
            console.log(res.data);
            dispatch({
                type: SET_MAJOR_ID,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const create_major = (formData) => {
    return async (dispatch) => {
        try {
            const res = await majorService.create_major(formData);
            console.log(res)
            if (res === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: CREATE_MAJOR,
                    payload: res.data
                })
            }
        }catch (error){
            toast.error(error.response.data.message)
        }
    }
}
export const delete_major_id = (id) => {
    return async (dispatch) => {
        try{
            const res = await majorService.delete_major(id);
            console.log(res.data)
            dispatch({
                type:DELETE_MAJOR_ID,
                payload:res.data
            })
        }catch (error){
            toast.error(error.data.message)
        }
    }
}