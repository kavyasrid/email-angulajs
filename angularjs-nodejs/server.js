    /*
    * @Author : Suraj Roy
    * @Date   : 04 April 2016
    * @Source : jsonworld.com
    * @Topic : send-email-using angularjs-nodejs
    */    
    
    let express = require('express'),
        app  = express(),
        bodyParser = require('body-parser'),
        nodemailer = require("nodemailer")
        server = require('http').Server(app);

    const OTP_EMAIL_CONFIG= {
        "host": 'smtp.gmail.com',
        "port": 465,
        "secure": true,
        "auth": {
            "user": 'enter gmail account',
            "pass": 'gmail password...'
        }
    };

    let mailModule = nodemailer.createTransport(OTP_EMAIL_CONFIG);
 
    app.use(express.static(__dirname + '/client'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    

    app.get('/',function(req,res){
        res.send('hello world!');
    })

    // Method to send email....
    app.post('/sendemail',function(req,res){
        console.log(req.body,'request');
        var mailOptions = {
            from: '"jsonworld " enter gmail account which you want to use for sending email',
            to: req.body.to,
            subject: "mail sending with angularjs and nodejs",
            text: "Congratulations! mail is sending properly now."
        }; 
        mailModule.sendMail(mailOptions);
        res.status(200).send('Mail sent successfully');
    })

    server.listen(3003,function(){
        console.log('server listening on port: 3003');
    });
