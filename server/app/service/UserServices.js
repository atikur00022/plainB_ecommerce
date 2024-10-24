import SendEmail from "../utility/EmailUtility.js";
import UserModel from "../models/usersModel.js";
import {TokenEncode} from "../utility/TokenUtility.js";
import ProfileModel from "../models/profilesModel.js";

export const LoginService = async (req) => {
    try {
        const { email } = req.body;
        const code = Math.floor(100000+Math.random()*900000);
        const EmailText = `Your email verification code ${code}`;
        const EmailSubject = 'Email verification';

        //await SendEmail(email, EmailText, EmailSubject);
        const data = await UserModel.updateOne({email: email}, {$set: {otp: code}}, {upsert: true});

        return {status: 'success', message: 'OTP sent to your email. Please check your email.' , data: data};
    }catch (e) {
        return {status: 'fail', data: e.toString()};
    }
}

export const VerifyLoginService = async (req) => {
    try {
        const { email,otp } = req.body;
        const data = await UserModel.findOne({email:email, otp: otp});
        if(data === null){
            return {status: 'fail', message: 'Wrong OTP!'};
        }else{
            const token = await TokenEncode(data['email'], data['_id']);
            await UserModel.updateOne({email: email},{$set: {otp: 0}});
            return {status: 'success', message: "Login successful", data: token};
        }
    }catch (e) {
        return {status: 'fail', data: e.toString()}
    }
}

export const CreateUserProfileService = async (req) => {
    try {
        const user_id = req.headers["user_id"];
        const reqBody = req.body;
        reqBody.user_id = user_id;
        const data = await ProfileModel.updateOne({userID: user_id},{$set: reqBody},{upsert: true});
        return {status: 'success', message: 'User profile created successfully!', data: data};
    }catch (e) {
        return {status: 'fail', data: e.toString()};
    }
}

export const UpdateUserProfileService = async (req) => {
    try {
        const user_id = req.headers["user_id"];
        const reqBody = req.body;
        reqBody.user_id = user_id;
        const data = await ProfileModel.updateOne({userID: user_id},{$set: reqBody},{upsert: true});
        return {status: 'success', message: 'User profile updated successfully!', data: data};
    }catch (e) {
        return {status: 'fail', data: e.toString()};
    }
}

export const ReadUserProfileService = async (req) => {
    try {
        const user_id = req.headers['user_id'];
        const data = await ProfileModel.findOne({userID: user_id});
        return {status: 'success', data: data};
    }catch (e) {
        return {status: 'fail', data: e.toString()};
    }
}

