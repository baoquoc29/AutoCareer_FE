// reducer.js


// Reducer xử lý các hành động liên quan đến thông báo
import {MARK_AS_READ, NOTIFICATION_RECEIVED, SET_UNREAD_COUNT} from "../types/NotificationType";

const initialState = {
    notifications: [],
    unreadCount: 0,
    notification: {},
};

export const NotificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFICATION_RECEIVED:
            return {
                ...state,
                notifications: [...state.notifications, action.payload],
                notification: action.payload,
                unreadCount: state.unreadCount + (action.payload.read ? 0 : 1),
            };
        case MARK_AS_READ:
            return {
                ...state,
                notifications: state.notifications.map(notification =>
                    notification.id === action.payload.id ? { ...notification, read: true } : notification
                ),
                unreadCount: state.unreadCount - 1,
            };
        case SET_UNREAD_COUNT:
            return {
                ...state,
                unreadCount: action.payload,
            };
        default:
            return state;
    }
};
