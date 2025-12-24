export default function LandingPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black">
      <div className="text-center bg-gray-100 px-10 py-16 rounded-lg shadow-md max-w-lg">
        <h1 className="text-4xl font-bold mb-6  ">Welcome to Fullstack Auth System</h1>
        <p className="text-gray-600 mb-8">
          A secure, modern authentication system built for developers.
          Manage sign-in, sign-up, password resets, and more — all in one place.
        </p>
        <a href="/register"
          className="px-6 py-3 bg-black text-white rounded-md font-semibold hover:bg-gray-800 transition-colors"
        >
          Let’s Start
        </a>
      </div>
    </div>
  );
}
