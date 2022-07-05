import asyncHandler from 'express-async-handler'
import nodemailer from 'nodemailer'


const sendEmail = asyncHandler(async(req, res) => {

  let testAccount = await nodemailer.createTestAccount();
 let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
var mailOptions = {
  from: '"Fred Foo 👻" <foo@example.com>', // sender address
  to: 'khan_rashid01@rediffmail.com',
  subject: 'Sending Email using Node.js',
  text: "thanks"
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
})

export {sendEmail}

