import {baseService} from "../BaseService";


export class BusinessService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };

    get_business_by_id = (id) => {
        return this.get(`api/business/${id}`)
    }
    update_business_id = (id, formData) => {
        return this.postFormData(`api/business/${id}`, formData)
    }
    get_all_search_business_page = (page, size, keyword='') =>{
        return this.get
        (`api/business/get-all-business-page?page=${page}&size=${size}&keyword=${keyword}`);
    };
}

export const businessService = new BusinessService();