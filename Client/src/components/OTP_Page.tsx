// import { useState } from "react";

export default function OTP_Verification() {

  // const [OTP_Value, setOTP_value] = useState('');

  // const handleChange = (e : React.ChangeEvent<HTMLInputElement> ) => {
  //   const input = e.target.value;
  //   // Only allow the first character
  //   if (input.length <= 1) {
  //     setOTP_value(prev => prev+input);
  //   }
  // };

  // console.log(OTP_Value);
  

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
        <p className="text-gray-600 mb-6">Enter your verification code below</p>

        <form >
          <div className="flex gap-7 justify-center mb-6">
              <input
                type="number"
                inputMode="numeric"
                maxLength={1}
                // value={OTP_Value}
                // onChange={(e) => handleChange(e)}
                className="w-12 px-auto h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
              />

              <input
                type="number"
                maxLength={1}
                inputMode="numeric"
                // value={OTP_Value}
                // onChange={(e) => handleChange(e)}
                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
              />

              <input
                type="number"
                maxLength={1}
                inputMode="numeric"
                // value={OTP_Value}
                // onChange={(e) => handleChange(e)}
                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
              />

              <input
                type="number"
                maxLength={1}
                inputMode="numeric"
                // value={OTP_Value}
                // onChange={(e) => handleChange(e)}
                className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black bg-white text-black"
              />   
          </div>

          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
          >
            Verify Code
          </button>
        </form>

        <button
          onClick={() => alert("Verification code resent!")}
          className="mt-4 text-sm text-black font-medium hover:underline"
        >
          Resend Code
        </button>
      </div>
    </div>
  );
}
