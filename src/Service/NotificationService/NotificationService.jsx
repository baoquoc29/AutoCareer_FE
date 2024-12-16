import { baseService } from "../BaseService";


export class NotificationService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    get_all_notifications = () => {
        return this.get('api/notification/get-all');
    };

    streamNotifications = () => {
        return 'api/notification/streamNotifications';
    }


}

// Instantiate WorkShopService
export const notificationService = new NotificationService();
