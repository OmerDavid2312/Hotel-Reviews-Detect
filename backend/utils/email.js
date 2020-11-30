const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD
  }
}));

const sendEmail = async ({to,subject,text}) => {
    return new Promise((resolve,reject)=>{

        transporter.sendMail({from:process.env.NODEMAILER_EMAIL,to:to,subject:subject,text:text}, function(error, info){
            if (error) {
              reject(error);
            } else {
              resolve(info)
            }
          });
    })
}
module.exports = {sendEmail};