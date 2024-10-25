// utils/smsService.js
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: 'YOUR_NEXMO_API_KEY',
    apiSecret: 'YOUR_NEXMO_API_SECRET',
});

const sendOtp = (phoneNumber, otp) => {
    return new Promise((resolve, reject) => {
        const from = 'YourBrand'; // Replace with your brand name
        const to = phoneNumber;
        const text = `Your OTP is ${otp}. It is valid for 10 minutes.`;

        nexmo.message.sendSms(from, to, text, (error, response) => {
            if (error) {
                return reject(error);
            }
            if (response.messages[0].status !== '0') {
                return reject(new Error(`Message failed with error: ${response.messages[0]['error-text']}`));
            }
            resolve(response);
        });
    });
};

module.exports = { sendOtp };
