import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type ForgotPasswordProps = {
  ResetEmail: string;
  setResetToken : React.Dispatch<React.SetStateAction<string>>;
};

type TypingInputs = {
  OTP : string; 
  ResetEmail : string
}

export default function OTP_Verification({ResetEmail, setResetToken} : ForgotPasswordProps) {
  
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const [isVerify, setIsVerify] = useState<boolean>(false)
  const [isErorr, setIsErorr] = useState<boolean>(false);
  const [Err_Msg, setErr_msg] = useState<string | null>(null);

  const navigate = useNavigate()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // Allow only digits
    if (!/^\d?$/.test(value)) return;  //{Some Regex!}

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const OTP = otp.join("");
    Verify_Code.mutate({OTP, ResetEmail});
  };

  const manage_code = async ({OTP, ResetEmail} : TypingInputs) => {
  try {
    const res = await axios.post('http://localhost:9000/password/otp/verification', {ResetEmail, OTP});

    if (res.status == 200) {
        setIsVerify(true);
        setIsErorr(false);
        setResetToken(res.data.response.Reset_Token);
        
        setTimeout(() => {
          navigate('/reset/password')
        }, 2000)

        return;
    };

    } catch (error) {

      setIsVerify(false)
      setIsErorr(true);
      setErr_msg(`${error!.response?.data?.message}`)
      return;
    }
  };

  const Verify_Code = useMutation({
      mutationFn : manage_code
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-3xl">
            📱
          </div>
        </div>

        <h1 className="text-2xl font-bold text-black mb-2">
          Account Verification
        </h1>
        <p className="text-gray-600 mb-6">
          Enter your verification code below
        </p>

        <form className="mb-3" onSubmit={handleSubmit}>
          <div className="flex gap-4 justify-center mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1} 
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
              />
            ))}
          </div>

          <div className="mb-5">
            <small className={`text-green-600 font-medium ${ isVerify ? "block" : "hidden"}`}>
                OTP is Verified Successfully! 
            </small>
          </div>

          <div className="mb-5">
            <small className={`text-red-600 font-medium ${ isErorr ? "block" : "hidden"}`}>
                {Err_Msg}
            </small>
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
          >
            Verify Code
          </button>
        </form>

        <small 
          className='text-gray-500'>
          The Verification code is valid only for
          <span className="text-gray-600"> 2 minutes </span> 
        </small>  

      </div>
    </div>
  );
}
