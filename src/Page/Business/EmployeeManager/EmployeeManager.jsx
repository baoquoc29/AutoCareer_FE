import React, {useEffect, useState} from "react";
import {Button, Card, Input, Modal, Pagination} from "antd";
import "antd/dist/reset.css";
import {DownloadOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    delete_employee_id,
    get_all_employees, get_all_employees_of_business_page,
    get_employee_by_id
} from "../../../Redux/actions/EmployeeThunk";
import EmployeeTable from "./EmployeeTable";
import EmployeeDetail from "./EmployeeDetail";
import {toast} from "react-toastify";
import {NavLink, useNavigate} from "react-router-dom";

const EmployeeManager = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {employees}= useSelector(state => state.EmployeeReducer);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const currentPage=useSelector((state) => state.EmployeeReducer.currentPage);
    const pageSize=useSelector((state) => state.EmployeeReducer.pageSize);
    const keyword=useSelector((state) => state.EmployeeReducer.keyword);
    const totalElements=useSelector((state) => state.EmployeeReducer.totalElements);
    const [searchText, setSearchText] = useState("");
    // const [filteredData, setFilteredData] = useState([]);
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        dispatch(get_all_employees_of_business_page(currentPage, pageSize, keyword));
    }, [dispatch, currentPage, pageSize, load]);

    // useEffect(() => {
    //     dispatch(get_all_employees());
    // }, [dispatch]);

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

    //chinh sua nhan vien
    const handleEdit = (id) => {
        const employee = employees.find(e => e.id === id); // Tìm nhân viên theo ID
        setSelectedEmployee(employee); // Đặt nhân viên được chọn (nếu cần dùng trong component này)
        navigate(`/employee-edit`, { state: { employee } }); // Điều hướng với đối tượng employee
    };

    const handlePageChange = (page, pageSize) => {
        dispatch(get_all_employees_of_business_page(page, pageSize, searchText)); // Gọi API với trang và kích thước mới
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value); // Cập nhật giá trị ô tìm kiếm
        dispatch(get_all_employees_of_business_page(1, pageSize, value)); // Gọi API với từ khóa
    };

    const confirmDelete = (record) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc muốn xóa nhân viên này",
            okText: "Xác nhận",
            okType: "danger",
            cancelText:"Hủy",
            onOk() {
                handleDelete(record);
            },
        });
    }

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

    // const data = employees.map((employee, index) => ({
    const data = Array.isArray(employees) ? employees.map((employee, index) => ({
        id: employee.id,
        stt: index + 1,
        employeeCode: employee.employeeCode,
        employeeImageId: employee.employeeImageId,
        name: employee.name,
        email: employee.email,
        status: employee.status,
        gender: employee.gender,
        phone: employee.phone,
        dateOfBirth: employee.dateOfBirth,
        address: employee.address,
        createdAt: employee.createdAt,
    })):[];
    console.log(data)
    return (
        <div>
            <section id="content" className="content">
            {/*    <div className="content__header content__boxed rounded-0">*/}
                    <div className="content__wrap">
                        <section>
                            <div className="mt-3">
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <Card title="Danh sách nhân viên">
                                            <div className="table-responsive">
                                                <div className="d-flex justify-content-between align-items-center mb-3">
                                                    {/* Thanh tìm kiếm */}
                                                    <Input
                                                        placeholder="Tìm kiếm nhân viên..."
                                                        value={searchText}
                                                        onChange={handleSearch}
                                                        prefix={<SearchOutlined/>}
                                                        style={{width: 400}}
                                                    />

                                                    {/* Nút hành động */}
                                                    <div className="d-flex">
                                                        <Button type="primary" icon={<PlusOutlined/>}
                                                                style={{marginRight: 10}}>
                                                            <NavLink
                                                                to="/employee-create"
                                                                style={{textDecoration: 'none', color: 'inherit'}}
                                                            >
                                                                Thêm mới
                                                            </NavLink>
                                                        </Button>
                                                        <Button
                                                            type="default"
                                                            icon={<DownloadOutlined/>}
                                                            /*onClick={exportToExcelSection}*/
                                                            style={{
                                                                backgroundColor: '#1d8f29',  // Màu xanh lá đậm (Excel)
                                                                borderColor: '#1d8f29',      // Màu viền
                                                                color: 'white',              // Màu chữ
                                                            }}
                                                        >
                                                            Xuất Excel
                                                        </Button>
                                                    </div>
                                                </div>


                                                <EmployeeTable
                                                    data={data}
                                                    onInfo={handleInfo}
                                                    onDetle={confirmDelete}
                                                    onEdit={handleEdit}
                                                />
                                            </div>
                                            <Pagination
                                                current={currentPage}
                                                pageSize={pageSize}
                                                total={totalElements}
                                                onChange={handlePageChange}
                                                className="text-center mt-3"
                                            />
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
            {/*</div>*/}
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