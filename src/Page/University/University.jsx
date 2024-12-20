import React, {useEffect} from 'react';
import {Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend} from 'chart.js';
import {useDispatch, useSelector} from "react-redux";
import {get_university_id} from "../../Redux/actions/UniversityThunk";
import {GET_IMAGE_URI} from "../../Utils/Setting/Config";
import {Card} from "antd";
import {get_total_ins} from "../../Redux/actions/InstructionalThunk";
import {get_total_section} from "../../Redux/actions/SectionThunk";
import {get_total_major} from "../../Redux/actions/MajorThunk";
import PieChartComponent from "../../Component/ChartComponent/PieChartComponent";


Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export function University() {
    const dispatch = useDispatch();

    // Lấy thông tin trường đại học từ Redux store
    const university = useSelector(state => state.UserReducer.userData?.university);
    const universityDetails = useSelector(state => state.UniversityReducer.university);
    const totalInstruction = useSelector(state => state.InstructionalReducer.totalInstruction)
    const totalSections = useSelector(state => state.SectionReducer.totalSections)
    const totalMajor = useSelector(state => state.MajorReducer.totalMajor)
    console.log(totalMajor)
    useEffect(() => {
        dispatch(get_total_ins())
        dispatch(get_total_section())
        dispatch(get_total_major())
    }, [dispatch]);
    useEffect(() => {
        if (university?.id) {
            dispatch(get_university_id(university.id));
        }
    }, [university, dispatch]);
    const formattedDate =new Date().toLocaleDateString();

    const chartPie = [totalInstruction, totalSections, totalMajor]; // Replace 50 with the appropriate value if needed
    const chartLabelsPie = ['Tổng giáo vụ', 'Tổng khoa', 'Tổng chuyên ngành']; // Adjust labels as needed

    return (
        <>
            <section>
                <div className="m-5 mt-1">
                    <div>
                        <header
                            className="d-flex justify-content-between align-items-center py-3 mb-4 border-bottom">
                            <div className="d-flex align-items-center">
                                <img src={`${GET_IMAGE_URI}${universityDetails.logoImageId}`} alt="logo"
                                     style={{borderRadius: '50%'}} width="80" height="80" className="me-2"/>
                                <span style={{fontSize: '40px'}}>{universityDetails.name}</span>
                            </div>
                            <div>
                                <span style={{fontSize: '40px'}}>{formattedDate}</span>
                            </div>
                        </header>
                        <h1 className="mb-4">Tổng quan </h1>
                        <div className="row">
                            <div className="col-md-3">
                                <Card>
                                    <div className="card-header">Tổng giáo vụ</div>
                                    <div className="card-body">
                                        <h2 className="card-title">{totalInstruction}</h2>
                                    </div>
                                </Card>
                            </div>
                            <div className="col-md-3">
                                <Card>
                                    <div className="card-header">Tổng khoa</div>
                                    <div className="card-body">
                                        <h2 className="card-title">{totalSections}</h2>
                                    </div>
                                </Card>
                            </div>
                            <div className="col-md-3">
                                <Card>
                                    <div className="card-header">Tổng chuyên ngành</div>
                                    <div className="card-body">
                                        <h2 className="card-title">{totalMajor}</h2>
                                    </div>
                                </Card>
                            </div>
                            <div className="col-md-3">
                                <Card>
                                    <div className="card-header">Tổng giáo vụ</div>
                                    <div className="card-body">
                                        <h2 className="card-title">50</h2>
                                    </div>
                                </Card>
                            </div>
                            <div className="col-md-3">
                                <h2 className="mt-5">Biểu đồ tổng quan</h2>
                                <PieChartComponent  data={chartPie} labels={chartLabelsPie}  />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
}
