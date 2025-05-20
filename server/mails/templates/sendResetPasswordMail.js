export default function sendResetPasswordMail(username, resetLink) {
    const currentYear = new Date().getFullYear();

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Your Password</title>
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
                .button {
                    display: inline-block;
                    background-color: #007BFF;
                    color: #fff;
                    text-decoration: none;
                    padding: 12px 24px;
                    border-radius: 6px;
                    font-size: 16px;
                    font-weight: bold;
                    transition: background-color 0.3s ease;
                }
                .button:hover {
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
                    .button {
                        padding: 10px 20px;
                        font-size: 15px;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <img src="${process.env.LOGO_URL}" alt="app-logo" class="logo" />

                <h2 class="heading">Reset Your Password</h2>

                <div class="message">
                    <p>Hi ${username},</p>
                    <p>We received a request to reset your password for your <strong>${process.env.APP_NAME}</strong> account.</p>
                    <p>Click the button below to set a new password:</p>
                </div>

                <p style="text-align:center;">
                    <a href="${resetLink}" class="button">Reset Password</a>
                </p>

                <div class="message">
                    <p>If you didn’t request a password reset, you can safely ignore this email. This reset link is valid for the next 5 minutes.</p>
                </div>

                <div class="footer">
                    <p>Need help? Contact us at <a href="mailto:${process.env.CUSTOMER_SUPPORT_EMAIL}">${process.env.CUSTOMER_SUPPORT_EMAIL}</a>.</p>
                    <p>Best regards,</p>
                    <p><strong>${process.env.APP_NAME} || ${process.env.AUTHOR}</strong></p>
                    <p>© ${currentYear} ${process.env.APP_NAME}. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
    `;
}
