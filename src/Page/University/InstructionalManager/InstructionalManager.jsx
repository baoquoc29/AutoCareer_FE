import React, {useState} from "react";
import FormInput from "../../../Component/FormInputComponent/FormInputComponent";
import Table from "../../../Component/TableComponent/Table";
import TableBody from "../../../Component/TableBodyComponent/TableBody";
import Button from "../../../Component/ButtonComponent/Button";
import {NavLink} from "react-router-dom";
import ModalComponent from "../../../Component/ModalComponent/ModalComponent";

const InstructionalManager = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", body: "" });

    const handleClick = () => {
        alert('Button clicked!');
    };

    const handleInfoClick = (item) => {
        setModalContent({ title: "Chi tiết giáo vụ", body: `Thông tin chi tiết cho mã giáo vụ ${item.data[1]}` });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const headers = ["STT", "Mã giáo vụ", "Hình ảnh", "Họ Tên", "Số điện thoại ", "Trạng thái ", "Thao tác"];
    const data = [
        {
            data: [
                <a>1</a>,
                "001",
                <span className="text-body"><i className="demo-pli-clock"></i> 2023-10-01</span>,
                "$100.00",
                "123456789JQK",
                "Hoạt động"
            ],
            actions: [
                {className: 'btn-info', icon: "fa-solid fa-info", onClick: handleInfoClick},
                {className: 'btn-warning', icon: 'fa-regular fa-pen-to-square', onClick: (item) => console.log('edit:', item)},
                {className: 'btn-danger', icon: 'fa-solid fa-trash', onClick: (item) => console.log('edit:', item)}
            ]
        },
    ];

    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <section>
                            <div className="container mt-5">
                                <div className="row">
                                    <div className="col-12 mb-3">
                                        <div className="card mb-3">
                                            <div className="card-header -4 mb-3">
                                                <h1 className="card-title mb-3">Danh sách giáo vụ</h1>
                                                <div className="row">
                                                    <div className="col-md-6 d-flex gap-1 align-items-center mb-3">
                                                        <Button onClick={handleClick} disabled={false} style={'primary'}
                                                                iconClass={"fa-regular fa-plus"}>
                                                            <NavLink to={"/instructional-edit"} >
                                                                Thêm mới
                                                            </NavLink>
                                                        </Button>
                                                    </div>
                                                    <div
                                                        className="col-md-6 d-flex gap-1 align-items-center justify-content-md-end mb-3">
                                                        <div className="form-group">
                                                            <input type="text" placeholder="Search..."
                                                                   className="form-control" autoComplete="off"/>
                                                        </div>
                                                        <div className="btn-group">
                                                            <button className="btn btn-icon btn-outline-light"><i
                                                                className="demo-pli-download-from-cloud fs-5"></i>
                                                            </button>
                                                            <button
                                                                className="btn btn-icon btn-outline-light dropdown-toggle dropdown-toggle-split"
                                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                                <span className="visually-hidden">Toggle Dropdown</span>
                                                            </button>
                                                            <ul className="dropdown-menu dropdown-menu-end">
                                                                <li><a className="dropdown-item" href="#">Action</a>
                                                                </li>
                                                                <li><a className="dropdown-item" href="#">Another
                                                                    action</a>
                                                                </li>
                                                                <li><a className="dropdown-item" href="#">Something else
                                                                    here</a></li>
                                                                <li>
                                                                    <hr className="dropdown-divider"/>
                                                                </li>
                                                                <li><a className="dropdown-item" href="#">Separated
                                                                    link</a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="table-responsove">
                                                    <Table headers={headers}>
                                                        <TableBody rows={data}/>
                                                    </Table>
                                                </div>
                                                <nav className="text-align-center mt-5" aria-label="Table navigation">
                                                    <ul className="pagination justify-content-center">
                                                        <li className="page-item disabled">
                                                            <a className="page-link">Previous</a>
                                                        </li>
                                                        <li className="page-item active" aria-current="page">
                                                            <span className="page-link">1</span>
                                                        </li>
                                                        <li className="page-item"><a className="page-link"
                                                                                     href="#">2</a>
                                                        </li>
                                                        <li className="page-item"><a className="page-link"
                                                                                     href="#">3</a>
                                                        </li>
                                                        <li className="page-item disabled"><a className="page-link"
                                                                                              href="#">...</a></li>
                                                        <li className="page-item"><a className="page-link"
                                                                                     href="#">5</a>
                                                        </li>
                                                        <li className="page-item">
                                                            <a className="page-link" href="#">Next</a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
            {showModal && (
                <ModalComponent
                    id="infoModal"
                    title={modalContent.title}
                    body={modalContent.body}
                    secondaryAction={closeModal}
                />
            )}
        </>
    )
}
export default InstructionalManager;