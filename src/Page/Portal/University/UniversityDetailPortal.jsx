import React, {useEffect, useState} from "react";
import {Button, Card, Col, Divider, Modal, notification, Pagination, Row, Space, Typography} from "antd";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import DisplayRichText from "../../../../src/Component/TextEditDisplay/DisplayRichText";
import {PlusOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import {get_university_id} from "../../../Redux/actions/UniversityThunk";
import {GET_IMAGE_URI} from "../../../Utils/Setting/Config";
import {get_workshops_by_university} from "../../../Redux/actions/WorkShopThunk";
import WorkshopCard from "../WorkshopCard";
import {decryptId} from "../../../Component/SecurityComponent/cryptoUtils";
import HeaderPortal from "../../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import {send_request} from "../../../Redux/actions/CooperationThunk";

const {Text, Title} = Typography;

const UniversityDetailPortal = () => {
        const [isModalVisible, setIsModalVisible] = useState(false); // Quản lý trạng thái hiển thị của Modal
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const location = useLocation();
        const {id} = useParams();
        const universityData = useSelector(state => state.UniversityReducer.university);
        const workshopsData = useSelector(state => state.WorkShopReducer.workshops);
        const [page, setPage] = useState(1);
        const [size, setSize] = useState(10);
        const totalElements = useSelector((state) => state.WorkShopReducer.totalRecords);
        const {isAuthenticated, userData} = useSelector((state) => state.UserReducer);
        const isLoggedIn = isAuthenticated && userData?.business.id;

        useEffect(() => {
            dispatch(get_university_id(decryptId(id)));
            dispatch(get_workshops_by_university(decryptId(id), page - 1, size))
            console.log(universityData)
        }, [dispatch, page, size]);


        const handleFollowUniversity = () => {
            if (!isLoggedIn) {
                setIsModalVisible(true); // Hiển thị modal nếu chưa đăng nhập
                return;
            }
            // Gửi yêu cầu hợp tác (nếu đã đăng nhập)
            dispatch(send_request(decryptId(id)));
        };

        const handleConfirmLogin = () => {
            setIsModalVisible(false); // Đóng modal
            notification.warning({
                message: "Chưa đăng nhập",
                description: "Bạn đang được điều hướng đến trang đăng nhập.",
            });
            navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`); // Chuyển hướng đến trang login
        };

        const handleCancel = () => {
            setIsModalVisible(false); // Đóng modal nếu người dùng hủy
        };
        const handlePageChange = (page, pageSize) => {
            setPage(page);
            setSize(pageSize);
        }
        if (!universityData) {
            return (
                <section id="content" className="content">
                    <div className="content__header content__boxed rounded-0">
                        <div className="content__wrap">
                            <div style={{padding: "20px", maxWidth: "4000px", margin: "0 auto"}}>
                                <div>Không tìm thấy thông tin trường học.</div>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }


        return (
            <div>
                <HeaderPortal/>
                <section id="content" className="content">
                    <div className="content__header content__boxed rounded-0">
                        <div className="content__wrap">
                            <div style={{padding: "20px", maxWidth: "1200px", margin: "auto"}}>
                                <Row gutter={[16, 16]} style={{display: 'flex', flexWrap: 'wrap'}}>
                                    {/* Khối chia tên công ty */}
                                    <Col span={24}>
                                        <Card bordered={false}>
                                            <Row align="middle" justify="start">
                                                {/* Logo hình tròn */}
                                                <Col>
                                                    <img
                                                        src={universityData.logoImageId ? `${GET_IMAGE_URI}${universityData.logoImageId}` : "/placeholder-avatar.jpg"}
                                                        alt="Logo trường học"
                                                        style={{
                                                            width: 150,
                                                            height: 150,
                                                            borderRadius: "50%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                </Col>

                                                <Col style={{marginLeft: "12px"}}>
                                                    {/* Tên công ty */}
                                                    <Title level={3} style={{
                                                        margin: 0,
                                                        marginBottom: "10px"
                                                    }}>
                                                        {universityData?.name}
                                                    </Title>

                                                    {/* Thông tin email và quy mô */}
                                                    <Row gutter={[16, 8]}>
                                                        <Space>
                                                            <Col>
                                                                <Text
                                                                    type="secondary">Email: {universityData?.email || "Chưa có email"}</Text>
                                                            </Col>
                                                            <Col>
                                                                <Text type="secondary">Liên
                                                                    hệ: {universityData?.phone || "Không xác định"}</Text>
                                                            </Col>
                                                        </Space>
                                                    </Row>
                                                </Col>
                                                {/* Nút Theo dõi */}
                                                <Col flex="auto" style={{textAlign: "right"}}>
                                                    <Button
                                                        type="primary"
                                                        style={{borderRadius: "20px"}}
                                                        onClick={handleFollowUniversity}
                                                    >
                                                        <PlusOutlined/> Yêu cầu hợp tác
                                                    </Button>
                                                    <Modal
                                                        title="Xác nhận đăng nhập"
                                                        visible={isModalVisible}
                                                        onOk={handleConfirmLogin}
                                                        onCancel={handleCancel}
                                                        okText="Đồng ý"
                                                        cancelText="Hủy"
                                                    >
                                                        <p>
                                                            Bạn cần đăng nhập để tiếp tục yêu cầu hợp tác. Bạn có muốn đăng nhập
                                                            không?
                                                        </p>
                                                    </Modal>
                                                </Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                    <Col span={24}>
                                        <Row gutter={[16, 16]}
                                             style={{display: 'flex', flexWrap: 'wrap'}}>
                                            {/* Khối chia phần giới thiệu công ty và thông tin tuyển dụng */}
                                            <Col span={18} style={{
                                                justifyContent: 'space-between',
                                                alignItems: 'flex-start'
                                            }}>
                                                {/* Giới thiệu công ty */}
                                                <Row gutter={[16, 16]}
                                                     style={{display: 'flex', flexWrap: 'wrap'}}>
                                                    <Col span={24}>
                                                        <Card bordered={false}>
                                                            <Divider orientation="left"
                                                                     style={{
                                                                         fontSize: "18px",
                                                                         color: "#096dd9"
                                                                     }}>
                                                                Giới thiệu trường học
                                                            </Divider>
                                                            <DisplayRichText
                                                                content={universityData?.description}/>
                                                        </Card>
                                                    </Col>
                                                    {/* Thông tin workshop */}
                                                    <Col span={24}>
                                                        <Card bordered={false}>
                                                            <Divider orientation="left"
                                                                     style={{
                                                                         fontSize: "18px",
                                                                         color: "#096dd9"
                                                                     }}>
                                                                Sự kiện - Hội thảo
                                                            </Divider>

                                                            {/* Tìm kiếm và lọc theo địa điểm */}

                                                            {workshopsData ? (
                                                                workshopsData.map((w) => (
                                                                    <WorkshopCard
                                                                        workshop={w}></WorkshopCard>
                                                                ))
                                                            ) : (
                                                                <Text>Không có thông tin sự
                                                                    kiện.</Text>
                                                            )}
                                                            <Pagination
                                                                style={{
                                                                    textAlign: "right",
                                                                    marginTop: "16px",
                                                                    display: "flex",
                                                                    justifyContent: "center"
                                                                }}
                                                                current={page} // Gán mặc định nếu currentPage không hợp lệ
                                                                pageSize={size}   // Gán mặc định nếu pageSize không hợp lệ
                                                                defaultPageSize={5}
                                                                defaultCurrent={1}
                                                                total={totalElements} // Gán mặc định nếu totalElements không hợp lệ
                                                                onChange={handlePageChange}
                                                                showSizeChanger={true}
                                                                pageSizeOptions={[5, 10, 20, 50, 100]} // Đảm bảo mọi giá trị trong mảng là chuỗi
                                                            />
                                                        </Card>
                                                    </Col>

                                                </Row>
                                            </Col>

                                            {/* Thông tin liên hệ */}
                                            <Col span={6}>
                                                <Card bordered={false}>
                                                    <Divider orientation="left"
                                                             style={{
                                                                 fontSize: "18px",
                                                                 color: "#096dd9"
                                                             }}>
                                                        Thông tin liên hệ
                                                    </Divider>
                                                    {/* Địa chỉ của công ty */}
                                                    <Col span={24}>
                                                        <Space direction="vertical"
                                                               size={8}>  {/* Tăng size từ 4 lên 8 */}
                                                            <Text strong>Địa chỉ:</Text>
                                                            <Text>
                                                                {universityData.location?.description || ""} {universityData.location?.ward?.fullName || " "}, {universityData.location?.district?.fullName || " "},{universityData.location?.province?.fullName || ""}
                                                            </Text>
                                                        </Space>
                                                    </Col>
                                                    {/* Email của công ty */}
                                                    <Col span={24}>
                                                        <Space direction="vertical"
                                                               size={8}>  {/* Tăng size từ 4 lên 8 */}
                                                            <Text strong>Email:</Text>
                                                            <Text>{universityData?.email}</Text>
                                                        </Space>
                                                    </Col>
                                                    {/* Số điện thoại công ty */}
                                                    <Col span={24}>
                                                        <Space direction="vertical"
                                                               size={8}>  {/* Tăng size từ 4 lên 8 */}
                                                            <Text strong>Số điện thoại:</Text>
                                                            <Text>{universityData?.phone}</Text>
                                                        </Space>
                                                    </Col>
                                                    {/* Website công ty */}
                                                    <Col span={24}>
                                                        <Space direction="vertical"
                                                               size={8}>  {/* Tăng size từ 4 lên 8 */}
                                                            <Text strong>Website:</Text>
                                                            <a href={universityData?.website}
                                                               target="_blank"
                                                               rel="noopener noreferrer">
                                                                {universityData?.website || "Visit Website"}
                                                            </a>
                                                        </Space>
                                                    </Col>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
;

export default UniversityDetailPortal;
