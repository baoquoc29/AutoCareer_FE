import {baseService} from "../BaseService";


export class UniversityService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };

    get_university_id = (id) => {
        return this.get(`api/university/getById/${id}`)
    }
    update_university_id = (id, formData) => {
        return this.post(`api/university/update/${id}`, formData)
    }
}

export const universityService = new UniversityService();