import {portalService} from "../../Service/PortalService/PortalService";
import {
    CHECK_STATUS_REQUEST,
    ERROR_PAGE,
    GET_ALL_BUSINESS_FEATURE, GET_ALL_BUSINESS_HOME,
    GET_ALL_JOB_LIST, GET_ALL_UNIVERSITY_HOME,
    GET_TOTAL_JOB_INDUSTRY,
    GET_UNIVERSITY_TOTAL,
    GET_WORK_SHOP_BY_ID,
    GET_WORK_SHOP_FEATURE,
    TOTAL_BUSINESS, TOTAL_JOB, TOTAL_UNIVERSITY, TOTAL_WORK_SHOP

} from "../types/PortalType";

export const get_all_job = (page,size) => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_job_all(page,size)
            dispatch({
                type: GET_ALL_JOB_LIST,
                payload: res
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_all_business_feature = (industryId) => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_business_by_feature(industryId)
            console.log(industryId);
            dispatch({
                type: GET_ALL_BUSINESS_FEATURE,
                payload: res
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
                payload: res
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
                payload: res
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_total_all_job = () => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_total_job_all()

            dispatch({
                type: GET_TOTAL_JOB_INDUSTRY,
                payload: res
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
                payload: res
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_all_business_home_portal = () => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_list_business_home_portal()
            dispatch({
                type: GET_ALL_BUSINESS_HOME,
                payload: res
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
                payload: res
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_university_total = () => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_university_total();
            dispatch({
                type: GET_UNIVERSITY_TOTAL,
                payload: res,
            })

        } catch (error) {

            console.log(error);
        }
    }
}
export const get_all_job_by_experience = (page,size,level) => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_job_by_experience(page,size,level)
            dispatch({
                type: GET_ALL_JOB_LIST,
                payload: res
            })
        } catch (error) {
            console.log(error);
        }
    }
}