import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

type Email_Typed = {
  email : string
}

type ForgotPasswordProps = {
  setresetEmail: React.Dispatch<React.SetStateAction<string>>;
}

export default function Forgot_Password({setresetEmail} : ForgotPasswordProps ) {

  const [isEmail_OK, setIsEmail_OK] = useState<boolean>(false);
  const [is_Em_Err, setIs_Em_Err] = useState<boolean>(false);

  const {register, handleSubmit, reset } = useForm<Email_Typed>();
  const navigate = useNavigate();

  const ForgetPassword_handel = ({email} : Email_Typed) => {
    Forget_Password({email});
    setresetEmail(email)
    reset();
  };

  const Forget_Password = async ({email} : Email_Typed) => {
    try {
      const res = await axios.post('http://localhost:9000/forget/password', {email}, { withCredentials: true });
      
      if (res.status == 200) {
                  
        setIsEmail_OK(true);
        setIs_Em_Err(false);

        setTimeout(() => {
            navigate('/otp/verify/user');
        }, 2000);
 
          return
      };

    } catch {
      setIsEmail_OK(false);
      // console.log(error?.response?.data?.message);
      setIs_Em_Err(true);
      return
    }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-sm p-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Forgot Password
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit(ForgetPassword_handel)} className="space-y-4" >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
            {...register('email', { required: true })}
              type="email"
              placeholder="www.xyz@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />

        {/* <small className="text-red-500 text-center hidden">Email Required</small>  */}

        <small 
          className={`${is_Em_Err ? "block" : "hidden"} text-red-500 mt-1 font-medium`}>
          Account Not Found!
        </small>  

        <small 
          className={`text-green-600 mt-1 font-medium ${isEmail_OK ? "block" : "hidden"} `}> 
          OTP has been Sent to Your Email
        </small> 
          
        </div>  
          <button
            type="submit"
            className="w-full py-2 mt-2 font-semibold text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
          >
            Send OTP
          {/* <Link to="/otp/verify/user">Send OTP</Link> */}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-black font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
