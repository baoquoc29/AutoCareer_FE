import {baseService} from "../BaseService";

export class InstructionalService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };

    get_all_instructional = (page, size) => {
        return this.get(`api/instructional/get-all?page=${page}&size=${size}`);
    }
    get_all_active_instructional = (page, size) => {
        return this.get(`api/instructional/get-all-active?page=${page}&size=${size}`);
    }
    get_all_inactive_instructional = (page, size) => {
        return this.get(`api/instructional/get-all-inactive?page=${page}&size=${size}`);
    }
    create_instructional = (formData) => {
        return this.post(`api/instructional/create`, formData)
    }
    update_instructional = (id, formData) => {
        return this.post(`api/instructional/update/${id}`, formData)
    }
    delete_instructional = (ids) => {
        return this.deleteData(`api/instructional/delete`,ids)
    }
    get_instructional_by_id = (id) => {
        return this.get(`api/instructional/getById/${id}`)
    }
    set_stop_instructional_by_id = (id)=>{
        return this.post(`api/instructional/inactive/${id}`)
    }
    set_start_instructional_by_id = (id)=>{
        return this.post(`api/instructional/active/${id}`)
    }

}

export const instructionalService = new InstructionalService();