import React from "react";

const ResultSummary = ({ totalElements }) => {
    return (
        <div className="mt-3">
            {totalElements === 0 ? (
                <span style={{
                    float: "right",
                    fontSize: "14px",
                    color: "#555",
                }}>
            Có <span style={{fontWeight: "bold"}}>0</span> kết quả được tìm thấy
        </span>
            ) : (
                <span style={{
                    float: "right",
                    fontSize: "14px",
                    color: "#555",
                }}>
            Có <span style={{fontWeight: "bold"}}>{totalElements}</span> kết quả được tìm thấy
        </span>
            )}
        </div>
    );
};

export default ResultSummary;
