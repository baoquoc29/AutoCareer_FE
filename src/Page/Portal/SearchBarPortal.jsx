import React from "react";
import { Input, Button, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const { Option } = Select;

const SearchBarPortal = () => {
    const { userData, isAuthenticated } = useSelector((state) => state.UserReducer);

    // Mặc định chọn "school" cho role "BUSINESS" và "business" cho role "UNIVERSITY"
    const defaultSearchType = userData?.role?.name === "BUSINESS" ? "school" : "business";
    const [searchType, setSearchType] = React.useState(defaultSearchType);
    const [searchKeyword, setSearchKeyword] = React.useState("");
    const navigate = useNavigate();

    const handleSearchTypeChange = (value) => {
        setSearchType(value);
    };

    const handleSearch = () => {
                navigate(`/job-all-portal?keyword=${searchKeyword}`);
    };

    const handleInputChange = (e) => {
        setSearchKeyword(e.target.value);
    };

    return (
        <div style={styles.searchBar}>
            {/* Ô nhập từ khóa tìm kiếm */}
            <Input
                style={styles.input}
                placeholder="Nhập từ khóa tìm kiếm"
                value={searchKeyword}
                onChange={handleInputChange}
            />

            {/* Dropdown để chọn loại tìm kiếm */}
            <Select
                value={searchType}
                onChange={handleSearchTypeChange}
                style={styles.select}
            >
                    <>
                        <Option value="business">Doanh nghiệp</Option>
                        <Option value="job">Việc làm</Option>
                    </>

            </Select>

            {/* Nút tìm kiếm */}
            <Button
                type="primary"
                icon={<SearchOutlined />}
                style={styles.searchButton}
                onClick={handleSearch}
            >
                Tìm kiếm
            </Button>
        </div>
    );
};

const styles = {
    searchBar: {
        display: "flex",
        width: "800px",
        alignItems: "center",
        gap: "12px", // Khoảng cách giữa các phần tử
        padding: "12px 20px", // Padding cho thanh tìm kiếm
        backgroundColor: "#fff", // Màu nền trắng
        borderRadius: "10px", // Border-radius để bo tròn
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Bóng đổ nhẹ
        maxWidth: "1000px", // Đảm bảo chiều rộng không vượt quá 1000px
        margin: "80px auto", // Căn giữa trang
        height: "75px",
    },
    input: {
        flex: 1, // Chiếm hết không gian còn lại
        borderRadius: "8px", // Bo tròn các góc
        border: "1px solid #d9d9d9", // Viền nhẹ
        padding: "8px 12px", // Padding trong input
    },
    select: {
        width: "200px", // Kích thước cho dropdown
        borderRadius: "8px", // Bo tròn các góc
        border: "1px solid #d9d9d9", // Viền nhẹ
    },
    searchButton: {
        backgroundColor: "#1890ff", // Màu nền nút tìm kiếm
        borderColor: "#1890ff", // Màu viền
        borderRadius: "8px",
        color: "#fff", // Màu chữ trắng
        fontWeight: "bold", // Làm đậm chữ
    },
};

export default SearchBarPortal;
