import { baseService } from "../BaseService";


export class WorkShopService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    get_workshop_all = (idUniversity, page, size) => {
        return this.get(`api/work-shop/university/${idUniversity}?page=${page}&size=${size}`);
    };


    create_work_shop = (formData) => {
        return this.postFormData(`api/work-shop`, formData);
    };
    update_work_shop = (id, formData) => {
        return this.putResponse(`api/work-shop/id/${id}`, formData); // Assuming correct URL
    };
    delete_work_shop = (id) => {
        return this.delete(`api/work-shop/id/${id}`);
    };
    get_all_company_accept = (idWorkShop) => {
        return this.get(`api/work-shop/${idWorkShop}?state=APPROVED`);
    }
    get_all_company_pending = (idWorkShop) => {
        return this.get(`api/work-shop/${idWorkShop}?state=PENDING`);
    }

    accept_request_company = (formdata) => {
        return this.post(`api/work-shop/accept-request`,formdata);
    }
    reject_request_company = (formdata) => {
        return this.post(`api/work-shop/reject-request`,formdata);
    }
    get_all_provinces = () => {
        return this.get('api/administrative/get-all-provinces');
    };

    get_districts = (provinceId) => {
        return this.get(`api/administrative/get-all-districts?provinceId=${provinceId}`);
    };

    get_wards = (districtId) => {
        return this.get(`api/administrative/get-all-wards?districtId=${districtId}`);
    };


}

// Instantiate WorkShopService
export const workShopService = new WorkShopService();
