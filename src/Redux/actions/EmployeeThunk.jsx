import {employeeService} from "../../Service/BusinessService/EmployeeService";
import {CREATE_EMPLOYEE, DELETE_EMPLOYEE, SET_EMPLOYEE, SET_EMPLOYEE_ID} from "../types/EmployeeType";
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
            // Gửi request đến API qua service
            const res = await employeeService.employee_create(formData);

            // Kiểm tra mã phản hồi từ server
            if (res.data.code === STATUS_CODE.SUCCESS) {
                // Dispatch action để cập nhật trạng thái Redux
                dispatch({
                    type: CREATE_EMPLOYEE,
                    payload: res,
                });

                // Hiển thị thông báo thành công và lấy lại danh sách nhân viên
                toast.success("Nhân viên được thêm mới thành công!");
                dispatch(get_all_employees()); // Dispatch để cập nhật danh sách nhân viên

                return true;
            } else if (res.code === STATUS_CODE.BAD_REQUEST) {
                // Hiển thị thông báo lỗi từ server (nếu có)
                toast.error(res.data.message || "Dữ liệu không hợp lệ.");
                console.error("BAD_REQUEST:", res);
                return false; // Indicating failure
            } else {
                toast.error("Đã xảy ra lỗi không xác định.");
                console.warn("Unhandled response code:", res);
                return false; // Indicating failure
            }
        } catch (error) {
            // Bắt lỗi trong quá trình gọi API
            console.error("Lỗi khi tạo nhân viên:", error);
            toast.error(error.message || "Đã xảy ra lỗi khi thêm mới nhân viên.");
            return false; // Indicating failure
        }
    };
};


// export const update_employee = (eployeeId) => {
//     return async (dispatch) => {
//
//     }
// }
