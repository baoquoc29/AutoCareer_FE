import Table from "../../../Component/TableComponent/Table";
import TableBody from "../../../Component/TableBodyComponent/TableBody";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {create_section, get_all_sections} from "../../../Redux/actions/SectionThunk";
import {useFormik} from "formik";
import FormInput from "../../../Component/FormInputComponent/FormInputComponent";


const SectionManager = () => {
    const dispatch = useDispatch();
    const sections = useSelector((state) => state.SectionReducer.sections);

    useEffect(() => {
        dispatch(get_all_sections())
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            status: "ACTIVE"
        },
        onSubmit: (values) => {
            dispatch(create_section(values));
        }
    })

    const headers = ["STT", "Tên khoa", "trạng thái", "Thao tác"];
    const row = sections.map((section, index) => ({
        data: [
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a key={section.id}>{index + 1}</a>, section.name, section.status ? "Hoạt động" : "Tạm ngưng"
        ],
        actions: [
            {className: 'btn-info', icon: "fa-solid fa-info", onClick: (item) => console.log('edit:', item)},
            {
                className: 'btn-warning',
                icon: 'fa-regular fa-pen-to-square',
                onClick: (item) => console.log('edit:', item)
            },
            {className: 'btn-danger', icon: 'fa-solid fa-trash', onClick: (item) => console.log('edit:', item)}
        ]
    }))
    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <section>
                            <div className="container mt-5">
                                <div className="row">
                                    <div className="col-4 mb-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <h1 className="card-title">Thông tin Khoa</h1>
                                                <form className="row g-3" onSubmit={formik.handleSubmit}>
                                                    <div className="col-md-12">
                                                        <FormInput
                                                            onChange={formik.handleChange}
                                                            name="name"
                                                            label="Name"
                                                            value={formik.values.name}/>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <FormInput
                                                            onChange={formik.handleChange}
                                                            name="description"
                                                            label="Description"
                                                            value={formik.values.description}/>
                                                    </div>
                                                    <div className="col-sm-12">
                                                        <label htmlFor="status" className="form-label">Trạng
                                                            thái</label>
                                                        <div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    type="radio"
                                                                    id="statusActive"
                                                                    name="status"
                                                                    value="active"
                                                                    className="form-check-input"
                                                                    checked
                                                                />
                                                                <label className="form-check-label"
                                                                       htmlFor="statusActive">Hoạt động</label>
                                                            </div>
                                                            <div className="form-check form-check-inline">
                                                                <input
                                                                    type="radio"
                                                                    id="statusInactive"
                                                                    name="status"
                                                                    value="inactive"
                                                                    className="form-check-input"
                                                                />
                                                                <label className="form-check-label"
                                                                       htmlFor="statusInactive">Không hoạt động</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary"> Thêm</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-8 mb-3">
                                        <div className="card mb-3">
                                            <div className="card-header -4 mb-3">
                                                <h1 className="card-title mb-3">Danh sách Khoa</h1>
                                                <div className="row">
                                                    <div className="col-md-6 d-flex gap-1 align-items-center mb-3">

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
                                                        <TableBody rows={row}/>
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
        </>
    )
}
export default SectionManager;