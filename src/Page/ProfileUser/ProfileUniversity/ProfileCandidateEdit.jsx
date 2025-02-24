import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {GET_IMAGE_URI, USER_LOGIN} from "../../../Utils/Setting/Config";
import './style/ProfileEdit.css'

import {get_candidate_id, update_candidate} from "../../../Redux/actions/CandidateThunk";
import {Button, Card, Col, Divider, Form, Input, Modal, Row, Select, Space, Typography, Upload} from "antd";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import TextArea from "antd/es/input/TextArea";
import {get_all_district, get_all_provinces, get_all_ward} from "../../../Redux/actions/LocationThunk";
import {UploadOutlined} from "@ant-design/icons";
import ImgCrop from "antd-img-crop";
import CandidateValidation from "../../../Utils/Validation/University/CandidateValidation";
import ReactQuill from "react-quill";

const {Title} = Typography;


const ProfileCandidateEdit = () => {
    const dispatch = useDispatch();
    const candidate = useSelector(state => state.CandidateReducer.candidate);
    const [preview, setPreview] = useState(null);
    const {provinces, districts, wards} = useSelector(state => state.LocationReducer);
    const navigate = useNavigate();
    const data = JSON.parse(localStorage.getItem(USER_LOGIN));
    useEffect(() => {
        dispatch(get_all_provinces()); // Lấy danh sách tỉnh/thành phố
    }, [dispatch]);
    useEffect(() => {
        if (data?.candidateResponse?.id) {
            dispatch(get_candidate_id(data.candidateResponse.id));
        }
    }, [dispatch, data?.candidateResponse?.id]);
// Lấy danh sách quận/huyện khi tỉnh được chọn
    useEffect(() => {
        if (candidate?.location?.province?.id) {
            dispatch(get_all_district(candidate.location.province.id)); // Lấy danh sách quận/huyện
        }
    }, [dispatch, candidate?.location?.province?.id]);

// Lấy danh sách xã/phường khi quận được chọn
    useEffect(() => {
        if (candidate?.location?.district?.id) {
            dispatch(get_all_ward(candidate.location.district.id)); // Lấy danh sách xã/phường
        }
    }, [dispatch, candidate?.location?.district?.id]);
    console.log()
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
        if (candidate?.profileImageId) {
            setPreview(`${GET_IMAGE_URI}${candidate.profileImageId}`)
        } else {
            setPreview(`placeholder-avatar.jpg`);
        }
    }, [candidate?.profileImageId]);

    const fieldMapping = {
        "Mục tiêu nghề nghiệp": "careerObjective",
        "Học vấn": "education",
        "Kỹ năng": "skills",
        "Giải thưởng": "awards",
        "Kinh nghiệm làm việc": "description"
    };

    const formik = useFormik({
        initialValues: {
            id: data?.candidateResponse?.id,
            fullName: candidate?.fullName || '',
            phone: candidate?.phone || '',
            description: candidate?.description || '',
            profileImageId:  null,
            email : candidate?.email || '',
            birthYear: candidate?.birthYear || '',
            skills: candidate?.skills || '',
            awards: candidate?.awards || '',
            education : candidate?.education || '',
            careerObjective : candidate?.careerObjective || '',
            provinceId: candidate?.location?.province?.id || null,
            districtId: candidate?.location?.district?.id || null,
            wardId: candidate?.location?.ward?.id || null,
        },
        enableReinitialize: true,
         validationSchema: CandidateValidation(),
        onSubmit: async (values) => {
            Modal.confirm({
                title: 'Xác nhận chỉnh sửa',
                content: `Bạn có chắc chắn muốn chỉnh sửa hố sơ "${candidate.fullName}" ?`,
                okText: 'Xác nhận',
                okType: 'primary',
                cancelText: 'Hủy',
                onOk: async () => {
                    console.log("User confirmed edit"); // Kiểm tra xem có vào đây không
                    const formData = new FormData();
                    Object.keys(values).forEach((key) => {
                        if (key !== "profileImageId") formData.append(key, values[key]);
                    })

                    if (values.profileImageId) {
                        formData.append('profileImageId', values.profileImageId);
                    }
                    await dispatch(update_candidate(candidate.id, formData));
                    dispatch(get_candidate_id(candidate.id));
                    navigate('/profile-candidate')
                }
            })

        }
    });


    const handleImageChange = (file) => {
        formik.setFieldValue("profileImageId", file);
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
                            <Title level={4} className="university-title">Chỉnh sửa hồ sơ</Title>
                        </div>
                        <Form onFinish={formik.handleSubmit} layout='vertical'>
                            <Space direction="vertical" size={16} style={{ width: '100%' }}>
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Form.Item label="Tên ứng viên" required
                                                   validateStatus={formik.errors.fullName ? 'error' : ''}
                                                   help={formik.errors.fullName}>
                                            <Input name="fullName" value={formik.values.fullName} onChange={formik.handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Điện thoại" required
                                                   validateStatus={formik.errors.phone ? 'error' : ''}
                                                   help={formik.errors.phone}>
                                            <Input name="phone" value={formik.values.phone} onChange={formik.handleChange} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col span={12}>
                                        <Form.Item label="Năm sinh" required
                                                   validateStatus={formik.errors.birthYear ? 'error' : ''}
                                                   help={formik.errors.birthYear}>
                                            <Input name="birthYear" value={formik.values.birthYear} onChange={formik.handleChange} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Email" required
                                                   validateStatus={formik.errors.email ? 'error' : ''}
                                                   help={formik.errors.email}>
                                            <Input name="email" value={formik.values.email} onChange={formik.handleChange} />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    {Object.entries(fieldMapping).map(([label, fieldName]) => (
                                        <Col span={24} key={fieldName}>
                                            <Form.Item
                                                label={label}
                                                validateStatus={formik.errors[fieldName] ? 'error' : ''}
                                                help={formik.errors[fieldName]}
                                            >
                                                <ReactQuill
                                                    value={formik.values[fieldName]}
                                                    onChange={(value) => formik.setFieldValue(fieldName, value)}
                                                />
                                            </Form.Item>
                                        </Col>
                                    ))}
                                </Row>

                                <Row gutter={[16, 16]}>
                                    <Col span={8}>
                                        <Form.Item label="Tỉnh/Thành phố" required
                                                   validateStatus={formik.errors.provinceId ? 'error' : ''}
                                                   help={formik.errors.provinceId}>
                                            <Select value={formik.values.provinceId} onChange={handleProvinceChange} placeholder="Chọn tỉnh/thành phố" style={{ width: '100%' }}>
                                                {provinces?.map((province) => (
                                                    <Select.Option key={province.id} value={province.id}>{province.name}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Quận/Huyện" required
                                                   validateStatus={formik.errors.districtId ? 'error' : ''}
                                                   help={formik.errors.districtId}>
                                            <Select value={formik.values.districtId} onChange={handleDistrictChange} placeholder="Chọn quận/huyện" style={{ width: '100%' }} disabled={!formik.values.provinceId}>
                                                {districts?.map((district) => (
                                                    <Select.Option key={district.id} value={district.id}>{district.name}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item label="Xã/Phường" required
                                                   validateStatus={formik.errors.wardId ? 'error' : ''}
                                                   help={formik.errors.wardId}>
                                            <Select value={formik.values.wardId} onChange={(value) => formik.setFieldValue('wardId', value)} placeholder="Chọn xã/phường" style={{ width: '100%' }} disabled={!formik.values.districtId}>
                                                {wards?.map((ward) => (
                                                    <Select.Option key={ward.id} value={ward.id}>{ward.name}</Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={[16, 16]}>
                                    <Col span={24}>
                                        <Form.Item label="Ảnh đại diện">
                                            {preview && <img src={preview} alt="Avatar" style={{ maxWidth: '100px', height: 'auto', marginTop: '10px' }} />}
                                            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <ImgCrop rotate>
                                                    <Upload accept="image/*" showUploadList={false} beforeUpload={(file) => { handleImageChange(file); return false; }}>
                                                        <Button icon={<UploadOutlined />}>Chọn ảnh mới</Button>
                                                    </Upload>
                                                </ImgCrop>
                                            </div>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Space>
                            <Divider />
                            <Row justify="end">
                                <Button type="primary" htmlType="submit">Lưu</Button>
                                <Button style={{ marginLeft: '10px' }} onClick={() => navigate(-1)}>Đóng</Button>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </div>
        </section>
    );
};

export default ProfileCandidateEdit;
