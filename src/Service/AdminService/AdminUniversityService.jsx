import {baseService} from "../BaseService";

export class AdminUniversityService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };

    get_all_universities = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/all-universities?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };

    get_pending_universities = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/pending-universities?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };
    get_approved_universities = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/approved-universities?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };
    get_rejected_universities = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/rejected-universities?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };

    approved_university = (id)=>{
        return this.post('api/admin/approved-university', id);
    }
    rejected_university = (id)=>{
        return this.post('api/admin/rejected-university', id);
    }

}

export const adminUniversityService = new AdminUniversityService();