import { Route, Routes } from "react-router";
import Forgot_Password from "./components/ForgetPass";
import LogIn_Page from "./components/Login";
import OTP_Verification from "./components/OTP_Page";
import Register_Page from "./components/Register";
import Reset_Password from "./components/Reset_Password";
import WelcomePage from "./components/Welcome";
import LandingPage from "./components/Landing";
import ProtectedRoute from "./utils/ProtectedRoute";
import Warning from "./utils/Warninng";
import { useState } from "react";
import Protect_Otp_Verify_Route from "./utils/Protect_Otp_Verify";
import Protect_Reset_Password_Route from "./utils/Protect_Reset_Password";

const App = () => {

  const [ResetEmail, setresetEmail] = useState<string>(''); // Passing email to Other Components
  const [Reset_Token, setResetToken] = useState<string>('');

  return (
    <div>
      
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/landing-page" element={<LandingPage/>} />
        <Route path="/register" element={<Register_Page/>} />
        <Route path="/login" element={<LogIn_Page/>} />
        <Route path="/forgot/password" element={<Forgot_Password setresetEmail={setresetEmail}/>} />
        <Route path="/oauth/google/failed/warning" element={<Warning/>} />

        {/* Protected OTP Route */}
        <Route element={<Protect_Otp_Verify_Route ResetEmail={ResetEmail}/>}>
          <Route path="/otp/verify/user" 
            element={<OTP_Verification 
              ResetEmail={ResetEmail}  
              setResetToken={setResetToken} /> 
            }/>   
        </Route>

        {/* Protected Reset Password Route */}
        <Route 
        element={<Protect_Reset_Password_Route ResetEmail={ResetEmail} Reset_Token={Reset_Token}/>} >
          <Route path="/reset/password" 
            element={<Reset_Password 
              ResetEmail={ResetEmail} 
              Reset_Token={Reset_Token} 
            />}
          />
        </Route>

        {/* Protected Welcome Route */}
        <Route element={<ProtectedRoute />}>    
          <Route path="/welcome" element={<WelcomePage />} />
        </Route>
      
      </Routes>
    </div>
  )
}

export default App;