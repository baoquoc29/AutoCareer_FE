import {matchingJobService} from "../../Service/CandidateService/MatchingJobService";
import {
    APPLY_JOB, GET_ALL_JOBS, GET_ALL_JOBS_APPLY, GET_CANDIDATES, STATUS_JOB
} from "../types/MatchingType";


export const get_all_job_apply = (param) => {
    return async (dispatch) => {
        try {
            const res = await matchingJobService.listJobsByCandidateId(param);
            dispatch({
                type: GET_ALL_JOBS_APPLY,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const listJobsApplyByBusinessId = (param) => {
    return async (dispatch) => {
        try {
            const res = await matchingJobService.listJobsApplyByBusinessId(param);
            dispatch({
                type: GET_ALL_JOBS_APPLY,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const listJobsByBusiness = (param) => {
    return async (dispatch) => {
        try {
            const res = await matchingJobService.listJobsByBusiness(param);
            dispatch({
                type: GET_ALL_JOBS,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const listCandidateMatch = (param) => {
    return async (dispatch) => {
        try {
            const res = await matchingJobService.candidateList(param);
            dispatch({
                type: GET_CANDIDATES,
                payload: res
            })
        } catch (error) {
            console.log(error);
        }
    }
}


export const apply_job = (candidateId, jobId, type) => {
    return async (dispatch) => {
        try {
            const res = await matchingJobService.applyJob(candidateId, jobId, type);

            if (res.code === 200 || res.code === 201) {
                dispatch({
                    type: APPLY_JOB,
                    payload: res.data
                });
                return res.data; // Trả về dữ liệu để xử lý tiếp
            } else {
                throw new Error(res.data?.message || "Ứng tuyển không thành công!");
            }
        } catch (error) {
            console.error("Lỗi ứng tuyển:", error);
            throw error; // Ném lỗi để xử lý bên ngoài
        }
    };
};

export const save_job = (candidateId, jobId, type) => {
    return async (dispatch) => {
        try {
            const res = await matchingJobService.saveJob(candidateId, jobId, type);

            if (res.code === 200 || res.code === 201) {
                dispatch({
                    type: APPLY_JOB,
                    payload: res.data
                });
                return res.data; // Trả về dữ liệu để xử lý tiếp
            } else {
                throw new Error(res.data?.message || "Ứng tuyển không thành công!");
            }
        } catch (error) {
            console.error("Lỗi ứng tuyển:", error);
            throw error; // Ném lỗi để xử lý bên ngoài
        }
    };
};

export const status_job = (candidateId, jobId, type) => {
    return async (dispatch) => {
        try {
            const res = await matchingJobService.statusJob(candidateId, jobId, type);
            console.log(res);
            if (res && (res.code === 200 || res.code === 201)) {
                dispatch({
                    type: STATUS_JOB,
                    payload: res
                });
                return { success: true, payload: res };
            } else {
                return { success: false, error: res?.message || "Ứng tuyển không thành công!" };
            }
        } catch (error) {
            console.error("Lỗi ứng tuyển:", error);
            return { success: false, error: error.message };
        }
    };
};
export const status_job_apply = (candidateId, jobId, type) => {
    return async (dispatch) => {
        try {
            const res = await matchingJobService.statusJobApply(candidateId, jobId, type);
            console.log(res);
            if (res && (res.code === 200 || res.code === 201)) {
                dispatch({
                    type: STATUS_JOB,
                    payload: res
                });
                return { success: true, payload: res };
            } else {
                return { success: false, error: res?.message || "Ứng tuyển không thành công!" };
            }
        } catch (error) {
            console.error("Lỗi ứng tuyển:", error);
            return { success: false, error: error.message };
        }
    };
};

export const set_status_job = (candidateId, jobId, type) => {
    return async (dispatch) => {
        try {
            const res = await matchingJobService.setStatusJob(candidateId, jobId, type);
            console.log(res);
            if (res && (res.code === 200 || res.code === 201)) {
                dispatch({
                    type: STATUS_JOB,
                    payload: res
                });
                return { success: true, payload: res };
            } else {
                return { success: false, error: res?.message || "Ứng tuyển không thành công!" };
            }
        } catch (error) {
            console.error("Lỗi ứng tuyển:", error);
            return { success: false, error: error.message };
        }
    };
};