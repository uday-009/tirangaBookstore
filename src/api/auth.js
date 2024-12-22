import requests from "./httpServices";


const authServices = {
    verifyMobile : (body) => requests.post('auth/verify', body),

    verifyOtp : (body) => requests.post('auth/validate', body),

    resendOtp: (body) => requests.post('auth/resend', body)
}

export default authServices;