export default function LogIn_Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-sm p-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Login</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your email below to login to your account
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="xyz@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              
              <a
                href="/forgot/password"
                className="text-sm text-black hover:underline font-medium"
              >
                Forgot your password?
              </a>

            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 font-semibold text-white bg-black rounded-md hover:bg-gray-800 transition-colors"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-black font-medium hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
