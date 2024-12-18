import {DOMAIN, TOKEN} from "../Utils/Setting/Config";
import Axios from "axios";
import axios from "axios";

export class baseService {
    put = (url, model) => {
        const token = localStorage.getItem(TOKEN);
        const config = {
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
        };
        // Chỉ thêm Authorization nếu đã có token và url không bao gồm "login"
        if (token && !url.includes("login")) {
            config.headers = {
                'Authorization': `Bearer ${token}`
            };
        }
        return Axios(config).then(response => response.data).catch(error => {
            throw error
        });
    }

    post = (url, model) => {
        const token = localStorage.getItem(TOKEN);
        const config = {
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: model,
        };
        // Chỉ thêm Authorization nếu đã có token và url không bao gồm "login"
        if (token && !url.includes("login")) {
            config.headers = {
                'Authorization': `Bearer ${token}`
            };
        }
        return Axios(config).then(response => response.data).catch(error => {
            throw error
        });
    }
     postResponse = async (url, model) => {
        const token = localStorage.getItem(TOKEN);
        const config = {
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: model,
        };

        // Chỉ thêm Authorization nếu đã có token và url không bao gồm "login"
        if (token && !url.includes("login")) {
            config.headers = {
                'Authorization': `Bearer ${token}`
            };
        }

        try {
            const response = await axios(config); // Sử dụng await để đợi kết quả trả về
            return response.data; // Trả về dữ liệu nếu thành công
        } catch (error) {
            if (error.response) {
                return {
                    code: error.response.data.code,
                    message: error.response.data.message || "Đã xảy ra lỗi.",
                };
            } else {
                // Lỗi mạng hoặc lỗi khác
                return {
                    code: 500,
                    message: "Không thể kết nối tới máy chủ.",
                };
            }
        }
    }

    postFormData = async (url, model) => {
        const token = localStorage.getItem(TOKEN);
        const config = {
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: model,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        // Attach the token to headers if present and not on the login route
        if (token && !url.includes("login")) {
            config.headers = {
                ...config.headers,  // Spread existing headers
                'Authorization': `Bearer ${token}`,
            };
        }
        try {
            const response = await axios(config);
            return response.data; // Trả về dữ liệu nếu thành công
        } catch (error) {
            if (error.response) {
                return {
                    code: error.response.data.code,
                    message: error.response.data.message || "Đã xảy ra lỗi.",
                };
            } else {
                // Lỗi mạng hoặc lỗi khác
                return {
                    code: 500,
                    message: "Không thể kết nối tới máy chủ.",
                };
            }
        }
    };

    putFormData = (url, model) => {
        const token = localStorage.getItem(TOKEN);
        const config = {
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        // Attach the token to headers if present and not on the login route
        if (token && !url.includes("login")) {
            config.headers = {
                ...config.headers,  // Spread existing headers
                'Authorization': `Bearer ${token}`,
            };
        }
        return Axios(config).then(response => response.data).catch(error => { throw error });
    }
    putResponse = async (url, model) => {
        const token = localStorage.getItem(TOKEN);
        const config = {
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        // Attach the token to headers if present and not on the login route
        if (token && !url.includes("login")) {
            config.headers = {
                ...config.headers,  // Spread existing headers
                'Authorization': `Bearer ${token}`,
            };
        }
        try {
            const response = await axios(config); // Sử dụng await để đợi kết quả trả về
            return response.data; // Trả về dữ liệu nếu thành công
        } catch (error) {
            if (error.response) {
                return {
                    code: error.response.data.code,
                    message: error.response.data.message || "Đã xảy ra lỗi.",
                };
            } else {
                // Lỗi mạng hoặc lỗi khác
                return {
                    code: 500,
                    message: "Không thể kết nối tới máy chủ.",
                };
            }
        }
    }
     getResponse = async (url) => {
        const token = localStorage.getItem(TOKEN);

        const config = {
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
        };

        // Nếu có token, thêm Authorization vào headers
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await axios(config);
            console.log(response.data)
            return response.data; // Trả về data từ response
        } catch (error) {
            if (error.response) {
                return {
                    code: error.response.data.code,
                    message: error.response.data.message || "Đã xảy ra lỗi.",
                };
            } else {
                return {
                    code: 500,
                    message: "Không thể kết nối tới máy chủ.",
                };
            }
        }
    }


    get = (url) => {
        const token = localStorage.getItem(TOKEN);

        const config = {
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
        };

        // Nếu có token, thêm Authorization vào headers
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return Axios(config)
            .then(response => response.data)
            .catch(error => {
                throw error;
            });
    }


    delete = (url) => {
        const token = localStorage.getItem(TOKEN);
        const config = {
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
        };
        // Chỉ thêm Authorization nếu đã có token và url không bao gồm "login"
        if (token && !url.includes("login")) {
            config.headers = {
                'Authorization': `Bearer ${token}`
            };
        }
        return Axios(config).then(response => response.data).catch(error => {
            throw error
        });
    }
    deleteData = (url,model) => {
        const token = localStorage.getItem(TOKEN);
        const config = {
            url: `${DOMAIN}/${url}`,
            method: 'DELETE',
            data: model,
        };
        // Chỉ thêm Authorization nếu đã có token và url không bao gồm "login"
        if (token && !url.includes("login")) {
            config.headers = {
                'Authorization': `Bearer ${token}`
            };
        }
        return Axios(config).then(response => response.data).catch(error => {
            throw error
        });
    }
}