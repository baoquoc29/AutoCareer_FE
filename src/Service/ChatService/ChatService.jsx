import {baseService} from "../BaseService";

export class ChatService extends baseService {
    // eslint-disable-next-line no-useless-constructor
    constructor() {
        super();
    }

    get_message_by_id = (page, size,senderId,receiverId) => {
        return this.get(`messages?page=${page}&size=${size}&senderId=${senderId}&receiverId=${receiverId}`);
    };
    get_users = (page, size) => {
        return this.get(`users?page=${page}&size=${size}`);
    };
    get_information = (page, size,id) => {
        return this.get(`information?page=${page}&size=${size}&userId=${id}`);
    };
    get_information_candidate = (page, size,id) => {
        return this.get(`information-candidate?page=${page}&size=${size}&userId=${id}`);
    };

}

export const chatService = new ChatService();
