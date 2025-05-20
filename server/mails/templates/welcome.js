export default function sendWelcomeMail(userName) {
    const currentYear = new Date().getFullYear(); // Get the current year dynamically

    return `
          <!DOCTYPE html>
          <html lang="en">
          <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to ${process.env.APP_NAME}</title>
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
                      color: #007BFF;
                      text-align: center;
                      margin-bottom: 20px;
                  }
                  .message {
                      font-size: 16px;
                      margin-bottom: 20px;
                      text-align: left;
                      color: #555;
                  }
                  .cta-button {
                      display: block;
                      width: 200px;
                      margin: 20px auto;
                      background-color: #007BFF;
                      color: #fff;
                      text-align: center;
                      padding: 12px;
                      border-radius: 6px;
                      text-decoration: none;
                      font-weight: bold;
                  }
                  .cta-button:hover {
                      background-color: #0056b3;
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
                      .cta-button {
                          width: 100%;
                      }
                  }
              </style>
          </head>
          <body>
              <div class="container">
                  <img src="${process.env.LOGO_URL}" alt="app-logo" class="logo" />
  
                  <h2 class="heading">Welcome to ${process.env.APP_NAME}, ${userName}!</h2>
  
                  <div class="message">
                      <p>Dear ${userName},</p>
                      <p>We’re thrilled to have you join our community! Thank you for registering with <strong>${process.env.APP_NAME}</strong>.</p>
                      <p>Our platform is designed to provide you with the best experience, and we can't wait for you to explore all the amazing features we offer.</p>
                      <p>If you have any questions, need support, or simply want to say hello, feel free to reach out to us anytime.</p>
                      <p>We hope you enjoy your journey with us!</p>
                  </div>

                  <a href="${process.env.FRONTEND_URL}" class="cta-button">Get Started</a>

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
