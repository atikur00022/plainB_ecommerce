import React from 'react';
import UserSubmitButton from "./userSubmitButton.jsx";
import UserStore from "../../stores/UserStore.js";
import ValidationHelper from "../../utility/ValidationHelper.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

const LoginForm = () => {

    const navigate = useNavigate();
    const {LoginFormData,LoginFormOnChange,UserOtpRequest} = UserStore();

    const onFormSubmit = async () => {
        if(!ValidationHelper.IsEmail(LoginFormData['email'])){
            toast.error('Valid email is required!');
        }else{
            const res = await UserOtpRequest(LoginFormData['email']);
            res ? navigate('/otp') : toast.error('Something went wrong!');
        }
    }

    return (
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="card p-5">
                        <h4>Enter Your Email</h4>
                        <p>A verification code will be sent to the email address you provide</p>
                        <input value={LoginFormData['email']} onChange={(e)=>{LoginFormOnChange('email', e.target.value)}} placeholder="Email Address" type="email" className="form-control"/>
                        <UserSubmitButton onClick={onFormSubmit} className="btn mt-3 btn-success" text="Next"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;