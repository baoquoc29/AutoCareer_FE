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
    get_industry_all_paging = (page, size, keyword = '') => {
        return this.get(`api/industry/get-all-paging?page=${page}&size=${size}&keyword=${keyword}`);
    };
    get_industry_by_id = (id) => {
        return this.get(`api/industry/get-detail?id=${id}`);
    };
    get_industry_by_id_admin = (id) => {
        return this.get(`api/industry/get-detail-admin?id=${id}`);
    };
    check_exist_industry = (id) => {
        return this.get(`api/industry/check?industryId=${id}`);
    };
    create_industry_to_business = (industryId) => {
        return this.post(`api/industry/create-to-business?id=${industryId}`, null);
    };
    create_industry= (name, code) => {
        return this.post(`api/industry/create`, {name, code});
    };
    update_industry = (id, industryRequest) => {
        return this.put(`api/industry/update?id=${id}`, industryRequest);
    };
    inactive_industry = (id) => {
        return this.put(`api/industry/inactive?id=${id}`);
    };
    delete_industries = (ids) => {
        // Kiểm tra nếu ids không phải mảng, chuyển nó thành mảng
        if (!Array.isArray(ids)) {
            ids = [ids];
        }
        return this.post('api/industry/delete', { businessIndustryId: ids });
    };
    get_industry_business_all_no_pag = () => {
        return this.get("api/industry/get-all-industry-business-no-pag");
    };
}

export const industryService = new IndustryService();
