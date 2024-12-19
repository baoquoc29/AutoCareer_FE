import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Upload, Modal, notification, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {clearResponseBusiness, sign_up_business, verify_account_business} from "../../../Redux/actions/UserThunk";
import {NavLink, useNavigate} from 'react-router-dom';
import "./SignUp.css";
import {toast} from "react-toastify";
export function SignUpBusiness() {
    const [form] = Form.useForm();
    const [showModal, setShowModal] = useState(false);
    const [code, setCode] = useState('');
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(true);
    const [fileList, setFileList] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);
    const [showImageModal, setShowImageModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [hasShownModal, setHasShownModal] = useState(false);

    const response = useSelector((state) => state.UserReducer?.responseBusiness);
    const responseSignUp= useSelector((state) => state.UserReducer?.responseSignUpBusiness);
    useEffect(() => {
        form.resetFields();
        return () => {
            dispatch(clearResponseBusiness());
        };
    }, [dispatch]);
    useEffect(() => {
        let interval;
        if (!canResend && timer > 0) {
            interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        } else if (timer === 0) {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer, canResend]);

    // Xử lý phản hồi từ API
    useEffect(() => {
        if (response) {
            if (response.code === 200) {
                // notification.success({ message: 'Mã xác nhận đã được gửi thành công!' });
                setTimeout(() => {
                    setIsLoading(false);
                    if (!hasShownModal) {
                        setShowModal(true); // Hiển thị modal nếu chưa hiển thị
                        setHasShownModal(true); // Đánh dấu đã hiển thị modal
                    }
                }, 2000);
                setCanResend(false);
                setTimer(60); // Reset bộ đếm về 60 giây
            } else if (response.message) {
                setIsLoading(false);
                toast.error(response.message || 'Lỗi trong quá trình gửi mã xác nhận' );
            }

        }
    }, [response, hasShownModal]);

    useEffect(() => {
        if (responseSignUp?.code === 200) {
            toast.success('Đăng ký tài khoản của bạn sẽ được xem xét!' );
            navigate("/");
        } else if (responseSignUp?.message) {
            toast.error(responseSignUp.message || 'Mã xác minh không chính xác!' );
        }
    }, [responseSignUp, navigate]);



    // Kiểm tra và thêm ảnh giấy phép
    const validateImage = (fileList) => {
        if (!fileList.length) return null;

        const file = fileList[0];
        const isImage = file.type.startsWith('image/');
        const maxSize = 2 * 1024 * 1024;

        if (!isImage) {
            toast.error('Chỉ chấp nhận ảnh.' );
            return false;
        }

        if (file.size > maxSize) {
            toast.error('Kích thước file không được vượt quá 2MB.' );
            return false;
        }

        return file.originFileObj;
    };

    // Gửi yêu cầu mã xác nhận
    const handleSendCode = (values) => {
        const { companyName, taxCode, email, phone, password, confirmPassword } = values;

        if (password !== confirmPassword) {
            toast.error('Mật khẩu và xác nhận mật khẩu không khớp.' );
            return;
        }

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            toast.error('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt.' );
            return;
        }

        const licenseImage = validateImage(fileList);
        if (licenseImage === false) return;

        const businessData = new FormData();
        businessData.append('name', companyName);
        businessData.append('taxCode', taxCode);
        businessData.append('email', email);
        businessData.append('phone', phone);
        businessData.append('password', password);
        businessData.append('rePassword', confirmPassword);
        businessData.append('verificationCode', 'business');
        if (licenseImage) businessData.append('licenseImage', licenseImage);

        setIsLoading(true);
        dispatch(verify_account_business(businessData));
    };

    // Gửi lại mã xác nhận
    const handleResendCode = () => {
        setTimer(60);
        setCanResend(false);
        form.submit();
    };

    // Xác nhận mã
    const handleVerifyCodeSubmit = async () => {
        if (!code) {
            toast.error('Vui lòng nhập mã xác nhận.' );
            return;
        }

            // Tạo FormData và thêm các giá trị từ form vào
            const businessData = new FormData();
            businessData.set("verificationCode", code);

            const formValues = form.getFieldsValue();
            businessData.append("name", formValues.companyName);
            businessData.append("taxCode", formValues.taxCode);
            businessData.append("email", formValues.email);
            businessData.append("phone", formValues.phone);
            businessData.append("password", formValues.password);
            businessData.append("rePassword", formValues.confirmPassword);
            // Kiểm tra nếu có file ảnh giấy phép và thêm vào FormData
            const licenseImage = validateImage(fileList);
            if (licenseImage) {
                businessData.append("licenseImage", licenseImage);
            }
            dispatch(sign_up_business(businessData));

    };


    const handleFileChange = ({fileList: newFileList}) => {
        const isValidFile = newFileList.every(file => file.type === "image/jpeg" || file.type === "image/png");
        if (!isValidFile) {
            toast.error("Chỉ chấp nhận file định dạng JPG/PNG.");
            return;
        }
        setFileList(newFileList);

    };
    // Xem trước ảnh
    const handleImagePreview = (file) => {
        setImagePreview(file.url || URL.createObjectURL(file.originFileObj));
        setShowImageModal(true);
    };

    return (
        <div className="signup-root">
        <div className="signup-business">
            <div className="content__boxed w-100 min-vh-100 d-flex flex-column align-items-center justify-content-center">
                <div className="card shadow-lg" style={{ width: '80%', maxWidth: 450 }}>
                    <div className="card-body">
                        <h1 className="h3 text-center">Đăng ký tài khoản doanh nghiệp</h1>
                        <p className="text-center">Tham gia cộng đồng Auto Career!</p>

                        <Form form={form} layout="vertical" onFinish={handleSendCode}>
                            <Form.Item label="Tên doanh nghiệp" name="companyName"
                                       rules={[{required: true, message: 'Tên doanh nghiệp là bắt buộc.'}]}>
                                <Input placeholder="Nhập tên doanh nghiệp"/>
                            </Form.Item>

                            <Form.Item label="Mã số thuế" name="taxCode"
                                       rules={[{required: true, message: 'Mã số thuế là bắt buộc.'}]}>
                                <Input placeholder="Nhập mã số thuế"/>
                            </Form.Item>

                            <Form.Item label="Email" name="email"
                                       rules={[{required: true, message: 'Email là bắt buộc.'}, {
                                           type: 'email',
                                           message: 'Email không hợp lệ!'
                                       }]}>
                                <Input placeholder="Nhập email"/>
                            </Form.Item>

                            <Form.Item label="Ảnh giấy phép" name="image">
                                <Upload
                                    listType="picture"
                                    fileList={fileList}
                                    onChange={handleFileChange}
                                    beforeUpload={() => false}
                                    maxCount={1}
                                    onPreview={handleImagePreview}
                                >
                                    <Button icon={<UploadOutlined/>}>Chọn ảnh giấy phép</Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item label="Mật khẩu" name="password"
                                       rules={[{required: true, message: 'Mật khẩu là bắt buộc.'}]}>
                                <Input.Password placeholder="Nhập mật khẩu"/>
                            </Form.Item>

                            <Form.Item label="Xác nhận mật khẩu" name="confirmPassword"
                                       rules={[{required: true, message: 'Xác nhận mật khẩu là bắt buộc.'}]}>
                                <Input.Password placeholder="Nhập lại mật khẩu"/>
                            </Form.Item>

                            <Button type="primary" htmlType="submit" block disabled={!canResend}>
                                {isLoading ? <Spin/> : 'Đăng ký tài khoản'}
                            </Button>
                        </Form>

                        <Modal
                            open={showModal}
                            title="Nhập mã xác minh"
                            onCancel={() => setShowModal(false)}
                            footer={[
                                <Button key="cancel" onClick={() => setShowModal(false)}>
                                    Hủy
                                </Button>,
                                <Button
                                    key="submit"
                                    type="primary"
                                    onClick={handleVerifyCodeSubmit}
                                    disabled={!code}
                                >
                                    Xác nhận
                                </Button>
                            ]}
                        >
                            <Input
                                placeholder="Nhập mã xác minh"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                style={{marginBottom: 10}}
                            />
                            <p>Thời gian còn lại: <b>{timer}s</b></p>
                            {canResend && (
                                <Button
                                    type="link"
                                    onClick={handleResendCode}
                                    style={{marginTop: 10}}
                                    block
                                >
                                    Gửi lại mã xác minh
                                </Button>
                            )}
                        </Modal>

                        <Modal open={showImageModal} footer={null} onCancel={() => setShowImageModal(false)}>
                            <img alt="preview" style={{width: '100%'}} src={imagePreview}/>
                        </Modal>
                        <div className="d-flex justify-content-end align-items-center gap-md-3 mt-4">
                            <p className="mb-0 fs-6">Bạn đã có tài khoản?</p>
                            <NavLink
                                to={"/"}
                                className="btn-link text-decoration-none ms-1 fs-6"
                            >
                                Đăng nhập
                            </NavLink>
                        </div>


                    </div>
                </div>
            </div>
        </div>
        </div>
    );
}
