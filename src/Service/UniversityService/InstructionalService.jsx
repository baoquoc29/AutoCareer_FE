import {baseService} from "../BaseService";

export class InstructionalService extends baseService{
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };

    get_all_instructional =(page,size)=>{
        return this.get(`/api/instructional/get-all?page=${page}&size=${size}`);
    }
    get_all_active_instructional =(page,size)=>{
        return this.get(`/api/instructional/get-all-active?page=${page}&size=${size}`);
    }
    get_all_inactive_instructional =(page,size)=>{
        return this.get(`/api/instructional/get-all-inactive?page=${page}&size=${size}`);
    }

}
export default InstructionalService;