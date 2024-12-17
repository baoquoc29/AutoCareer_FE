import {portalService} from "../../Service/PortalService/PortalService";
import {
    GET_ALL_JOB_LIST

} from "../types/PortalType";

export const get_all_job = (page,size) => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_job_all(page,size)
            console.log(res.data);
            dispatch({

                type: GET_ALL_JOB_LIST,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_all_job_by_region = (page,size,regionId) => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_job_by_region(page,size,regionId)
            dispatch({
                type: GET_ALL_JOB_LIST,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_all_job_by_province = (page,size,provinceId) => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_job_by_province(page,size,provinceId)
            dispatch({
                type: GET_ALL_JOB_LIST,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_all_job_by_district = (page,size) => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_job_by_district(page,size)

            dispatch({
                type: GET_ALL_JOB_LIST,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_all_job_by_industry = (page,size,industryId) => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_job_by_industry(page,size,industryId)
            dispatch({
                type: GET_ALL_JOB_LIST,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_all_job_by_salary = (page,size,minSalary,maxSalary) => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_job_by_salary(page,size,minSalary,maxSalary)
            dispatch({
                type: GET_ALL_JOB_LIST,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}