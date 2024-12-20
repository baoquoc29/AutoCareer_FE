import { baseService } from "../BaseService";
import {DOMAIN} from "../../Utils/Setting/Config";

export class NotificationService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    get_all_paging_notifications = (pageNo, pageSize) => {
        return this.get(`api/notification/get-all-paging?pageNo=${pageNo}&pageSize=${pageSize}`);
    };

    count_unread_notifications = () => {
        return this.get(`api/notification/count-unread`);
    }

    mark_read_notification = (data) => {
        return this.post(`api/notification/mark-read`, data);
    }

    mark_read_all_notifications = (data) => {
        return this.post('api/notification/mark-read-all');
    }

    stream_notifications = (userId) => {
        return `${DOMAIN}/api/notification/stream/${userId}`;
    }

}

// Instantiate WorkShopService
export const notificationService = new NotificationService();
