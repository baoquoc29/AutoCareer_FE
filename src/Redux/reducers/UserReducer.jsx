import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    TOKEN,
    USER_LOGIN,
    VERIFY_CODE_SUCCESS,
    VERIFY_CODE_FAIL,
    SEND_CODE_REMINDER_SUCCESS,
    SEND_CODE_CANDIDATE_SUCCESS,
    SEND_CODE_BUSINESS_SUCCESS,
    SIGNUP_BUSINESS_SUCCESS,
    CLEAR_RESPONSE,
    SIGNUP_CANDIDATE_SUCCESS,
    SEND_NEW_PASSWORD,
    CLEAN_LOCAL_STORAGE, CHANGE_PASS_WORD, LOGIN_FAILURE,
} from "../../Utils/Setting/Config";
import { jwtDecode } from 'jwt-decode';
import {toast} from "react-toastify";

const isTokenExpired = (token) => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
};

const initialState = {
    isAuthenticated: JSON.parse(localStorage.getItem(USER_LOGIN)),
    userData: JSON.parse(localStorage.getItem(USER_LOGIN)) || null,
    token: localStorage.getItem(TOKEN) || null,
    verificationCode : null,
    responseCandidate: null,
    responseBusiness: null,
    responsePasswordReminder: null,
    responseSendPassWordCode : null,
    responseSignUpBusiness : null,
    responseSignUpCandidate : null,
    responseSendNewPassword : null,
    response : null,
    error: null,
    change_password : null,

}

export const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                userData: action.payload.userData,
                token: action.payload.token,
            };
        case LOGIN_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                error: action.payload.error,
            };

        case CLEAR_RESPONSE:
            return {
                ...state,
                responseCandidate: null,
                responseBusiness: null,
                responsePasswordReminder: null,
                responseSendPassWordCode : null,
                responseSignUpBusiness : null,
                response : null,
                responseSignUpCandidate: null,
                responseSendNewPassword: null,
            };
        case CLEAN_LOCAL_STORAGE:
            return {
                ...state,
                userData: null,
                isAuthenticated: false,
                token: null,
                error: null
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                userData: null,
                token: null,
                error: null
            }
        case VERIFY_CODE_SUCCESS:
            return {
                ...state,
                verificationCode: action.payload,
                response: action.payload,
                error: null,
            };
        case SEND_CODE_BUSINESS_SUCCESS:
            return {
                ...state,
                verificationCode: action.payload,
                responseBusiness: action.payload,
                error: null,
            };
        case SEND_CODE_CANDIDATE_SUCCESS:
            return {
                ...state,
                verificationCode: action.payload,
                responseCandidate: action.payload,
                error: null,
            };
        case SEND_CODE_REMINDER_SUCCESS:
            return {
                ...state,
                verificationCode: action.payload,
                responsePasswordReminder: action.payload,
                error: null,
            };
        case SIGNUP_BUSINESS_SUCCESS:
            return {
                ...state,
                responseSignUpBusiness: action.payload,
                error: null,
            }
            case SIGNUP_CANDIDATE_SUCCESS:
                return {
                    ...state,
                    responseSignUpCandidate: action.payload,
                    error: null,
                }
        case SEND_NEW_PASSWORD:
            return {
                ...state,
                responseSendNewPassword: action.payload,
                error: null,
            }
        case VERIFY_CODE_FAIL:
            return {
                ...state,
                error: action.payload,
            };
        case CHANGE_PASS_WORD:
            return {
                ...state,
                change_password: action.payload,
            };
        default:
            // Kiểm tra xem token có hết hạn không mỗi lần state được cập nhật
            if (state.token && isTokenExpired(state.token)) {
                // Nếu token hết hạn, logout người dùng
                localStorage.removeItem(TOKEN); // Xóa token trong localStorage
                localStorage.removeItem(USER_LOGIN); // Xóa thông tin người dùng
                toast.warning("Bạn đã hết phiên đăng nhập, vui lòng đăng nhập lại")
                return {
                    ...state,
                    isAuthenticated: false,
                    userData: null,
                    token: null,
                };
            }
            return {...state}
    }
}
