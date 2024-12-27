import {baseService} from "../BaseService";


export class SectionService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };

    create_section = (formData) => {
        return this.post('api/section/create', formData)
    }
    update_section = (id, formData) => {
        return this.post(`api/section/update/${id}`, formData)
    }
    delete_section = (ids) => {
        return this.deleteData(`api/section/delete`, ids)
    }
    get_section_id = (id) => {
        return this.post(`api/section/get/${id}`)
    }
    get_section_all = (universityId) => {
        return this.get(`api/section/get-all/${universityId}`)
    }
    set_stop_section_by_id = (id) => {
        return this.post(`api/section/inactive/${id}`)
    }
    set_start_section_by_id = (id) => {
        return this.post(`api/section/active/${id}`)
    }
    get_total_section = (universityId) => {
       return this.get(`api/section/count-total/${universityId}`)
    }
    get_major_section=()=>{
        return this.get('api/section/count-majors')
    }
}

export const sectionService = new SectionService();