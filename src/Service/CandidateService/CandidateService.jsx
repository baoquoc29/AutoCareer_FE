import {baseService} from "../BaseService";


export class CandidateService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super()
    };

    get_candidate_id = (id) => {
        return this.get(`api/candidate/get-by-id/${id}`)
    }
    get_candidate_details = (id) => {
        return this.get(`api/candidate/get-by-id/${id}`)
    }
    update_candidate_id = (id, formData) => {
        return this.post(`api/candidate/${id}`, formData)
    }
}

export const candidateService = new CandidateService();