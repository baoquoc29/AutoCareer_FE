import {baseService} from "../BaseService";

export class JobService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    get_all_job_of_business_paging = (page, size, keyword = '') => {
        return this.get(`api/job/get-all-job-of-business-paging?page=${page}&size=${size}&keyword=${keyword}`);
    };
    get_job_by_id = (id) => {
        return this.get(`api/job/get-detail?id=${id}`);
    };
    create_job = (jobData) => {
        return this.post("api/job/create-job", jobData);
    };
    update_job = (jobId, jobData) => {
        return this.put(`api/job/update-job?jobId=${jobId}`, jobData);
    };
}

export const jobService = new JobService();
