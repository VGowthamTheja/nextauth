import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const emailTypes = {
  verify: "Verify your email",
  reset: "Reset your password",
};

const emailTemplates = {
  verify: (hashedToken: string) =>
    `<p>Click <a href="${process.env.NEXT_PUBLIC_URL}/verifyemail?token=${hashedToken}">here</a> to verify your email or copy and paste [${process.env.NEXT_PUBLIC_URL}/verifyemail?token=${hashedToken}] link in your browser. <br/> This link will expire in 1 hour. <br/> If you did not request this, you can safely ignore this email.<br/> Thanks, <br/> Admin Team</p>`,
  reset: (hashedToken: string) =>
    `<p>Click <a href="${process.env.NEXT_PUBLIC_URL}/resetpassword?token=${hashedToken}">here</a> to reset your password or copy and paste [${process.env.NEXT_PUBLIC_URL}/resetpassword?token=${hashedToken}] link in your browser. <br/> This link will expire in 1 hour. <br/> If you did not request this, you can safely ignore this email.<br/> Thanks, <br/> Admin Team</p>`,
};

interface MailProps {
  email: string;
  emailType: keyof typeof emailTypes;
  userId: string;
}

export const sendMail = async ({ email, emailType, userId }: MailProps) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "verify") {
      await User.findByIdAndUpdate(userId, {
        isVerified: false,
        verificationToken: hashedToken,
        verificationTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "reset") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.NEXT_PUBLIC_MAIL_USER,
        pass: process.env.NEXT_PUBLIC_MAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: emailTypes[emailType],
      html: emailTemplates[emailType](hashedToken),
    };

    const response = await transporter.sendMail(mailOptions);

    return response;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};
