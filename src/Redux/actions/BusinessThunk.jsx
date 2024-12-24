import { SET_BUSINESS, UPDATE_BUSINESS} from "../types/BusinessType.jsx";
import { STATUS_CODE} from "../../Utils/Setting/Config";
import {businessService} from "../../Service/BusinessService/BusinessService";
import {toast} from "react-toastify";


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
        try {
            const res = await businessService.update_business_id(id, formData);
            if (res.code === STATUS_CODE.SUCCESS) {
                console.log("Update successful", res.data);
                dispatch({
                    type: UPDATE_BUSINESS,
                    payload: res.data
                });
                dispatch(get_business_by_id(id));
                toast.success("Doanh nghiệp được cập nhật thành công!");
                return { success: true, data: res.data };
            }else if(res.code === STATUS_CODE.BAD_REQUEST){
                toast.error(res.message)
            }
        } catch (error) {
            toast.error(error.message || "Đã xảy ra lỗi khi chỉnh sửa doanh nghiệp.");
            return {success: false, error: error.message};
        }
    };
};
