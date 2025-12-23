import { Schema, model } from "mongoose";

interface registerDB extends Document {
    Username : string,
    Email : string, 
    Password? : string,
    Provider : string,
    ProviderId? : string,
    Is2FA_Enable : boolean,
    Hashed_Otp : string,
    Otp_Expiry : string,
    Password_Reset_Token : string,
    Password_Reset_Expiry : string
}

const Register_Schema = new Schema<registerDB>({
    Username : {
        type : String,
        required : true,
        unique: true,
    },
    Email : {
        type : String,
        required : true,
        unique: true,
    },
    Password : {
        type : String,
    },
    Provider : {
        type : String,
        enum : ['Local_Auth' , 'Google_Auth'],
        default : 'Local_Auth'
    },
    ProviderId : {
        type : String,
    },
    Is2FA_Enable : {
        type : Boolean,
        default : false
    },
    Hashed_Otp : {
        type : String
    },
    Otp_Expiry : {
        type : String
    },
    Password_Reset_Token : {
        type : String
    },
    Password_Reset_Expiry : {
        type : String
    }
}, {timestamps: true});

export const DB_model = model<registerDB>('User_Register', Register_Schema);