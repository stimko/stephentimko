var nodemailer = require("nodemailer");

exports.send_mail = function(req, res){

    console.log("helldddo");

    var smtpTransport = nodemailer.createTransport("SMTP",{
        service: "Gmail",
        auth: {
            user: "s.w.timko@gmail.com",
            pass: ""
        }
    });

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: req.body.name +" ✔ " + "<"+ req.body.email +">",
        to: "s.w.timko@gmail.com", 
        subject: "Email from st.com",
        text: req.body.name + "✔" + req.body.message
    }
     
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log('error');
        }else{
            console.log("Message sent: " + response.message);
        }
    });
};