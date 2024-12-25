// reducer.js


// Reducer xử lý các hành động liên quan đến thông báo
import {
    GET_NOTIFICATIONS,
    MARK_ALL_AS_READ,
    MARK_AS_READ,
    NOTIFICATION_RECEIVED,
    SET_UNREAD_COUNT
} from "../types/NotificationType";

const initialState = {
    notifications: [],
    unreadCount: 0,
    newNotification: {},
    totalElements: 0,
};

export const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    ...action.payload.content.filter(
                        (newNotification) =>
                            !state.notifications.some(
                                (existingNotification) => existingNotification.id === newNotification.id
                            )
                    )
                ],
                totalElements: action.payload.totalElements,
            };
        case MARK_ALL_AS_READ:
            return {
                ...state,
                unreadCount: 0,
                newNotifications: {},
                newNotification: {},
                notifications: state.notifications.map(notification =>
                    notification.statusRead === "UNREAD" ? {...notification, statusRead: "READ"} : notification
                ),
            }
        case NOTIFICATION_RECEIVED:
            return {
                ...state,
                notifications: [action.payload, ...state.notifications],
                newNotification: action.payload,
                unreadCount: state.unreadCount + 1,
            }
        case MARK_AS_READ:
            return {
                ...state,
                notifications: state.notifications.map(notification =>
                    notification.id === action.payload.id ? {...notification, statusRead: "READ"} : notification
                ),
                unreadCount: state.unreadCount - 1,
            };
        case SET_UNREAD_COUNT:
            return {
                ...state,
                unreadCount: action.payload.amount,
            };
        default:
            return state;
    }
};
