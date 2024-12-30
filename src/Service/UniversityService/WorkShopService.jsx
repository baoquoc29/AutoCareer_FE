import { baseService } from "../BaseService";


export class WorkShopService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    get_workshop_all = (idUniversity, page, size) => {
        return this.get(`api/work-shop/university/${idUniversity}?page=${page}&size=${size}`);
    };
    get_workshop_all_by_business = (businessId,param) => {
        const queryParams = new URLSearchParams(param).toString();
        return this.get(`api/work-shop/business/${businessId}?${queryParams}`);
    };

    create_work_shop = (formData) => {
        return this.postFormData(`api/work-shop`, formData);
    };
    update_work_shop = (id, formData) => {
        return this.putResponse(`api/work-shop/id/${id}`, formData); // Assuming correct URL
    };
    delete_work_shop = (id, content) => {
        return this.put(`api/work-shop/idRemove/${id}`, content);
    };
    get_all_company_accept = (idWorkShop) => {
        return this.get(`api/work-shop/${idWorkShop}?state=APPROVED`);
    }
    get_all_company_pending = (idWorkShop) => {
        return this.get(`api/work-shop/${idWorkShop}?state=PENDING`);
    }
    get_all_workshop_by_state = (page,size,state) =>{
        return this.get(`api/work-shop/state/${state}`);
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
    get_total_workshop=(universityId)=>{
        return this.get(`api/work-shop/count-total/${universityId}`)
    }
    get_status_workshop=()=>{
        return this.get('api/work-shop/business-details')
    }
    business_cancel_workshop = (param) => {
        const queryParams = new URLSearchParams(param).toString();
        return this.put(`api/work-shop/business/cancel?${queryParams}`);
    };
    count_approved_workshop=(universityId)=>{
        return this.get(`api/work-shop/countWorkshopApproved?universityId=${universityId}&state=APPROVED`)
    }
}

// Instantiate WorkShopService
export const workShopService = new WorkShopService();
