import { workShopService } from "../../Service/UniversityService/WorkShopService";
import {
    ACCEPT_WORK_SHOP,
    CREATE_WORK_SHOP, DELETE_WORK_SHOP, GET_ALL_COMPANY, GET_ALL_COMPANY_ACCEPT, GET_ALL_COMPANY_PENDING,
    GET_ALL_DISTRICT_BY_ID,
    GET_ALL_LOCATION,
    GET_ALL_WARD_BY_ID_DISTRICT, REJECT_WORK_SHOP,
    SET_WORK_SHOP,
    UPDATE_WORK_SHOP,
} from "../types/WorkShopType";
import {CLEAR_RESPONSE} from "../../Utils/Setting/Config";

// Action to fetch all workshops for a specific university
export const get_all_workshop_by_university = (idUniversity,page,size) => {
    return async (dispatch) => {
        try {
            const res = await workShopService.get_workshop_all(idUniversity,page,size);
            if (res?.data?.workshops) {

                dispatch({
                    type: SET_WORK_SHOP,
                    payload: res.data,  // Update the state with the fetched workshops list
                });
            }
        } catch (error) {
            console.error("Error fetching workshops:", error);
            // Optionally, you can dispatch an error action or show a notification
        }
    };
};
export const get_all_workshop_by_state = (state,page,size) => {
    return async (dispatch) => {
        try {
            const res = await workShopService.get_all_workshop_by_state(state,page,size);
            if (res?.data?.workshops) {

                dispatch({
                    type: SET_WORK_SHOP,
                    payload: res.data,
                });
            }
        } catch (error) {
            console.error("Error fetching workshops:", error);
            // Optionally, you can dispatch an error action or show a notification
        }
    };
};

// Action to create a new workshop
export const create_work_shop = (formData) => {
    return async (dispatch) => {
        try {
            const res = await workShopService.create_work_shop(formData);

            dispatch({
                type: CREATE_WORK_SHOP,
                payload: res,
            });
        } catch (error) {
            // Kiểm tra và in lỗi chi tiết
            if (error.response) {
                // Lỗi từ server trả về (ví dụ: 400 hoặc 500)
                console.error("Error response:", JSON.stringify(error.response, null, 2));
            } else if (error.request) {
                // Lỗi khi không nhận được phản hồi từ server
                console.error("Error request:", error.request);
            } else {
                // Các lỗi khác (ví dụ: lỗi cấu hình hoặc lỗi trong mã)
                console.error("Error message:", error.message);
            }
        }
    };
};
export const delete_work_shop = (id) => {
    return async (dispatch) => {
        const res = await  workShopService.delete_work_shop(id);
        dispatch({
            type: DELETE_WORK_SHOP,
            payload: res.data,
        })
    }
}
export const update_work_shop = (id, formData) => {
    return async (dispatch) => {
        try {
            const res = await workShopService.update_work_shop(id,formData);

            dispatch({
                type: UPDATE_WORK_SHOP,
                payload: res,
            });
        } catch (error) {
            console.log(error);
        }
    };
};
export const get_all_company_pending = (idWorkShop) => {
    return async (dispatch) => {
        try {
            const res = await workShopService.get_all_company_pending(idWorkShop);

            dispatch({
                type: GET_ALL_COMPANY_PENDING,
                payload: res.data,
            });
        } catch (error) {
            console.log(error.response.data.message);
            if (error.response && error.response.status === 400) {
                dispatch({
                    type: GET_ALL_COMPANY_PENDING,
                    payload: { businessList: [] },
                });
            }
        }
    };
};

export const get_all_company_accept = (idWorkShop) => {
    return async (dispatch) => {
        try{
            const res = await  workShopService.get_all_company_accept(idWorkShop);
            dispatch({
                type: GET_ALL_COMPANY_ACCEPT,
                payload: res.data,
            });
        }catch(error){
            if (error.response) {
                console.error("Error getting all_company_pending:", error.response, error);
            }else if (error.request) {
                // Lỗi khi không nhận được phản hồi từ server
                console.error("Error request:", error.request);
            } else {
                // Các lỗi khác (ví dụ: lỗi cấu hình hoặc lỗi trong mã)
                console.error("Error message:", error.message);
            }
        }
    }
}
export const accept_company_work_shop = (formData) => {
    return async (dispatch) => {
        const res = await  workShopService.accept_request_company(formData);
        dispatch({
            type: ACCEPT_WORK_SHOP,
            payload: res.data,
        })
    }
}
export const reject_company_work_shop = (formData) => {
    return async (dispatch) => {
        const res = await  workShopService.reject_request_company(formData);
        dispatch({
            type: REJECT_WORK_SHOP,
            payload: res.data,
        })
    }
}
// Action to fetch all provinces
export const get_all_provinces = () => {
    return async (dispatch) => {
        try {
            const res = await workShopService.get_all_provinces();
            if (res?.data) {
                dispatch({
                    type: GET_ALL_LOCATION,  // Action type to store the provinces
                    payload: res.data,
                });
            }
        } catch (error) {
            console.error("Error fetching provinces:", error);
        }
    };
};

// Action to fetch all districts by province ID
export const get_all_district = (provinceId) => {
    return async (dispatch) => {
        try {
            const res = await workShopService.get_districts(provinceId);
            if (res?.data) {
                dispatch({
                    type: GET_ALL_DISTRICT_BY_ID,  // Action type to store the districts
                    payload: res.data,
                });
            }
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    };
};

// Action to fetch all wards by district ID
export const get_all_ward = (districtId) => {
    return async (dispatch) => {
        try {
            const res = await workShopService.get_wards(districtId);
            if (res?.data) {
                dispatch({
                    type: GET_ALL_WARD_BY_ID_DISTRICT,  // Action type to store the wards
                    payload: res.data,
                });
            }
        } catch (error) {
            console.error("Error fetching wards:", error);
        }
    };
};
export const clearResponseWorkshop = () => {
    return { type: CLEAR_RESPONSE };
};