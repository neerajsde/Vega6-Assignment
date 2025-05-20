export default function sendContactConfirmationMail(userName) {
    const currentYear = new Date().getFullYear();

    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You for Contacting ${process.env.APP_NAME}</title>
            <style>
                body {
                    background-color: #f9f9f9;
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
                    font-size: 24px;
                    font-weight: bold;
                    color: #28a745;
                    text-align: center;
                    margin-bottom: 20px;
                }
                .message {
                    font-size: 16px;
                    margin-bottom: 20px;
                    text-align: left;
                    color: #555;
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

                <h2 class="heading">Thank You, ${userName}!</h2>

                <div class="message">
                    <p>Dear ${userName},</p>
                    <p>We’ve received your message and appreciate you taking the time to contact <strong>${process.env.APP_NAME}</strong>.</p>
                    <p>Our team will review your message and get back to you as soon as possible. If your inquiry is urgent, feel free to reach us directly at <a href="mailto:${process.env.CUSTOMER_SUPPORT_EMAIL}">${process.env.CUSTOMER_SUPPORT_EMAIL}</a>.</p>
                    <p>We’re here to help!</p>
                </div>

                <div class="footer">
                    <p>Need more help? Visit <a href="${process.env.FRONTEND_URL}">${process.env.FRONTEND_URL}</a></p>
                    <p>Warm regards,</p>
                    <p><strong>${process.env.APP_NAME} || ${process.env.AUTHOR}</strong></p>
                    <p>© ${currentYear} ${process.env.APP_NAME}. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`;
}
