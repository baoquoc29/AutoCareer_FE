import {industryService} from "../../Service/IndustryService/IndustryService";
import {
    GET_INDUSTRIES_DETAIL,
    CREATE_INDUSTRIES,
    SET_INDUSTRIES,
    SET_INDUSTRIES_NO_PAG,
    SET_INDUSTRIES_ALL,
} from "../types/IndustryType";
import {toast} from "react-toastify";

export const get_all_industry_business = (page = 1, size = 5, keyword = '') => {
    return async (dispatch) => {
        try {
            const res = await industryService.get_industry_business(page, size, keyword);
            const {content, totalElements, pageSize, currentPage} = res.data;

            if (Array.isArray(res.data.content)) {
                if (content.length === 0) {
                    // Không có dữ liệu
                    dispatch({
                        type: SET_INDUSTRIES,
                        payload: {
                            content: [],       // Danh sách ngành nghề rỗng
                            totalElements: 0,  // Tổng số bản ghi là 0
                            pageSize: size,    // Giữ nguyên số bản ghi mỗi trang
                            currentPage: page, // Giữ nguyên trang hiện tại
                            keyword,
                        },
                    });
                    console.warn("Không có dữ liệu ngành nghề nào được tìm thấy.");
                } else {
                    // Có dữ liệu
                    dispatch({
                        type: SET_INDUSTRIES,
                        payload: {
                            content,       // Dữ liệu ngành nghề
                            totalElements, // Tổng số bản ghi
                            pageSize,      // Số bản ghi mỗi trang
                            currentPage,   // Trang hiện tại
                            keyword,
                        },
                    });
                }
            } else {
                console.error("API returned data that is not an array:", res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const get_all_industry = () => {
    return async (dispatch) => {
        try {
            const res = await industryService.get_industry_all();
            dispatch({
                type: SET_INDUSTRIES_ALL,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const get_all_industry_no_pag = () => {
    return async (dispatch) => {
        try {
            const res = await industryService.get_industry_all_no_pag();
            dispatch({
                type: SET_INDUSTRIES_NO_PAG,
                payload: res.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const create_industry_id = (id) => {
    return async (dispatch) => {
        try {
            const res = await industryService.create_industry(id);
            dispatch({
                type: CREATE_INDUSTRIES,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export const get_industry_detail = (id) => {
    return async (dispatch) => {
        try {
            const res = await industryService.get_industry_by_id(id);
            dispatch({
                type: GET_INDUSTRIES_DETAIL,
                payload: res.data, // Dữ liệu chi tiết ngành nghề
            });
        } catch (error) {
            console.log(error);
            toast.error("Không thể lấy thông tin chi tiết ngành nghề!");
        }
    };
};

export const delete_industry_by_id = (businessIndustryId) => {
    return async (dispatch) => {
        try {
            await industryService.delete_industries(businessIndustryId);
            dispatch(get_all_industry_business()); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting industry:", error);
            toast.error("Failed to delete industry");
        }
    };
};

