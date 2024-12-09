import {jobService} from "../../Service/JobService/JobService";
import {GET_JOB_DETAIL, SET_JOBS, CREATE_JOB, UPDATE_JOB} from "../types/JobType";
import {toast} from "react-toastify";

export const get_all_job_of_business_paging = (page = 1, size = 5, keyword = '') => {
    return async (dispatch) => {
        try {
            const res = await jobService.get_all_job_of_business_paging(page, size, keyword);
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
            toast.error("Không thể lấy thông tin chi tiết công việc!");
        }
    };
};

export const create_job = (jobData) => {
    return async (dispatch) => {
        try {
            const res = await jobService.create_job(jobData);
            dispatch({
                type: CREATE_JOB,
                payload: res.data,
            });
            toast.success("Công việc đã được tạo thành công!");
        } catch (error) {
            console.error("Error creating job:", error);
            toast.error("Không thể tạo công việc!");
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
        } catch (error) {
            console.error("Error updating job:", error);
            toast.error("Không thể cập nhật công việc!");
        }
    };
};