import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import './ProfileBusinessEdit.css';
import {Button, Form, Input, Upload, Select, Row, Col,} from "antd";
import {get_business_by_id, update_business} from "../../../Redux/actions/BusinessThunk";
import {UploadOutlined} from '@ant-design/icons';
import {useLocation, useNavigate} from "react-router-dom";
import {get_all_district, get_all_provinces, get_all_ward} from "../../../Redux/actions/WorkShopThunk";
import {toast} from "react-toastify";

const {Option} = Select;
const ProfileBusinessEdit = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const business = useSelector((state) => state.BusinessReducer.business);
    const [businessImagePreview, setBusinessImagePreview] = useState(null);
    const [licenseImagePreview, setLicenseImagePreview] = useState(null);
    const [form] = Form.useForm();
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const location = useLocation(); // Sử dụng useLocation để lấy state
    const {businessId} = location.state || {}; // Lấy id từ state được truyền vào
    const {provinces, districts, wards} = useSelector(state => state.LocationReducer);
    useEffect(() => {
        if (businessId) {
            dispatch(get_business_by_id(businessId)); // Gọi API với id
        }
    }, [dispatch, businessId]);

    useEffect(() => {
        if (business) {
            dispatch(get_all_provinces());
            form.setFieldsValue({
                name: business.name || '',
                taxCode: business.taxCode || '',
                companySize: business.companySize || '',
                email: business.email || '',
                website: business.website || '',
                phone: business.phone || '',
                foundYear: business.foundYear || '',
                description: business.description || '',
                businessImage: null,
                licenseImage: null,
                descriptionLocation: business.location?.description || '',
                provinceId: business.location?.province?.id,
                districtId: business.location?.district?.id,
                wardId: business.location?.ward?.id,
            })
            setSelectedProvince(business.location?.province?.id);
            setSelectedDistrict(business.location?.district?.id);
            if (business.location?.province?.id) {
                dispatch(get_all_district(business.location.province?.id));
            }
            if (business.location?.district?.id) {
                dispatch(get_all_ward(business.location.district?.id));
            }
            if (business.businessImageId) {
                setBusinessImagePreview(`${GET_IMAGE_URI}${business.businessImageId}`);
            }
            if (business.licenseImageId) {
                setLicenseImagePreview(`${GET_IMAGE_URI}${business.licenseImageId}`);
            }
        }
    }, [business, form, dispatch])

    const handleProvinceChange = (provinceId) => {
        setSelectedProvince(provinceId);
        form.setFieldsValue({districtId: null, wardId: null}); // Xóa giá trị huyện và xã
        setSelectedDistrict(null);
        dispatch(get_all_district(provinceId)); // Gọi API để lấy danh sách huyện
    };

    const handleDistrictChange = (districtId) => {
        setSelectedDistrict(districtId);
        form.setFieldsValue({wardId: null}); // Xóa giá trị xã
        dispatch(get_all_ward(districtId)); // Gọi API để lấy danh sách xã
    };

    const handleBusinessImageChange = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setBusinessImagePreview(reader.result); // Cập nhật hình ảnh xem trước
        };
        reader.readAsDataURL(file); // Đọc ảnh dưới dạng DataURL
        return false; // Ngừng hành động mặc định của upload
    };

    const handleLicenseImageChange = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            setLicenseImagePreview(reader.result); // Cập nhật hình ảnh xem trước
        };
        reader.readAsDataURL(file); // Đọc ảnh dưới dạng DataURL
        return false; // Ngừng hành động mặc định của upload
    };

    const handleSubmit = (values) => {
        const formData = new FormData();
        // Thêm các giá trị khác từ form vào FormData
        for (const key in values) {
            if (values[key] && key !== 'businessImage' && key !== 'licenseImage') {
                formData.append(key, values[key]);
            }
        }

        // Thêm ảnh doanh nghiệp vào FormData
        const businessImageFile = values.businessImage ? values.businessImage.fileList[0].originFileObj : null;
        if (businessImageFile) {
            formData.append("businessImage", businessImageFile);
        }

        // Thêm ảnh giấy phép vào FormData
        const licenseImageFile = values.licenseImage ? values.licenseImage.fileList[0]?.originFileObj : null;
        if (licenseImageFile) {
            formData.append("licenseImage", licenseImageFile);
        }

        dispatch(update_business(business.id, formData))// Dispatch action update
            .then((success) => {
                if (success) {
                    navigate(-1);
                }
            })
            .catch((error) => {
                console.error("Lỗi khi chỉnh sửa doanh nghiệp:", error);
                toast.error("Có lỗi xảy ra khi chỉnh sửa doanh nghiệp. Vui lòng thử lại.");
            });
    };

    const handleCancel = () => {
        // Logic khi click vào nút Hủy, ví dụ quay lại trang trước
        navigate(-1); // Quay lại trang trước (nếu sử dụng React Router)
    };

    return (
        <section id="content__university__edit" className="content">
            <div className="container ">
                <div className="content__profile__university__edit">
                    <div className="content__business__edit content__wrap">
                        <section>
                            <div className="container__businessEdit mt-3">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="card__university__edit">
                                            <h1 className="title__Business__edit">Chỉnh sửa hồ sơ</h1>
                                            <hr className="line__Business__edit"/>
                                            <Form
                                                name="businessForm"
                                                form={form}
                                                onFinish={handleSubmit}
                                                layout="vertical"
                                            >
                                                <Row gutter={24}>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            label={(
                                                                <span>
                                                                    Ảnh doanh nghiệp
                                                                    <span style={{fontSize: '12px', marginLeft: '5px'}}>
                                                                        (click vào ảnh để chọn)
                                                                    </span>
                                                                </span>
                                                            )}
                                                            name="businessImage"
                                                        >
                                                            <Upload
                                                                listType="picture-card"
                                                                maxCount={1}
                                                                fileList={[]}
                                                                beforeUpload={handleBusinessImageChange}
                                                                showUploadList={false}
                                                            >
                                                                {businessImagePreview ? (<img
                                                                    src={businessImagePreview}
                                                                    alt="Ảnh đại diện"
                                                                    style={{width: '100%', height: '100%'}}
                                                                />) : (<div>
                                                                    <UploadOutlined/>
                                                                    <div>Click để chọn ảnh</div>
                                                                </div>)}
                                                            </Upload>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            label={(
                                                                <span>
                                                                    Ảnh giấy phép
                                                                    <span style={{fontSize: '12px', marginLeft: '5px'}}>
                                                                        (click vào ảnh để chọn)
                                                                    </span>
                                                                </span>
                                                            )}
                                                            name="licenseImage"
                                                        >
                                                            <Upload
                                                                listType="picture-card"
                                                                maxCount={1}
                                                                fileList={[]}
                                                                beforeUpload={handleLicenseImageChange}
                                                                showUploadList={false}
                                                            >
                                                                {licenseImagePreview ? (<img
                                                                    src={licenseImagePreview}
                                                                    alt="Ảnh giấy phép"
                                                                    style={{width: '100%', height: '100%'}}
                                                                />) : (<div>
                                                                    <UploadOutlined/>
                                                                    <div>Click để chọn ảnh</div>
                                                                </div>)}
                                                            </Upload>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                                <Row gutter={24}>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            label="Tên doanh nghiệp"
                                                            name="name"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Vui lòng nhập tên doanh nghiệp"
                                                                },
                                                                {
                                                                    validator: (_, value) => {
                                                                        if (value && value.startsWith(' ')) {
                                                                            return Promise.reject(new Error('Tên không được bắt đầu bằng dấu cách'));
                                                                        }
                                                                        return Promise.resolve();
                                                                    },
                                                                },
                                                                {
                                                                    max: 255,
                                                                    message: "Tên doanh nghiệp không được quá 255 ký tự"
                                                                },
                                                            ]}
                                                        >
                                                            <Input/>
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Mã số thuế"
                                                            name="taxCode"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Vui lòng nhập mã số thuế",
                                                                },
                                                                {
                                                                    validator: (_, value) => {
                                                                        // Kiểm tra dấu cách ở đầu
                                                                        if (value && value.startsWith(' ')) {
                                                                            return Promise.reject(new Error('Mã số thuế không được bắt đầu bằng dấu cách'));
                                                                        }

                                                                        // Kiểm tra nếu có ký tự không phải số
                                                                        if (value && !/^[0-9]*$/.test(value)) {
                                                                            return Promise.reject(new Error('Mã số thuế chỉ được chứa số'));
                                                                        }

                                                                        // Kiểm tra chiều dài
                                                                        if (value && value.length !== 10 && value.length !== 13) {
                                                                            return Promise.reject(new Error('Mã số thuế phải có 10 hoặc 13 ký tự'));
                                                                        }

                                                                        // Nếu tất cả điều kiện đều hợp lệ
                                                                        return Promise.resolve();
                                                                    },
                                                                },
                                                            ]}
                                                            style={{ marginBottom: '24px' }}
                                                        >
                                                            <Input />
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Số lượng nhân viên"
                                                            name="companySize"
                                                            rules={[
                                                                {
                                                                    validator: (_, value) => {
                                                                        // Kiểm tra dấu cách ở đầu
                                                                        if (value && value.startsWith(' ')) {
                                                                            return Promise.reject(new Error('Số lượng nhân viên không được bắt đầu bằng dấu cách'));
                                                                        }

                                                                        // Kiểm tra nếu có ký tự không phải số
                                                                        if (value && !/^[0-9]+$/.test(value)) {
                                                                            return Promise.reject(new Error('Số lượng nhân viên phải là một số'));
                                                                        }

                                                                        // Kiểm tra giá trị nhập vào
                                                                        if (value) {
                                                                            const numberValue = parseInt(value);
                                                                            if (numberValue < 50) {
                                                                                return Promise.reject(new Error("Số lượng nhân viên phải lớn hơn hoặc bằng 50"));
                                                                            }
                                                                            if (numberValue > 1000000) {
                                                                                return Promise.reject(new Error("Số lượng nhân viên phải nhỏ hơn hoặc bằng 1.000.000"));
                                                                            }
                                                                        }

                                                                        // Nếu tất cả điều kiện đều hợp lệ
                                                                        return Promise.resolve();
                                                                    },
                                                                },
                                                            ]}
                                                        >
                                                            <Input />
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Website"
                                                            name="website"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Vui lòng nhập website"
                                                                },
                                                                {
                                                                    validator: (_, value) => {
                                                                        // Kiểm tra dấu cách ở đầu
                                                                        if (value && value.startsWith(' ')) {
                                                                            return Promise.reject(new Error('Website không được bắt đầu bằng dấu cách'));
                                                                        }

                                                                        // Kiểm tra định dạng URL
                                                                        if (value && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(value)) {
                                                                            return Promise.reject(new Error("Vui lòng nhập đúng định dạng website"));
                                                                        }

                                                                        // Kiểm tra độ dài của website
                                                                        if (value && value.length > 255) {
                                                                            return Promise.reject(new Error("Website không được quá 255 ký tự"));
                                                                        }

                                                                        // Nếu tất cả điều kiện đều hợp lệ
                                                                        return Promise.resolve();
                                                                    },
                                                                },
                                                            ]}
                                                        >
                                                            <Input />
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Số điện thoại"
                                                            name="phone"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Vui lòng nhập số điện thoại"
                                                                },
                                                                {
                                                                    validator: (_, value) => {
                                                                        // Kiểm tra dấu cách ở đầu
                                                                        if (value && value.startsWith(' ')) {
                                                                            return Promise.reject(new Error('Số điện thoại không được bắt đầu bằng dấu cách'));
                                                                        }

                                                                        // Kiểm tra định dạng số điện thoại (chỉ gồm 10 chữ số)
                                                                        if (value && !/^[0-9]{10}$/.test(value)) {
                                                                            return Promise.reject(new Error("Số điện thoại phải là 10 số"));
                                                                        }

                                                                        // Nếu tất cả điều kiện đều hợp lệ
                                                                        return Promise.resolve();
                                                                    },
                                                                },
                                                            ]}
                                                        >
                                                            <Input />
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Năm thành lập"
                                                            name="foundYear"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Vui lòng nhập năm thành lập"
                                                                },
                                                                {
                                                                    validator: (_, value) => {
                                                                        // Kiểm tra dấu cách ở đầu
                                                                        if (value && value.toString().startsWith(' ')) {
                                                                            return Promise.reject(new Error('Năm thành lập không được bắt đầu bằng dấu cách'));
                                                                        }

                                                                        // Kiểm tra nếu giá trị không phải là một số
                                                                        if (value && isNaN(value)) {
                                                                            return Promise.reject(new Error('Năm thành lập phải là một số'));
                                                                        }

                                                                        // Kiểm tra nếu năm thành lập lớn hơn năm hiện tại
                                                                        if (value) {
                                                                            const currentYear = new Date().getFullYear();
                                                                            if (parseInt(value) > currentYear) {
                                                                                return Promise.reject(new Error(`Năm thành lập không được lớn hơn năm hiện tại (${currentYear})`));
                                                                            }
                                                                        }

                                                                        // Nếu tất cả điều kiện đều hợp lệ
                                                                        return Promise.resolve();
                                                                    },
                                                                },
                                                            ]}
                                                        >
                                                            <Input />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            label="Mô tả"
                                                            name="description"
                                                            rules={[
                                                                {
                                                                    validator: (_, value) => {
                                                                        if (value) {
                                                                            const wordCount = value.trim().split(/\s+/).length;
                                                                            if (wordCount > 1000) {
                                                                                return Promise.reject(new Error("Mô tả không được vượt quá 1000 từ"));
                                                                            }
                                                                        }
                                                                        return Promise.resolve();
                                                                    },
                                                                },
                                                            ]}
                                                        >
                                                            <Input.TextArea autoSize={{minRows: 5, maxRows: 5}}/>
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Tỉnh/Thành phố"
                                                            name="provinceId"
                                                            rules={[{
                                                                required: true, message: "Vui lòng chọn tỉnh/thành phố"
                                                            }]}
                                                        >
                                                            <Select
                                                                showSearch
                                                                placeholder="Chọn tỉnh/thành phố"
                                                                value={selectedProvince}
                                                                onChange={handleProvinceChange}
                                                                filterOption={(input, option) =>
                                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                                }
                                                            >
                                                                {provinces?.map(province => (
                                                                    <Option key={province.id} value={province.id} label={province.name}>
                                                                        {province.name}
                                                                    </Option>))}
                                                            </Select>
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Huyện"
                                                            name="districtId"
                                                            rules={[{
                                                                required: true, message: "Vui lòng chọn huyện"
                                                            }]}
                                                        >
                                                            <Select
                                                                showSearch
                                                                placeholder="Chọn huyện"
                                                                value={selectedDistrict}
                                                                onChange={handleDistrictChange}
                                                                disabled={!selectedProvince}
                                                                filterOption={(input, option) =>
                                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                                }
                                                            >
                                                                {districts?.map(district => (
                                                                    <Option key={district.id} value={district.id} label={district.name}>
                                                                        {district.name}
                                                                    </Option>))}
                                                            </Select>
                                                        </Form.Item>
                                                        <Form.Item
                                                            label="Xã/Phường"
                                                            name="wardId"
                                                            rules={[{
                                                                required: true, message: "Vui lòng chọn xã/phường"
                                                            }]}
                                                        >
                                                            <Select
                                                                showSearch
                                                                placeholder="Chọn xã/phường"
                                                                disabled={!selectedDistrict}
                                                                filterOption={(input, option) =>
                                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                                                }
                                                            >
                                                                {wards?.map(ward => (
                                                                    <Option key={ward.id} value={ward.id} label={ward.name}>
                                                                        {ward.name}
                                                                    </Option>))}
                                                            </Select>
                                                        </Form.Item>
                                                        <Form.Item
                                                            label="Vị trí chi tiết"
                                                            name="descriptionLocation"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Vui lòng nhập vị trí chi tiết"
                                                                },
                                                                {
                                                                    max: 255,
                                                                    message: "Vị trí chi tiết không được quá 255 ký tự"
                                                                }
                                                            ]}
                                                        >
                                                            <Input/>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>

                                                <div className="form-actions d-flex w-100"
                                                     style={{justifyContent: 'flex-end'}}>
                                                    <Button onClick={handleCancel} type="default" danger>Hủy</Button>
                                                    <Button type="primary" htmlType="submit"
                                                            style={{marginLeft: '20px'}}>
                                                        Lưu
                                                    </Button>
                                                </div>

                                            </Form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileBusinessEdit;
