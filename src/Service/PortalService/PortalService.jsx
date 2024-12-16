import { baseService } from "../BaseService";

export class PortalService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }
    get_job_all = (page, size) => {
        return this.get(`api/job/job-all?page=${page}&size=${size}`);
    };
    get_job_by_district = (page, size,districtId) => {
        return this.get(`api/job/district/${districtId}?page=${page}&size=${size}`);
    }
    get_job_by_region = (page, size,regionId) => {
        return this.get(`api/job/district/${regionId}?page=${page}&size=${size}`);
    }
    get_job_by_province = (page, size,provinceId) => {
        return this.get(`api/job/district/${provinceId}?page=${page}&size=${size}`);
    }
    get_job_by_industry = (page, size,industryId) => {
        return this.get(`api/job/industry/${industryId}?page=${page}&size=${size}`);
    }
    get_job_by_salary = (page, size,minSalary,maxSalary) => {
        return this.get(`api/job/salary?page=${page}&size=${size}&minSalary=${minSalary}&maxSalary=${maxSalary}`);
    }




}

export const portalService = new PortalService();
