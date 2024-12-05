import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {delete_section, get_all_sections} from "../../../Redux/actions/SectionThunk";
import {Card, Input, Pagination} from 'antd';
import {SearchOutlined} from "@ant-design/icons";
import {SectionForm} from "./SectionForm";
import SectionTable from "./SectionTable";
import {toast} from "react-toastify";


const SectionManager = () => {
    const dispatch = useDispatch();
    const sections = useSelector((state) => state.SectionReducer.sections);
    const userData = useSelector(state => state.UserReducer.userData);
    const [universityId, setUniversityId] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        dispatch(get_all_sections());
    }, [dispatch]);

    useEffect(() => {
        if (userData && userData.university) {
            setUniversityId(userData.university.id);
        }
    }, [userData]);
    const handleDelete = (id) => {
        dispatch(delete_section(id))
            .then(() =>{
                dispatch(get_all_sections());
            })
            .catch((error)=>{
                console.log(error)
            })
        console.log(id);
    }
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchText(value);
        const filtered = sections.filter((section) =>
            section.name.toLowerCase().includes(value.toLowerCase()) ||
            section.description.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
    };
    return (
        <>
            <section id="content" className="content">
                <div className="content__header content__boxed rounded-0">
                    <div className="content__wrap">
                        <section>
                            <div className="container mt-5">
                                <div className="row">
                                    <div className="col-md-4 mb-3 border-5">
                                        <SectionForm universityId={universityId}/>
                                    </div>
                                    <div className="col-md-8 mb-3">
                                        <Card title="Danh sách Khoa">
                                            <div className="table-responsive">
                                                <div className="d-flex justify-content-between mb-3">
                                                    <Input placeholder="Search..." value={searchText}
                                                           onChange={handleSearch} prefix={<SearchOutlined/>}
                                                           style={{width: 200}}/>
                                                </div>
                                                <SectionTable sections={filteredData.length > 0 ? filteredData : sections} onDelete={handleDelete}/>
                                            </div>
                                            <Pagination className="text-center mt-5" total={sections.length} pageSize={5} showSizeChanger={true}/>
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