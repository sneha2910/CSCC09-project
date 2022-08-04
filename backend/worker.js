const {parentPort, workerData} = require("worker_threads");
const nodemailer = require('nodemailer');

//worker thread calls sendEmail
sendEmail(workerData);

function sendEmail(workerData) {
    let mailInfo;

    //create a transporter to send emails from
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'theuilab@outlook.com', // generated ethereal user
          pass: 'UILAB@2022', // generated ethereal password
        },
      });
    
    //switch between different type of email actions to create email content
    switch(workerData.action){
        case 'signup': 
            mailInfo = {
                from: '"The UI Lab" <theuilab@outlook.com>', // sender address
                to: workerData.email, // list of receivers
                subject: "Welcome to The UI Lab " + workerData.username + "!",// Subject line
                text: "Sign up successfully! Thanks for joining The UI Lab.\n" +
                        "Welcome to the community of The UI Lab and the world of " + 
                        "creating UI for your applications.", // plain text body
                html: "<b>Sign up successfully!<b><hr>Thanks for joining to The UI Lab.<hr>" +
                        "Welcome to the community of The UI Lab and the world of " + 
                        "creating UI for your applications. <hr> Login <a href=https://theuilab.tk/>here</a> and create your first project!", // html body
            };
            break;

        case 'add':
            mailInfo = {
                from: '"The UI Lab" <theuilab@outlook.com>', // sender address
                to: workerData.email, // list of receivers
                subject: "You were added to a new project!",// Subject line
                text: "Hi " + workerData.username + "! You were added to Project " +
                         workerData.projectTitle +"by " + workerData.sessionUser + 
                         "! Login to TheUILab and check it out!", // plain text body
                html: `<b>Hi ${workerData.username}!<b><hr>
                        You were added to Project ${workerData.projectTitle} by
                         ${workerData.sessionUser}! Login to <a href=https://theuilab.tk/>TheUILab</a> 
                         and check it out!`, // html body
            };
            break;

    }
    
    transporter.sendMail(mailInfo, (error) => {
        //if unable to send email returns success equal to false to parent thread
        //otherwise true
        if (error) {
            parentPort.postMessage(false);
        }
        else {
            parentPort.postMessage(true);
        }
    });
}