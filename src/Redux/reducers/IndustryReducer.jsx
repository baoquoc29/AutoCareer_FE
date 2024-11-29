import { SET_INDUSTRIES } from "../types/IndustryType";

const initialState = {
  industries: [],
};

export const IndustryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INDUSTRIES:
      return {
        ...state,
        industries: action.payload, // Lưu dữ liệu vào `sections` trong state
      };

    default:
      return { ...state };
  }
};
