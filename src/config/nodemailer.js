import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass
    }
});

export const mailOptions = {
    from: email,
    to: "geudens.steven@outlook.com"
};