 import React, {useEffect, useState} from "react";
import {Button, Card, Input, Modal, Pagination, Select} from "antd";
import "antd/dist/reset.css";
import {DownloadOutlined, PlusOutlined, SearchOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {
    delete_employee_id,
    get_all_employees_of_business_page, restore_employee_id,
} from "../../../Redux/actions/EmployeeThunk";
import EmployeeTable from "./EmployeeTable";
import EmployeeDetail from "./EmployeeDetail";
import {toast} from "react-toastify";
import {NavLink, useNavigate} from "react-router-dom";
import ResultSummary from "../../../Component/Paging/ResultsSummary";
import * as XLSX from "xlsx";

const {Option} = Select;

const EmployeeManager = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {employees} = useSelector(state => state.EmployeeReducer);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [currentPage, setCurrenPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    const totalElements = useSelector((state) => state.EmployeeReducer.totalElements);
    const [status,setStatus] = useState("");
    const [searchText, setSearchText] = useState("");
    const [open, setOpen] = useState(false);
    const [load, setLoad] = useState(false);

    useEffect(() => {
        dispatch(get_all_employees_of_business_page(currentPage, pageSize, encodeURIComponent(searchText), status));
    }, [dispatch, currentPage, searchText, pageSize, status, load]);

    //xem chi tiet nhan vien
    const handleInfo = (record) => {
        setSelectedEmployee(record);
        setOpen(true);
    };

    //chinh sua nhan vien
    const handleEdit = (id) => {
        const employee = employees.find(e => e.id === id); // Tìm nhân viên theo ID
        setSelectedEmployee(employee); // Đặt nhân viên được chọn (nếu cần dùng trong component này)
        navigate(`/employee-edit`, {state: {employee}}); // Điều hướng với đối tượng employee
    };

    const handlePageChange = (page, pageSize) => {
        setCurrenPage(page);
        setPageSize(pageSize);
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value); // Cập nhật giá trị ô tìm kiếm
        setCurrenPage(1);
    };

    const confirmDelete = (record) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc muốn xóa nhân viên này",
            okText: "Xác nhận",
            okType: "danger",
            cancelText: "Hủy",
            onOk() {
                handleDelete(record);
            },
        });
    }

    const confirmRestore = (record) => {
        Modal.confirm({
            title: "Xác nhận khôi phục",
            content: "Bạn có chắc muốn khôi phục nhân viên này",
            okText: "Xác nhận",
            okType: "danger",
            cancelText: "Hủy",
            onOk() {
                handleRestore(record);
            },
        });
    }
    //xoa nhan vien
    const handleDelete = (employeeId) => {

        dispatch(delete_employee_id(employeeId))
            .then(() => {
                toast.success("Xóa nhân viên thành công")
                dispatch(get_all_employees_of_business_page())
            })
            .catch((error) => {
                toast.error(error.messages)
            })
    }

    //Khôi phục nhân viên
    const handleRestore = (employeeId) => {

        dispatch(restore_employee_id(employeeId))
            .then(() => {
                toast.success("Khôi phục nhân viên thành công")
                dispatch(get_all_employees_of_business_page())
            })
            .catch((error) => {
                toast.success(error.messages)
            })
    }
    const handleChangeStatus = (value) => {
        setStatus(value);
        setCurrenPage(1);
    }

    const exportToExcel = () => {

        if (employees.length === 0) {
            alert("No data to export!");
            return;
        }

        // Chuyển đổi dữ liệu thành định dạng Excel
        const worksheet = XLSX.utils.json_to_sheet(
            employees.map((employee,index) => ({
                "STT": index++,
                "Mã nhân viên": employee.employeeCode,
                "Họ và tên": employee.name,
                "Email": employee.email,
                "Số điện thoại": employee.phone,
                "Giới tính": employee.gender,
                "Địa chỉ": employee.address,
            }))
        );

        // Tạo workbook mới và thêm worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

        // Xuất file Excel
        XLSX.writeFile(workbook, "Employees.xlsx");
    }

    // const data = employees.map((employee, index) => ({
    const data = Array.isArray(employees) ? employees.map((employee, index) => ({
        id: employee.id,
        stt: (currentPage - 1) * pageSize + index + 1,
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
        updatedAt: employee.updatedAt,

    })) : [];
    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div className="mt-auto">
                            <div className="row">
                                <div className="col-md-12 mb-3">
                                    <Card title="Danh sách nhân viên">
                                        <div className="table-responsive">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                                {/* Thanh tìm kiếm */}
                                                <div style={{display: 'flex', gap: '10px'}}>
                                                    <Input
                                                        placeholder="Tìm kiếm nhân viên..."
                                                        value={searchText}
                                                        onChange={handleSearch}
                                                        prefix={<SearchOutlined/>}
                                                        style={{width: 400}}
                                                    />
                                                    <Select
                                                        placeholder="Chọn trạng thái duyệt"
                                                        value={status}
                                                        showSearch
                                                        onChange={(value) => handleChangeStatus(value)}
                                                        style={{width: 200}}
                                                        filterOption={(input, option) => {
                                                            const childrenText = String(option.props.children || ""); // Chuyển thành chuỗi nếu không phải
                                                            return childrenText.toLowerCase().includes(input.toLowerCase()); // So sánh chữ thường
                                                        }}
                                                    >
                                                        <Option value="">Tất cả trạng thái</Option>
                                                        <Option value="ACTIVE">Hoạt động</Option>
                                                        <Option value="INACTIVE">Đã xóa</Option>
                                                    </Select>
                                                </div>
                                                <div style={{display: 'flex', gap: '10px'}}>
                                                    {/* Nút hành động */}
                                                    <div className="d-flex">
                                                        <Button type="primary" icon={<PlusOutlined/>}
                                                                style={{marginRight: 0}}>
                                                            <NavLink
                                                                to="/employee-create"
                                                                style={{textDecoration: 'none', color: 'inherit'}}
                                                            >
                                                                Thêm mới
                                                            </NavLink>
                                                        </Button>
                                                        {/*<Button*/}
                                                        {/*    type="default"*/}
                                                        {/*    icon={<DownloadOutlined/>}*/}
                                                        {/*    onClick={exportToExcel}*/}
                                                        {/*    style={{*/}
                                                        {/*        backgroundColor: '#1d8f29',  // Màu xanh lá đậm (Excel)*/}
                                                        {/*        borderColor: '#1d8f29',      // Màu viền*/}
                                                        {/*        color: 'white',              // Màu chữ*/}
                                                        {/*    }}*/}
                                                        {/*>*/}
                                                        {/*    Xuất Excel*/}
                                                        {/*</Button>*/}
                                                    </div>
                                                </div>
                                            </div>
                                                <EmployeeTable
                                                    data={data}
                                                    onInfo={handleInfo}
                                                    onDetle={confirmDelete}
                                                    onEdit={handleEdit}
                                                    onRestore={confirmRestore}
                                                />
                                                <ResultSummary totalElements={totalElements}/>
                                            </div>
                                            <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                                            <Pagination
                                                current={currentPage} // Gán mặc định nếu currentPage không hợp lệ
                                                pageSize={pageSize}   // Gán mặc định nếu pageSize không hợp lệ
                                                defaultPageSize={7}
                                                defaultCurrent={1}
                                                total={totalElements} // Gán mặc định nếu totalElements không hợp lệ
                                                onChange={handlePageChange}
                                                showSizeChanger={true}
                                                pageSizeOptions={[7, 10, 20, 50, 100]} // Đảm bảo mọi giá trị trong mảng là chuỗi
                                            />
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <EmployeeDetail
                open={open}
                onClose={() => setOpen(false)}
                employee={selectedEmployee}
            />
        </>
    );
}
export default EmployeeManager;