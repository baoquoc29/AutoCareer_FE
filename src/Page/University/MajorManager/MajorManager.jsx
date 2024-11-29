import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {doc as XLSX} from "prettier";
import {Button, Card, Input} from "antd";
import {DownloadOutlined, SearchOutlined} from "@ant-design/icons";
import {create_major, get_all_majors, get_major_id} from "../../../Redux/actions/MajorThunk";
import MajorTable from "./MajorTable";
import MajorForm from "./MajorForm";
import MajorDetailModal from "./Modal";
import {toast} from "react-toastify";


const MajorManager = () => {
    const dispatch = useDispatch();
    const majors = useSelector((state) => state.MajorReducer.majors);
    const [selectedMajor, setSelectedMajor] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(get_all_majors());
    }, [dispatch]);

    useEffect(() => {
        if (selectedMajor) {
            dispatch(get_major_id(selectedMajor.id));
        }
    }, [selectedMajor, dispatch]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
        const filtered = majors.filter((section) =>
            section.name.toLowerCase().includes(value.toLowerCase()) ||
            section.description.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };

    const handleInfo = (record) => {
        setSelectedMajor(record);
        setOpen(true);
    };

    const exportToExcel = () => {
        if (filteredData && filteredData.length > 0) {
            const worksheet = XLSX.utils.json_to_sheet(filteredData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Chuyên ngành');
            XLSX.writeFile(workbook, 'Chuyên Ngành.xlsx');
        } else {
          toast.error("'Không có dữ liệu để xuất Excel!'") ;
        }
    };
    const data = majors.map((majors, index) => ({
        id: majors.id,
        stt: index + 1,
        name: majors.name,
        code: majors.code,
        numberStudent: majors.numberStudent,
        status: majors.status,
        description: majors.description,
    }));
    const handleSubmit = (values) => {
        dispatch(create_major(values))
            .then(()=>{
                dispatch(get_all_majors());
                toast.success("Thêm chuyên ngành thành công")
            })
    };
    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <section>
                            <div className="container mt-5">
                                <div className="row">
                                    <div className="col-lg-4 mb-3 border-5">
                                        <Card title="Thông tin chuyên ngành">
                                            <MajorForm onSubmit={handleSubmit}/>
                                        </Card>
                                    </div>
                                    <div className="col-lg-8 mb-3">
                                        <Card title="Danh sách chuyên ngành">
                                            <div className="table-responsive">
                                                <div className="d-flex mb-3">
                                                    <Input  placeholder="Search..." value={searchText}
                                                           onChange={handleSearch} prefix={<SearchOutlined/>}/>
                                                    <Button type="default" icon={<DownloadOutlined/>}
                                                            onClick={exportToExcel}>Export to Excel</Button>
                                                </div>
                                                <MajorTable data={data} onInfo={handleInfo}/>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>
            <MajorDetailModal open={open} onClose={() => setOpen(false)} major={selectedMajor} />
        </>
    )
}
export default MajorManager;