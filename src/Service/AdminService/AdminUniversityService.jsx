import {baseService} from "../BaseService";

export class AdminUniversityService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };

    get_all_universities = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/get-all-universities?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };

    get_pending_universities = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/get-pending-universities?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };
    get_approved_universities = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/get-approved-universities?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };
    get_rejected_universities = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/get-rejected-universities?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };

    get_detail_university = (id)=>{
        return this.get(`api/admin/get-detail-university?id=${id}`);
    }

    approved_university = (req)=>{
        return this.post('api/admin/approved-university', req);
    }
    rejected_university = (req)=>{
        return this.post('api/admin/rejected-university', req);
    }

}

export const adminUniversityService = new AdminUniversityService();