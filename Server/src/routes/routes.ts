import express from "express";
import { handleDashboard, handleForgetPassword, handleLogin, handleLogout, handleRegister, Set_NewPassword, VerifyOtp } from "../controller/register";
import { authCheck } from "../middleware/auth";
import { ResetTokenCheck } from "../middleware/reset";

const route = express.Router();

route.post('/register', handleRegister);
route.post('/login', handleLogin);
route.get('/secure/dashboard', authCheck , handleDashboard);
// route.get('/secure', authCheck );
route.delete('/logout', authCheck, handleLogout);
route.post('/forget/password', handleForgetPassword);
route.post('/password/otp/verification', VerifyOtp);
route.post('/forget_password/set/new_password', ResetTokenCheck, Set_NewPassword);

export default route;