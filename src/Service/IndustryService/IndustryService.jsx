import { baseService } from "../BaseService";

export class IndustryService extends baseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  get_industry_all = () => {
    return this.get("api/industry/get-all-industry-business");
  };
}

export const industryService = new IndustryService();
