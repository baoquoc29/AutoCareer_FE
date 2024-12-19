import {baseService} from "../BaseService";

export class AdminJobService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };
    get_all_jobs = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/all-jobs?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };
    get_pending_jobs = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/pending-jobs?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };
    get_approved_jobs = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/approved-jobs?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };
    get_rejected_jobs = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/rejected-jobs?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };

    approved_job = (id)=>{
        return this.post('api/admin/approved-job', id);
    }
    rejected_job = (id)=>{
        return this.post('api/admin/rejected-job', id);
    }

}

export const adminJobService = new AdminJobService();