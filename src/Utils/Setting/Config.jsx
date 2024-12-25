
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SIGNUP_UNIVERSITY_SUCCESS = 'SIGNUP_UNIVERSITY_SUCCESS';
export const CHANGE_PASS_WORD = 'CHANGE_PASS_WORD';
export const SIGNUP_BUSINESS_SUCCESS = 'SIGNUP_BUSINESS_SUCCESS';
export const CLEAR_RESPONSE = 'CLEAR_RESPONSE';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const SEND_CODE_UNIVERSITY_SUCCESS = 'SEND_CODE_UNIVERSITY_SUCCESS';
export const SEND_CODE_BUSINESS_SUCCESS = 'SEND_CODE_BUSINESS_SUCCESS';
export const SEND_CODE_REMINDER_SUCCESS = 'SEND_CODE_REMINDER_SUCCESS';
export const SEND_NEW_PASSWORD = 'SEND_NEW_PASSWORD';
export const VERIFY_CODE_SUCCESS = 'VERIFY_CODE_SUCCESS';
export const VERIFY_CODE_FAIL = 'VERIFY_CODE_FAIL';
export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export const DISPLAY_LOADING = 'DISPLAY_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';
export const CLEAN_LOCAL_STORAGE = 'CLEAN_LOCAL_STORAGE';
// export const DOMAIN = 'http://192.168.0.152:8081/auto-career'
export const DOMAIN = 'http://localhost:8081/auto-career'
export const GET_IMAGE_URI = `${DOMAIN}/api/v1/image/resource?imageId=`
// export const GET_IMAGE_URI = `http://192.168.0.152:8081/auto-career/api/v1/image/resource?imageId=`


export const TOKEN = 'accessToken'

export const USER_LOGIN = 'USER_LOGIN';

export const STATUS_CODE = {
    SUCCESS: 200,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    BAD_REQUEST:400
}
export const statusBrowse = {
    PENDING: "Đang chờ xử lý",
    APPROVED: "Đã được duyệt"
};