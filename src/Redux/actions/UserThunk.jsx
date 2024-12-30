import {
    CHANGE_PASS_WORD,
    CLEAN_LOCAL_STORAGE,
    CLEAR_RESPONSE,
    DISPLAY_LOADING,
    HIDE_LOADING, LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    SEND_CODE_BUSINESS_SUCCESS,
    SEND_CODE_UNIVERSITY_SUCCESS, SEND_NEW_PASSWORD,
    SIGNUP_BUSINESS_SUCCESS,
    SIGNUP_UNIVERSITY_SUCCESS,
    STATUS_CODE,
    TOKEN,
    USER_LOGIN,
    VERIFY_CODE_SUCCESS
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
    }
    catch (error) {
        toast.error(error.response.data.message)
        console.log(error.response.data.message)
        dispatch({
            type: LOGIN_FAILURE,
            payload: {
                error: error.response ? error.response.data.message : "Đã có lỗi xảy ra",
            },
        });
    }
};
export const logoutUser = (token) => async (dispatch) => {
    dispatch({type: DISPLAY_LOADING})
    await new Promise(resolve => setTimeout(resolve, 2000));
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
export const change_password = (formData) => {
    return async (dispatch) => {
        dispatch({ type: DISPLAY_LOADING });
        try {
            const res = await userService.change_password(formData);

            // Dispatch action thành công
            dispatch({
                type: CHANGE_PASS_WORD,
                payload: res,
            });

            toast.success('Thay đổi mật khẩu thành công!'
            );

        } catch (error) {
            console.log('change error:', error);
            toast.error('Đã xảy ra lỗi khi thay đổi mật khẩu. Vui lòng thử lại.!');
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};
export const sign_up_university = (formData) => {
    return async (dispatch) => {
        dispatch({ type: DISPLAY_LOADING });  // Show loading state
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const res = await userService.sign_up_university(formData);
            dispatch({
                type: SIGNUP_UNIVERSITY_SUCCESS,
                payload: res,
            });
        } catch (error) {
            console.log('sign_up_university error:', error);
        } finally {
            dispatch({ type: HIDE_LOADING });  // Hide loading state
        }
    };
};
export const clearResponseBusiness = () => {
    return { type: CLEAR_RESPONSE };
};
export const clearLocalStorage = () => {
    return { type: CLEAN_LOCAL_STORAGE };
};
export const sign_up_business = (formData) => {
    return async (dispatch) => {
        dispatch({ type: DISPLAY_LOADING });  // Show loading state
        try {
          //  await new Promise(resolve => setTimeout(resolve, 1000));
            const res = await userService.sign_up_business(formData);
            dispatch({
                type: SIGNUP_BUSINESS_SUCCESS,
                payload: res,
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
                type: SEND_CODE_BUSINESS_SUCCESS,
                payload: res,
            });
        } catch (e) {
            console.log('verify_account_business error:', e);
        } finally {
            dispatch({ type: HIDE_LOADING });  // Hide loading state
        }
    };
};

export const verify_account_university = (formData) => {
    return async (dispatch) => {
        dispatch({ type: DISPLAY_LOADING });  // Show loading state
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const res = await userService.send_verify_code_university(formData);
            dispatch({
                type: SEND_CODE_UNIVERSITY_SUCCESS,
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
                type: SEND_NEW_PASSWORD,
                payload: res,
            });
        } catch (e) {
            console.log('verify_account_business error:', e);
        } finally {
            dispatch({ type: HIDE_LOADING });
        }
    };
};
