import React, { useEffect, useState } from "react";
import { Form, Input, Upload, Button, Select, DatePicker, Row, Col, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles for ReactQuill

import { useDispatch, useSelector } from "react-redux";
import { update_work_shop, get_all_ward, get_all_provinces, get_all_district } from "../../../Redux/actions/WorkShopThunk";
import PropTypes from 'prop-types';
import { toast } from "react-toastify";

import {DOMAIN} from "../../../Utils/Setting/Config";
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import styled from 'styled-components';
dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)
const { Option } = Select;

// Styled Components
const Container = styled.div`
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    padding: 24px;
    background-color: #ffffff;
    width: 100%; /* Ensure container takes full width */
    height: auto; /* Allow the container to grow with content */
`;

const StyledQuill = styled(ReactQuill)`
    .ql-editor {
        min-height: 200px;
        line-height: 1.6;
        white-space: normal;
        word-wrap: break-word; 
        overflow-wrap: break-word; 
        width: 100%;
        word-break: break-word; 
    }
`;

const Title = styled.h3`
    color: #1890ff;
    margin-bottom: 24px;
`;

const FormItem = styled(Form.Item)`
    .ant-form-item-label > label {
        color: #595959;
        font-weight: 500;
    }
`;



const ButtonGroup = styled.div`
    text-align: right;
    margin-top: 24px;

    .ant-btn-primary {
        background-color: #1890ff;
        border-color: #1890ff;

        &:hover {
            background-color: #40a9ff;
            border-color: #40a9ff;
        }
    }

    .ant-btn {
        margin-left: 8px;
    }
`;



const EditWorkShop = ({ visible, onCancel, onFinish, workshop }) => {
    const [form] = Form.useForm();
    const [selectedProvince, setSelectedProvince] = useState(null);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [fileList, setFileList] = useState([]);
    const [description, setDescription] = useState("");
    const userInfo = JSON.parse(localStorage.getItem("USER_LOGIN"));
    const idUniversity = userInfo?.university?.id;

    const [isStartDateSelected, setIsStartDateSelected] = useState(false);
    const [isEndDateSelected, setIsEndDateSelected] = useState(false);
    const dispatch = useDispatch();
    const { provinces, districts, wards } = useSelector(state => state.WorkShopReducer);
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = (file) => {
        if (!file.url && !file.preview) {
            file.preview = URL.createObjectURL(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    };



    useEffect(() => {
        dispatch(get_all_provinces());
        if (workshop) {
            form.setFieldsValue({
                title: workshop.title,
                startDate: dayjs(workshop.startDate, "DD/MM/YYYY HH:mm"),
                endDate: dayjs(workshop.endDate, "DD/MM/YYYY HH:mm"),
                expirationDate:  dayjs(workshop.expireDate, "DD/MM/YYYY"),
                province: workshop.location.province?.id,
                district: workshop.location.district?.id,
                ward: workshop.location.ward?.id,
                detailAddress: workshop.location.description,
                description: workshop.description,
            });
            setDescription(workshop.description);
            setSelectedProvince(workshop.location.province?.id);
            setSelectedDistrict(workshop.location.district?.id);
            dispatch(get_all_district(workshop.location.province?.id));
            dispatch(get_all_ward(workshop.location.district?.id));
            if (workshop.workshopImageId) {
                setFileList([{
                    uid: '-1',
                    status: 'done',
                    url: `${DOMAIN}/api/v1/image/resource?imageId=${workshop.workshopImageId}`,
                }]);
            } else {
                setFileList([]);
            }
        }
    }, [dispatch, form, workshop]);

    const disablePastDates = (current) => {
        return current && current < dayjs().startOf("day");
    };

    const disableExpirationDate = (current) => {
        const startDate = form.getFieldValue("startDate");
        const endDate = form.getFieldValue("endDate");
        return current && (current < startDate || current > endDate);
    };

    const handleStartDateChange = (value) => {
        setIsStartDateSelected(!!value);
        form.setFieldsValue({ endDate: null, expirationDate: null });
        setIsEndDateSelected(false);
    };

    const handleEndDateChange = (value) => {
        setIsEndDateSelected(!!value);
        form.setFieldsValue({ expirationDate: null });
    };

    const handleProvinceChange = (value) => {
        const provinceId = value;
        setSelectedProvince(provinceId);
        dispatch(get_all_district(provinceId));
        form.setFieldsValue({ district: null, ward: null });
        setSelectedDistrict(null);
    };

    const handleDistrictChange = (value) => {
        const districtId = value;
        setSelectedDistrict(districtId);
        dispatch(get_all_ward(districtId));
        form.setFieldsValue({ ward: null });
    };

    const handleFileChange = ({ fileList: newFileList }) => {
        const isValidFile = newFileList.every(file => file.type === "image/jpeg" || file.type === "image/png");
        if (!isValidFile) {
            toast.error("Chỉ chấp nhận file định dạng JPG/PNG.");
            return;
        }
        setFileList(newFileList);
    };

    const handleEditorChange = (value) => {
        setDescription(value);
    };



    const handleOk = () => {
        form.validateFields().then((values) => {
            const { startDate, endDate, province, ward, district, detailAddress, expirationDate, title } = values;

            if (!title) {
                toast.error("Vui lòng nhập tiêu đề!");
                return;
            }
            if (!startDate) {
                toast.error("Vui lòng chọn ngày bắt đầu!");
                return;
            }
            if (!endDate) {
                toast.error("Vui lòng chọn ngày kết thúc!");
                return;
            }
            if (!expirationDate) {
                toast.error("Vui lòng chọn ngày hết hạn!");
                return;
            }
            if (!province) {
                toast.error("Vui lòng chọn Tỉnh/Thành phố!");
                return;
            }
            if (!district) {
                toast.error("Vui lòng chọn Quận/Huyện!");
                return;
            }
            if (!ward) {
                toast.error("Vui lòng chọn Phường/Xã!");
                return;
            }

            if (dayjs(endDate).isBefore(startDate)) {
                toast.error("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu!");
                return;
            }
            if(dayjs(startDate).isAfter(endDate)) {
                toast.error("Ngày kết thúc không được bé hơn ngày bắt đầu!");
                return;
            }
            if(dayjs(expirationDate).isAfter(endDate) || dayjs(expirationDate).isBefore(startDate)) {
                toast.error("Ngày hết hạn không hợp lệ!");
                return;
            }

            const formData = new FormData();
            formData.append("startDate", dayjs(startDate).format("YYYY-MM-DDTHH:mm"));
            formData.append("endDate", dayjs(endDate).format("YYYY-MM-DDTHH:mm"));
            formData.append("expireDate", dayjs(expirationDate).format("YYYY-MM-DD"));
            formData.append("idProvince", province);
            formData.append("idDistrict", district);
            formData.append("idWard", ward);
            formData.append("title", title);
            formData.append("description", description);
            formData.append("addressDescription", detailAddress);

            // Check for file before appending
            if (fileList.length === 0) {
                toast.error("Vui lòng chọn ảnh!");
                return;
            }
            if(fileList[0].originFileObj) {
                formData.append("imageWorkshop", fileList[0].originFileObj);
            }

            dispatch(update_work_shop(workshop.id, formData))
                .then(() => {
                    toast.success("Hội thảo đã được cập nhật thành công!");
                    form.resetFields();
                    setFileList([]); // Clear file list after success
                    onFinish(); // Handle success callback
                })
                .catch(error => {
                    toast.error("Cập nhật hội thảo thất bại!");
                    console.error(error); // Log the error for debugging
                });
        })
            .catch((errorInfo) => {
                console.log('Validate Failed:', errorInfo);  // Xem lỗi nếu có
            });
    };


    if (!visible) return null;

    return (
        <Container>
            <Title>Chỉnh sửa hội thảo</Title>
            <Form form={form} layout="vertical">
                <FormItem    rules={[{required: true, message: 'Vui lòng nhập tiêu đề'}]} label="Tiêu đề" name="title">
                    <Input
                    rules
                    />
                </FormItem>

                <Row gutter={16}>
                    <Col span={8}>
                        <FormItem label="Ngày bắt đầu" name="startDate"   rules={[{required: true, message: 'Vui lòng chọn ngày bắt đầu'}]}>
                            <DatePicker     format="YYYY-MM-DD HH:mm"  style={{ width: "100%" }} placeholder="Chọn ngày bắt đầu" showTime disabledDate={disablePastDates} onChange={handleStartDateChange} />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="Ngày kết thúc" name="endDate"       rules={[{required: true, message: 'Vui lòng chọn ngày kết thúc'}]}>
                            <DatePicker    format="YYYY-MM-DD HH:mm"   style={{ width: "100%" }} placeholder="Chọn ngày kết thúc" showTime disabledDate={disablePastDates} onChange={handleEndDateChange} />
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem label="Ngày hết hạn" name="expirationDate"   rules={[{required: true, message: 'Vui lòng chọn ngày hết hạn'}]}>
                            <DatePicker   style={{ width: "100%" }} placeholder="Chọn ngày hết hạn" disabledDate={disableExpirationDate} />
                        </FormItem>
                    </Col>
                </Row>

                <Row gutter={16}>
                    <Col span={8}>
                        <FormItem     rules={[{required: true, message: 'Vui lòng chọn tỉnh/thành phố'}]} label="Tỉnh/Thành phố" name="province">
                            <Select onChange={handleProvinceChange} value={selectedProvince}>
                                {provinces.map(province => (
                                    <Option key={province.id} value={province.id}>
                                        {province.name}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem                             rules={[{required: true, message: 'Vui lòng chọn quận/huyện'}]} label="Quận/Huyện" name="district">
                            <Select onChange={handleDistrictChange} value={selectedDistrict}>
                                {districts.map(district => (
                                    <Option key={district.id} value={district.id}>
                                        {district.name}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span={8}>
                        <FormItem  rules={[{required: true, message: 'Vui lòng chọn phường/xã'}]} label="Phường/Xã" name="ward">
                            <Select>
                                {wards.map(ward => (
                                    <Option key={ward.id} value={ward.id}>
                                        {ward.name}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                    </Col>
                </Row>

                <FormItem label="Địa chỉ chi tiết" name="detailAddress">
                    <Input
                        style={{
                            whiteSpace: 'pre-wrap',
                            wordBreak: 'break-word',
                            minHeight: '30px',
                            maxHeight: '30px',
                            overflowY: 'auto',
                        }}
                        rows={2} // Số dòng mặc định
                    />
                </FormItem>

                <FormItem label="Mô tả" name="description">
                    <StyledQuill
                        value={description}
                        onChange={handleEditorChange}
                        theme="snow"
                    />
                </FormItem>



                <FormItem label="Ảnh" name="image">
                    {/* Hiển thị phần Upload.Dragger chỉ khi không có ảnh */}
                    {fileList.length === 0 && (
                        <Upload.Dragger
                            listType="picture"
                            fileList={fileList}
                            onChange={handleFileChange}
                            maxCount={1}
                            beforeUpload={() => false}
                            onPreview={handlePreview}
                            showUploadList={false}
                        >
                            <div className="ant-upload-drag-icon">
                                <UploadOutlined />
                            </div>
                            <p className="ant-upload-text">Kéo và thả hình ảnh vào đây</p>
                        </Upload.Dragger>
                    )}

                    {/* Hiển thị phần UploadList để hiển thị ảnh đã tải lên */}
                    <Upload
                        listType="picture"
                        fileList={fileList}
                        onChange={handleFileChange}
                        onPreview={handlePreview}
                        beforeUpload={() => false}
                        maxCount={1}
                        showUploadList={{
                            showRemoveIcon: true,
                            showPreviewIcon: true,
                        }}
                    />

                    <Modal
                        open={previewVisible}
                        footer={null}
                        onCancel={() => setPreviewVisible(false)}
                        width={600}
                    >
                        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
                    </Modal>
                </FormItem>

            </Form>

            <ButtonGroup>
                <Button onClick={onCancel}>Hủy</Button>
                <Button type="primary" onClick={handleOk}>Cập nhật</Button>
            </ButtonGroup>
        </Container>
    );
};

EditWorkShop.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onFinish: PropTypes.func.isRequired,
    workshop: PropTypes.object.isRequired,
};

export default EditWorkShop;
