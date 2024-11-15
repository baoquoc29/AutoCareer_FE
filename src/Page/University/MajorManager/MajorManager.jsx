 import React, {useState} from 'react'
import FormInput from "../../../Component/FormInputComponent/FormInputComponent";
import Table from "../../../Component/TableComponent/Table";
import TableBody from "../../../Component/TableBodyComponent/TableBody";

const MajorManager = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
        check: false
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form and set errors if any
        // Submit form data
    };

    const headers = ["Invoice", "User", "Order date", "Amount", "Status", "Tracking Number", "Actions"];
    const data = [
        {
            data: [
                <a className="btn-link" href="#">12345</a>,
                "John Doe",
                <span className="text-body"><i className="demo-pli-clock"></i> 2023-10-01</span>,
                "$100.00",
                <div className="badge d-block bg-success">Paid</div>,
                "ABC123456"
            ],
            actions: [
                {className: 'btn-info', icon: "fa-eye", onClick: (item) => console.log('Edit:', item)},
                {className: 'btn-warning', icon: 'fa-pen', onClick: (item) => console.log('Delete:', item)}
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
                                    <div className="col-md-3 mb-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <h1 className="card-title p-2">Quản lý sinh viên</h1>
                                                <form className="row g-3" onSubmit={handleSubmit}>
                                                    <div className="col-md-6">
                                                        <FormInput
                                                            label="Email"
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            error={errors.email}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <FormInput
                                                            label="Password"
                                                            type="password"
                                                            name="password"
                                                            value={formData.password}
                                                            onChange={handleChange}
                                                            error={errors.password}
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <FormInput
                                                            label="Address"
                                                            type="text"
                                                            name="address1"
                                                            value={formData.address1}
                                                            onChange={handleChange}
                                                            placeholder="1234 Main St"
                                                            error={errors.address1}
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <FormInput
                                                            label="Address 2"
                                                            type="text"
                                                            name="address2"
                                                            value={formData.address2}
                                                            onChange={handleChange}
                                                            placeholder="Apartment, studio, or floor"
                                                            error={errors.address2}
                                                        />
                                                    </div>
                                                    <div className="col-md-6">
                                                        <FormInput
                                                            label="City"
                                                            type="text"
                                                            name="city"
                                                            value={formData.city}
                                                            onChange={handleChange}
                                                            error={errors.city}
                                                        />
                                                    </div>
                                                    <div className="col-md-4">
                                                        <label htmlFor="inputState" className="form-label">State</label>
                                                        <select id="inputState" name="state" className="form-select"
                                                                value={formData.state} onChange={handleChange}>
                                                            <option value="">Choose...</option>
                                                            <option value="State 1">State 1</option>
                                                            <option value="State 2">State 2</option>
                                                            <option value="State 3">State 3</option>
                                                        </select>
                                                        {errors.state &&
                                                            <div className="invalid-feedback">{errors.state}</div>}
                                                    </div>
                                                    <div className="col-md-2">
                                                        <FormInput
                                                            label="Zip"
                                                            type="text"
                                                            name="zip"
                                                            value={formData.zip}
                                                            onChange={handleChange}
                                                            error={errors.zip}
                                                        />
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-check">
                                                            <input
                                                                id="_dm-gridCheck"
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                name="check"
                                                                checked={formData.check}
                                                                onChange={handleChange}
                                                            />
                                                            <label htmlFor="_dm-gridCheck" className="form-check-label">
                                                                Check me out
                                                            </label>
                                                            {errors.check &&
                                                                <div className="invalid-feedback">{errors.check}</div>}
                                                        </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <button type="submit" className="btn btn-primary">Sign in
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-9 mb-3">
                                        <div className="card mb-3">
                                            <div className="card-header -4 mb-3">
                                                <h5 className="card-title mb-3">Table with toolbar</h5>
                                                <div className="row">
                                                    <div className="col-md-6 d-flex gap-1 align-items-center mb-3">
                                                        <button
                                                            className="btn btn-primary hstack gap-2 align-self-center">
                                                            <i className="demo-psi-add fs-5"></i>
                                                            <span className="vr"></span>
                                                            Add New
                                                        </button>
                                                        <button className="btn btn-icon btn-outline-light">
                                                            <i className="demo-pli-printer fs-5"></i>
                                                        </button>
                                                        <div className="btn-group">
                                                            <button className="btn btn-icon btn-outline-light"><i
                                                                className="demo-pli-exclamation fs-5"></i></button>
                                                            <button className="btn btn-icon btn-outline-light"><i
                                                                className="demo-pli-recycling fs-5"></i></button>
                                                        </div>
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
        </>
    )
}
export default MajorManager;