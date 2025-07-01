import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Button, Input, Typography, Statistic, Space, message } from 'antd';
import { WalletOutlined, DollarOutlined, CreditCardOutlined } from '@ant-design/icons';
import {checkBalance, get_url_payment} from "../../../Redux/actions/BusinessThunk";
import { useSelector, useDispatch } from "react-redux";

const { Title, Text } = Typography;

const DepositScreen = () => {
    const [amount, setAmount] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [balance, setBalance] = useState(0);
    const quickAmounts = [50000, 100000, 200000, 500000, 1000000];
    const { userData } = useSelector((state) => state.UserReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        // Fetch initial balance when component mounts
        const fetchBalance = async () => {
            try {
                // Assuming you have a checkBalance action in your thunks
                const currentBalance = await dispatch(checkBalance(userData.username));
                setBalance(currentBalance);
            } catch (error) {
                console.error('Error fetching balance:', error);
                message.error('Không thể tải số dư hiện tại');
            }
        };

        if (userData?.username) {
            fetchBalance();
        }
    }, [userData, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!amount || isNaN(amount) || amount <= 0) {
            message.error('Vui lòng nhập số tiền hợp lệ');
            return;
        }

        if (Number(amount) < 10000) {
            message.error('Số tiền nạp tối thiểu là 10,000₫');
            return;
        }

        setIsProcessing(true);

        try {
            const paymentUrl = await dispatch(get_url_payment(amount, userData.username));

            if (paymentUrl) {
                // Open payment in new tab
                window.location.href = paymentUrl;
            } else {
                message.error('Không thể tạo liên kết thanh toán');
            }
        } catch (error) {
            console.error('Lỗi khi tạo URL thanh toán:', error);
            message.error(error.message || 'Có lỗi xảy ra khi tạo URL thanh toán');
        } finally {
            setIsProcessing(false);
        }
    };

    const handleQuickAmount = (value) => {
        setAmount(value.toString());
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('vi-VN').format(value);
    };

    return (
        <div className="content__wrap">
            <div className="row">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
                                <WalletOutlined style={{ marginRight: 8 }} />
                                Nạp tiền vào tài khoản
                            </Title>
                            <Text type="secondary">Chọn số tiền bạn muốn nạp vào tài khoản</Text>
                        </div>
                    </div>

                    <Row gutter={[24, 24]}>
                        {/* Current Balance */}
                        <Col span={24}>
                            <Card style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                <Statistic
                                    title="Số dư hiện tại"
                                    value={balance}
                                    precision={0}
                                    formatter={(value) => `${formatCurrency(value)} ₫`}
                                    prefix={<DollarOutlined style={{ color: '#52c41a' }} />}
                                    valueStyle={{ color: '#52c41a', fontSize: '24px', fontWeight: 'bold' }}
                                />
                            </Card>
                        </Col>

                        {/* Deposit Form */}
                        <Col span={24}>
                            <Card
                                title="Thông tin nạp tiền"
                                style={{ borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                headStyle={{ borderBottom: 0, padding: '0 24px', paddingTop: 16 }}
                            >
                                <form onSubmit={handleSubmit}>
                                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                                        {/* Amount Input */}
                                        <div>
                                            <Text strong style={{ display: 'block', marginBottom: 8 }}>
                                                Số tiền muốn nạp (VNĐ)
                                            </Text>
                                            <Input
                                                size="large"
                                                placeholder="Nhập số tiền"
                                                value={amount}
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '');
                                                    setAmount(value);
                                                }}
                                                prefix={<DollarOutlined style={{ color: '#1890ff' }} />}
                                                suffix="₫"
                                                style={{ borderRadius: 6 }}
                                            />
                                            {amount && (
                                                <Text type="secondary" style={{ fontSize: '12px', marginTop: 4 }}>
                                                    Số tiền: {formatCurrency(Number(amount))} ₫
                                                </Text>
                                            )}
                                        </div>

                                        {/* Quick Amount Buttons */}
                                        <div>
                                            <Text strong style={{ display: 'block', marginBottom: 8 }}>
                                                Chọn nhanh
                                            </Text>
                                            <Row gutter={[8, 8]}>
                                                {quickAmounts.map((value) => (
                                                    <Col key={value}>
                                                        <Button
                                                            type={amount === value.toString() ? 'primary' : 'default'}
                                                            size="small"
                                                            onClick={() => handleQuickAmount(value)}
                                                            style={{ borderRadius: 4 }}
                                                        >
                                                            {formatCurrency(value)}₫
                                                        </Button>
                                                    </Col>
                                                ))}
                                            </Row>
                                        </div>

                                        {/* Payment Method */}
                                        <div>
                                            <Text strong style={{ display: 'block', marginBottom: 8 }}>
                                                Phương thức thanh toán
                                            </Text>
                                            <Card
                                                size="small"
                                                style={{
                                                    border: '1px solid #d9d9d9',
                                                    borderRadius: 6,
                                                    backgroundColor: '#fafafa'
                                                }}
                                                bodyStyle={{ padding: '12px 16px' }}
                                            >
                                                <Space>
                                                    <CreditCardOutlined style={{ color: '#1890ff', fontSize: 18 }} />
                                                    <Text strong>VNPay</Text>
                                                    <Text type="secondary" style={{ fontSize: 12 }}>
                                                        (Hỗ trợ thẻ ATM, Visa, Mastercard)
                                                    </Text>
                                                </Space>
                                            </Card>
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            type="primary"
                                            size="large"
                                            htmlType="submit"
                                            loading={isProcessing}
                                            disabled={!amount || isProcessing}
                                            block
                                            style={{
                                                borderRadius: 6,
                                                height: 48,
                                                fontSize: 16,
                                                fontWeight: 500,
                                                marginTop: 16
                                            }}
                                        >
                                            {isProcessing ? 'Đang xử lý...' : 'Xác nhận nạp tiền'}
                                        </Button>
                                    </Space>
                                </form>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default DepositScreen;