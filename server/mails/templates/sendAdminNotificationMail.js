export default function sendAdminNotificationMail({ formName, formLink, formData }) {
    const currentYear = new Date().getFullYear();

    const parsedData = typeof formData === 'string' ? JSON.parse(formData) : formData;

    const formattedFields = Object.entries(parsedData)
        .map(([key, value]) => {
            const displayValue = value?.toString().trim() === '' ? '<em>Not Provided</em>' : value;
            const capitalizedKey = key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            return `
                <tr>
                    <td style="padding: 8px 12px; border: 1px solid #ddd;"><strong>${capitalizedKey}</strong></td>
                    <td style="padding: 8px 12px; border: 1px solid #ddd;">${displayValue}</td>
                </tr>
            `;
        })
        .join('');

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Form Submission - ${formName}</title>
        <style>
            body {
                background-color: #f4f4f4;
                font-family: 'Arial', sans-serif;
                font-size: 16px;
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
                margin: 0 auto 20px;
                display: block;
            }
            .heading {
                font-size: 24px;
                font-weight: bold;
                color: #dc3545;
                text-align: center;
                margin-bottom: 20px;
            }
            .message {
                font-size: 16px;
                color: #555;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            .data-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            .cta-button {
                display: inline-block;
                padding: 12px 24px;
                background-color: #28a745;
                color: #fff;
                border-radius: 6px;
                text-decoration: none;
                font-weight: bold;
                text-align: center;
            }
            .cta-button:hover {
                background-color: #218838;
            }
            .footer {
                font-size: 14px;
                color: #777;
                text-align: center;
                margin-top: 30px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <img src="${process.env.LOGO_URL}" alt="logo" class="logo" />

            <h2 class="heading">New Submission Received</h2>

            <div class="message">
                <p><strong>Form Name:</strong> ${formName}</p>
                <p><strong>Submission Details:</strong></p>
                <table class="data-table">
                    ${formattedFields}
                </table>
                <p>You can view the complete submission here:</p>
                <a href="${formLink}" class="cta-button">View Submission</a>
            </div>

            <div class="footer">
                <p>This is an automated notification from <strong>${process.env.APP_NAME}</strong>.</p>
                <p>© ${currentYear} ${process.env.APP_NAME}. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>`;
}
