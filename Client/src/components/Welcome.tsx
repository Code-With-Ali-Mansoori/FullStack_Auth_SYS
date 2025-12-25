import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type UserData = {
  UserName : string,
  Email : string,
  Provider : string
}

export default function WelcomePage() {

const [userData, setUserData] = useState<UserData | null>(null);
const nav = useNavigate();

useEffect( () => {
  const handleDashboard = async () => {
  const res = await axios.get("http://localhost:9000/secure/dashboard", { withCredentials: true });

  setUserData(res.data.response)
  return; 
};

  handleDashboard();
}, []);

// Logout User
const handleLogOut = async () => {
  try {
    const res = await axios.delete("http://localhost:9000/logout", {withCredentials: true }); 

    if (res.status == 200) {
      nav('/login')
    };

  } catch (error) {    
    alert(`${error?.response?.data?.message || 'Logout Failed!'} ❌`);
    nav('/welcome');
    return;
  
  }
}

const deleteHandle = useMutation({
  mutationFn : handleLogOut,
})
  
return (
  <div className="flex mx-8 items-center justify-center min-h-screen bg-white">
    <div className="w-full max-w-md p-10 bg-gray-100 rounded-lg shadow-lg text-center">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-3xl">
          ✅
        </div>
      </div>

      <h1 className="md:text-3xl text-2xl font-bold text-black mb-2">
        Welcome, {userData?.UserName}
      </h1>
      <p className="text-gray-600 mb-6">
        You’ve successfully authenticated your account.
      </p>

      <div className="bg-white border border-gray-300 rounded-md p-4 mb-6 text-left space-y-2">
        <p className="text-gray-700">
          <span className="font-semibold text-black">Username : </span> {userData?.UserName}
        </p>

        <p className="text-gray-700">
          <span className="font-semibold text-black">Email : </span> {userData?.Email} 
        </p>

        <p className="text-gray-700">
          <span className="font-semibold text-black">Provider : </span> {userData?.Provider}
        </p>
      </div>

      <div
       onClick={() => deleteHandle.mutate()}
        className="w-full font-semibold text-white bg-black rounded-md hover:bg-gray-800 px-8 py-3 transition-colors inline-block" >
        Logout
      </div>
    </div>
  </div>
)
};