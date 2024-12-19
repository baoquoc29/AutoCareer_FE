import {employeeService} from "../../Service/BusinessService/EmployeeService";
import {CREATE_EMPLOYEE, DELETE_EMPLOYEE, SET_EMPLOYEE, SET_EMPLOYEE_ID, UPDATE_EMPLOYEE} from "../types/EmployeeType";
import {toast} from "react-toastify";
import {STATUS_CODE} from "../../Utils/Setting/Config";

export const get_all_employees = () => {
    return async dispatch => {
        try {
            const res = await employeeService.get_all_employee_by_id_business();
            dispatch({
                type: SET_EMPLOYEE,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_employee_by_id = (employeeId) => {
    return async (dispatch) => {
        try {
            const res = await employeeService.get_employee_by_id(employeeId);
            dispatch({
                type: SET_EMPLOYEE_ID,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const delete_employee_id = (employeeId) => {
    return async (dispatch) => {
        try {
            const res = await employeeService.delete_employee(employeeId);
            console.log(res.data)
            dispatch({
                type: DELETE_EMPLOYEE,
                payload: res.data
            })
        } catch (error) {
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
            if (res.code === STATUS_CODE.SUCCESS) {
                // Dispatch action để cập nhật trạng thái Redux
                dispatch({
                    type: CREATE_EMPLOYEE,
                    payload: res,
                });

                // Hiển thị thông báo thành công và lấy lại danh sách nhân viên
                toast.success("Nhân viên được thêm mới thành công!");


                return true;
            } else if (res.code === STATUS_CODE.BAD_REQUEST) {
                // Hiển thị thông báo lỗi từ server (nếu có)
                toast.error(res.message || "Dữ liệu không hợp lệ.");
                console.error("BAD_REQUEST:", res);
                return false; // Indicating failure
            }
            // } else {
            //     toast.error("Chưa có ảnh");
            //     console.warn("Unhandled response code:", res);
            //     return false; // Indicating failure
            // }
        } catch (error) {
            // Bắt lỗi trong quá trình gọi API
            console.error("Lỗi khi tạo nhân viên:", error);
            toast.error(error.message || "Đã xảy ra lỗi khi thêm mới nhân viên.");
            return false; // Indicating failure
        }
    };
};

export const update_employee = (employeeId, formData) => {
    return async (dispatch) => {
        try {
            // Gửi request đến API qua service
            const res = await employeeService.update_employee(employeeId, formData);

            // Kiểm tra mã phản hồi từ server

            // Dispatch action để cập nhật trạng thái Redux
            dispatch({
                type: UPDATE_EMPLOYEE,
                payload: res,
            });
            // Hiển thị thông báo thành công và lấy lại danh sách nhân viên
            toast.success("Nhân viên được cập nhật thành công!");

            // Hiển thị thông báo lỗi từ server (nếu có)
            return {success: true, data: res.data};
        } catch (error) {
            // Bắt lỗi trong quá trình gọi API
            console.error("Lỗi khi chỉnh sửa nhân viên:", error);
            toast.error(error.data.response.message || "Đã xảy ra lỗi khi chỉnh sửa nhân viên.");
            return {success: false, error};

        }
    };
};
export const get_all_employees_of_business_page = (page = 1, size = 7, keyword = '') => {
    return async dispatch => {
        try {
            const res = await employeeService.get_all_employees_of_business(page, size, keyword);
            const {content, totalElements, pageSize, currentPage} = res.data;
            if (Array.isArray(res.data.content)) {
                if (content.length === 0) {
                    // Không có dữ liệu
                    dispatch({
                        type: SET_EMPLOYEE,
                        payload: {
                            content: [],       // Danh sách ngành nghề rỗng
                            totalElements: 0,  // Tổng số bản ghi là 0
                            pageSize: size,    // Giữ nguyên số bản ghi mỗi trang
                            currentPage: page, // Giữ nguyên trang hiện tại
                            keyword,
                        },
                    });
                    console.warn("Không có dữ liệu ngành nghề nào được tìm thấy.");
                } else {
                    // Có dữ liệu
                    dispatch({
                        type: SET_EMPLOYEE,
                        payload: {
                            content,       // Dữ liệu ngành nghề
                            totalElements, // Tổng số bản ghi
                            pageSize,      // Số bản ghi mỗi trang
                            currentPage,   // Trang hiện tại
                            keyword,
                        },
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
}
