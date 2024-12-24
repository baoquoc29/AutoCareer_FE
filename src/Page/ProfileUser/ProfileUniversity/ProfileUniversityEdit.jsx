import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import './style/ProfileEdit.css'

import {get_university_id, update_university} from "../../../Redux/actions/UniversityThunk";
import {Button, Card, Col, Divider, Form, Input, Modal, Row, Select, Space, Typography, Upload} from "antd";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import TextArea from "antd/es/input/TextArea";
import {get_all_district, get_all_provinces, get_all_ward} from "../../../Redux/actions/LocationThunk";
import {UploadOutlined} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import UniversityValidation from "../../../Utils/Validation/University/UniversityValidation";

const {Title} = Typography;


const ProfileUniversityEdit = () => {
    const dispatch = useDispatch();
    const university = useSelector(state => state.UniversityReducer.university);
    const [preview, setPreview] = useState(null);
    const {provinces, districts, wards} = useSelector(state => state.LocationReducer);
    const navigate = useNavigate();
    useEffect(() => {
        if (university?.id) {
            dispatch(get_university_id(university.id)); // Lấy thông tin trường từ API
        }
        dispatch(get_all_provinces()); // Lấy danh sách tỉnh/thành phố
    }, [dispatch]);

// Lấy danh sách quận/huyện khi tỉnh được chọn
    useEffect(() => {
        if (university?.location?.province?.id) {
            dispatch(get_all_district(university.location.province.id)); // Lấy danh sách quận/huyện
        }
    }, [dispatch, university?.location?.province?.id]);

// Lấy danh sách xã/phường khi quận được chọn
    useEffect(() => {
        if (university?.location?.district?.id) {
            dispatch(get_all_ward(university.location.district.id)); // Lấy danh sách xã/phường
        }
    }, [dispatch, university?.location?.district?.id]);

    const handleProvinceChange = (value) => {
        formik.setFieldValue('provinceId', value);
        formik.setFieldValue('districtId', null); // Đặt lại giá trị districtId khi tỉnh/thành phố thay đổi
        formik.setFieldValue('wardId', null); // Đặt lại giá trị wardId khi tỉnh/thành phố thay đổi
        dispatch(get_all_district(value)); // Gọi API để lấy quận/huyện của tỉnh đã chọn
    };

    const handleDistrictChange = (value) => {
        formik.setFieldValue('districtId', value);
        formik.setFieldValue('wardId', null); // Đặt lại giá trị wardId khi quận/huyện thay đổi
        dispatch(get_all_ward(value)); // Gọi API để lấy xã/phường của quận đã chọn
    };


    useEffect(() => {
        if (university?.logoImageId) {
            setPreview(`${GET_IMAGE_URI}${university.logoImageId}`)
        } else {
            setPreview(`placeholder-avatar.jpg`);
        }
    }, [university?.logoImageId]);


    const formik = useFormik({
        initialValues: {
            id: university?.id || '',
            name: university?.name || '',
            website: university?.website || '',
            phone: university?.phone || '',
            foundedYear: university?.foundedYear || '',
            description: university?.description || '',
            logoImageId: null,
            provinceId: university?.location?.province?.id || null,
            districtId: university?.location?.district?.id || null,
            wardId: university?.location?.ward?.id || null,
        },
        enableReinitialize: true,
        validationSchema: UniversityValidation,
        onSubmit: async (values) => {
            Modal.confirm({
                title: 'Xác nhận chỉnh sửa',
                content: `Bạn có chắc chắn muốn chỉnh sửa hố sơ "${university.name}" ?`,
                okText: 'Xác nhận',
                okType: 'primary',
                cancelText: 'Hủy',
                onOk: async () => {
                    const formData = new FormData();
                    Object.keys(values).forEach((key) => {
                        if (key !== "logoImageId") formData.append(key, values[key]);
                    })
                    // Append the logo image if exists
                    if (values.logoImageId) {
                        formData.append('logoImageId', values.logoImageId);
                    }
                    await dispatch(update_university(university.id, formData));
                    dispatch(get_university_id(university.id));
                    navigate('/profile-university')
                }
            })

        }
    });


    const handleImageChange = (file) => {
        formik.setFieldValue("logoImageId", file);
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        if (file) reader.readAsDataURL(file);
    };

    return (
        <section>
            <div className="container m-5 edit-uni">
                <Col span={24} md={16}>
                    <Card bordered={false}>
                        <div className="university-header mb-4">
                            <Title level={2} className="university-title">Chỉnh sửa hồ sơ</Title>
                        </div>
                        <Form onFinish={formik.handleSubmit} layout='vertical'>
                            <Space direction="vertical" size={16} style={{width: '100%'}}>
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Form.Item label="Tên trường" required
                                                   validateStatus={formik.errors.name ? 'error' : ''}
                                                   help={formik.errors.name}>
                                            <Input
                                                value={formik.values.name}
                                                onChange={formik.handleChange}
                                                name={"name"}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Website" required
                                                   validateStatus={formik.errors.website ? 'error' : ''}
                                                   help={formik.errors.website}>
                                            <Input
                                                value={formik.values.website}
                                                onChange={formik.handleChange}
                                                name={"website"}
                                            />
                                        </Form.Item>

                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Form.Item label="Điện thoại" required
                                                   validateStatus={formik.errors.phone ? 'error' : ''}
                                                   help={formik.errors.phone}>
                                            <Input
                                                value={formik.values.phone}
                                                onChange={formik.handleChange}
                                                name={"phone"}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Năm thành lập" required
                                                   validateStatus={formik.errors.foundedYear ? 'error' : ''}
                                                   help={formik.errors.foundedYear}>
                                            <Input
                                                value={formik.values.foundedYear}
                                                onChange={formik.handleChange}
                                                name={"foundedYear"}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col span={24}>
                                        <Form.Item label="Mô tả"
                                                   validateStatus={formik.errors.description ? 'error' : ''}
                                                   help={formik.errors.description}>
                                            <TextArea rows="5"
                                                      value={formik.values.description}
                                                      onChange={formik.handleChange}
                                                      name={"description"}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col span={8}>
                                        <Form.Item label="Tỉnh/Thành phố" required
                                                   validateStatus={formik.errors.provinceId ? 'error' : ''}
                                                   help={formik.errors.provinceId}>
                                            <Select
                                                value={formik.values.provinceId}
                                                onChange={handleProvinceChange} // Sử dụng hàm xử lý thay đổi
                                                placeholder="Chọn tỉnh/thành phố"
                                                style={{width: '100%'}}
                                            >
                                                {provinces?.map((province) => (
                                                    <Select.Option key={province.id} value={province.id}>
                                                        {province.name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Quận/Huyện" required
                                                   validateStatus={formik.errors.districtId ? 'error' : ''}
                                                   help={formik.errors.districtId}>
                                            <Select
                                                value={formik.values.districtId}
                                                onChange={handleDistrictChange} // Sử dụng hàm xử lý thay đổi
                                                placeholder="Chọn quận/huyện"
                                                style={{width: '100%'}}
                                                disabled={!formik.values.provinceId}
                                            >
                                                {districts?.map((district) => (
                                                    <Select.Option key={district.id} value={district.id}>
                                                        {district.name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Xã/Phường" required
                                                   validateStatus={formik.errors.wardId ? 'error' : ''}
                                                   help={formik.errors.wardId}>
                                            <Select
                                                value={formik.values.wardId}
                                                onChange={(value) => formik.setFieldValue('wardId', value)}
                                                placeholder="Chọn xã/phường"
                                                style={{width: '100%'}}
                                                disabled={!formik.values.districtId}
                                            >
                                                {wards?.map((ward) => (
                                                    <Select.Option key={ward.id} value={ward.id}>
                                                        {ward.name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col span={24}>
                                        <Form.Item label="Ảnh đại diện">
                                            {preview && (
                                                <img
                                                    src={preview}
                                                    alt="Avatar"
                                                    style={{
                                                        maxWidth: '100px',
                                                        height: 'auto',
                                                        display: 'block',
                                                        marginTop: '10px'
                                                    }}
                                                />
                                            )}
                                            <div style={{
                                                marginTop: '10px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}>
                                                <ImgCrop rotate>
                                                    <Upload
                                                        accept="image/*"
                                                        showUploadList={false}
                                                        beforeUpload={(file) => {
                                                            handleImageChange(file);
                                                            return false;
                                                        }}
                                                    >
                                                        <Button icon={<UploadOutlined/>}>Chọn ảnh mới</Button>
                                                    </Upload>
                                                </ImgCrop>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Space>
                            <Divider/>
                            <Row justify="end">
                                <Button type="primary" htmlType="submit">Lưu</Button>
                                <Button
                                    style={{marginLeft: '10px'}}
                                    onClick={() => navigate(-1)}
                                >
                                    Đóng
                                </Button>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </div>
        </section>
    );


};

export default ProfileUniversityEdit;
// const formData = new FormData();
// formData.append('id', values.id);
// formData.append('name', values.name);
// formData.append('website', values.website);
// formData.append('phone', values.phone);
// formData.append('foundedYear', values.foundedYear);
// formData.append('description', values.description);
// formData.append('logoImageId', values.logoImageId);
// formData.append('provinceId', values.provinceId);
// formData.append('districtId', values.districtId);
// formData.append('wardId', values.wardId);
// dispatch(update_university(values.id, formData));