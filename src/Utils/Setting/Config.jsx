
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const DISPLAY_LOADING = 'DISPLAY_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

// export const DOMAIN = 'http://localhost:1111/auto-career'
// export const GET_IMAGE_URL = `${DOMAIN}/api/v1/image/resource?imageId=`;
export const DOMAIN = 'http://localhost:8081/auto-career'
export const GET_IMAGE_URI = `${DOMAIN}/api/v1/image/resource?imageId=`
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