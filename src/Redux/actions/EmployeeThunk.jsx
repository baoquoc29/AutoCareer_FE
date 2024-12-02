import {employeeService} from "../../Service/BusinessService/EmployeeService";
import {SET_EMPLOYEE} from "../types/EmployeeType";

export const get_all_employees = () => {
    return async dispatch => {
        try {
            const res= await employeeService.get_all_employee_by_id_business();
            console.log(res.data);
            dispatch({
                type: SET_EMPLOYEE,
                payload:res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}