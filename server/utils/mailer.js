const nodemailer = require("nodemailer");

const sendOTPEmail = async (userEmail, generatedOTP, userName) => {
  try {
    
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "novastore156@gmail.com", 
        pass: "bmxm vivy dgrf znar",    
      },
    });

    
    const mailOptions = {
     
      from: '"Nova Online Store" <novastore156@gmail.com>', 
      to: userEmail,
      subject: "Your OTP Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; direction: ltr;">
          <h2 style="color: #253237;">Hello ${userName},</h2>
          <div style="text-align: center; background-color: #f9f9f9; padding: 30px; border-radius: 8px; margin-top: 15px;">
            <h1 style="color: #0090f0; margin: 0 0 10px 0; font-size: 28px; font-weight: bold;">Nova Online Store</h1>
            <p style="font-size: 16px; color: #7b7b7b; margin-bottom: 20px;">Your account verification code is:</p>
            
            <div style="background: #ffffff; border: 2px dashed #0090f0; display: inline-block; padding: 10px 30px; border-radius: 6px;">
              <strong style="font-size: 38px; letter-spacing: 6px; color: #253237; font-family: monospace;">${generatedOTP}</strong>
            </div>
            
            <p style="font-size: 12px; color: #7b7b7b; margin-top: 25px;">This code is valid for 2 minutes. Please do not share it with anyone.</p>
          </div>
        </div>
      `,
    };


    await transporter.sendMail(mailOptions);
    console.log(` OTP Sent successfully from Reda Store to: ${userEmail}`);
  } catch (error) {
    console.error("❌ Mailer Error:", error.message);
    throw error;
  }
};

module.exports = sendOTPEmail;