import { NextFunction, Request, response, Response } from "express";
import { DB_model } from "../model/Register_Schema";
import crypto from 'crypto';

export const ResetTokenCheck = async (req : Request, res : Response, next : NextFunction) : Promise<void> => {
try {  

    const {resetToken, email} = req.body;
    const Current_Time = Date.now().toString();

    if ( !resetToken ) {
        res.status(400).json({response : {
            message : 'Request Rejected',
            Error : 'Reset Token not Found!'
        }});
        return;
    };

    const hashed_resetToken = 
    crypto.createHash('sha256').update(resetToken).digest('hex');

    const users = await DB_model.findOne({Email : email});

    if (!users) {
        res.status(404).json({message : "Account Not Found!"});
        return;

    } else if ( Current_Time > users.Password_Reset_Expiry ) {
        res.status(410).json({message : 'Reset Token is Expired' });
        return;

    } else if ( users.Password_Reset_Token !== hashed_resetToken ) {
        res.status(401).json({message : 'Token is not Valid'});
        return;

    } else {
        next();   
    };

} catch (error) {
    res.status(500).json({message : error})
};
};  
