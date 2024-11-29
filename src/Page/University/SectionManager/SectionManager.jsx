
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {create_section, get_all_sections} from "../../../Redux/actions/SectionThunk";
import {useFormik} from "formik";
import {Button, Card, Form, Input, Pagination, Space, Table} from 'antd';
import {DeleteOutlined, DownloadOutlined, EditOutlined, InfoCircleOutlined, ReloadOutlined, SearchOutlined} from "@ant-design/icons";
import {doc as XLSX} from "prettier";
import * as Yup from "yup";


const SectionManager = () => {
    const dispatch = useDispatch();
    const sections = useSelector((state) => state.SectionReducer.sections);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        dispatch(get_all_sections())
    }, []);
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
        const filtered = sections.filter((section) =>
            section.name.toLowerCase().includes(value.toLowerCase()) ||
            section.description.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sections");
        XLSX.writeFile(workbook, "Sections.xlsx");
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            status: "ACTIVE"
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('Tên khoa là bắt buộc')
                .min(3, 'Tên khoa phải có ít nhất 3 ký tự'),
            description: Yup.string().required('Mô tả là bắt buộc'),
        }),
        onSubmit: (values) => {
            dispatch(create_section(values));
            console.log(values)
        }
    });

    const columns = [
        {title: 'STT', dataIndex: 'stt', key: 'stt', sorter: (a, b) => a.stt - b.stt},
        {title: 'Tên khoa', dataIndex: 'name', key: 'name', sorter: (a, b) => a.name.localeCompare(b.name)},
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status.localeCompare(b.status),
            render: (text) => (text === 'ACTIVE' ? 'Hoạt động' : 'Tạm ngưng')
        },
        {
            title: 'Thao tác', key: 'actions', render: (text, record) => (<Space size="middle">
                    <Button color="primary" variant="outlined" icon={<InfoCircleOutlined/>}
                            onClick={() => console.log('info:', record)} disabled={record.status !== 'ACTIVE'}/>
                    <Button color="default" variant="outlined" icon={<EditOutlined/>}
                            onClick={() => console.log('edit:', record)} disabled={record.status !== 'ACTIVE'}/>
                    {record.status === 'ACTIVE' ? (
                        <Button color="danger" variant="outlined" icon={<DeleteOutlined/>}
                                onClick={() => console.log('delete:', record)}/>
                    ) : (
                        <Button
                            icon={<ReloadOutlined/>}
                            onClick={() => console.log('restore:', record)}
                        />
                    )}
                </Space>
            ),
        },
    ];

    const data = sections.map((section, index) => ({
        key: section.id,
        stt: index + 1,
        name: section.name,
        status: section.status,
    }));
    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <section>
                            <div className="container mt-5">
                                <div className="row">
                                    <div className="col-md-4 mb-3 border-5">
                                        <Card title="Thông tin Khoa">
                                            <Form layout="vertical" onFinish={formik.handleSubmit} requiredMark={true}
                                                  name="trigger">
                                                <Form.Item hasFeedback label="Tên khoa" name="Tên khoa"
                                                           validateTrigger="onBlur" required={true}
                                                           rules={[
                                                               {
                                                                   required: true,
                                                                   message: "Tên khoa không được bỏ trống"
                                                               },
                                                               {min: 10, message: "Tên khoa phải có ít nhất 10 ký tự"},
                                                               {max: 100, message: "Tên khoa tối đa 100 ký tự"}]}
                                                           help={formik.errors.name && formik.touched.name ? formik.errors.name : null}
                                                           validateStatus={formik.errors.name && formik.touched.name ? 'error' : ''}>

                                                    <Input onChange={formik.handleChange} value={formik.values.name}
                                                           name="name"/>
                                                </Form.Item>

                                                <Form.Item label="Mô tả" name="description">
                                                    <Input.TextArea onChange={formik.handleChange}
                                                                    value={formik.values.description}
                                                                    name="description" autoSize={{minRows: 8}}/>
                                                </Form.Item>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit">Thêm</Button>
                                                </Form.Item>
                                            </Form>
                                        </Card>
                                    </div>
                                    <div className="col-md-8 mb-3">
                                        <Card title="Danh sách Khoa">
                                            <div className="table-responsive">
                                                <div className="d-flex justify-content-between mb-3">
                                                    <Input placeholder="Search..." value={searchText}
                                                           onChange={handleSearch} prefix={<SearchOutlined/>}
                                                           style={{width: 200}}/>
                                                    <Button icon={<DownloadOutlined/>} onClick={exportToExcel}>Xuất sang
                                                        Excel</Button>
                                                </div>
                                                <Table columns={columns} dataSource={data} pagination={false}/>
                                            </div>
                                            <Pagination className="text-center mt-5" total={sections.length}
                                                        pageSize={5} showSizeChanger={false}/>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
        </>
    )
}
export default SectionManager;