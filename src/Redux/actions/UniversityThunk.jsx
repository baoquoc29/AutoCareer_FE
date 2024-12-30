import {universityService} from "../../Service/UniversityService/UniversityService";
import {SET_UNIVERSITY, SET_UNIVERSITY_DETAILS, SET_UNIVERSITY_PAGE, UPDATE_UNIVERSITY} from "../types/UniversityType";
import { STATUS_CODE} from "../../Utils/Setting/Config";
import {toast} from "react-toastify";
import {businessService} from "../../Service/BusinessService/BusinessService";
import {SET_BUSINESS_PAGE} from "../types/BusinessType";


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

export const get_university_details = (id) => {
    return async (dispatch) => {
        try {
            const res = await universityService.get_university_details(id);
            dispatch({
                type: SET_UNIVERSITY_DETAILS,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const update_university = (id, formData) => {
    return async (dispatch) => {
        try {
            const res = await universityService.update_university_id(id, formData);
            if (res.code === STATUS_CODE.SUCCESS) {
              toast.success("Cập nhật thành công ")
                dispatch({
                    type: UPDATE_UNIVERSITY,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const get_all_result_search_university_page = (page = 1, size = 7, keyword = '') => {
    return async dispatch => {
        try {
            const res = await universityService.get_all_search_university_page(page, size, keyword);
            const {content, totalElements, pageSize, currentPage} = res.data;
            if (Array.isArray(res.data.content)) {
                if (content.length === 0) {
                    // Không có dữ liệu
                    dispatch({
                        type: SET_UNIVERSITY_PAGE,
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
                        type: SET_UNIVERSITY_PAGE,
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
