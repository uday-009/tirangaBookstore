import React from 'react';
import { useForm } from "react-hook-form";
import otpIcon from "../assets/icons/otp.svg"
const Auth = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = (data) => console.log(data,'data');
    console.log(watch("mobile")); // watch input value by passing the name of it
    return (
        <div className='bg-[linear-gradient(45deg,_#00713647,_#ff00410d)] h-[calc(100vh-200px)] rounded-md'>
            <div className='h-full w-full flex items-center justify-center'>
                <span className="w-[100px] h-[100px]">
                    <img src={otpIcon} alt="" />
                </span>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <input   {...register("mobile", {maxLength: 1})} />
                    <input   {...register("example", {maxLength: 1, pattern: /^\d+$/, required: true, })} />
                    {errors.exampleRequired && <span>This field is required</span>}
                    {errors?.mobile?.type === "required" && <p>This field is required</p>}
      {errors?.firstName?.type === "maxLength" && (
        <p>Mobile number cannot exceed 20 characters</p>
      )}
                    <input type="submit" />
                </form>
            </div>
        </div>
    )
}

export default Auth