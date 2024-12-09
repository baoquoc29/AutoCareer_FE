import {baseService} from "../BaseService";

export class EmployeeService extends baseService {
    constructor() {
        super();
    };

    get_all_employee_by_id_business = () =>{
      return this.get('api/employees/get-all');
    };
    employee_create = (formData) => {
        return this.postFormData('api/employees/create', formData);
    };
    get_employee_by_id = (employeeId) =>{
        return this.get(`api/employees/${employeeId}`);
    };
    update_employee = (employeeId) =>{
        return this.put(`api/employees/${employeeId}`);
    };
    delete_employee = (employeeId) =>{
        return this.delete(`api/employees/${employeeId}`);
    };
}

export const employeeService = new EmployeeService();