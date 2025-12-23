import crypto from 'crypto';

export const otp_generate = () => {
    const otp = crypto.randomInt(1000,10000);
    const Hashed_Otp = crypto.createHash('SHA256').update(String(otp)).digest('hex');
    return {otp, Hashed_Otp} ;
};

export const Otp_Expiry = () : string => {
    const expiresAt = (Date.now() + 2 * 60 * 1000).toString(); // 2 minutes ahead
    return expiresAt;  
};
