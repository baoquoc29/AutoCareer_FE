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
    post_follow_business = (businessId, candidateId) => {
        return this.postResponse(`api/follow?candidateId=${candidateId}&businessId=${businessId}`);
    }
    un_follow_business = (businessId, candidateId) => {
        return this.postResponse(`api/un-follow?candidateId=${candidateId}&businessId=${businessId}`);
    }
    check_follow_business = (businessId, candidateId) => {
        return this.getResponse(`api/check-follow?candidateId=${candidateId}&businessId=${businessId}`);
    }
    count_follow_business = (businessId) => {
        return this.getResponse(`api/count-follower?businessId=${businessId}`);
    }
    list_follow_business_by_candidate = (candidateId,keyword,page,size) => {
        return  this.get(`api/follow-business?page=${page}&size=${size}&candidateId=${candidateId}&keyword=${keyword}`);
    }
    count_candidate = () => {
        return this.get(`api/candidate/count`)
    }
}

export const candidateService = new CandidateService();