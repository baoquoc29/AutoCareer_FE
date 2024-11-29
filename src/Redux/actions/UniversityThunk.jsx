import {universityService} from "../../Service/UniversityService/UniversityService";
import {SET_UNIVERSITY} from "../types/UniversityType";


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