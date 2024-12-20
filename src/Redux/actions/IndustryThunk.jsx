import {industryService} from "../../Service/IndustryService/IndustryService";
import {
    GET_INDUSTRIES_DETAIL,
    SET_INDUSTRIES,
    SET_INDUSTRIES_ALL,
    SET_INDUSTRIES_NO_PAG,
    SET_INDUSTRIES_ALL_PAG,
    UPDATE_INDUSTRY_SUCCESS
} from "../types/IndustryType";
import {toast} from "react-toastify";

export const get_all_industry_business = (page = 1, size = 7, keyword = '') => {
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
            }
        } catch (error) {
            console.log(error.response.data.message);
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
            console.log(error.response.data.message);
        }
    };
};

export const get_all_industry_paging = (page = 1, size = 7, keyword = '') => {
    return async (dispatch) => {
        try {
            const res = await industryService.get_industry_all_paging(page, size, keyword);
            const {content, totalElements, pageSize, currentPage} = res.data;
            if (Array.isArray(res.data.content)) {
                if (content.length === 0) {
                    // Không có dữ liệu
                    dispatch({
                        type: SET_INDUSTRIES_ALL_PAG,
                        payload: {
                            content: [],       // Danh sách ngành nghề rỗng
                            totalElements: 0,  // Tổng số bản ghi là 0
                            pageSize: size,    // Giữ nguyên số bản ghi mỗi trang
                            currentPage: page, // Giữ nguyên trang hiện tại
                            keyword
                        },
                    });
                    console.warn("Không có dữ liệu ngành nghề nào được tìm thấy.");
                } else {
                    // Có dữ liệu
                    dispatch({
                        type: SET_INDUSTRIES_ALL_PAG,
                        payload: {
                            content,       // Dữ liệu ngành nghề
                            totalElements, // Tổng số bản ghi
                            pageSize,      // Số bản ghi mỗi trang
                            currentPage,// Trang hiện tại
                            keyword
                        },
                    });
                }
            } else {
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
};

export const get_all_industry_business_no_pag = () => {
    return async (dispatch) => {
        try {
            const res = await industryService.get_industry_business_all_no_pag();
            dispatch({
                type: SET_INDUSTRIES_NO_PAG,
                payload: res.data,
            });
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
};

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
            toast.error(error.response.data.message);
        }
    };
};

export const get_industry_detail_admin = (id) => {
    return async (dispatch) => {
        try {
            const res = await industryService.get_industry_by_id_admin(id);
            dispatch({
                type: GET_INDUSTRIES_DETAIL,
                payload: res.data, // Dữ liệu chi tiết ngành nghề
            });
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    };
};

export const delete_industry_by_id = (businessIndustryId) => {
    return async (dispatch) => {
        try {
            const res = await industryService.delete_industries(businessIndustryId);
            dispatch(get_all_industry_business());// Refresh the list after deletion
            toast.clearWaitingQueue();
            toast.success(res.data);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
};

export const inactive_industry_by_id = (id) => {
    return async (dispatch) => {
        try {
            const res = await industryService.inactive_industry(id);
            dispatch(get_all_industry_paging());// Refresh the list after deletion
            toast.clearWaitingQueue();
            toast.success(res.data)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
};

export const update_industry_by_id = (id, industryRequest) => async (dispatch) => {
    try {
        const response = await industryService.update_industry(id, industryRequest);

        // Kiểm tra nếu thông báo là "Không có thay đổi nào"
        if (response.code === 200 && response.message === "Không có thay đổi nào.") {
            toast.info(response.message);// Hiển thị thông báo "Không có thay đổi nào."
            return;
        } else {
            toast.success("Cập nhật ngành nghề thành công!"); // Thông báo thành công chung
        }

        // Dispatch action sau khi cập nhật thành công
        dispatch({
            type: UPDATE_INDUSTRY_SUCCESS,
            payload: response.data,
        });

        console.log(response.message); // In thông báo vào console

    } catch (error) {
        // Xử lý lỗi và hiển thị thông báo lỗi
        const errorMessage = error.response?.message || "Có lỗi xảy ra khi cập nhật ngành nghề.";
        toast.error(errorMessage);
    }
};

