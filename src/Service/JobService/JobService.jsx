import {baseService} from "../BaseService";

export class JobService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    get_all_job_of_business_paging = (page, size, keyword = '', statusBrowse = null, industryId = null) => {
        return this.get(
            `api/job/get-all-job-of-business-paging?page=${page}&size=${size}&keyword=${keyword}`
            + (statusBrowse ? `&statusBrowse=${statusBrowse}` : '')
            + (industryId ? `&industryId=${industryId}` : '')
        );
    };
    get_all_job_portal = (page, size, keyword = '') => {
        return this.get(
            `api/job/get-all-job?page=${page}&size=${size}&keyword=${keyword}`
        );
    };

    get_all_job_of_business_paging_portal = (page, size, keyword = '',businessId = null, statusBrowse = null, industryId = null) => {
        return this.get(
            `api/job/get-all-job-of-business-paging-portal?page=${page}&size=${size}&keyword=${keyword}`
            + (businessId ? `&businessId=${businessId}` : '')
            + (statusBrowse ? `&statusBrowse=${statusBrowse}` : '')
            + (industryId ? `&industryId=${industryId}` : '')
        );
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
    inactive_job = (jobId) => {
        return this.put(`api/job/inactive-job?jobId=${jobId}`);
    };
}

export const jobService = new JobService();
