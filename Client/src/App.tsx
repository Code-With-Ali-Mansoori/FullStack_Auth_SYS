import { Route, Routes } from "react-router";
import Forgot_Password from "./components/ForgetPass";
import LogIn_Page from "./components/Login";
import OTP_Verification from "./components/OTP_Page";
import Register_Page from "./components/Register";
import Reset_Password from "./components/Reset_Password";
import WelcomePage from "./components/Welcome";
import LandingPage from "./components/Landing";
import ProtectedRoute from "./utils/ProtectedRoute";

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/landing-page" element={<LandingPage/>} />
        <Route path="/register" element={<Register_Page/>} />
        <Route path="/login" element={<LogIn_Page/>} />
        <Route path="/forgot/password" element={<Forgot_Password/>} />
        <Route path="/otp/verify/user" element={<OTP_Verification/>} />
        <Route path="/reset/password" element={<Reset_Password/>} />
    
        {/* Protected Route */}
        <Route element={<ProtectedRoute />}>    
          <Route path="/welcome" element={<WelcomePage />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App;