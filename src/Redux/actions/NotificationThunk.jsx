import {notificationService} from "../../Service/NotificationService/NotificationService";
import {
    GET_NOTIFICATIONS,
    MARK_ALL_AS_READ,
    MARK_AS_READ,
    NOTIFICATION_RECEIVED,
    SET_UNREAD_COUNT
} from "../types/NotificationType";
import {notification} from "antd";
import {STATUS_CODE} from "../../Utils/Setting/Config";
import {toast} from "react-toastify";
import {BellOutlined} from "@ant-design/icons";

export const listen_for_notifications = (userId) => {
    return (dispatch) => {
        console.log("Begin connecting")
        const eventSource = new EventSource(notificationService.stream_notifications(userId));

        eventSource.addEventListener('notification', (event) => {
            const req = JSON.parse(event.data);
            console.log(notification);
            notification.open({
                message: req.title,
                description: req.message,
                key: req.id,
                icon: <BellOutlined style={{ color: '#ff4d4f', fontSize: '24px' }} />, // Icon thông báo
                style: {
                    borderRadius: 8,
                    padding: '16px',
                    width: 300,
                },
            });
            dispatch({type: NOTIFICATION_RECEIVED, payload: req});
        });

        // Xử lý lỗi
        eventSource.addEventListener('error', (error) => {
            console.error("SSE connection error", error);
            eventSource.close();
        });
    };
}
export const count_unread_notifications = () => {
    return async (dispatch) => {
        try {
            const res = await notificationService.count_unread_notifications();
            console.log(res)
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: SET_UNREAD_COUNT,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const mask_read_notification = (data) => {
    return async (dispatch) => {
        try {
            const res = await notificationService.mark_read_notification(data);
            console.log(res)
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: MARK_AS_READ,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export const mask_read_all_notifications = () => {
    return async (dispatch) => {
        try {
            const res = await notificationService.mark_read_all_notifications();
            console.log(res)
            if (res.code === STATUS_CODE.SUCCESS) {
                dispatch({
                    type: MARK_ALL_AS_READ,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}
export const get_all_paging_notifications = (pageNo, pageSize) => {
    return async (dispatch) => {
        try {
            const res = await notificationService.get_all_paging_notifications(pageNo, pageSize);
            if (res.code === STATUS_CODE.SUCCESS) {
                await dispatch({
                    type: GET_NOTIFICATIONS,
                    payload: res.data
                })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}



