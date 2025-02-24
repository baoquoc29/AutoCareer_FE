import {toast} from "react-toastify";
import cooperationService from "../../Service/CandidateService/CooperationService";
import {
    APPROVE_COOPERATION, CANCEL_REQUEST, DETAIL_COOPERATION,
    REJECT_COOPERATION,
    SET_COOPERATION,
    SET_COOPERATION_BUSINESS,
    TOTAL_COOPERATION
} from "../types/CooperationType";
import {DISPLAY_LOADING, HIDE_LOADING, STATUS_CODE} from "../../Utils/Setting/Config";

export const get_all_cooperation_of_university_page = (page = 1, size = 7, keyword = '', statusConnected = '') => {
    return async dispatch => {
        try {
            const res = await cooperationService.get_all_cooperation_of_university(page, size, keyword, statusConnected || '');
            const {content, totalElements, pageSize, currentPage} = res.data;
            if (Array.isArray(res.data.content)) {
                if (content.length === 0) {
                    // Không có dữ liệu
                    dispatch({
                        type: SET_COOPERATION,
                        payload: {
                            content: [],       // Danh sách ngành nghề rỗng
                            totalElements: 0,  // Tổng số bản ghi là 0
                            pageSize: size,    // Giữ nguyên số bản ghi mỗi trang
                            currentPage: page, // Giữ nguyên trang hiện tại
                            keyword,
                            statusConnected,
                        },
                    });
                    console.warn("Không có dữ liệu hợp tác nào được tìm thấy.");
                } else {
                    // Có dữ liệu
                    dispatch({
                        type: SET_COOPERATION, payload: {
                            content,       // Dữ liệu ngành nghề
                            totalElements, // Tổng số bản ghi
                            pageSize,      // Số bản ghi mỗi trang
                            currentPage,   // Trang hiện tại
                            keyword,
                        },
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
}
export const approved_cooperation = (formData) => {
    return async (dispatch) => {
        dispatch({ type: DISPLAY_LOADING });
        try {
            const res = await cooperationService.approve_cooperation_of_university(formData);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: APPROVE_COOPERATION,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    }
}
export const reject_cooperation = (formData) => {
    return async (dispatch) => {
        dispatch({ type: DISPLAY_LOADING });
        try {
            const res = await cooperationService.reject_cooperation_of_university(formData);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: REJECT_COOPERATION,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    }
}
export const get_total_cooperation = (universityId) => {
    return async dispatch => {
        try {
            const res = await cooperationService.get_total_cooperation(universityId);
            dispatch({
                type: TOTAL_COOPERATION, payload: res,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export const get_all_cooperation_of_business = (page = 1, size = 7, keyword = '', statusConnected = '') => {
    return async dispatch => {
        try {
            const res = await cooperationService.get_all_cooperation_business(page, size, keyword, statusConnected || '');
            const {content, totalElements, pageSize, currentPage} = res.data;
            if (Array.isArray(res.data.content)) {
                if (content.length === 0) {
                    // Không có dữ liệu
                    dispatch({
                        type: SET_COOPERATION_BUSINESS,
                        payload: {
                            content: [],       // Danh sách ngành nghề rỗng
                            totalElements: 0,  // Tổng số bản ghi là 0
                            pageSize: size,    // Giữ nguyên số bản ghi mỗi trang
                            currentPage: page, // Giữ nguyên trang hiện tại
                            keyword,
                            statusConnected,
                        },
                    });
                    console.warn("Không có dữ liệu hợp tác nào được tìm thấy.");
                } else {
                    // Có dữ liệu
                    dispatch({
                        type: SET_COOPERATION_BUSINESS,
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
        } catch (error) {
            console.log(error);
        }
    };
}

export const cancel_request = (universityId) => {
    return async (dispatch) => {
        try {
            const res = await cooperationService.cancel_request(universityId);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: CANCEL_REQUEST,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

export const get_detail_cooperation_business = (id) => {
    return async (dispatch) => {
        try {
            const res = await cooperationService.get_detail_cooperation_business(id);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: DETAIL_COOPERATION,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

export const send_request = (universityId) => {
    return async (dispatch) => {
        try {
            const res = await cooperationService.send_request_cooperation_business(universityId);
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: CANCEL_REQUEST,
                    payload: res.data
                })
            }
            toast.success(res.data)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}
