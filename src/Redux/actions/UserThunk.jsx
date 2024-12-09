import {
    DISPLAY_LOADING,
    HIDE_LOADING,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS, RESET_RESPONSE, SIGNUP_BUSINESS_SUCCESS,
    SIGNUP_SUCCESS, SIGNUP_UNIVERSITY_SUCCESS,
    STATUS_CODE,
    TOKEN,
    USER_LOGIN, VERIFY_CODE_FAIL, VERIFY_CODE_SUCCESS
} from "../../Utils/Setting/Config";
import {userService} from "../../Service/UserService/UserService";
import {toast} from "react-toastify";



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
export const sign_up_university = (formData) => {
    return async (dispatch) => {
        dispatch({ type: DISPLAY_LOADING });  // Show loading state
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const res = await userService.sign_up_university(formData);
            dispatch({
                type: SIGNUP_UNIVERSITY_SUCCESS,
                payload: res.data,
            });
        } catch (error) {
            console.log('sign_up_university error:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });  // Hide loading state
        }
    };
};

export const sign_up_business = (formData) => {
    return async (dispatch) => {
        dispatch({ type: DISPLAY_LOADING });  // Show loading state
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const res = await userService.sign_up_business(formData);
            dispatch({
                type: SIGNUP_BUSINESS_SUCCESS,
                payload: res.data,
            });
        } catch (error) {
            console.log('sign_up_business error:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });  // Hide loading state
        }
    };
};

export const verify_account_business = (formData) => {
    return async (dispatch) => {
        dispatch({ type: DISPLAY_LOADING });  // Show loading state
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const res = await userService.send_verify_code_business(formData);
            dispatch({
                type: VERIFY_CODE_SUCCESS,
                payload: res,
            });
        } catch (e) {
            console.log('verify_account_business error:', e);
        } finally {
            dispatch({ type: HIDE_LOADING });  // Hide loading state
        }
    };
};
export const resetResponse = () => ({
    type: RESET_RESPONSE,
});

export const verify_account_university = (formData) => {
    return async (dispatch) => {
        dispatch({ type: DISPLAY_LOADING });  // Show loading state
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const res = await userService.send_verify_code_university(formData);
            dispatch({
                type: VERIFY_CODE_SUCCESS,
                payload: res,
            });
        } catch (e) {
            console.log('verify_account_university error:', e);
        } finally {
            dispatch({ type: HIDE_LOADING });  // Hide loading state
        }
    };
};

export const send_code_forgot = (formData) => {
    return async (dispatch) => {
        dispatch({ type: DISPLAY_LOADING });
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const res = await userService.send_forgot_code(formData);

            dispatch({
                type: VERIFY_CODE_SUCCESS,
                payload: res,
            });
        } catch (e) {
            console.log('verify_account_business error:', e);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};
export const send_new_password = (formData) => {
    return async (dispatch) => {
        dispatch({ type: DISPLAY_LOADING });
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const res = await userService.send_new_password(formData);

            dispatch({
                type: VERIFY_CODE_SUCCESS,
                payload: res,
            });
        } catch (e) {
            console.log('verify_account_business error:', e);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};
