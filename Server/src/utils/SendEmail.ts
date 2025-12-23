import nodemailer from 'nodemailer';

export const sendEmail = (receiver_email : string, otp:number) : void => {
let sender = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_EMAIL_PASS
    }
});

let mail = {
    from: 'Auth System',
    to: receiver_email,
    subject: "OTP Verification Code",
    html: `<div style="max-width: 420px;margin: auto;padding: 24px;font-family: Arial, sans-serif;background: #ffffff;border-radius: 12px;box-shadow: 0 8px 20px rgba(0,0,0,0.1);text-align: center;">
    <h1 style="color:#4F46E5; margin-bottom: 10px;">
     OTP Verification
    </h1>

    <p style="color:#555; font-size: 14px;">
      Use the OTP below to verify your email address
    </p>

    <div style="
      margin: 24px 0;
      font-size: 32px;
      letter-spacing: 8px;
      font-weight: bold;
      color: #111;
      background: #F3F4F6;
      padding: 14px 0;
      border-radius: 8px;
    ">
      ${otp}
    </div>

    <p style="color:#777; font-size: 13px;">
      ⏳ This OTP is valid for <b>2 minutes</b>
    </p>

    <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />

    <p style="font-size: 12px; color: #999;">
      If you didn’t request this, please ignore this email.
    </p>

    <p style="font-size: 12px; color: #999;">
      © ${new Date().getFullYear()} Auth App
    </p>
  </div>
`
};

sender.sendMail(mail, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log("Email sent successfully: " + info.response);
    }
});

}