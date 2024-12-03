import {industryService} from "../../Service/IndustryService/IndustryService";
import {GET_INDUSTRIES_DETAIL, CREATE_INDUSTRIES, SET_INDUSTRIES, SET_INDUSTRY_OPTIONS} from "../types/IndustryType";

export const get_all_industry_business = (page = 1, size = 5) => {
    return async (dispatch) => {
        try {
            const res = await industryService.get_industry_business(page, size);
            const {content, totalElements, pageSize, currentPage} = res.data;
            if (Array.isArray(res.data.content)) {
                dispatch({
                    type: SET_INDUSTRIES,
                    payload: {
                        content, // Dữ liệu ngành nghề
                        totalElements, // Tổng số bản ghi
                        pageSize, // Số bản ghi mỗi trang
                        currentPage, // Trang hiện tại
                    },
                });
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
                type: SET_INDUSTRY_OPTIONS,
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
        }
    };
};

export const delete_industry_by_id = (id) => {
    return async (dispatch) => {
        try {
            await industryService.delete_industry(id);
            // Tùy chọn: Dispatch để cập nhật lại danh sách sau khi xóa
            dispatch(get_all_industry_business());
        } catch (error) {
            console.error("Error deleting industry:", error);
        }
    };
};