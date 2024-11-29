import {baseService} from "../BaseService";

export class MajorService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };

    get_major_all = () => {
        return this.get('api/major/get-all')
    };
    get_major_by_id = (id) => {
        return this.get(`api/major/getById/${id}`)
    }
    create_major =(formData)=>{
        return this.post(`api/major/create`,formData)
    }
}

export const majorService = new MajorService();