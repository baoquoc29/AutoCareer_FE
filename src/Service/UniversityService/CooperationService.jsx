import {baseService} from "../BaseService";

export class CooperationService extends baseService{
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    };

    get_all_cooperation_of_university = (page, size, keyword='') =>{
        return this.get(`api/cooperation/get-all-cooperation-university?page=${page}&size=${size}&keyword=${keyword}`);
    };

    approve_cooperation_of_university = (formData) =>{
        return this.postFormData('api/cooperation/approve-request')
    }


}
export default CooperationService = new CooperationService();