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

    static sendRecoverEmail(req, res) {
        if (!req.body.email) {
            return res.status(400).json({error: "Please provide the user email"});
        }

        try {
            const queryResult = db.SyncConn.query(`SELECT * FROM user WHERE email = '${req.body.email}'`);
            console.log(' Query result : ', queryResult);
            if (!queryResult.length) {
                console.log('Wrong email');
                return res.status(400).json({ success: false, error: "Invalid email" });
            }
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return res.json({ success: false, error: error });
        }

        let code = Math.floor(Math.random() * 100000);
        let finalCode = `${req.body.email}#${code}`;

        try {
            const queryResult = db.SyncConn.query(`INSERT INTO recoveringCodes (email, code) VALUES('${req.body.email}', '${finalCode}')`);
        } catch (error) {
            console.log('Error : ', error);
            console.log('Error code : ', error.code);
            return res.json({ success: false, error: error });
        }

        let mailOptions = {
            from: 'soen341concordiaedge@gmail.com',
            to: req.body.email,
            subject: 'Recover your password',
            html: `<p>Hello, here is your code in order to recover your password : ${finalCode}</p>`
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

}

module.exports = RecoverPasswordController;
