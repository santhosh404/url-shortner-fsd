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
    html: `<!-- accountActivationTemplate.html -->
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Account Activation</title>
        <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;700&display=swap" rel="stylesheet">
        <style>
            body {
                font-family: "Work Sans", sans-serif !important;
                background-color: #f6f6f6;
                margin: 0;
                padding: 0;
                -webkit-font-smoothing: antialiased;
                -webkit-text-size-adjust: none;
                width: 100% !important;
            }
            .container {
                display: block;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border: 1px solid #e9e9e9;
            }
            .content {
                max-width: 600px;
                margin: 0 auto;
                display: block;
                padding: 20px;
            }
            h1 {
                font-size: 24px;
                font-weight: bold;
                margin: 0 0 20px;
            }
            p {
                font-size: 14px;
                margin: 0 0 20px;
            }
            a {
                color: #348eda;
                text-decoration: underline;
            }
            .btn {
                text-decoration: none;
                color: #fff !important;
                background-color: #348eda;
                padding: 10px 20px;
                font-size: 16px;
                font-weight: bold;
                margin: 20px 0;
                display: inline-block;
                border-radius: 5px;
            }
        </style>
    </head>
    <body>
        <table class="container">
            <tr>
                <td>
                    <div class="content">
                        <h1>Activate Your Account</h1>
                        <p>Hello,</p>
                        <p>Thank you for signing up. Please click the button below to activate your account:</p>
                        <p>
                            <a href="${accountActivationLink}" class="btn">Activate Account</a>
                        </p>
                        <p>If you did not sign up for this account, please ignore this email or contact support if you have questions.</p>
                        <p>Thanks,<br>The Support Team<br/><small><i>ShortIt - Free URL Shortner</i></small></p>
                    </div>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `
  });

  return info;

}

async function sendMailToResetPassword(emailId, resetPasswordLink) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.USER,
    to: emailId,
    subject: "Reset Your Password",
    html: `<!-- resetPasswordTemplate.html -->
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <title>Password Reset</title>
          <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;700&display=swap" rel="stylesheet">
          <style>
              body {
                 font-family: "Work Sans", sans-serif !important;
                  background-color: #f6f6f6;
                  margin: 0;
                  padding: 0;
                  -webkit-font-smoothing: antialiased;
                  -webkit-text-size-adjust: none;
                  width: 100% !important;
              }
              .container {
                  display: block;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border: 1px solid #e9e9e9;
              }
              .content {
                  max-width: 600px;
                  margin: 0 auto;
                  display: block;
                  padding: 20px;
              }
              h1 {
                  font-size: 24px;
                  font-weight: bold;
                  margin: 0 0 20px;
              }
              p {
                  font-size: 14px;
                  margin: 0 0 20px;
              }
              a {
                  color: #348eda;
                  text-decoration: underline;
              }
              .btn {
                  text-decoration: none;
                  color: #fff !important;
                  background-color: #348eda;
                  padding: 10px 20px;
                  font-size: 16px;
                  font-weight: bold;
                  margin: 20px 0;
                  display: inline-block;
                  border-radius: 5px;
              }
          </style>
      </head>
      <body>
          <table class="container">
              <tr>
                  <td>
                      <div class="content">
                          <h1>Password Reset Request</h1>
                          <p>Hello,</p>
                          <p>We received a request to reset your password. Click the button below to reset it:</p>
                          <p>
                              <a href="${resetPasswordLink}" class="btn">Reset Password</a>
                          </p>
                          <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
                          <p>Thanks,<br>The Support Team<br/><small><i>ShortIt - Free URL Shortner</i></small></p>
                      </div>
                  </td>
              </tr>
          </table>
      </body>
      </html>`
  });

  return info;
}

export { sendMailToActivateAccount, sendMailToResetPassword }