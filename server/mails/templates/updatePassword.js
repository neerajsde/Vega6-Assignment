export default function sendUpdatePasswordMail(userName){
    const currentYear = new Date().getFullYear();

    return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Password Updated Successfully</title>
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
                  }
                  .logo {
                      max-width: 120px;
                      margin: 0 auto 20px auto;
                      display: block;
                  }
                  .heading {
                      font-size: 26px;
                      font-weight: bold;
                      color: #28a745;
                      margin-bottom: 20px;
                      text-align: center;
                  }
                  .message {
                      font-size: 16px;
                      margin-bottom: 20px;
                      text-align: left;
                      color: #555;
                  }
                  .highlight-box {
                      background-color: #e3f2fd;
                      padding: 15px;
                      border-radius: 8px;
                      border-left: 4px solid #28a745;
                      font-weight: bold;
                      color: #333;
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
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <img src="${process.env.LOGO_URL}" alt="app-logo" class="logo" />
  
                  <h2 class="heading">Password Updated Successfully!</h2>
  
                  <div class="message">
                      <p>Dear ${userName},</p>
                      <p>Your password has been successfully updated.</p>
                  </div>

                  <div class="highlight-box">
                      <p>If you did not make this change, please reset your password immediately and contact our support team.</p>
                  </div>

                  <div class="message">
                      <p>For security reasons, we recommend using a strong password and avoiding sharing your credentials with anyone.</p>
                  </div>

                  <div class="footer">
                      <p>If you need any assistance, reach us at <a href="mailto:${process.env.CUSTOMER_SUPPORT_EMAIL}">${process.env.CUSTOMER_SUPPORT_EMAIL}</a>.</p>
                      <p>Best regards,</p>
                      <p><strong>${process.env.APP_NAME} || ${process.env.AUTHOR}</strong></p>
                      <p>© ${currentYear} ${process.env.APP_NAME}. All rights reserved.</p>
                  </div>
              </div>
          </body>
          </html>`;
};
