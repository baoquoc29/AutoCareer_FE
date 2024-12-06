import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import './style/ProfileEdit.css'

import {update_university} from "../../../Redux/actions/UniversityThunk";
import {Button} from "antd";

const ProfileUniversityEdit = () => {
    const dispatch = useDispatch();
    const university = useSelector(state => state.UniversityReducer.university);
    const [preview, setPreview] = useState(null);
    const [formValues, setFormValues] = useState({
        name: university?.name || '',
        website: university?.website || '',
        phone: university?.phone || '',
        foundedYear: university?.foundedYear || '',
        description: university?.description || '',
        logoImageId: university?.logoImageId || '',
    });

    const logoUrl = formValues.logoImageId ? `${GET_IMAGE_URI}${formValues.logoImageId}` : '';

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFormValues({
            ...formValues,
            logoImageId: file,
        });
        // Preview image
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        Object.keys(formValues).forEach((key) => {
            formData.append(key, formValues[key]);
        });
        dispatch(update_university(university.id, formData));
    };


    return (
        <>
            <section id="content__university__edit" className="content">
                <div className="content__profile__university__edit ">
                    <div className="content__university__edit content__wrap">
                        <section>
                            <div className="container mt-5">
                                <div className="row">
                                    <div className="col-12">
                                        <h1>Chỉnh sửa hồ sơ </h1>
                                        <div className="card__university__edit">
                                            <form id="universityForm" className="form__university__edit"
                                                  onSubmit={handleSubmit}>
                                                <div className="row form-row">
                                                    <div className="col-md-5">
                                                        <div className="form-group">
                                                            <label htmlFor="name">Tên trường đại học</label>
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                                value={formValues.name}
                                                                onChange={handleInputChange}
                                                                className="form-control"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="website">Website</label>
                                                            <input
                                                                type="url"
                                                                id="website"
                                                                name="website"
                                                                value={formValues.website}
                                                                onChange={handleInputChange}
                                                                className="form-control"
                                                                required
                                                            />
                                                        </div>
                                                        <div className="row">
                                                            <div className="form-group col-6">
                                                                <label htmlFor="phone">Số điện thoại</label>
                                                                <input
                                                                    type="tel"
                                                                    id="phone"
                                                                    name="phone"
                                                                    value={formValues.phone}
                                                                    onChange={handleInputChange}
                                                                    className="form-control"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="form-group col-6">
                                                                <label htmlFor="phone">Năm thành lập</label>
                                                                <input
                                                                    id="foundedYear"
                                                                    name="foundedYear"
                                                                    value={formValues.foundedYear}
                                                                    onChange={handleInputChange}
                                                                    className="form-control"
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="form-group">
                                                            <label htmlFor="description">Mô tả</label>
                                                            <textarea
                                                                id="description"
                                                                name="description"
                                                                value={formValues.description}
                                                                onChange={handleInputChange}
                                                                className="form-control"
                                                                required
                                                            ></textarea>
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="avatar">Ảnh đại diện</label>
                                                            <input
                                                                type="file"
                                                                id="avatar"
                                                                name="avatar"
                                                                onChange={handleFileChange}
                                                                accept="image/*"
                                                                className="form-control-file"
                                                            />
                                                            {preview && (
                                                                <div className="mt-3">
                                                                    <img src={preview} alt="Preview" className="img-fluid"/>
                                                                </div>
                                                            )}
                                                            {logoUrl && !preview && (
                                                                <div className="mt-3">
                                                                    <img src={logoUrl} alt="Logo" className="img-fluid"/>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-actions d-flex justify-content-end">
                                                    <Button type="primary" htmlType="submit">Lưu</Button>
                                                    <Button style={{marginLeft: '10px'}}>Đóng</Button>
                                                </div>
                                            </form>
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
export default ProfileUniversityEdit;
