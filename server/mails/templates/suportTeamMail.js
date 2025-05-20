export default function notifySupportTeamMail(name, email, message) {
    const currentYear = new Date().getFullYear();

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>New Contact Form Submission</title>
        <style>
            body {
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
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
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .logo {
                max-width: 100px;
                margin: 0 auto 20px auto;
                display: block;
            }
            .heading {
                font-size: 22px;
                font-weight: bold;
                text-align: center;
                margin-bottom: 20px;
                color: #dc3545;
            }
            .details {
                margin-bottom: 20px;
                color: #555;
            }
            .details p {
                margin: 8px 0;
            }
            .footer {
                font-size: 14px;
                text-align: center;
                color: #777;
                margin-top: 30px;
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

            <h2 class="heading">New Contact Form Submission</h2>

            <div class="details">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Message:</strong></p>
                <p style="background:#f0f0f0; padding: 12px; border-radius: 6px;">${message}</p>
            </div>

            <div class="footer">
                <p>App: <strong>${process.env.APP_NAME}</strong></p>
                <p>© ${currentYear} ${process.env.APP_NAME}. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`;
}
