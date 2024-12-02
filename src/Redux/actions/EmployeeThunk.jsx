import {employeeService} from "../../Service/BusinessService/EmployeeService";
import {CREATE_EMPLOYEE, DELETE_EMPLOYEE, SET_EMPLOYEE, SET_EMPLOYEE_ID} from "../types/EmployeeType";
import {majorService} from "../../Service/UniversityService/MajorService";
import {toast} from "react-toastify";
import {STATUS_CODE} from "../../Utils/Setting/Config";

export const get_all_employees = () => {
    return async dispatch => {
        try {
            const res= await employeeService.get_all_employee_by_id_business();
            dispatch({
                type: SET_EMPLOYEE,
                payload:res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_employee_by_id = (employeeId) => {
    return async (dispatch)=> {
        try {
            const res = await employeeService.get_employee_by_id(employeeId);
            console.log(res.data)
            dispatch({
                type: SET_EMPLOYEE_ID,
                payload: res.data
            })
        }catch(error){
            console.log(error);
        }
    }
}
export const delete_employee_id = (employeeId) => {
    return async (dispatch) => {
        try{
            const res = await employeeService.delete_employee(employeeId);
            console.log(res.data)
            dispatch({
                type:DELETE_EMPLOYEE,
                payload:res.data
            })
        }catch (error){
            toast.error(error.data.message)
        }
    }
}
export const create_employee = (formData) => {
    return async (dispatch) => {
        try {
            const res = await employeeService.create_employee(formData);
            console.log(res)
            if (res === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: CREATE_EMPLOYEE,
                    payload: res.data
                })
            }
        }catch (error){
            toast.error(error.response.data.message)
        }
    }
}

// export const update_employee = (eployeeId) => {
//     return async (dispatch) => {
//
//     }
// }
