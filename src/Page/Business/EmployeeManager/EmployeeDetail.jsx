import {Button, Modal} from "antd";

const EmployeeDetail = ({open, onClose, employee}) => {
    if(!employee) return null;
    return (
        <>
            <Modal open={open} onCancel={onClose} footer={null}>
                <h2>Chi tiết nhân viên</h2>
                <p><strong>Mã nhân viên:</strong> {employee.employeeCode}</p>
                <p><strong>Tên nhân viên:</strong> {employee.name}</p>
                <p><strong>Giới tính:</strong>{employee.gender}</p>
                <p><strong>Email nhân viên:</strong> {employee.email}</p>
                <p><strong>Ngày sinh:</strong> {employee.dateOfBirth}</p>
                <p><strong>Địa chỉ:</strong> {employee.address}</p>
                <p><strong>Số điện thoại:</strong> {employee.phone}</p>
                <p><strong>Vị trí:</strong>{employee.address} </p>

                <div className="modal-footer-right">
                    <Button type="primary" onClick={onClose}>Đóng</Button>
                </div>
            </Modal>
        </>
    )
}
export default EmployeeDetail;