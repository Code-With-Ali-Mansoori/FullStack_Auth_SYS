import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  username: string;
  email: string;
  password : string
};

export default function Register_Page() {

  const {register, handleSubmit, reset } = useForm<FormValues>();
  const navigate = useNavigate();

  const SendRegister_Data = async ({username, email, password} : FormValues) => {
    try {
      await axios.post('http://localhost:9000/register', {username, email, password});
      alert(`Account Registered! ✅`);
      navigate('/login');
      return

    } catch (error) {
      alert(`Error : ${error?.response?.data?.message || 'Registration Failed!'} ❌`);
      return
    }
  };    

  const handle_Register = useMutation({
    mutationFn : SendRegister_Data
  });

  // Handle Form
  const Register_Form_Hook = ({username, email, password} : FormValues) : void => {
    handle_Register.mutate({username, email, password});
    reset();
  };

  return (
    <div className="flex items-center m-10 justify-center min-h-screen bg-white">
      <div className="w-full max-w-sm p-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-black mb-6">Registeration</h1>
        <p className="text-center text-gray-600 mb-6">
          Enter your information to create an account
        </p>

        <form onSubmit={handleSubmit(Register_Form_Hook)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
            {...register('username', { required: true })} 
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register('email', { required: true })} 
              placeholder="xyz@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              {...register('password', { required: true })} 
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 font-semibold text-white bg-black rounded-md hover:bg-gray-800 transition-colors">
            Create an account
          </button>
        </form>

        <div className="mt-6 flex items-center justify-center">
          <hr className="grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or</span>
          <hr className="grow border-gray-300" />
        </div>

        <a href="http://localhost:9000/oauthorize/auth/google" className="w-full mt-4 flex items-center justify-center space-x-2 border border-gray-400 rounded-md py-2  text-gray-700 hover:bg-gray-200 transition-colors">
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.1 0 5.9 1.1 8.1 3.2l6-6C34.3 3.2 29.6 1 24 1 14.8 1 7 6.9 3.6 14.7l7.1 5.5C12 13.3 17.5 9.5 24 9.5z"
            />
            <path
              fill="#34A853"
              d="M46.1 24.5c0-1.6-.1-3.2-.4-4.7H24v9.1h12.6c-.5 2.6-2 4.9-4.2 6.4l6.5 5.1C42.7 36.7 46.1 31 46.1 24.5z"
            />
            <path
              fill="#4A90E2"
              d="M10.7 28.2c-.5-1.6-.8-3.2-.8-4.9s.3-3.3.8-4.9l-7.1-5.5C1.3 16.5 0 20.1 0 23.9s1.3 7.4 3.6 10.9l7.1-5.5z"
            />
            <path
              fill="#FBBC05"
              d="M24 47.8c6.5 0 12-2.2 16-5.9l-6.5-5.1c-1.8 1.2-4 1.9-6.3 1.9-6.5 0-12.1-4.4-14.1-10.3l-7.1 5.5C7 41 14.8 47.8 24 47.8z"
            />
          </svg>
          <span>Sign up with Google</span>
        </a>

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
