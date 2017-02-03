var express = require('express');
var webApp = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var fs = require('fs');
var cors = require('cors');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'roddairon@gmail.com',
        pass: 'cheglhbixoykqwdr',

    }

});



webApp.use(cors());
webApp.use(bodyParser.json());
webApp.use(bodyParser.urlencoded({
    extended: true
}))

webApp.get('/', function(req, res) {
    res.send('hello world');
});

webApp.post('/email', function(req, res) {
    var postedData = req.body;
    transporter.sendMail({
            from: 'roddairon@gmail.com',
            to: 'drodriguez@fvi.edu',
            subject: 'this is a test',
            html: postedData.msg
        },
        function(err, info) {
            if (err) {
                console.log(JSON.stringify(err));
                return res.sendStatus(500);
            }
            console.log(JSON.stringify(info));
            res.json(info);
        })

});

webApp.post('/send-resume', function(req, res) {
    fs.readFile('./resume.html', function(err, contents) {
        if (err) {
            console.log(err);
            res, sendStatus(500);
            return;
        }
        transporter.sendMail({
                from: 'roddairon@gmail.com',
                to: 'drodriguez@fvi.edu',
                subject: 'this is a test send email',
                html: contents
            },
            function(err, info) {
                if (err) {
                    console.log(JSON.stringify(err));
                    return res.sendStatus(500);
                }
                console.log(JSON.stringify(info));
                res.json(info);
            });
    });


});

webApp.listen(8967);
console.log('server listening');
