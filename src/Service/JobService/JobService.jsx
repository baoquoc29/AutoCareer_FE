import {baseService} from "../BaseService";

export class JobService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    get_all_job = (page, size) => {
        return this.get(`api/job/get-all-job?page=${page}&size=${size}`);
    };
    get_job_by_id = (id) => {
        return this.get(`api/job/get-detail?id=${id}`);
    };
}

export const jobService = new JobService();
