const db = require('../db');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'soen341concordiaedge@gmail.com',
        pass: 'ribalestbeau'
    }
});

//soen341concordiaedge@gmail.com
//ribalestbeau
class RecoverPasswordController {

    static sendRecoveryEmail(req, res) {
        if (!req.body.email) {
            return res.status(400).json({error: "Please provide the user email"});
        }

        console.log("Looking for user email validity : ", req.body.email);

        try {
            const queryResult = db.SyncConn.query(`SELECT * FROM user WHERE email = '${req.body.email}'`);
            console.log('Result : ', queryResult);
            if (!queryResult.length) {
                console.log('Non existent email');
                return res.status(400).json({ success: false, error: "Invalid email" });
            }
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return res.json({ success: false, error: error });
        }

        let code = Math.floor(Math.random() * 100000);

        console.log("Creating recovery code : ", code);

        try {
            const queryResult = db.SyncConn.query(`INSERT INTO recovery_codes (email, code) VALUES('${req.body.email}', '${code}')`);
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return res.json({ success: false, error: error });
        }

        console.log("Sending email");

        let mailOptions = {
            from: 'soen341concordiaedge@gmail.com',
            to: req.body.email,
            subject: 'Recover your password',
            html: `<p>Hello, here is your code in order to recover your password : ${code}</p>`
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if(err) {
                console.log(err);
                res.send(err);
            } else {
                console.log(info);
                res.json({success: true});
            }
        });

    }

    static verifyRecoveryCode(req, res) {
        if (!req.body.email || !req.body.code) {
            return res.status(400).json({error: "Please provide the user email and code"});
        }

        console.log("Searching recovery code and email : ", req.body.code, req.body.email);

        try {
            const queryResult = db.SyncConn.query(`SELECT * FROM recovery_codes WHERE email = '${req.body.email}' AND code = '${req.body.code}'`);
            console.log(' Query result : ', queryResult);
            if (!queryResult.length) {
                console.log('Wrong code');
                return res.status(400).json({ success: false, error: "Invalid code" });
            }
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return res.json({ success: false, error: error });
        }

        console.log('Valid');
        console.log("Delete the recovery code");

        try {
            const queryResult = db.SyncConn.query(`DELETE FROM recovery_codes WHERE email = '${req.body.email}' AND code = '${req.body.code}'`);
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return res.json({ success: false, error: error });
        }

        res.json({success: true});
    }


}

module.exports = RecoverPasswordController;
