export default function WelcomePage({ username = "User" }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-8 bg-gray-100 rounded-lg shadow-lg text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-3xl">
            ✅
          </div>
        </div>

        <h1 className="text-3xl font-bold text-black mb-2">
          Welcome, {username}!
        </h1>
        <p className="text-gray-600 mb-6">
          You’ve successfully authenticated your account.
        </p>

        <div className="bg-white border border-gray-300 rounded-md p-4 mb-6">
          <p className="text-gray-700">
            Logged in as:{" "}
            <span className="font-semibold text-black">{username}</span>
          </p>
        </div>

        <a href="http://localhost:9000/logout" className="w-full font-semibold text-white bg-black rounded-md hover:bg-gray-800 px-8 py-3 transition-colors">
          Logout
        </a>
      </div>
    </div>
  );
}
