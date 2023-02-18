const nodemailer = require('nodemailer');
require('dotenv').config();



let ForsendMail = async (Email) => {

    const transporter = nodemailer.createTransport( {
        host: "smtp.gmail.com",
        secure: false,
        port: 587,
        requireTLS:true,
        auth:{
            user: process.env.SenderEmail,
            pass: process.env.Password
        },
        tls: {
          rejectUnauthorized: false
        }
       });

       let information = await transporter.sendMail({
        from: process.env.SenderEmail, 
        to: Email, 
        subject: "Hello ✔", 
        text: "Hello world? ", 
        html: "<b>Hello world? This side is  shivam   </b>", 
      });
     
      transporter.sendMail(information, function(error, info){
        if(error){
            console.log(error);
        }
        else{
            console.log('Email has been sent:-' + info.response)
        }
      })

    }

    module.exports = ForsendMail;
