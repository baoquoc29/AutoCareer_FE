import {baseService} from "../BaseService";


export class MatchingJobService extends baseService {
    constructor() {
        super();
    }

    saveJob = (candidateId, jobId,type) => {
        return this.postResponse(`api/matching/save`, { candidateId, jobId,type }); // Gửi dưới dạng JSON body
    };
    applyJob = (candidateId, jobId,type) => {
        return this.postResponse(`api/matching/apply`, { candidateId, jobId,type }); // Gửi dưới dạng JSON body
    };
    statusJob = (candidateId, jobId,type) => {
        return this.postResponse(`api/matching/status`, { candidateId, jobId,type }); // Gửi dưới dạng JSON body
    };
    statusJobApply = (candidateId, jobId,type) => {
        return this.postResponse(`api/matching/get-status`, { candidateId, jobId,type }); // Gửi dưới dạng JSON body
    };
    setStatusJob = (candidateId, jobId,type) => {
        return this.postResponse(`api/matching/set-status`, { candidateId, jobId,type }); // Gửi dưới dạng JSON body
    };
    listJobsByCandidateId = (param) => {
        const queryParams = new URLSearchParams(param).toString();
        return this.getResponse(`api/matching?${queryParams}`);
    };
    listJobsApplyByBusinessId = (param) => {
        const queryParams = new URLSearchParams(param).toString();
        return this.getResponse(`api/matching/business?${queryParams}`);
    };
    listJobsByBusiness = (param) => {
        const queryParams = new URLSearchParams(param).toString();
        return this.getResponse(`api/job/get-all-job-business?${queryParams}`);
    };
    candidateList = (jobId) => {
        return this.getResponse(`api/matching/fetch-matching-candidates?jobId=${jobId}`);
    };

}

export const matchingJobService = new MatchingJobService();
