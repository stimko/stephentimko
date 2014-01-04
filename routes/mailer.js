var nodemailer = require("nodemailer");

exports.send_mail = function(req, res){

    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "laggityman@gmail.com",
            pass: "thisisadummyaccount"
        }
    });

    var mailOptions = {
        from: req.body.email,
        to: "s.w.timko@gmail.com", 
        subject: "Email from st.com",
        text: 'Name:'+req.body.name + ' Message:' + req.body.message + ' Email:' + req.body.email
    }
     
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log('error');
        }else{
          res.contentType('text/plain');
          res.send('success');
        }
    });
};