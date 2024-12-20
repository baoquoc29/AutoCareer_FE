import {ExclamationCircleOutlined} from "@ant-design/icons";
import {Input, Modal} from "antd";
import {useState} from "react";

const RejectModal = ({open, onClose, handleReject}) => {
    const [message, setMessage] = useState("");

    return (
        <Modal
            open={open}
            onCancel={onClose}
            onOk={()=>handleReject(message)}
            okText="Từ chối"
            okType="danger"
            cancelText="Hủy"
            width={600}
        >
            <h2>
                <ExclamationCircleOutlined style={{color: "#faad14", marginRight: "8px"}}/>
                Nhập lý do từ chối
            </h2>
            <Input.TextArea
                rows={4}
                placeholder="Nhập lý do từ chối..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "16px",
                    resize: "none",
                }}
            />
        </Modal>
    )

}
export default RejectModal;
