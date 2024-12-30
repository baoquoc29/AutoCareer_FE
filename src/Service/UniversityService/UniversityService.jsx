import {baseService} from "../BaseService";


export class UniversityService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };

    get_university_id = (id) => {
        return this.get(`api/university/getById/${id}`)
    }
    get_university_details = (id) => {
        return this.get(`api/university/getById/${id}`)
    }
    update_university_id = (id, formData) => {
        return this.post(`api/university/update/${id}`, formData)
    }
    get_all_search_university_page = (page, size, keyword='') =>{
        return this.get
        (`api/university/get-all-university-page?page=${page}&size=${size}&keyword=${keyword}`);
    };
}

export const universityService = new UniversityService();