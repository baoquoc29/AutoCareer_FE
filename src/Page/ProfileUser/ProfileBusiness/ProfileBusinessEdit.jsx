import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import './ProfileBusinessEdit.css';
import {Button, Form, Input, InputNumber, Upload, Select, Row, Col, message} from "antd";
import {get_business_by_id, update_business} from "../../../Redux/actions/BusinessThunk";
import {UploadOutlined} from '@ant-design/icons';
import {useLocation, useNavigate} from "react-router-dom";
import {get_all_district, get_all_provinces, get_all_ward} from "../../../Redux/actions/WorkShopThunk";

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
    const { businessId } = location.state || {}; // Lấy id từ state được truyền vào
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
                province: business.location?.province?.id,
                district: business.location?.district?.id,
                ward: business.location?.ward?.id,

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
        console.log("Form values:", values);

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

        console.log('FormData:', formData);
        dispatch(update_business(business.id, formData)); // Dispatch action update
        navigate("/profile-business"); // Chuyển hướng
    };

    const handleCancel = () => {
        // Logic khi click vào nút Hủy, ví dụ quay lại trang trước
        navigate(-1); // Quay lại trang trước (nếu sử dụng React Router)
    };

    return (<section id="content__university__edit" className="content">
            <div className="container ">
                <div className="content__profile__university__edit">
                    <div className="content__business__edit content__wrap">
                        <section>
                            <div className="container__businessEdit mt-3">
                                <div className="row">
                                    <div className="col-12">
                                        <h1>Chỉnh sửa hồ sơ</h1>
                                        <div className="card__university__edit">
                                            <Form
                                                name="businessForm"
                                                form={form}
                                                onFinish={handleSubmit}
                                                layout="vertical"
                                            >
                                                <Row gutter={24}>
                                                    {/* Image Uploads Side by Side */}
                                                    <Col span={12}>
                                                        <Form.Item
                                                            label="Ảnh doanh nghiep"
                                                            name="businessImage"
                                                        >
                                                            <Upload
                                                                listType="picture-card"
                                                                maxCount={1}
                                                                fileList={null}
                                                                beforeUpload={handleBusinessImageChange} // Gọi hàm xử lý ảnh
                                                                showUploadList={false} // Không hiển thị danh sách file
                                                            >
                                                                {businessImagePreview ? (<img
                                                                    src={businessImagePreview}
                                                                    alt="Ảnh đại diện"
                                                                    style={{width: '100%', height: '100%'}}
                                                                />) : (<div>
                                                                    <UploadOutlined/>
                                                                    <div>Click để chọn ảnh</div>
                                                                </div>)}
                                                            </Upload></Form.Item>
                                                    </Col>
                                                    <Col span={12}>
                                                        <Form.Item
                                                            label="Ảnh giấy phép"
                                                            name="licenseImage"
                                                        >
                                                            <Upload
                                                                listType="picture-card"
                                                                maxCount={1}
                                                                fileList={null}
                                                                beforeUpload={handleLicenseImageChange} // Gọi hàm xử lý ảnh
                                                                showUploadList={false} // Không hiển thị danh sách file
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
                                                            rules={[{
                                                                required: true,
                                                                message: "Vui lòng nhập tên doanh nghiệp"
                                                            }]}
                                                        >
                                                            <Input/>
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Mã số thuế"
                                                            name="taxCode"
                                                            rules={[{
                                                                required: true, message: "Vui lòng nhập mã số thuế"
                                                            }]}
                                                        >
                                                            <Input

                                                            />
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Số lượng nhân viên"
                                                            name="companySize"
                                                            rules={[{
                                                                required: true,
                                                                message: "Vui lòng nhập số lượng nhân viên"
                                                            }, {
                                                                type: 'number',
                                                                message: "Vui lòng nhập một số hợp lệ"
                                                            }]}
                                                        >
                                                            <InputNumber min={1} style={{width: '100%'}}/>
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Website"
                                                            name="website"
                                                            rules={[{
                                                                required: true, message: "Vui lòng nhập website"
                                                            }]}
                                                        >
                                                            <Input/>
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Số điện thoại"
                                                            name="phone"
                                                            rules={[{
                                                                required: true, message: "Vui lòng nhập số điện thoại"
                                                            }]}
                                                        >
                                                            <Input/>
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Năm thành lập"
                                                            name="foundYear"
                                                        >
                                                            <Input/>
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
                                                                            const wordCount = value.trim().split(/\s+/).length; // Tính số từ
                                                                            if (wordCount > 1000) {
                                                                                return Promise.reject(new Error("Mô tả không được vượt quá 1000 từ"));
                                                                            }
                                                                        }
                                                                        return Promise.resolve(); // Nếu không có lỗi
                                                                    },
                                                                },
                                                            ]}
                                                        >
                                                            <Input.TextArea rows={5}/>
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Tỉnh/Thành phố"
                                                            name="province"
                                                            rules={[{
                                                                required: true, message: "Vui lòng chọn tỉnh/thành phố"
                                                            }]}
                                                        >
                                                            <Select
                                                                placeholder="Chọn tỉnh/thành phố"
                                                                value={selectedProvince}
                                                                onChange={handleProvinceChange} // Gọi hàm xử lý thay đổi tỉnh
                                                            >
                                                                {provinces.map(province => (
                                                                    <Option key={province.id} value={province.id}>
                                                                        {province.name}
                                                                    </Option>))}
                                                            </Select>
                                                        </Form.Item>

                                                        <Form.Item
                                                            label="Huyện"
                                                            name="district"
                                                            rules={[{
                                                                required: true, message: "Vui lòng chọn huyện"
                                                            }]}
                                                        >
                                                            <Select
                                                                placeholder="Chọn huyện"
                                                                value={selectedDistrict}
                                                                onChange={handleDistrictChange} // Gọi hàm xử lý thay đổi huyện
                                                                disabled={!selectedProvince} // Vô hiệu hóa nếu chưa chọn tỉnh
                                                            >
                                                                {districts.map(district => (
                                                                    <Option key={district.id} value={district.id}>
                                                                        {district.name}
                                                                    </Option>))}
                                                            </Select>
                                                        </Form.Item>
                                                        <Form.Item
                                                            label="Xã/Phường"
                                                            name="ward"
                                                            rules={[{
                                                                required: true, message: "Vui lòng chọn xã/phường"
                                                            }]}
                                                        >
                                                            <Select
                                                                placeholder="Chọn xã/phường"
                                                                disabled={!selectedDistrict} // Vô hiệu hóa nếu chưa chọn huyện
                                                            >
                                                                {wards.map(ward => (
                                                                    <Option key={ward.id} value={ward.id}>
                                                                        {ward.name}
                                                                    </Option>))}
                                                            </Select>
                                                        </Form.Item>
                                                        <Form.Item
                                                            label="Vị trí chi tiết"
                                                            name="descriptionLocation"
                                                            rules={[{
                                                                required: true, message: "Vui lòng nhập vị trí chi tiết"
                                                            }]}
                                                        >
                                                            <Input/>
                                                        </Form.Item>
                                                    </Col>
                                                </Row>

                                                <div className="form-actions d-flex justify-content-between w-100">
                                                    <Button onClick={handleCancel} type="default" danger>Hủy</Button>
                                                    <Button type="primary" htmlType="submit"
                                                            style={{marginLeft: '10px'}}>
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
        </section>);
};
export default ProfileBusinessEdit;
