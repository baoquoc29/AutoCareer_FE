import React, {useEffect, useState} from "react";
import {Button, Card, Col, Divider, Row, Space, Typography, Input, Select, Pagination} from "antd";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import DisplayRichText from "../../../src/Component/TextEditDisplay/DisplayRichText";
import HeaderPortal from "../../Component/HeaderComponent/HeaderPortal/HeaderPortal";
import {get_business_by_id} from "../../Redux/actions/BusinessThunk";
import {useDispatch, useSelector} from "react-redux";
import {GET_IMAGE_URI} from "../../Utils/Setting/Config";
import {get_all_job_of_business_paging_portal} from "../../Redux/actions/JobThunk";
import dayjs from "dayjs";
import {decryptId, encryptId} from "../../Component/SecurityComponent/cryptoUtils";

const {Text, Title} = Typography;

const BusinessDetailPage = () => {
    const dispatch = useDispatch();
    const [searchKeyword, setSearchKeyword] = useState(""); // Từ khóa tìm kiếm
    const [currentPage, setCurrenPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const totalElements = useSelector((state) => state.JobReducer.totalElements);
    const [locationFilter, setLocationFilter] = useState(""); // Lọc theo địa điểm
    const businessData = useSelector((state) => state.BusinessReducer.business);
    const jobData = useSelector((state) => state.JobReducer.listJopPortal);
    const { id } = useParams();
    const [encryptedId, setEncryptedId] = useState(null);

    useEffect(() => {
        setEncryptedId(id);
    }, [id]);

    useEffect(() => {
        dispatch(get_business_by_id(decryptId(encryptedId)));
        dispatch(get_all_job_of_business_paging_portal(currentPage, pageSize, encodeURIComponent(searchKeyword), decryptId(encryptedId),));
    }, [dispatch,currentPage, searchKeyword, pageSize, encryptedId]);


    const handleDetailsJob = (id) => {
        const encryptedId = encryptId(id)
        ;  // Encrypt the ID first
        const url = `/job-portal-detail/${encodeURIComponent(encryptedId)}`; // Make sure the encrypted ID is properly encoded
        window.open(url, "_blank");  // Open in a new tab
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchKeyword(value); // Cập nhật giá trị ô tìm kiếm
        setCurrenPage(1);
    };

    const handlePageChange = (page, pageSize) => {
        setCurrenPage(page);
        setPageSize(pageSize);
    };

    if (!businessData) {
        return (
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <div style={{padding: "20px", maxWidth: "2000px", margin: "0 auto"}}>
                            <div>Không tìm thấy thông tin doanh nghiệp.</div>
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
                                                    src={businessData?.businessImageId
                                                        ? `${GET_IMAGE_URI}${businessData["businessImageId"]}`
                                                        : "placeholder-avatar.jpg"}
                                                    alt="Logo công ty"
                                                    style={{
                                                        width: 150,
                                                        height: 150,
                                                        borderRadius: "50%",
                                                        objectFit: "scale-down",
                                                    }}
                                                />
                                            </Col>

                                            <Col style={{marginLeft: "12px"}}>
                                                {/* Tên công ty */}
                                                <Title level={3} style={{margin: 0, marginBottom: "10px"}}>
                                                    {businessData.name}
                                                </Title>

                                                {/* Thông tin email và quy mô */}
                                                <Row gutter={[16, 8]}>
                                                    <Col>
                                                        <Text
                                                            type="secondary">Email: {businessData.email || "Chưa có email"}</Text>
                                                    </Col>
                                                    <Col>
                                                        <Text type="secondary">Quy
                                                            mô: {businessData.companySize || "Không xác định"} nhân
                                                            viên</Text>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                                <Col span={24}>
                                    <Row gutter={[16, 16]} style={{display: 'flex', flexWrap: 'wrap'}}>
                                        {/* Khối chia phần giới thiệu công ty và thông tin tuyển dụng */}
                                        <Col span={18} style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start'
                                        }}>
                                            {/* Giới thiệu công ty */}
                                            <Row gutter={[16, 16]} style={{display: 'flex', flexWrap: 'wrap'}}>
                                                <Col span={24}>
                                                    <Card bordered={false}>
                                                        <Divider orientation="left"
                                                                 style={{fontSize: "18px", color: "#096dd9"}}>
                                                            Giới thiệu công ty
                                                        </Divider>
                                                        <DisplayRichText content={businessData.description}/>
                                                    </Card>
                                                </Col>
                                                {/* Thông tin tuyển dụng */}
                                                <Col span={24}>
                                                    <Card bordered={false}>
                                                        <Divider orientation="left"
                                                                 style={{fontSize: "18px", color: "#096dd9"}}>
                                                            Tuyển dụng
                                                        </Divider>

                                                        {/* Tìm kiếm và lọc theo địa điểm */}
                                                        <Space style={{marginBottom: "16px"}}>
                                                            {/* Thanh tìm kiếm */}
                                                            <Input
                                                                placeholder="Tìm kiếm công việc"
                                                                value={searchKeyword}
                                                                onChange={handleSearch}
                                                                style={{width: "200px"}}
                                                            />
                                                            {/* Filter theo địa điểm */}
                                                            <Select
                                                                placeholder="Chọn địa điểm"
                                                                value={locationFilter}
                                                                onChange={(value) => setLocationFilter(value)}
                                                                style={{width: "200px"}}
                                                            >
                                                                <Select.Option value="">Tất cả</Select.Option>
                                                                <Select.Option value="Hà Nội">Hà Nội</Select.Option>
                                                                <Select.Option value="TP.HCM">TP.HCM</Select.Option>
                                                            </Select>
                                                        </Space>

                                                        <div>
                                                            {jobData.map((job) => (
                                                                <Card key={job.jobId} bordered={false}
                                                                      style={{marginBottom: "10px"}}>
                                                                    <Row gutter={[16, 16]}
                                                                         style={{display: "flex", flexWrap: "wrap"}}>
                                                                        {/* Ảnh công ty */}
                                                                        <Col span={5} style={{
                                                                            display: "flex",
                                                                            alignItems: "center"
                                                                        }}>
                                                                            <img
                                                                                src={`${GET_IMAGE_URI}${job?.businessImageId}`}
                                                                                alt="Company Logo"
                                                                                style={{
                                                                                    width: "100px",
                                                                                    height: "100px",
                                                                                    borderRadius: "8px",
                                                                                    objectFit: " scale-down",
                                                                                }}
                                                                            />
                                                                        </Col>
                                                                        <Col span={19} style={{textAlign: "left"}}>
                                                                            <Row gutter={[16, 16]} style={{
                                                                                display: "flex",
                                                                                flexWrap: "wrap"
                                                                            }}>
                                                                                <Col span={18}
                                                                                     style={{textAlign: "left"}}>
                                                                                    <div>
                                                                                        {/* Tiêu đề công việc */}
                                                                                        <Text strong style={{
                                                                                            fontSize: "16px",
                                                                                            color: "#096dd9"
                                                                                        }}>
                                                                                            {job.title}
                                                                                        </Text>
                                                                                        {/* Tên công ty */}
                                                                                        <div style={{marginBottom:"8px"}}>
                                                                                            <DisplayRichText

                                                                                                content={businessData.name}/>
                                                                                        </div>
                                                                                    </div>
                                                                                    <Row gutter={[16, 16]} style={{
                                                                                        display: "flex",
                                                                                        flexWrap: "wrap",
                                                                                        gap: "8px",

                                                                                    }}>
                                                                                        {/* Địa điểm làm việc */}
                                                                                        <Col

                                                                                            span={8}
                                                                                            style={{
                                                                                                border: "1px solid #d9d9d9",
                                                                                                backgroundColor: "#f0f0f0", // Màu xám
                                                                                                borderRadius: "8px", // Bo góc

                                                                                                padding: "5px", // Thêm padding để nội dung không sát mép
                                                                                            }}
                                                                                        >
                                                                                            <Text
                                                                                                style={{fontSize: "13px"}}>{job?.province}</Text>
                                                                                        </Col>
                                                                                        {/* Ngày hết hạn */}
                                                                                        <Col
                                                                                            span={8}
                                                                                            style={{
                                                                                                textAlign: "left",
                                                                                                border: "1px solid #d9d9d9",
                                                                                                backgroundColor: "#f0f0f0", // Màu xám
                                                                                                borderRadius: "8px", // Bo góc
                                                                                                padding: "5px", // Thêm padding để nội dung không sát mép
                                                                                            }}
                                                                                        >
                                                                                            <Text
                                                                                                style={{fontSize: "13px"}}>
                                                                                                {job.expireDate ? dayjs(job.expireDate).format("DD/MM/YYYY") : "N/A"}
                                                                                            </Text>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </Col>
                                                                                {/* Lương */}
                                                                                <Col span={6}
                                                                                     style={{textAlign: "right"}}>
                                                                                    <Text
                                                                                        strong
                                                                                        style={{
                                                                                            fontSize: "16px",
                                                                                            color: "#096dd9",
                                                                                        }}
                                                                                    >
                                                                                        {/* Format lương với dấu phẩy và thêm "VND" */}
                                                                                        {job.fromSalary !== 1
                                                                                            ? new Intl.NumberFormat("vi-VN").format(job.fromSalary) + " VND"
                                                                                            : "Thoả thuận"}
                                                                                    </Text>
                                                                                </Col>
                                                                            </Row>
                                                                        </Col>
                                                                    </Row>

                                                                    {/* Nút xem chi tiết */}
                                                                    <Row justify="end">
                                                                        <Button
                                                                            type="link"
                                                                            onClick={() => handleDetailsJob(job.jobId)}
                                                                            style={{padding: 0}}
                                                                        >
                                                                            Xem chi tiết
                                                                        </Button>
                                                                    </Row>
                                                                </Card>
                                                            ))}
                                                        </div>
                                                        <Pagination
                                                            style={{
                                                                textAlign: "right",
                                                                marginTop: "16px",
                                                                display: "flex",
                                                                justifyContent: "center"
                                                            }}
                                                            current={currentPage} // Gán mặc định nếu currentPage không hợp lệ
                                                            pageSize={pageSize}   // Gán mặc định nếu pageSize không hợp lệ
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
                                                         style={{fontSize: "18px", color: "#096dd9"}}>
                                                    Thông tin liên hệ
                                                </Divider>
                                                {/* Địa chỉ của công ty */}
                                                <Col span={24}>
                                                    <Space direction="vertical" size={8}>  {/* Tăng size từ 4 lên 8 */}
                                                        <Text strong>Địa chỉ:</Text>
                                                        <Text>
                                                            {businessData.location?.description},
                                                            {businessData.location?.ward.fullName},
                                                            {businessData.location?.district.fullName},
                                                            {businessData.location?.province.fullName}
                                                        </Text>
                                                    </Space>
                                                </Col>
                                                {/* Email của công ty */}
                                                <Col span={24}>
                                                    <Space direction="vertical" size={8}>  {/* Tăng size từ 4 lên 8 */}
                                                        <Text strong>Email:</Text>
                                                        <Text>{businessData.email}</Text>
                                                    </Space>
                                                </Col>
                                                {/* Số điện thoại công ty */}
                                                <Col span={24}>
                                                    <Space direction="vertical" size={8}>  {/* Tăng size từ 4 lên 8 */}
                                                        <Text strong>Số điện thoại:</Text>
                                                        <Text>{businessData.phone}</Text>
                                                    </Space>
                                                </Col>
                                                {/* Website công ty */}
                                                <Col span={24}>
                                                    <Space direction="vertical" size={8}>  {/* Tăng size từ 4 lên 8 */}
                                                        <Text strong>Website:</Text>
                                                        <a href={businessData.website}>{businessData.website}</a>
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
};

export default BusinessDetailPage;
