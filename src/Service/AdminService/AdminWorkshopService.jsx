import {baseService} from "../BaseService";

export class AdminWorkshopService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };

    get_all_workshops = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/get-all-workshops?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };
    get_pending_workshops = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/get-pending-workshops?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };
    get_approved_workshops = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/get-approved-workshops?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };
    get_rejected_workshops = (pageNo, pageSize, keyword) => {
        return this.get(`api/admin/get-rejected-workshops?pageNo=${pageNo}&pageSize=${pageSize}&keyword=${keyword}`);
    };

    get_detail_workshop = (id) => {
        return this.get(`api/admin/detail-workshop?id=${id}`);
    }

    approved_workshop = (id)=>{
        return this.post('api/admin/approved-workshop', id);
    }
    rejected_workshop = (id)=>{
        return this.post('api/admin/rejected-workshop', id);
    }
}

export const adminWorkshopService = new AdminWorkshopService();