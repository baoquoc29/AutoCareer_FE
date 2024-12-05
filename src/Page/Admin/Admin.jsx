import React from 'react'

export function Admin() {
    console.log("admin")
    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div className="content__boxed">
                            <div className="content__wrap">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="card">
                                            <div className="card-body">

                                                <h5 className="card-title">Custom styles</h5>

                                                <form className="row g-3 needs-validation" noValidate>
                                                    <div className="col-md-4">
                                                        <label htmlFor="_dm-vCustomFirsname" className="form-label">First
                                                            name</label>
                                                        <input id="_dm-vCustomFirsname" type="text"
                                                               className="form-control" value="Aaron" required/>
                                                        <div className="invalid-feedback">Please input your first name
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label htmlFor="_dm-vCustomLastname" className="form-label">Last
                                                            name</label>
                                                        <input id="_dm-vCustomLastname" type="text"
                                                               className="form-control" required/>
                                                        <div className="valid-feedback">Looks good!</div>
                                                        <div className="invalid-feedback">Please input your last name
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label htmlFor="_dm-vCustomAddress"
                                                               className="form-label">Address</label>
                                                        <input id="_dm-vCustomAddress" type="text"
                                                               className="form-control" required/>
                                                        <div className="invalid-feedback">Please provide a valid
                                                            address.
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <label htmlFor="_dm-vCustomCountry"
                                                               className="form-label">Country</label>
                                                        <select id="_dm-vCustomCountry" className="form-select"
                                                                required>
                                                            <option selected disabled value="">Choose...</option>
                                                            <option>...</option>
                                                        </select>
                                                        <div className="invalid-feedback">Please select a valid
                                                            country.
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5">
                                                        <label htmlFor="_dm-vCustomCity"
                                                               className="form-label">City</label>
                                                        <input id="_dm-vCustomCity" type="text" className="form-control"
                                                               required/>
                                                        <div className="invalid-feedback">Please provide a valid city.
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <label htmlFor="_dm-vCustomAbout"
                                                               className="form-label">About</label>
                                                        <textarea id="_dm-vCustomAbout" className="form-control"
                                                                  rows="2" required></textarea>
                                                        <div className="invalid-feedback">Tell me us your self.</div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="form-check">
                                                            <input id="_dm-vCustomAgree" className="form-check-input"
                                                                   type="checkbox" required/>
                                                            <label htmlFor="_dm-vCustomAgree"
                                                                   className="form-check-label">
                                                                Agree to terms and conditions
                                                            </label>
                                                            <div className="invalid-feedback">
                                                                You must agree before submitting.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 pt-4">
                                                        <button className="btn btn-primary" type="submit">Submit form
                                                        </button>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>

                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="card">
                                            <div className="card-body">

                                                <h5 className="card-title">Tooltips</h5>
                                                <form className="row g-3 needs-validation" noValidate>
                                                    <div className="col-md-4 position-relative">
                                                        <label htmlFor="_dm-vTooltipFirsname" className="form-label">First
                                                            name</label>
                                                        <input id="_dm-vTooltipFirsname" type="text"
                                                               className="form-control" value="Aaron" required/>
                                                        <div className="invalid-tooltip">Please input your first name
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 position-relative">
                                                        <label htmlFor="_dm-vTooltipLastname" className="form-label">Last
                                                            name</label>
                                                        <input id="_dm-vTooltipLastname" type="text"
                                                               className="form-control" required/>
                                                        <div className="valid-tooltip">Looks good!</div>
                                                        <div className="invalid-tooltip">Please input your last name
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 position-relative">
                                                        <label htmlFor="_dm-vTooltipAddress"
                                                               className="form-label">Address</label>
                                                        <input id="_dm-vTooltipAddress" type="text"
                                                               className="form-control" required/>
                                                        <div className="invalid-tooltip">Please provide a valid
                                                            address.
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 position-relative">
                                                        <label htmlFor="_dm-vTooltipCountry"
                                                               className="form-label">Country</label>
                                                        <select id="_dm-vTooltipCountry" className="form-select"
                                                                required>
                                                            <option selected disabled value="">Choose...</option>
                                                            <option>...</option>
                                                        </select>
                                                        <div className="invalid-tooltip">Please select a valid
                                                            country.
                                                        </div>
                                                    </div>
                                                    <div className="col-md-5 position-relative">
                                                        <label htmlFor="_dm-vTooltipCity"
                                                               className="form-label">City</label>
                                                        <input id="_dm-vTooltipCity" type="text"
                                                               className="form-control" required/>
                                                        <div className="invalid-tooltip">Please provide a valid city.
                                                        </div>
                                                    </div>
                                                    <div className="col-md-12 position-relative">
                                                        <label htmlFor="_dm-vTooltipAbout"
                                                               className="form-label">About</label>
                                                        <textarea id="_dm-vTooltipAbout" className="form-control"
                                                                  rows="2" required></textarea>
                                                        <div className="invalid-tooltip">Tell me us your self.</div>
                                                    </div>
                                                    <div className="col-12 position-relative">
                                                        <div className="form-check">
                                                            <input id="_dm-vTooltipAgree" className="form-check-input"
                                                                   type="checkbox" required/>
                                                            <label htmlFor="_dm-vTooltipAgree"
                                                                   className="form-check-label">
                                                                Agree to terms and conditions
                                                            </label>
                                                            <div className="invalid-tooltip">
                                                                You must agree before submitting.
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-12 pt-4">
                                                        <button className="btn btn-primary" type="submit">Submit form
                                                        </button>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-body">

                                        <h5 className="card-title">Supported elements</h5>

                                        <form className="was-validated">
                                            <div className="mb-3">
                                                <label htmlFor="validationTextarea"
                                                       className="form-label">Textarea</label>
                                                <textarea className="form-control" id="validationTextarea"
                                                          placeholder="Required example textarea" required></textarea>
                                                <div className="invalid-feedback">
                                                    Please enter a message in the textarea.
                                                </div>
                                            </div>

                                            <div className="form-check mb-3">
                                                <input type="checkbox" className="form-check-input"
                                                       id="validationFormCheck1" required/>
                                                <label className="form-check-label" htmlFor="validationFormCheck1">Check
                                                    this checkbox</label>
                                                <div className="invalid-feedback">Example invalid feedback text</div>
                                            </div>

                                            <div className="form-check">
                                                <input type="radio" className="form-check-input"
                                                       id="validationFormCheck2" name="radio-stacked" required/>
                                                <label className="form-check-label" htmlFor="validationFormCheck2">Toggle
                                                    this radio</label>
                                            </div>
                                            <div className="form-check mb-3">
                                                <input type="radio" className="form-check-input"
                                                       id="validationFormCheck3" name="radio-stacked" required/>
                                                <label className="form-check-label" htmlFor="validationFormCheck3">Or
                                                    toggle this other radio</label>
                                                <div className="invalid-feedback">More example invalid feedback text
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <select className="form-select" required aria-label="select example">
                                                    <option value="">Open this select menu</option>
                                                    <option value="1">One</option>
                                                    <option value="2">Two</option>
                                                    <option value="3">Three</option>
                                                </select>
                                                <div className="invalid-feedback">Example invalid select feedback</div>
                                            </div>

                                            <div className="mb-3">
                                                <input type="file" className="form-control" aria-label="file example"
                                                       required/>
                                                <div className="invalid-feedback">Example invalid form file feedback
                                                </div>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}