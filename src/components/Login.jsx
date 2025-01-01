import React, { useEffect, useState, useRef } from 'react'
import OtpInput from './OtpInput';
import authServices from '../api/auth';
import useAuth from '../context/AuthContext';

const Login = () => {

    const { login } = useAuth();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [showOtpField, setShowOtpField] = useState(false);
    const [otpLoading, setOtpLoading] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setPhoneNumber("")
        setShowOtpField(false)
    }, [])

    const handlePhoneNumber = (e) => {
        const { value } = e.target;
        setPhoneNumber(value);
        const regex = /[^0-9]/g;
        // if (value.length < 10 || regex.test(value)) {
        //     setPhoneError('Please enter a valid phone number');
        // } else {
        // }
        setPhoneError('');  // Clear error if valid
    }


    console.log(phoneNumber, 'phoneNumber');

    const handlePhoneSubmit = async (event) => {
        event.preventDefault();

        const regex = /[^0-9]/g;

        if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
            setPhoneError('Please enter a valid phone number');
            return;
        }
        setPhoneError('');
        setLoading(true);
        // call the api to send otp
        try {
            const res = await authServices.verifyMobile({ username: phoneNumber });
            if (res.status) {
                // show otp input field
                console.log(phoneNumber, 'submit');
                setShowOtpField(true)
            } else {
                console.error("verify mobile error:", res)
            }
        } catch (error) {
            console.error("verify mobile:", error)
        } finally {
            setLoading(false); // End loading for phone submit
        }

    }

    


    const handleEditNumber = () => {
        setShowOtpField(false);
    }

    const onOtpSubmit = async(otp) => {
        try {
            setOtpLoading(true);
            await  login(phoneNumber, otp);   
        } catch (error) {
            setOtpLoading(false)
        }
    }

    return (
        <div>
            <div className='flex justify-center items-center px-10 pt-8 pb-0 relative'>
                <div className="login-logo pe-4 border border-0 border-r  border-[#000] border-[#f2f5f8]">
                    <span class="self-center text-3xl font-bold font-magilio tracking-widest whitespace-nowrap text-secondary dark:text-white">TB </span>
                    <span class="self-center text-3xl font-bold font-magilio tracking-widest whitespace-nowrap text-primary dark:text-white">House. </span>
                </div>
                <div className="flex flex-col ps-4">
                    <span className='font-bold text-[18px]'>
                        Welcome
                    </span>
                    <span className=' text-[16px] text-[#333]'>
                        Join for seamless experience
                    </span>
                </div>
            </div>
            <div className='px-10 pt-0 pb-8'>
                {!showOtpField ? (<form onSubmit={handlePhoneSubmit}>
                    <div className='mt-8'>
                        <div className='relative w-full border-0 h-[56px] '>
                            <div className='country-code absolute top-0 left-0 h-full w-[70px] flex justify-center items-center  font-[500] text-[18px] 
                            after:content-[""] after:block after:absolute after:w-[2px] after:h-[30px] after:bg-[#ddd] after:right-0 after:top-[13px] '>
                                +91
                            </div>
                            <input type="text"
                                value={phoneNumber}
                                onChange={handlePhoneNumber}
                                maxLength={10}
                                placeholder='Enter Mobile Number*'
                                className='text-secondary font-[500] text-[18px] border border-[3px] border-[#999] rounded-md w-full pl-[85px] h-full focus:border-secondary  focus:ring-0'
                            />
                            {phoneError && <div className="text-red-500 text-sm mt-2">{phoneError}</div>} {/* Show error message */}
                        </div>
                    </div>
                    <div class="mt-6 flex flex-col animcheck justify-center items-center text-[14px]">

                        <div htmlFor="animcheck" class="ps-2 animlabel flex justify-center items-center text-[14px] font-[500]">
                            <div class=" animtext text-[#777] text-center">
                                <span>
                                    By proceeding you confirm that you  agree to the
                                </span>
                                <a href="#" target="_blank" class="underline decoration-secondary">
                                    <div class=" mt-0.5 text-secondary">T&amp;C's Privacy Policy</div>
                                </a>
                            </div>
                        </div>

                    </div>
                    <div className="mt-8">
                        <button type='submit' className='bg-secondary text-white font-bold w-full h-[46px] rounded rounded-md hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.15)]'> {loading ? 'Loading...' : 'Login with OTP'} </button>
                    </div>
                </form>) : <div>
                    <OtpInput length={4} onOtpSubmit={onOtpSubmit} phoneNumber={phoneNumber} editNumber={handleEditNumber} otpLoading={otpLoading} />
                </div>}
            </div>
        </div>
    )
}

export default Login