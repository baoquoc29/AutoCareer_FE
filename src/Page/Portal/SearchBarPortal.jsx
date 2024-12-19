import React from "react";
import { Input, Select, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Option } = Select;

const SearchBarPortal = () => {
    return (
        <div style={styles.searchBar}>
            {/* Select danh mục nghề */}
            <Select
                style={styles.select}
                placeholder="Chọn danh mục nghề"
                defaultValue="Danh mục Nghề"
            >
                <Option value="nhan-vien-kinh-doanh">Nhân viên kinh doanh</Option>
                <Option value="ky-thuat">Kỹ thuật</Option>
                <Option value="ke-toan">Kế toán</Option>
            </Select>

            {/* Ô nhập tìm kiếm */}
            <Input
                style={styles.input}
                placeholder="Nhập tên hoặc thông tin"
                allowClear
            />

            {/* Select tỉnh/thành phố */}
            <Select style={styles.selectLocation} defaultValue="Tất cả tỉnh/thành phố">
                <Option value="all">Tất cả tỉnh/thành phố</Option>
                <Option value="hanoi">Hà Nội</Option>
                <Option value="hochiminh">Hồ Chí Minh</Option>
            </Select>

            {/* Nút tìm kiếm */}
            <Button
                type="primary"
                icon={<SearchOutlined />}
                style={styles.searchButton}
            >
                Tìm kiếm
            </Button>
        </div>
    );
};

const styles = {
    searchBar: {
        display: "flex",
        alignItems: "center",
        gap: "12px",  // Thêm khoảng cách giữa các phần tử
        padding: "12px 20px",  // Padding thêm để các phần tử không quá sát nhau
        backgroundColor: "#fff",  // Màu nền trắng sạch sẽ
        borderRadius: "10px",  // Border-radius bo tròn đẹp
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",  // Thêm hiệu ứng bóng đổ nhẹ
        maxWidth: "1000px",  // Đảm bảo chiều rộng không quá lớn
        margin: "20px auto",  // Giữa trang
        height: "75px",
    },
    select: {
        width: "220px",  // Thu hẹp kích thước select để dễ nhìn
        borderRadius: "8px",  // Bo tròn các góc
    },
    input: {
        flex: 1,  // Chiếm hết chiều rộng còn lại
        borderRadius: "8px",  // Bo tròn các góc
    },
    selectLocation: {
        width: "220px",  // Kích thước của select tỉnh/thành phố
        borderRadius: "8px",  // Bo tròn các góc
    },
    searchButton: {
        backgroundColor: "#1a45c4",
        borderColor: "#1a45c4",
        borderRadius: "8px",
    },
};

export default SearchBarPortal;
