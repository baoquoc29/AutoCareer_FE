// Thunk để lắng nghe thông báo qua SSE và dispatch hành động khi có thông báo mới
import {notificationService} from "../../Service/NotificationService/NotificationService";
import {NOTIFICATION_RECEIVED} from "../types/NotificationType";
import {TOKEN} from "../../Utils/Setting/Config";
import RNEventSource from "react-native-event-source";

export const listen_for_notifications = () => (dispatch) => {
    const token = localStorage.getItem(TOKEN);
    const options = {headers: {Authorization: `Bearer${token}`}};
    const eventSource = new RNEventSource(notificationService.streamNotifications(), options);

    eventSource.addEventListener('notification', (event) => {
        const notification = JSON.parse(event.data);
        console.log(notification);
        dispatch({type: NOTIFICATION_RECEIVED, payload: notification});
    });

    eventSource.addEventListener('error', (event) => {
        console.error("Error with SSE connection", event);
        eventSource.close();
    });

    return eventSource; // Trả về eventSource để có thể tắt kết nối khi không cần thiết
};

