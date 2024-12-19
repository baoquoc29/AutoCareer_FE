import {baseService} from "../BaseService";

export class SubAdminService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };

    create = (formData) => {
        return this.postFormData('api/sub-admin/create', formData)
    };
    delete_sub_admin = (id) => {
        return this.delete(`api/sub-admin/delete?id=${id}`)
    }
    update_sub_admin = (formData) => {
        return this.putFormData('api/sub-admin/update', formData)
    }
    get_paging_sub_admin = (page, pageSize, keyword) => {
        return this.get(`api/sub-admin/get-paging?pageNo=${page}&pageSize=${pageSize}&keyword=${keyword}`)
    }
    get_all= () => {
        return this.get(`api/sub-admin/get-all`)
    }
    get_detail_sub_admin = (id) =>{
        return this.get(`api/sub-admin/get-detail?id=${id}`)
    }
}

export const subAdminService = new SubAdminService();