import {DISPLAY_LOADING, HIDE_LOADING, LOGIN_SUCCESS, LOGOUT_SUCCESS, STATUS_CODE, TOKEN, USER_LOGIN} from "../../Utils/Setting/Config";
import {userService} from "../../Service/UserService/UserService";


export const loginUser = (username, password) => async (dispatch) => {
    try {
        const res = await userService.login(username, password);
        console.log(res.data);
        if (res.data && res.data.accessToken) {
            const {accessToken, ...userDetails } = res.data;
            localStorage.setItem(TOKEN, accessToken);
            localStorage.setItem(USER_LOGIN, JSON.stringify(userDetails));
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    userData: userDetails,
                    token: accessToken
                }
            });
        } else {
            console.log("Login failed, no token returned");
        }
    } catch (error) {
        console.log("Error during login:", error.response.data.message);
    }
};
export const logoutUser = (token) => async (dispatch) => {
    dispatch({type: DISPLAY_LOADING})
    await new Promise(resolve => setTimeout(resolve, 3000));
    try {
        const res = await userService.logout(token);
        if (res === STATUS_CODE.SUCCESS) {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            dispatch({
                type: LOGOUT_SUCCESS,
            });
        }
    } catch (error) {
        console.log('Logout error:', error)
    }
    dispatch({type: HIDE_LOADING})
}