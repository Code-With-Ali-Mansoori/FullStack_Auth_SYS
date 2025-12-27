import { Request, response, Response } from "express";
import { DB_model } from "../model/Register_Schema";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { Otp_Expiry, otp_generate } from "../utils/Otp_Gen";
import { sendEmail } from "../utils/SendEmail";
import crypto from 'crypto';

export const handleRegister = async (req : Request, res : Response) => {
    try {
        const {username, email, password} = req.body;
        const existingUser = await DB_model.findOne({$or: [{ Email: email }, { Username: username }]});
       
        if (existingUser) {
            if (existingUser.Email === email) {
                return res.status(409).json({ message: "Email already exists" })};

            if (existingUser.Username === username) {
                return res.status(409).json({ message: "Username already exists" })};   
        };
         
        const salt = 8;
        const Hased_Password = await bcrypt.hash(password, salt);

        await DB_model.create({
            Username : username,
            Email : email,
            Password : Hased_Password,
            Is2FA_Enable : false
        });

        res.status(201).json({Response : {
            message : "Account Registered Successfully!"
        }});

        return;

    } catch (error: any) {

    if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return res.status(409).json({ message: `${field} already exists`});
    }

    res.status(500).json({ message: "Internal Server Error"});
}};

export const handleLogin = async (req : Request, res : Response) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            res.status(404).json('Please Provide all Credentials...');
            return
        };

        const user = await DB_model.findOne({Email : email});
        
        if (!user) {
            res.status(404).json({message : "Account Not Found!"});
            return;
        };
        
        const isMatch = await bcrypt.compare(password, user.Password!);

        if (!isMatch) {
            res.status(404).json({ message: "Password is Invalid" });
            return;
        };

        interface User_Payload {
            id : string,
            name : string,
            email : string
        }

        const payload : User_Payload = {
            id : user._id.toString(), 
            name : user.Username, 
            email : user.Email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET as string);

        res.cookie("cookies_Token", token, {
            httpOnly: true,      // JS can't access (XSS protection)
            secure: false,       // true in production (HTTPS)
            sameSite: "strict",  // CSRF protection
        });

        res.status(200).json({ response : 
            { message1 : 'User Login Succesfully', 
            message2 : 'Cookie Also Set to Browser'}
        });

        return;

    } catch (error) {
        res.status(500).json({message : error});
        return;
    };  
};

export const handleDashboard = async (req : Request, res : Response) => {
    try {

    const email = (req as any).user.email;
    const users = await DB_model.findOne({Email : email});

    if (!users) {
        res.status(404).json({message : "Data not found"});
        return
    };

    res.status(200).json({
      response : {
        UserName : users.Username, 
        Email : users.Email,
        Provider : users.Provider
      }
    });

    return;

    } catch (error) {
        console.log(error);
        res.status(500).json({message : 'Server Error', 'Err_Msg' : error});
        return;
    };
};

export const handleLogout = (req : Request, res : Response) => {
    const token = req.cookies?.cookies_Token;

    if (!token) {
        res.status(401).json({ message: "User is Unauthorized" });
        return;
    };

    res.clearCookie("cookies_Token");
    res.status(200).json({Message : 'User is Logout successfully'})
};

export const handleForgetPassword = async (req : Request, res : Response) : Promise<void>=> {
    try {
        
    const {email} = req.body;
    
    if (!email) {
        res.status(400).json({message : "Email Required"});
        return;
    };

    const users = await DB_model.findOne({Email : email});

    if (!users) {
        res.status(404).json({message : "Account Not Found!"});
        return;
    };

    const {otp, Hashed_Otp} = otp_generate();
    const otpExpiryTime = Otp_Expiry();  

    users.Hashed_Otp = Hashed_Otp;
    users.Otp_Expiry = otpExpiryTime;
    await users.save();

    sendEmail(users.Email, otp);
    res.status(200).json({message : `OTP Sent to Your Email`});
    return

    } catch (error) {
        res.status(400).json({message : error})    
        return;
    }
};

export const VerifyOtp = async (req : Request, res : Response) => {
try {
    const {ResetEmail, OTP} = req.body;
    const Current_Time = Date.now().toString();

    if (!OTP) {
        res.status(404).json({message : "OTP is required!"});
        return;
    };

    const users = await DB_model.findOne({Email : ResetEmail});

    if (!users) {
        res.status(404).json({message : "Account Not Found!"});
        return;
    };

    if ( Current_Time > users.Otp_Expiry ) {
        res.status(410).json({message : 'OTP is Expired - Re-enter the E-mail' });
        return;
    };
        
    const Current_Hashed_Otp = 
    crypto.createHash('sha256').update(String(OTP)).digest('hex');

    if (Current_Hashed_Otp !== users.Hashed_Otp) {
        res.status(401).json({message : 'Enter the valid OTP which is Sent on your Email'});
        return;
    };  

    // Generate Reset Token and Hashing It, then Store in DB
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashed_resetToken = 
    crypto.createHash('sha256').update(resetToken).digest('hex');
    
    users.Password_Reset_Token = hashed_resetToken;
    users.Password_Reset_Expiry = (Date.now() + 5 * 60 * 1000).toString(); // 5 min
    users.Hashed_Otp = '';
    users.Otp_Expiry = '';
    await users.save();
         
    res.status(200).json({response : {
        message : 'OTP successfully Verified!',
        Reset_Token : resetToken
    }});  

} catch (error) {
     res.status(500).json({message : error});
}};

export const Set_NewPassword = async (req : Request, res : Response) => {
    try {
    const { new_password, email } = req.body;

    if ( !new_password ) {
        return res.status(400).json({message : 'Password is Required!'})
    };
  
    const user = await DB_model.findOne({Email : email});
    if (!user) {return res.status(404).json({message : "account not found"})};

    const salt = 8;
    const Hashed_New_Password = await bcrypt.hash(new_password, salt);

    user.Password = Hashed_New_Password;
    user.Password_Reset_Token = '' ;
    user.Password_Reset_Expiry  = '' ;

    await user.save();

    return res.status(200).json({message : {
        message : "New Password Set successfully",
        Plain_New_Password : new_password,
        Hashed_New_Password : Hashed_New_Password
    }});

    } catch (error) {
        return res.status(500).json({message : error});
    }
};