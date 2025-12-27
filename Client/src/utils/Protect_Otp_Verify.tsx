import { Navigate, Outlet } from "react-router-dom"

type TypingInputs = {
  ResetEmail : string
}

const Protect_Otp_Verify_Route = ({ResetEmail} : TypingInputs) => {
    if (ResetEmail != '') {  return <Outlet/> };
    return <Navigate to="/forgot/password" replace />;
};

export default Protect_Otp_Verify_Route;