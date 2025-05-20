export default function sendUserThankYouMail({ userName = "User", formName }) {
    const currentYear = new Date().getFullYear();

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Thank You for Your Submission</title>
        <style>
            body {
                background-color: #f9f9f9;
                font-family: 'Arial', sans-serif;
                font-size: 16px;
                color: #333;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 40px auto;
                background-color: #ffffff;
                padding: 30px;
                border-radius: 10px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            .logo {
                max-width: 100px;
                margin: 0 auto 20px;
                display: block;
            }
            .heading {
                text-align: center;
                font-size: 24px;
                font-weight: bold;
                color: #28a745;
                margin-bottom: 20px;
            }
            .message {
                font-size: 16px;
                color: #555;
                line-height: 1.6;
                margin-bottom: 30px;
                text-align: center;
            }
            .footer {
                font-size: 14px;
                color: #888;
                text-align: center;
                margin-top: 30px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <img src="${process.env.LOGO_URL}" alt="logo" class="logo" />

            <div class="heading">Thank You, ${userName}!</div>

            <div class="message">
                <p>We’ve received your submission for the form <strong>"${formName}"</strong>.</p>
                <p>Thank you for taking the time to share your information with us. We appreciate your interest and will review your submission shortly.</p>
            </div>

            <div class="footer">
                <p>This is an automated message from <strong>${process.env.APP_NAME}</strong>.</p>
                <p>© ${currentYear} ${process.env.APP_NAME}. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`;
}
