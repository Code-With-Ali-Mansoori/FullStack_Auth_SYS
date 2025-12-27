import { Navigate, Outlet } from "react-router-dom"

type Typing_Reset_Passwords = {
  ResetEmail : string;
  Reset_Token : string
}

const Protect_Reset_Password_Route = ({ResetEmail, Reset_Token} : Typing_Reset_Passwords) => {

    if (ResetEmail != '' && Reset_Token != '') { 
        return <Outlet/> 
    };

    return <Navigate to="/forgot/password" replace />;
};

export default Protect_Reset_Password_Route;