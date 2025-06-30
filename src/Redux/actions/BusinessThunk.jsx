import {SET_BUSINESS, SET_BUSINESS_PAGE, UPDATE_BUSINESS} from "../types/BusinessType.jsx";
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

export const get_top_business = () => {
    return async (dispatch) => {
        try {
            const res = await businessService.get_top_follow_business();
            dispatch({
                type: "TOP_5_BUSINESS",
                payload: res.data
            })
            return res.data;
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
export const get_all_result_search_business_page = (page = 1, size = 7, keyword = '') => {
    return async dispatch => {
        try {
            const res = await businessService.get_all_search_business_page(page, size, keyword);
            const {content, totalElements, pageSize, currentPage} = res.data;
            if (Array.isArray(res.data.content)) {
                if (content.length === 0) {
                    // Không có dữ liệu
                    dispatch({
                        type: SET_BUSINESS_PAGE,
                        payload: {
                            content: [],
                            totalElements: 0,
                            pageSize: size,
                            currentPage: page,
                            keyword,
                        },
                    });
                    console.warn("Không có dữ liệu tìm kiếm nào được tìm thấy.");
                } else {
                    // Có dữ liệu
                    dispatch({
                        type: SET_BUSINESS_PAGE,
                        payload: {
                            content,       // Dữ liệu ngành nghề
                            totalElements, // Tổng số bản ghi
                            pageSize,      // Số bản ghi mỗi trang
                            currentPage,   // Trang hiện tại
                            keyword,
                        },
                    });
                }
            }
        }catch (error) {
            console.log(error);
        }
    }
}
