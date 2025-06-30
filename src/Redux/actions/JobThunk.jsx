import {jobService} from "../../Service/JobService/JobService";
import {
    CREATE_JOB,
    GET_JOB_DETAIL,
    INACTIVE_JOB,
    JOB_PORTAL,
    GET_LIST_JOB_PORTAL,
    SET_JOBS,
    UPDATE_JOB
} from "../types/JobType";
import {toast} from "react-toastify";

export const get_all_job_of_business_paging = (page = 1, size = 7, keyword = '', statusBrowse = '', industryId = '') => {
    return async (dispatch) => {
        try {
            const res = await jobService.get_all_job_of_business_paging(page, size, keyword, statusBrowse || '', industryId || '');
            const {content, totalElements, pageSize, currentPage} = res.data;
            if (Array.isArray(res.data.content)) {
                dispatch({
                    type: SET_JOBS,
                    payload: {
                        content, // Dữ liệu công việc
                        totalElements, // Tổng số bản ghi
                        pageSize, // Số bản ghi mỗi trang
                        currentPage,
                        keyword,// Trang hiện tại
                        statusBrowse, // Trạng thái duyệt
                        industryId, //Ngành nghề
                    },
                });
            } else {
                console.error("API returned data that is not an array");
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
};

export const get_all_job_of_business_paging_portal = (page = 1, size = 5, keyword = '',businessId = '', statusBrowse = '', industryId='') => {
    return async (dispatch) => {
        try {
            const res = await jobService.get_all_job_of_business_paging_portal(page, size, keyword,businessId|| '', statusBrowse||'', industryId||'');
            const {content, totalElements, pageSize, currentPage} = res.data;
            if (Array.isArray(res.data.content)) {
                dispatch({
                    type: GET_LIST_JOB_PORTAL,
                    payload: {
                        content, // Dữ liệu công việc
                        totalElements, // Tổng số bản ghi
                        pageSize, // Số bản ghi mỗi trang
                        currentPage,
                        keyword,// Trang hiện tại
                        businessId,// Id công
                        statusBrowse, // Trạng thái duyệt
                        industryId, //Ngành nghề
                    },
                });
            } else {
                console.error("API returned data that is not an array");
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
};

export const get_job_detail = (id) => {
    return async (dispatch) => {
        try {
            const res = await jobService.get_job_by_id(id);
            dispatch({
                type: GET_JOB_DETAIL,
                payload: res.data, // Dữ liệu chi tiết ngành nghề
            });
        } catch (error) {
            console.error("Failed to fetch job details:", error);
            toast.error(error.response.data.message);
        }
    };
};
export const get_job_top = () => {
    return async (dispatch) => {
        try {
            const res = await jobService.get_job_top();
            dispatch({
                type: "GET_TOP_JOB",
                payload: res.data,
            });
            return res.data;
        } catch (error) {
            console.error("Failed to fetch job details:", error);
            toast.error(error.response.data.message);
        }
    };
};

export const create_job = (jobData) => {
    return async (dispatch) => {
        try {
            const res = await jobService.create_job(jobData); // Kiểm tra nếu API trả về undefined
            dispatch({
                type: CREATE_JOB,
                payload: res.data,
            });
            return {success: true, data: res.data};
        } catch (error) {
            console.error("Error creating job:", error);
            toast.error(error.response?.data?.message || "Đã xảy ra lỗi khi tạo công việc");
            return {success: false, error};
        }
    };
};

export const update_job = (jobId, jobData) => {
    return async (dispatch) => {
        try {
            const res = await jobService.update_job(jobId, jobData);

            dispatch({
                type: UPDATE_JOB, // Action cụ thể để cập nhật job trong store
                payload: res.data,
            });
            toast.success("Cập nhật công việc thành công!");
            return {success: true, data: res.data};
        } catch (error) {
            console.error("Error edit job:", error);
            toast.error(error.response?.data?.message);
            return {success: false, error};
        }
    };
};

export const inactive_job = (jobId) => {
    return async (dispatch) => {
        try {
            const res = await jobService.inactive_job(jobId);
            dispatch({
                type: INACTIVE_JOB,
                payload: res.data, // Chỉ cần gửi jobId để cập nhật trạng thái
            });
            dispatch(get_all_job_of_business_paging());
            toast.clearWaitingQueue();
            toast.success(res.data);
        } catch (error) {
            console.error("Error inactivating job:", error);
            toast.error(error.response.data.message);
        }
    };
};

export const get_all_job_portal= (page = 1, size = 7, keyword = '',provinceId, fromDate, toDate) => {
    return async (dispatch) => {
        try {
            const res = await jobService.get_all_job_portal(page, size, keyword, provinceId, fromDate, toDate);
            const {content, totalElements, pageSize, currentPage} = res.data;
            if (Array.isArray(res.data.content)) {
                dispatch({
                    type: JOB_PORTAL,
                    payload: {
                        content, // Dữ liệu công việc
                        totalElements, // Tổng số bản ghi
                        pageSize, // Số bản ghi mỗi trang
                        currentPage,
                        keyword,// Trang hiện tại
                    },
                });
            } else {
                console.error("API returned data that is not an array");
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    };
};