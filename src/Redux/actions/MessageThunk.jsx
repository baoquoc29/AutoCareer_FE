import {chatService} from "../../Service/ChatService/ChatService";
import {
    GET_MESSAGE, GET_USER
} from "../types/MessageType";


export const get_all_messages = (page,size,senderId,receiverId) => {
    return async (dispatch) => {
        try {
            const res = await chatService.get_message_by_id(page,size,senderId,receiverId);
            dispatch({
                type: GET_MESSAGE,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_all_users = (page,size) => {
    return async (dispatch) => {
        try {
            const res = await chatService.get_users(page,size);
            dispatch({
                type: GET_USER,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_all_information_by_id = (page,size,userId) => {
    return async (dispatch) => {
        try {
            const res = await chatService.get_information(page,size,userId);

            dispatch({
                type: GET_USER,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const get_all_information_candidate_by_id = (page,size,userId) => {
    return async (dispatch) => {
        try {
            const res = await chatService.get_information_candidate(page,size,userId);

            dispatch({
                type: GET_USER,
                payload: res.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}