const {parentPort, workerData} = require("worker_threads");
const nodemailer = require('nodemailer');

parentPort.postMessage(sendEmail(workerData))

function sendEmail(workerData) {
    let mailInfo;
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'theuilab@outlook.com', // generated ethereal user
          pass: 'UILAB@2022', // generated ethereal password
        },
      });
    
    switch(workerData.action){
        case 'signup': 
            mailInfo = {
                from: '"The UI Lab" <theuilab@outlook.com>', // sender address
                to: workerData.emails[0], // list of receivers
                subject: "Welcome to The UI Lab!", // Subject line
                text: "Sign up succesfull! Thanks for joining The UI Lab.\n" +
                        "Welcome to the community of The UI Lab and the world of " + 
                        "creating UI for your applications.", // plain text body
                html: "<b>Sign up succesfull!<b><hr>Thanks for joining to The UI Lab.<hr>" +
                        "Welcome to the community of The UI Lab and the world of " + 
                        "creating UI for your applications.", // html body
            };
            break;

    };

    transporter.sendMail(mailInfo, (error) => {
        if (error) 
            console.log(error);
    });

    return true;
};