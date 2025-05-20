export default function sendUserOTPMail(otp){
    const currentYear = new Date().getFullYear();

    return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>OTP Verification</title>
              <style>
                  body {
                      background-color: #f4f4f4;
                      font-family: 'Arial', sans-serif;
                      font-size: 16px;
                      line-height: 1.6;
                      color: #333;
                      margin: 0;
                      padding: 0;
                  }
                  .container {
                      max-width: 600px;
                      margin: 30px auto;
                      background-color: #fff;
                      padding: 25px;
                      border-radius: 10px;
                      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
                      text-align: left;
                  }
                  .logo {
                      max-width: 120px;
                      margin-bottom: 20px;
                      display: block;
                  }
                  .heading {
                      font-size: 26px;
                      font-weight: bold;
                      color: #007BFF;
                      margin-bottom: 20px;
                  }
                  .message {
                      font-size: 16px;
                      margin-bottom: 20px;
                      color: #555;
                  }
                  .otp-container {
                      background-color: #e3f2fd;
                      display: block;
                      padding: 15px 30px;
                      border-radius: 8px;
                      font-size: 32px;
                      font-weight: bold;
                      color: #007BFF;
                      letter-spacing: 4px;
                      border: 2px dashed #007BFF;
                      margin: 20px auto;
                      text-align: center;
                      width: fit-content;
                  }
                  .footer {
                      font-size: 14px;
                      color: #777;
                      text-align: center;
                      margin-top: 30px;
                  }
                  a {
                      color: #007BFF;
                      text-decoration: none;
                  }
                  a:hover {
                      text-decoration: underline;
                  }
                  @media (max-width: 600px) {
                      .container {
                          padding: 15px;
                      }
                      .otp-container {
                          font-size: 28px;
                          padding: 12px 24px;
                      }
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <img src="${process.env.LOGO_URL}" alt="app-logo" class="logo" />
  
                  <h2 class="heading">Welcome to ${process.env.APP_NAME}!</h2>
  
                  <div class="message">
                      <p>Dear User,</p>
                      <p>Here is your One-Time Password (OTP) to complete your action:</p>
                  </div>
  
                  <div class="otp-container">${otp}</div>
  
                  <div class="message">
                      <p>Please use this OTP within the next 5 minutes. For your security, do not share this code with anyone.</p>
                  </div>
  
                  <div class="footer">
                      <p>If you have any questions or need support, feel free to contact us at <a href="mailto:${process.env.CUSTOMER_SUPPORT_EMAIL}">${process.env.CUSTOMER_SUPPORT_EMAIL}</a>.</p>
                      <p>Best regards,</p>
                      <p><strong>${process.env.APP_NAME} || ${process.env.AUTHOR}</strong></p>
                      <p>© ${currentYear} ${process.env.APP_NAME}. All rights reserved.</p>
                  </div>
              </div>
          </body>
          </html>`;
};