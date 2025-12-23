import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authCheck = (req : Request, res : Response, next : NextFunction) : void => {
try {
    const token = req.cookies.cookies_Token;
    
    if (!token) {
        res.status(401).json({ message: "User is Un-authorized" });
        return;
    };

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET missing");

    const decoded = jwt.verify(token, secret) as JwtPayload;
    (req as any).user = decoded;   // attach user info to request

    next();
} catch { res.status(401).json({ message: "Invalid token" })};
};