import {baseService} from "../BaseService";

export class EmployeeService extends baseService {
    constructor() {
        super();
    };

    get_all_employee_by_id_business = () =>{
      return this.get('api/employees/get-all');
    };
    get_all_employees_of_business = (page, size, keyword='', status=null) =>{
        return this.get(`api/employees/get-all-employee-of-business?page=${page}&size=${size}&keyword=${keyword}`
        + (status ? `&status=${status}` : '')
        );
    };
    employee_create = (formData) => {
        return this.postFormData('api/employees/create', formData);
    };
    get_employee_by_id = (employeeId) =>{
        return this.get(`api/employees/${employeeId}`);
    };
    update_employee = (employeeId, formData) =>{
        return this.putFormData(`api/employees/${employeeId}`, formData);
    };
    restore_employee = (employeeId) =>{
        return this.postFormData(`api/employees/restore/${employeeId}`);
    }
    delete_employee = (employeeId) =>{
        return this.delete(`api/employees/${employeeId}`);
    };
}

export const employeeService = new EmployeeService();