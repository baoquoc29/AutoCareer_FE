import {baseService} from "../BaseService";

export class CooperationService extends baseService{
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };

    get_all_cooperation_of_university = (page, size, keyword='', statusConnected = null) =>{
        return this.get(`api/cooperation/get-all-cooperation-university?page=${page}&size=${size}&keyword=${keyword}`
            + (statusConnected ? `&statusConnected=${statusConnected}` : '')
        );
    };

    approve_cooperation_of_university = (formData) =>{
        return this.post('api/cooperation/approve-request', formData)
    }

    reject_cooperation_of_university = (formData) =>{
        return this.post('api/cooperation/reject-request', formData)
    }
}
export default CooperationService = new CooperationService();