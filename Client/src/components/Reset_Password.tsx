import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Typing_Reset_Passwords = {
  ResetEmail : string;
  Reset_Token : string
};

type Password_Froms = { 
  password : string, 
  final_new_password : string
};

type Set_Passweord_Types = {
  resetToken : string,
  email : string,
  new_password : string
}

export default function Reset_Password({ResetEmail, Reset_Token} : Typing_Reset_Passwords) {

  const {register, reset, handleSubmit} = useForm<Password_Froms>();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null)
  const [isErr, setIsErr] = useState<boolean>(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const navigate = useNavigate();
  const resetToken = Reset_Token;
  const email = ResetEmail;
  let new_password : string;

  //Get Password From Form 
  const Set_Password = ({password, final_new_password} : Password_Froms) => {

    if ( password != final_new_password ) return setIsErr(true);

    new_password = final_new_password;
    handle_Reset_Password.mutate({resetToken, email, new_password})
    setIsErr(false);
    reset();
  };

  // Calling Reset Password API with React Query
  const set_Password_Handler = async ({resetToken, email, new_password} : Set_Passweord_Types) => {
  try {  
    const res = await axios.post('http://localhost:9000/forget_password/set/new_password', {resetToken, email, new_password});
    
    if (res.status == 200) {
      setIsSuccess(true);
      return res;
    };

  } catch {
      setIsSuccess(false) ;
      return 
  }};

  const handle_Reset_Password = useMutation({
    mutationFn : set_Password_Handler,
    onSuccess: (res) => {
      alert(`${res!.data.message.message} ✅`);
      navigate('/login');
    },
    onError: (error) => {
      console.log(error);
      setIsSuccess(false);
      navigate('/reset/password');
    }
  });

return (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="w-full max-w-sm p-8 bg-gray-100 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-black mb-6">
        Reset Password
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Enter your new password below
      </p>

      <form onSubmit={handleSubmit(Set_Password)} onChange={() => setIsErr(false)} className="space-y-4">
        {/* NEW PASSWORD */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>

          <div className="relative">
            <input
              type={showNewPass ? "text" : "password"}
              {...register("password", { required: true })}
              placeholder="New Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black pr-10"
            />

            <button
              type="button"
              onClick={() => setShowNewPass(!showNewPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className={`block text-sm font-medium  mb-1 
            ${isErr ? "text-red-600": "text-gray-700"}`}>
            {isErr ? "Confirm Password*" : "Confirm Password"}
          </label>

          <div className="relative">
            <input
              type={showConfirmPass ? "text" : "password"}
              {...register("final_new_password", { required: true })}
              placeholder="Confirm Password"
              className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${isErr ? "text-red-600": "text-gray-700"} focus:ring-black pr-10`}
            />

            <button
              type="button"
              onClick={() => setShowConfirmPass(!showConfirmPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
            >
              {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* ERROR */}
        <div>
          <small className={`text-red-500 font-medium mt-1 ${isErr ? "block" : "hidden"}`}>
            Password is Mismatch
          </small>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isErr ? true : false}
          
          className="w-full py-2 mt-2 font-semibold text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
        >
          Reset Password
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Remembered your password?{" "}
        <button className="text-black font-medium hover:underline">
          Login
        </button>
      </p>
    </div>
  </div>
);
}
