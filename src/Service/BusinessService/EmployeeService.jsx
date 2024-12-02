import {baseService} from "../BaseService";

export class EmployeeService extends baseService {
    constructor() {
        super();
    };

    get_all_employee_by_id_business = () =>{
      return this.get('api/employees/get-all');
    };
    create_employee = () =>{
        return this.get('api/employees/create');
    };
    get_employee_by_id = () =>{
        return this.get('api/employees/{employeeId}');
    };
    update_employee = () =>{
        return this.get('api/employees/{employeeId}');
    };
    delete_employee = () =>{
        return this.get('api/employees/{employeeId}');
    };
}

export const employeeService = new EmployeeService();