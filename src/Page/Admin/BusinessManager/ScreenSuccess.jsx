import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Result, Button, Descriptions, Spin, Typography } from 'antd';
import { HomeOutlined, ReloadOutlined } from '@ant-design/icons';
import { check } from "../../../Redux/actions/BusinessThunk";
import { useDispatch } from 'react-redux';

const { Text } = Typography;

const PaymentResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [paymentData, setPaymentData] = useState({
    status: null,
    amount: 0,
    orderInfo: '',
    bankCode: '',
    transactionNo: '',
    payDate: '',
    secureHash: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState(null);

  useEffect(() => {
    const processPaymentData = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);

        // Lấy và validate dữ liệu từ URL
        const amountParam = searchParams.get('vnp_Amount');
        if (!amountParam) {
          throw new Error('Thiếu thông tin số tiền thanh toán');
        }

        const amount = parseInt(amountParam);
        if (isNaN(amount)) {
          throw new Error('Số tiền thanh toán không hợp lệ');
        }

        const orderInfo = decodeURIComponent(searchParams.get('vnp_OrderInfo') || '');
        const secureHash = searchParams.get('vnp_SecureHash');

        // Gọi API check từ Redux
        await dispatch(check(amount, orderInfo));

        // Format dữ liệu
        const formattedAmount = amount / 100;
        const payDateStr = searchParams.get('vnp_PayDate') || '';
        const formattedDate = payDateStr ? formatPayDate(payDateStr) : '';

        // Xác định trạng thái thanh toán
        const responseCode = searchParams.get('vnp_ResponseCode');
        const transactionStatus = searchParams.get('vnp_TransactionStatus');
        const isSuccess = responseCode === '00' && transactionStatus === '00';

        setPaymentData({
          status: isSuccess ? 'success' : 'failed',
          amount: formattedAmount,
          orderInfo,
          bankCode: searchParams.get('vnp_BankCode') || '',
          transactionNo: searchParams.get('vnp_TransactionNo') || '',
          payDate: formattedDate,
          secureHash
        });

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    processPaymentData();
  }, [location, navigate, dispatch]);

  // Countdown timer effect
  useEffect(() => {
    if (!isLoading && !error) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            navigate('/deposit');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLoading, error, navigate]);

  const formatPayDate = (payDateStr) => {
    const year = payDateStr.substring(0, 4);
    const month = payDateStr.substring(4, 6);
    const day = payDateStr.substring(6, 8);
    const hour = payDateStr.substring(8, 10);
    const minute = payDateStr.substring(10, 12);
    const second = payDateStr.substring(12, 14);
    return `${day}/${month}/${year} ${hour}:${minute}:${second}`;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh',
        flexDirection: 'column'
      }}>
        <Spin size="large" />
        <Text style={{ marginTop: 16 }}>Đang xử lý kết quả thanh toán...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
        <Card>
          <Result
            status="error"
            title="Lỗi xử lý thanh toán"
            subTitle={error}
            extra={[
              <Button type="primary" icon={<HomeOutlined />} onClick={() => navigate('/recharge-account')} key="home">
                Về trang nạp tiền
              </Button>,
              <Button icon={<ReloadOutlined />} onClick={() => window.location.reload()} key="reload">
                Tải lại trang
              </Button>,
            ]}
          />
        </Card>
      </div>
    );
  }

  return (
    <div className="content__wrap">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-xl-6">
          <Card style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            {paymentData.status === 'success' ? (
              <Result
                status="success"
                title="Thanh toán thành công!"
                subTitle="Giao dịch nạp tiền đã được thực hiện thành công."
                extra={[
                  <Button type="primary" icon={<HomeOutlined />} onClick={() => navigate('/')} key="home">
                    Về trang chính
                  </Button>,
                  <Button onClick={() => navigate('/')} key="history">
                    Xem lịch sử giao dịch
                  </Button>,
                ]}
              >
                <Descriptions
                  title="Thông tin giao dịch"
                  bordered
                  column={1}
                  size="small"
                  style={{ marginBottom: 16 }}
                >
                  <Descriptions.Item label="Số tiền">
                    <Text strong style={{ color: '#52c41a', fontSize: '16px' }}>
                      {formatCurrency(paymentData.amount)}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Nội dung">{paymentData.orderInfo}</Descriptions.Item>
                  {paymentData.bankCode && (
                    <Descriptions.Item label="Ngân hàng">{paymentData.bankCode}</Descriptions.Item>
                  )}
                  {paymentData.transactionNo && (
                    <Descriptions.Item label="Mã giao dịch">{paymentData.transactionNo}</Descriptions.Item>
                  )}
                  {paymentData.payDate && (
                    <Descriptions.Item label="Thời gian thanh toán">{paymentData.payDate}</Descriptions.Item>
                  )}
                </Descriptions>
                <Text type="secondary">
                  Tự động chuyển hướng sau {countdown} giây...
                </Text>
              </Result>
            ) : (
              <Result
                status="error"
                title="Thanh toán không thành công"
                subTitle="Đã xảy ra lỗi trong quá trình thanh toán. Vui lòng thử lại."
                extra={[
                  <Button type="primary" onClick={() => navigate('/deposit')} key="retry">
                    Thử lại
                  </Button>,
                  <Button onClick={() => navigate('/')} key="contact">
                    Liên hệ hỗ trợ
                  </Button>,
                ]}
              >
                <Descriptions
                  title="Thông tin giao dịch"
                  bordered
                  column={1}
                  size="small"
                  style={{ marginBottom: 16 }}
                >
                  <Descriptions.Item label="Số tiền">
                    <Text strong style={{ color: '#ff4d4f', fontSize: '16px' }}>
                      {formatCurrency(paymentData.amount)}
                    </Text>
                  </Descriptions.Item>
                  <Descriptions.Item label="Nội dung">{paymentData.orderInfo}</Descriptions.Item>
                  {paymentData.payDate && (
                    <Descriptions.Item label="Thời gian">{paymentData.payDate}</Descriptions.Item>
                  )}
                </Descriptions>
                <Text type="secondary">
                  Tự động chuyển hướng sau {countdown} giây...
                </Text>
              </Result>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentResult;
