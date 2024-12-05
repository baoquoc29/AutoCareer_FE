import {jobService} from "../../Service/JobService/JobService";
import {GET_JOB_DETAIL, SET_JOBS} from "../types/JobType";
import {toast} from "react-toastify";

export const get_all_job = (page = 1, size = 3) => {
    return async (dispatch) => {
        try {
            const res = await jobService.get_all_job(page, size);
            const {content, totalElements, pageSize, currentPage} = res.data;
            if (Array.isArray(res.data.content)) {
                dispatch({
                    type: SET_JOBS,
                    payload: {
                        content, // Dữ liệu công việc
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