import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {

  const [isAuth, setIsAuth] = useState <boolean | null >(null);

  useEffect(() => {
    ( async () => {
      try {
        const res = await axios.get("http://localhost:9000/secure/dashboard", {
          withCredentials: true,
        });
                
        if (res.status === 200) {return setIsAuth(true)};
        
      } catch {return setIsAuth(false) }
    })();
  }, []);

  if (isAuth === null) {
    return <p className="flex mt-96 w-full justify-center items-center">
      Initailize Protected Route...</p>
  };
  
  if ( isAuth ) {
    return <Outlet />
  }
  
  return <Navigate to="/login" replace/>;

};

export default ProtectedRoute;
