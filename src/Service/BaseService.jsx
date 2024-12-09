import {DOMAIN, TOKEN} from "../Utils/Setting/Config";
import Axios from "axios";

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
    postFormData = (url, model) => {
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
        return Axios(config).then(response => response.data).catch(error => { throw error });
    }
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

    postFormData = (url, model) => {
        const token = localStorage.getItem(TOKEN);
        const config = {
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: model, // Use `data` for Axios
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        };

        // Attach the token to headers if present and not on the login route
        if (token && !url.includes("login")) {
            config.headers = {
                ...config.headers, // Spread existing headers
                'Authorization': `Bearer ${token}`,
            };
        }

        // Sending the request using Axios
        return Axios(config)
            .then(response => response) // Return the entire response object
            .catch(error => {
                console.error("Request Error:", error); // Log the error for debugging
                // Handle different error cases (e.g., network, server)
                if (error.response) {
                    // Error from the server (response with status code)
                    throw new Error(`Server Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
                } else if (error.request) {
                    // No response from the server
                    throw new Error('No response from the server');
                } else {
                    // Any other errors
                    throw new Error(`Unexpected Error: ${error.message}`);
                }
            });
    };


    get = (url) => {
        const token = localStorage.getItem(TOKEN);
        const config = {
            url: `${DOMAIN}/${url}`,
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
        };
        return Axios(config).then(response => response.data).catch(error => {
            throw error
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
    postFormData = (url, model) => {
        const token = localStorage.getItem(TOKEN);
        const config = {
            url: `${DOMAIN}/${url}`,
            method: 'POST',
            data: model,  // Use `data` instead of `body` for Axios
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

        // Sending the request using Axios
        return Axios(config)
            .then(response => response.data)  // Return the response data on success
            .catch(error => {
                console.error("Request Error:", error);  // Log the error for debugging
                // Handle different error cases (e.g., network, server)
                if (error.response) {
                    // Error from the server (response with status code)
                    throw new Error(`Server Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
                } else if (error.request) {
                    // No response from the server
                    throw new Error('No response from the server');
                } else {
                    // Any other errors
                    throw new Error(`Unexpected Error: ${error.message}`);
                }
            });
    };
    putFormData = (url, model) => {
        const token = localStorage.getItem(TOKEN);
        const config = {
            url: `${DOMAIN}/${url}`,
            method: 'PUT',
            data: model,  // Use `data` instead of `body` for Axios
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

        // Sending the request using Axios
        return Axios(config)
            .then(response => response.data)  // Return the response data on success
            .catch(error => {
                console.error("Request Error:", error);  // Log the error for debugging
                // Handle different error cases (e.g., network, server)
                if (error.response) {
                    // Error from the server (response with status code)
                    throw new Error(`Server Error: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
                } else if (error.request) {
                    // No response from the server
                    throw new Error('No response from the server');
                } else {
                    // Any other errors
                    throw new Error(`Unexpected Error: ${error.message}`);
                }
            });

    }
}