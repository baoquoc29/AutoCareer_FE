import { baseService } from "../BaseService";

export class PortalService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }
    get_job_all = (page, size) => {
        return this.getResponse(`api/job/job-all?page=${page}&size=${size}`);
    };
    get_job_by_district = (page, size,districtId) => {
        return this.getResponse(`api/job/district/${districtId}?page=${page}&size=${size}`);
    }
    get_job_by_region = (page, size,regionId) => {
        return this.getResponse(`api/job/district/${regionId}?page=${page}&size=${size}`);
    }
    get_job_by_province = (page, size,provinceId) => {
        return this.getResponse(`api/job/province/${provinceId}?page=${page}&size=${size}`);
    }
    get_job_by_industry = (page, size,industryId) => {
        return this.getResponse(`api/job/industry/${industryId}?page=${page}&size=${size}`);
    }
    get_job_by_salary = (page, size,minSalary,maxSalary) => {
        return this.getResponse(`api/job/salary?page=${page}&size=${size}&minSalary=${minSalary}&maxSalary=${maxSalary}`);
    }
    get_business_by_feature = (industryId) => {
        return this.getResponse(`api/business/feature-business?${industryId}`);
    }
    get_total_job_all = () => {
        return this.getResponse(`api/job/total-job`);
    };
    get_work_shop_feature = (param) => {
        const queryParams = new URLSearchParams(param).toString();

        return this.getResponse(`api/work-shop/display?${queryParams}`);
    };
    get_university_total = () => {
        return this.getResponse(`api/university/get-total`);
    }
    get_workshop_by_id = (id) =>{
        return this.getResponse(`api/work-shop/display/${id}`);
    }
    request_workshop_by_id = (body) =>{
        return this.postResponse(`api/work-shop/request`,body);
    }
    get_status_workshop_by_id = (id,businessId) =>{
        return this.getResponse(`api/work-shop/status?workShopId=${id}&businessId=${businessId}`);
    }

}

export const portalService = new PortalService();
