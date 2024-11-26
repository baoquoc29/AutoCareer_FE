import {baseService} from "./BaseService";


export class SectionService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };

    create_section = (formData) => {
        return this.post('api/section/create', formData)
    }
    update_section = (formData, id) => {
        return this.post(`api/section/update/${id}`, formData)
    }
    delete_section = (id)=>{
        return this.delete(`api/section/delete/${id}`)
    }
    get_section_id =(id)=>{
        return this.post(`api/section/get/${id}`)
    }
    get_section_all = () => {
        return this.get('api/section/get-all')
    }
}

export const sectionService = new SectionService();