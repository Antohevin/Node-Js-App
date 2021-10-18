const md5 = require('md5');
const mongoose = require('mongoose');
const JsonWebToken = require('jsonwebtoken');
const User = require('../models/user');
const loginsession = require('./loginsession');
const Utils = require('../utils');
const Nodemailer = require('nodemailer');


const jwt_secret_key = "JSONWEBTOKEN_SECRETKEY";

exports.registerUser = async(req,res)=>{
    try {
        let usersDataWithSameUsername = await User.findOne({ registeredmail : req.body.username}).exec();

        if(usersDataWithSameUsername && usersDataWithSameUsername.length > 0){
            Utils.sendFailureResponse({ error : "Username entered was taken, please proceed with another" },req,res);
            return;
        }

        let newUser = new User();
        newUser.username = req.body.username && req.body.username || null;
        newUser.email = req.body.email && req.body.email || null;
        let encryptedPassword = md5(req.body.password)
        newUser.password = encryptedPassword || null;

        
        newUser.save((err,data)=>{
            if (err) {
                Utils.sendFailureResponse({ error : "error while saving user data" },req,res,err);
                return;
            } else {
                sendEmail(req,data);
                Utils.sendSuccessResponse({user : data},res);
                return;
            }
        });
    } catch (err) {
        Utils.sendFailureResponse({ error :err },req,res);
        return;
    }
}

function sendEmail(req,maildata) {
    var transporter = Nodemailer.createTransport({
        host: 'smtp-mail.outlook.com', // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
            ciphers: 'SSLv3',
        },
        auth: {
            'user': '',
            'pass': '',
        },
    });


    var mail = {
        from: 'email.com',
        to: req.email,
        subject: "Welcome User",
        text: "Thanks for register",
    };
    transporter.sendMail(mail, (err) => {
        if (err) {
            //Log Error
            return;
        }
        return;


    });
}


exports.loginUser = (req,res)=>{
   
    let email = req.body.email && req.body.email || null; 
    let password = req.body.password && req.body.password || null; 

    if(!email || !password){
        Utils.sendFailureResponse({ error: "Invalid data" },req,res);
        return;
    }

    let encryptedPassword = md5(req.body.password);


    User.find({
        email  : email,
        password : encryptedPassword
    }).exec((err,userData)=>{
        if(err || !userData || !userData.length){
            Utils.sendFailureResponse({ error:  "User Data not found" },req,res,err);
            return;
        }else{
            createLoginSession(userData && userData[0],req,res);
        }
    });
}


function createLoginSession(userData,req,res) {

    if(userData){

        let newLoginSession = new loginsession();

        newLoginSession.useruid = userData._id && userData._id || null;
        newLoginSession.loggedinat = new Date();
        newLoginSession.isactive = true;
        newLoginSession.logoutat = null;

        JsonWebToken.sign(userData.username,jwt_secret_key,{},(error,sessionToken)=>{
            if(error){
                Utils.sendFailureResponse({ error:  "error while generating token" },req,res,error);
                return;
            }
            let token = sessionToken;
            newLoginSession.save((err,sessionData)=>{
                if(err){
                    Utils.sendFailureResponse({ error:  "error while saving session" },req,res,err);
                    return;
                }
                Utils.sendSuccessResponse({ sessionData : sessionData, token : sessionToken },res);
                return;
            });
        });

    }else{
        Utils.sendFailureResponse({ error:  "User data not found" },req,res);
        return;
    }

}

exports.getUserData = async (req,res)=>{

    try {
        let userUid = req.params.useruid && mongoose.Types.ObjectId(req.params.useruid) || null;
        if(!userUid){
            Utils.sendFailureResponse({error: "Invalid User Id" },req,res);
          //  res.json({status: 500, error: "Invalid User Id"});
            return;
        }

        let userdata = await User.findById(userUid).exec();

        if(userdata){
            Utils.sendSuccessResponse({ userdata : userdata },res);
            return;
        }else{
            Utils.sendFailureResponse({error: "User Data not found"},req,res);
            return;
        }

    } catch (error) {
        Utils.sendFailureResponse({error: error},req,res);
        return;
    }
    
}
