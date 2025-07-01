import {baseService} from "../BaseService";


export class BusinessService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };

    get_business_by_id = (id) => {
        return this.get(`api/business/get-by-id/${id}`)
    }
    update_business_id = (id, formData) => {
        return this.postFormData(`api/business/${id}`, formData)
    }
    get_all_search_business_page = (page, size, keyword='') =>{
        return this.get
        (`api/business/get-all-business-page?page=${page}&size=${size}&keyword=${keyword}`);
    };
    get_top_follow_business = () => {
        return this.get(`api/business/dashboard/top`,true);
    }
    createdUrlPayment = (amount,orderInfo) => {
        return this.post(`api/v1/payments/create?amount=${amount}&orderInfo=${orderInfo}`,null);
    }
    checkPayment = (username,amount) => {
        return this.post(`api/v1/payments?username=${username}&amount=${amount}`,null);
    }
    checkBalance = (username) => {
        return this.get(`api/v1/payments/check-balance?username=${username}`,null);
    }
}

export const businessService = new BusinessService();