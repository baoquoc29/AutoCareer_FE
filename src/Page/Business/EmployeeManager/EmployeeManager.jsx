import React, {useEffect, useState} from "react";
import {Button, Card, Input} from "antd";
import "antd/dist/reset.css";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    create_employee,
    delete_employee_id,
    get_all_employees,
    get_employee_by_id
} from "../../../Redux/actions/EmployeeThunk";
import EmployeeTable from "./EmployeeTable";
import EmployeeDetail from "./EmployeeDetail";
import {toast} from "react-toastify";
import {NavLink} from "react-router-dom";

const EmployeeManager = () => {
    const dispatch = useDispatch();
    const employees = useSelector(state => state.EmployeeReducer.employees);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    // const [searchText, setSearchText] = useState("");
    // const [filteredData, setFilteredData] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(get_all_employees());
    }, [dispatch]);

    useEffect(() => {
        if (selectedEmployee) {
            dispatch(get_employee_by_id(selectedEmployee.id));
        }
    }, [dispatch]);

    //xem chi tiet nhan vien
    const handleInfo = (record) => {
        setSelectedEmployee(record);
        setOpen(true);
    };


    //xoa nhan vien
    const handleDelete = (employeeId) => {
        dispatch(delete_employee_id(employeeId))
            .then(() => {
                toast.success("Xóa nhân viên thành công")
                dispatch(get_all_employees())
            })
            .catch((error) => {
                toast.success(error.messages)
            })
    }

    const data = employees.map((employee, index) => ({
        id: employee.id,
        stt: index + 1,
        employeeCode: employee.employeeCode,
        name: employee.name,
        email: employee.email,
        status: employee.status,
        gender: employee.gender,
        phone: employee.phone,
        dateOfBirth: employee.dateOfBirth,
        address: employee.address,
    }));

    return (
        <div>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <section>
                            <div className="container mt-5">
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <Card title="Danh sách nhân viên">
                                            <div className="table-responsive">
                                                <div className="d-flex mb-3">
                                                    <Button type="primary" icon={<PlusOutlined/>}>
                                                        <NavLink to={"/employee-create"} >
                                                            Thêm mới
                                                        </NavLink>
                                                    </Button>
                                                </div>
                                                <EmployeeTable
                                                    data={data}
                                                    onInfo={handleInfo}
                                                    onDetle={handleDelete}
                                                />
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
            <EmployeeDetail
                open={open}
                onClose={() => setOpen(false)}
                employee={selectedEmployee}
            />
        </div>
    );
}
export default EmployeeManager;