import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_all_industry } from "../../../Redux/actions/IndustryThunk";
import { Button, Card, Form, Input, Pagination, Space, Table } from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  InfoCircleOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { doc as XLSX } from "prettier";

const IndustryManager = () => {
  const dispatch = useDispatch();
  const industry = useSelector((state) => state.IndustryReducer.industries);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    dispatch(get_all_industry());
  }, []);
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);
    const filtered = industry.filter(
      (industry) =>
        industry.name.toLowerCase().includes(value.toLowerCase()) ||
        industry.description.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sections");
    XLSX.writeFile(workbook, "Sections.xlsx");
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      sorter: (a, b) => a.stt - b.stt,
    },
    {
      title: "Tên ngành",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
      render: (text) => (text === "ACTIVE" ? "Hoạt động" : "Tạm ngưng"),
    },
    {
      title: "Thao tác",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          <Button
            color="primary"
            variant="outlined"
            icon={<InfoCircleOutlined />}
            onClick={() => console.log("info:", record)}
            disabled={record.status !== "ACTIVE"}
          />
          <Button
            color="default"
            variant="outlined"
            icon={<EditOutlined />}
            onClick={() => console.log("edit:", record)}
            disabled={record.status !== "ACTIVE"}
          />
          {record.status === "ACTIVE" ? (
            <Button
              color="danger"
              variant="outlined"
              icon={<DeleteOutlined />}
              onClick={() => console.log("delete:", record)}
            />
          ) : (
            <Button
              icon={<ReloadOutlined />}
              onClick={() => console.log("restore:", record)}
            />
          )}
        </Space>
      ),
    },
  ];

  const data = industry.map((industry, index) => ({
    key: industry.id,
    stt: index + 1,
    name: industry.industryName,
    code: industry.industryCode,
    status: industry.status,
  }));
  return (
    <>
      <section id="content" className="content">
        <div className="content__header content__boxed rounded-0">
          <div className="content__wrap">
            <section>
              <div className="container mt-5">
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <Card title="Danh sách Ngành nghề">
                      <div className="table-responsive">
                        <div className="d-flex justify-content-between mb-3">
                          <Input
                            placeholder="Search..."
                            value={searchText}
                            onChange={handleSearch}
                            prefix={<SearchOutlined />}
                            style={{ width: 200 }}
                          />
                          <Button
                            icon={<DownloadOutlined />}
                            onClick={exportToExcel}
                          >
                            Xuất sang Excel
                          </Button>
                        </div>
                        <Table
                          columns={columns}
                          dataSource={data}
                          pagination={false}
                        />
                      </div>
                      <Pagination
                        className="text-center mt-5"
                        total={industry.length}
                        pageSize={5}
                        showSizeChanger={false}
                      />
                    </Card>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};
export default IndustryManager;
