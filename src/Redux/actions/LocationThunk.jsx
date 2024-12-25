import {
    GET_ALL_DISTRICT_BY_ID,
    GET_ALL_LOCATION,
    GET_ALL_WARD_BY_ID_DISTRICT
} from "../types/LocationType";
import {locationService} from "../../Service/LocationService/LocationService";

// Action to fetch all provinces
export const get_all_provinces = () => {
    return async (dispatch) => {
        try {
            const res = await locationService.get_all_provinces();
            if (res?.data) {
                dispatch({
                    type: GET_ALL_LOCATION,  // Action type to store the provinces
                    payload: res.data,
                });
            }
        } catch (error) {
            console.error("Error fetching provinces:", error);
        }
    };
};

// Action to fetch all districts by province ID
export const get_all_district = (provinceId) => {
    return async (dispatch) => {
        try {
            const res = await locationService.get_districts(provinceId);
            if (res?.data) {
                dispatch({
                    type: GET_ALL_DISTRICT_BY_ID,  // Action type to store the districts
                    payload: res.data,
                });
            }
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    };
};

// Action to fetch all wards by district ID
export const get_all_ward = (districtId) => {
    return async (dispatch) => {
        try {
            const res = await locationService.get_wards(districtId);
            if (res?.data) {
                dispatch({
                    type: GET_ALL_WARD_BY_ID_DISTRICT,  // Action type to store the wards
                    payload: res.data,
                });
            }
        } catch (error) {
            console.error("Error fetching wards:", error);
        }
    };
};
