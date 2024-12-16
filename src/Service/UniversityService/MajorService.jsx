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
    create_major = (formData) => {
        return this.post(`api/major/create`, formData)
    }
    delete_major = (ids) => {
        return this.deleteData(`api/major/delete`,ids)
    }
    update_major = (id,formData) => {
        return this.post(`api/major/update/${id}`, formData)
    }
    set_stop_major_by_id = (id)=>{
        return this.post(`api/major/inactive/${id}`)
    }
    set_start_major_by_id = (id)=>{
        return this.post(`api/major/active/${id}`)
    }
}

export const majorService = new MajorService();