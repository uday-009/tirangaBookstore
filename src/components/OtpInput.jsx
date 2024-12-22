import React, { useEffect, useRef, useState } from 'react';
import { HiOutlinePencil } from "react-icons/hi";
import authServices from '../api/auth';

const OtpInput = ({ length = 4, onOtpSubmit = () => { }, phoneNumber, editNumber }) => {

    const [otp, setOtp] = useState(new Array(length).fill(""));
    const [timer, setTimer] = useState(60); // Timer state for 60 seconds
    const [isResendDisabled, setIsResendDisabled] = useState(true);


    const inputRefs = useRef([])

    // useEffect(() => {
    //     if (inputRefs.current[0]) {
    //         inputRefs.current[0].focus();
    //     }
    // }, []);

    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }

        // Timer logic: Start countdown when OTP page loads
        if (timer > 0 && isResendDisabled) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1); // Decrease timer every second
            }, 1000);

            // Clear interval when timer reaches 0 or component unmounts
            return () => clearInterval(interval);
        }

    }, [isResendDisabled]);


    const handleChange = (e, index) => {
        const { value } = e.target;

        if (isNaN(value)) return;

        const newOtp = [...otp];
        // allow only one input
        newOtp[index] = value?.substring(value.length - 1);

        console.log(newOtp[index], 'onchange from otp');
        setOtp(newOtp);

        // combine otp -- submit trigger ;
        const combineOtp = newOtp.join("");
        if (combineOtp.length === length) {
            // disable the input fields
            onOtpSubmit(combineOtp)
        };

        // Move to next input field if current is filled
        if (value && index < length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }


    }

    const handleClick = (e, index) => {
        if (inputRefs.current[index]) {
            inputRefs.current[index].setSelectionRange(1, 1);

            if (index > 0 && !otp[index - 1] || index < length && (index > 0 && !otp[index + 1])) {
                inputRefs.current[otp.indexOf("")].focus();
            }
        }
    }

    const handlekeyDown = (e, index) => {
        if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
            // Move focus to the previous field on backspace
            inputRefs.current[index - 1].focus();
        }

    }

    console.log('htmlFor', phoneNumber)

    const resendOtp = async () => {
        try {
       console.log(phoneNumber)
            const response = await authServices.resendOtp({
                "username": phoneNumber
            });

            if (response.status) {
                console.log(`OTP resent successfully to ${phoneNumber}`);
            } else {
                console.error('Failed to resend OTP');
            }
        } catch (error) {
            console.error('Error while resending OTP:', error);
        }
    };

    const handleResendOtp = () => {
        if (timer === 0) {
            setTimer(60);
            setIsResendDisabled(true);
            resendOtp();
        }
    };

    return (<div>

        <div className='mt-8'>


            <div>
                <div className='text-[18px] font-[400] text-[#111] flex items-center justify-start'>
                    Enter the code sent to

                    <span className='pl-[12px] font-[600]'>
                        + 91 -
                    </span>
                    <span className=' font-[600]'>

                        {`${phoneNumber}`}
                    </span>
                    <span className='border-0 border-b border-secondary'>
                        <HiOutlinePencil className='text-secondary pl-1 cursor-pointer' onClick={editNumber} />
                    </span>
                </div>
            </div>

            <div className='mt-6 flex flex-wrap items-center justify-between'>
                {
                    otp.map((value, index) => {
                        return (
                            <input
                                type="text"
                                ref={(input) => (inputRefs.current[index] = input)}
                                key={index}
                                value={value}
                                onChange={(e) => handleChange(e, index)}
                                onClick={(e) => handleClick(e, index)}
                                onKeyDown={(e) => handlekeyDown(e, index)}
                                className='otpInput text-secondary font-[700] text-[24px] text-center rounded rounded-md border border-[3px] border-[#999] rounded-md  h-[80px] w-[80px] m-[5px] mx-[10px] focus:border-secondary  focus:ring-0  '
                            />
                        )
                    })
                }
            </div>
            <div class="mt-8 flex flex-col animcheck justify-center items-center text-[14px]">

                <div for="animcheck" class="ps-2 animlabel flex justify-center items-center text-[14px] font-[500] w-full">
                    <div class=" animtext text-[#777] text-center w-full flex justify-between items-center">
                        <span> Didn’t Receive the OTP? </span>
                        <div onClick={handleResendOtp} class="underline decoration-secondary">
                            <div className="mt-0.5 text-secondary cursor-pointer">
                                {isResendDisabled ? `Resend in ${timer}s` : 'Resend OTP'}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="mt-8">
                <button type='submit' onClick={() => onOtpSubmit(otp.join(""))} className='bg-secondary text-white font-bold w-full h-[46px] rounded rounded-md hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.15)]'> Continue </button>
            </div>
        </div>
    </div>
    )
}

export default OtpInput