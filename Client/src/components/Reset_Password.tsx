import { Link } from "react-router-dom";

type Typing_Reset_Passwords = {
  ResetEmail : string;
  Reset_Token : string
}

export default function Reset_Password({ResetEmail, Reset_Token} : Typing_Reset_Passwords) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-sm p-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-black mb-6">
          Reset Password
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your new password below
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="New Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 font-semibold text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
          >
            <Link to="/welcome">Reset Password</Link>
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Remembered your password?{" "}
          <a href="#" className="text-black font-medium hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
