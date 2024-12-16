import { baseService } from "../BaseService";


export class LocationService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    get_all_provinces = () => {
        return this.get('api/administrative/get-all-provinces');
    };

    get_districts = (provinceId) => {
        return this.get(`api/administrative/get-all-districts?provinceId=${provinceId}`);
    };

    get_wards = (districtId) => {
        return this.get(`api/administrative/get-all-wards?districtId=${districtId}`);
    };
}

// Instantiate WorkShopService
export const locationService = new LocationService();
