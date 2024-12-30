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
    REQUEST_WORK_SHOP, TOTAL_BUSINESS, TOTAL_JOB, TOTAL_UNIVERSITY, TOTAL_WORK_SHOP

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
export const get_work_shop_feature = (param) => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_work_shop_feature(param);
            dispatch({
                type: GET_WORK_SHOP_FEATURE,
                payload: res
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_total_job = () => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_total_job();
            dispatch({
                type: TOTAL_JOB,
                payload: res
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_total_work_shop = () => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_total_work_shop();
            dispatch({
                type: TOTAL_WORK_SHOP,
                payload: res
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_total_university = () => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_university_total();
            dispatch({
                type: TOTAL_UNIVERSITY,
                payload: res
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_total_business = () => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_total_business();
            dispatch({
                type: TOTAL_BUSINESS,
                payload: res
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const get_work_shop_by_id = (id) => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_workshop_by_id(id);
            if (res?.data?.code === 400) {
                dispatch({
                    type: ERROR_PAGE,
                    payload: "Error: Workshop not found"
                });
            } else {
                dispatch({
                    type: GET_WORK_SHOP_BY_ID,
                    payload: res
                });
            }
        } catch (error) {
            console.log(error);
            dispatch({
                type: "SET_ERROR",
                payload: "An error occurred while fetching the workshop."
            });
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
export const get_all_job_by_district = (page,size) => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_job_by_district(page,size)

            dispatch({
                type: GET_ALL_JOB_LIST,
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
export const get_all_university_home_portal = () => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_list_university_home_portal()
            dispatch({
                type: GET_ALL_UNIVERSITY_HOME,
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
                payload: res.data
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
export const request_work_shop = (body) => {
    return async (dispatch) => {
        try {
            const res = await portalService.request_workshop_by_id(body);
            console.log(res);
            dispatch({
                type: REQUEST_WORK_SHOP,
                payload: res,
            })

        } catch (error) {

            console.log(error);
        }
    }
}
export const status_work_shop = (workShopId,businessId) => {
    return async (dispatch) => {
        try {
            const res = await portalService.get_status_workshop_by_id(workShopId,businessId);
            console.log(res);
            dispatch({
                type: CHECK_STATUS_REQUEST,
                payload: res,
            })

        } catch (error) {

            console.log(error);
        }
    }
}
