import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    },
  });
  
async function sendMailToActivateAccount(emailId, accountActivationLink) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.USER, 
      to: emailId, 
      subject: "Activate Your Account", 
      html: `<h1>Click Here to activate your Account</h1> <button style="padding: '10px'; background-color: '#A7E6FF'; color: '#fff'"><a href=${accountActivationLink}>Activate Your Account</a><button>`
    });
  
    return info;
    
  }

async function sendMailToResetPassword(emailId, resetPasswordLink) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.USER, 
      to: emailId, 
      subject: "Reset Your Password", 
      html: `<h1>Click Here to reset your Password</h1> <button style="padding:10px; background-color:#A7E6FF; color:#fff"><a href=${resetPasswordLink} style="color=#000; text-decoration:none">Reset Your Password</a><button>`
    });
  
    return info;
  }

export { sendMailToActivateAccount, sendMailToResetPassword }