const Warning = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white border border-gray-300 rounded-lg shadow-md p-6 text-center">
        
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 pb-2 px-2 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-2xl">
            ⚠️
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Action Required
        </h2>

        <p className="text-gray-600 mb-6">
          For security reasons, please update your
          <span className="font-semibold text-gray-900"> Email or Username</span>.
        </p>

        <div className="bg-yellow-50 border border-yellow-300 rounded-md p-4 mb-6">
          <p className="text-sm text-yellow-700">
            Your current credentials may be outdated or incomplete.
            Updating them helps keep your account secure.
          </p>
        </div>

        <button
          className="w-full bg-black text-white font-semibold py-3 rounded-md hover:bg-gray-800 transition"
        >
          <a href="http://localhost:5173/register">Go Back</a>
        </button>

      </div>
    </div>
  );
};

export default Warning;
