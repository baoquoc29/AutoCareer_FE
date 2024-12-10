import {baseService} from "../BaseService";

export class IndustryService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    get_industry_business = (page, size, keyword = '') => {
        return this.get(`api/industry/get-all-industry-business?page=${page}&size=${size}&keyword=${keyword}`);
    };
    get_industry_all = () => {
        return this.get("api/industry/get-all");
    };
    get_industry_by_id = (id) => {
        return this.get(`api/industry/get-detail?id=${id}`);
    };
    check_exist_industry = (id) => {
        return this.get(`api/industry/check?industryId=${id}`);
    };
    create_industry = (industryId) => {
        return this.post(`api/industry/create-to-business?id=${industryId}`, null);
    };
    delete_industries = (ids) => {
        return this.post('api/industry/delete', { businessIndustryId: [ids] });
    };
    get_industry_all_no_pag = () => {
        return this.get("api/industry/get-all-industry-business-no-pag");
    };
}

export const industryService = new IndustryService();
