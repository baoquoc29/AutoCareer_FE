import { industryService } from "../../Service/IndustryService/IndustryService";
import { SET_INDUSTRIES } from "../types/IndustryType";

export const get_all_industry = () => {
  return async (dispatch) => {
    try {
      const res = await industryService.get_industry_all();
      console.log(res.data);
      dispatch({
        type: SET_INDUSTRIES,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
