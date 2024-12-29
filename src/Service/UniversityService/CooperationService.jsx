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
    get_total_cooperation=(universityId)=>{
        return this.get(`api/cooperation/count-total/${universityId}`)
    }

    approve_cooperation_of_university = (formData) =>{
        return this.post('api/cooperation/approve-request', formData)
    }

    reject_cooperation_of_university = (formData) =>{
        return this.post('api/cooperation/reject-request', formData)
    }
    get_all_cooperation_business = (page, size, keyword='', statusConnected = null) =>{
        return this.get(`api/cooperation/get-request?page=${page}&size=${size}&keyword=${keyword}`
            + (statusConnected ? `&statusConnected=${statusConnected}` : ''))
    }
    cancel_request = (universityId) =>{
        return this.put(`api/cooperation/cancel-request?universityId=${universityId}`)
    }
    get_detail_cooperation_business = (id) => {
        return this.get(`api/cooperation/detail-request?id=${id}`)
    }
}
export default CooperationService = new CooperationService();