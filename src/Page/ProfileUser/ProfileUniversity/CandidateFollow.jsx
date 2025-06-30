import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Input, Pagination, Card, Modal} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import ResultSummary from "../../../Component/Paging/ResultsSummary";
import BusinessFollowTable from "./BusinessFollowTable";
import {list_follow, un_follow} from "../../../Redux/actions/CandidateThunk";
import {USER_LOGIN} from "../../../Utils/Setting/Config";
import {decryptId, encryptId} from "../../../Component/SecurityComponent/cryptoUtils";
import {toast} from "react-toastify";

const CandidateFollow = () => {
    const dispatch = useDispatch();
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [keyword, setKeyword] = useState("");
    const user = JSON.parse(localStorage.getItem(USER_LOGIN));
    // ✅ Lấy dữ liệu từ Redux store
    const businesses = useSelector(state => state.CandidateReducer.followList.businesses);
    const totalElements = useSelector(state => state.CandidateReducer.followList.totalElements);

    useEffect(() => {
        dispatch(list_follow(user?.candidateResponse?.id,keyword,pageNo - 1, pageSize));
    }, [pageNo, pageSize, keyword]);

    const handlePageChange = (page, size) => {
        setPageNo(page);
        setPageSize(size);
    };

    const handleSearch = (e) => {
        setPageNo(1);
        setKeyword(e.target.value);
    };

    const data = Array.isArray(businesses) ? businesses.map((business, index) => ({
        key: business.id,
        stt: (pageNo - 1) * pageSize + index + 1,
        businessName: business.businessName,
        industry: business.industry,
        totalFollower: business.totalFollower,
        totalJob: business.totalJob,
        imageID: business.imageID,
    })) : [];
    const handleDetailsBusinessPortal = (id) => {
        const encryptedId = encryptId(id);  // Encrypt the ID first
        const url = `/business-portal-detail/${encodeURIComponent(encryptedId)}`;  // Fix string literal
        window.open(url, "_blank");  // Open in a new tab
    };
    const unfollowBusiness = (businessId) => {
        Modal.confirm({
            title: "Xác nhận huỷ theo dõi",
            content: "Bạn có chắc chắn muốn huỷ theo dõi doanh nghiệp này?",
            okText: "Đồng ý",
            cancelText: "Hủy bỏ",
            onOk: async () => {
                if (!businessId || !user?.candidateResponse?.id) {
                    toast.error("Dữ liệu không hợp lệ, vui lòng kiểm tra lại.");
                    return;
                }

                try {
                    await dispatch(un_follow(businessId, user.candidateResponse.id));
                    toast.success("Đã hủy theo dõi doanh nghiệp!");
                    dispatch(list_follow(user?.candidateResponse?.id, keyword, pageNo - 1, pageSize));
                } catch (error) {
                    toast.error("Có lỗi xảy ra, vui lòng thử lại.");
                }
            }
        });
    };


    return (
        <section id="content" className="content">
            <div className="content__header content__boxed rounded-0">
                <div className="content__wrap">
                    <div className="mt-auto">
                        <div className="row">
                            <div className="col-md-12 mb-3 mt-3">
                                <Card title="Danh sách doanh nghiệp bạn theo dõi">
                                    <div className="table-responsive">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div style={{ display: 'flex', gap: '10px' }}>
                                                <Input
                                                    placeholder="Nhập tên doanh nghiệp..."
                                                    value={keyword}
                                                    onChange={handleSearch}
                                                    prefix={<SearchOutlined />}
                                                    style={{ width: 250 }}
                                                />
                                            </div>
                                        </div>

                                        <BusinessFollowTable data={data} onViewDetail={handleDetailsBusinessPortal}    onUnfollow={unfollowBusiness} />

                                        <ResultSummary totalElements={totalElements} />
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                        <Pagination
                                            current={pageNo}
                                            pageSize={pageSize}
                                            total={totalElements}
                                            onChange={handlePageChange}
                                            pageSizeOptions={['7', '10', '20', '50', '100']}
                                            showSizeChanger={true}
                                        />
                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CandidateFollow;
