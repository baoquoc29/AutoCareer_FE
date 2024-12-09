import {
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    TOKEN,
    USER_LOGIN,
    VERIFY_CODE_SUCCESS,
    VERIFY_CODE_FAIL,
    RESET_RESPONSE
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
    response: null,
    error: null,
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
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                userData: null,
                token: null,
                error: null
            }
        case RESET_RESPONSE:
            return {
                ...state,
                response: null, // Reset về giá trị mặc định
            };
        case VERIFY_CODE_SUCCESS:
            return {
                ...state,
                verificationCode: action.payload,
                response: action.payload,
                error: null,
            };

        case VERIFY_CODE_FAIL:
            return {
                ...state,
                error: action.payload,
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
