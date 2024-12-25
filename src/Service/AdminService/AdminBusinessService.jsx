import {baseService} from "../BaseService";

export class AdminBusinessService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };

    get_all_businesses = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/get-all-businesses?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };

    get_pending_businesses = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/get-pending-businesses?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };
    get_approved_businesses = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/get-approved-businesses?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };
    get_rejected_businesses = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/get-rejected-businesses?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };


    approved_business = (id)=>{
        return this.post('api/admin/approved-business', id);
    }
    rejected_business = (id)=> {
        return this.post('api/admin/rejected-business', id);
    }
}

export const adminBusinessService = new AdminBusinessService();