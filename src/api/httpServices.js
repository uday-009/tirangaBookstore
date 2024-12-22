import axios from 'axios';

import { BASE_URL } from './url';
import { toast } from 'react-toastify';

export const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 50000,
    headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
    }
})


instance.interceptors.request.use(function (config) {

    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;

    // return {
    //     ...config,
    //     headers: {
    //         authorization: localStorage.getItem("userObj"),
    //       },
    // };
}, (error) => {
    return Promise.reject(error); // Reject the promise in case of an error during the request
});



// instance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response.status === 401) {
//         // Unauthorized request
//         toast.error('session expired, unauthourized!, please login again to continue')
//         console.error('401 error')
//         localStorage.removeItem("userObj");
//         localStorage.removeItem("userDetails");
//         localStorage.removeItem("project");
//       }
//       return Promise.reject(error);
//     }
//   );


const responseBody = (response) => response.data;

const error = (error) => {
    if (error?.response?.status === 401) {

        localStorage.removeItem("userObj");
        localStorage.removeItem("userDetails");
        localStorage.removeItem("project");
        return {
            status: false,
            message: "Session expired. Unauthorized. Please log in again to continue.",
        };

    }
    if (error?.response) {
        return { status: false, message: error?.response?.data?.message || "An error occurred." };
    }
    if (error.request) {

        return { status: false, message: "Network error. Please check your connection." };
    } else {
        return { status: false, message: "Unknown error occurred." };
    }
};

const requests = {
    get: (url, body, headers) =>
        instance.get(url, body, headers).then(responseBody).catch(error),

    post: (url, body, headers) => instance.post(url, body, headers).then(responseBody).catch(error),

    put: (url, body, headers) =>
        instance.put(url, body, headers).then(responseBody).catch(error),

    patch: (url, body) => instance.patch(url, body).then(responseBody).catch(error),

    delete: (url, body) => instance.delete(url, body).then(responseBody).catch(error),

    download: (url, headers) => instance.get(url, { responseType: 'blob' }, headers).then(responseBody).catch(error)
};

export default requests;
