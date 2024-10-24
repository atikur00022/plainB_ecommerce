import { create } from 'zustand'
import axios from "axios";
import {getEmail, setEmail} from "../utility/utility.js";

const UserStore = create((set) => ({

    LoginFormData : {email: ""},

    LoginFormOnChange: (name, value) => {
        set((state) => ({
            LoginFormData: {
                ...state['LoginFormData'],
                [name]: value
            }
        }));
    },

    isFormSubmit: false,

    UserOtpRequest:async(email)=>{
        set({isFormSubmit: true});
        let res=await axios.post(`/api/Login`,email);
        setEmail(email);
        set({isFormSubmit: false});
        return res.data["status"] === "success";
    },

    UserOtpVerifyRequest:async(otp)=>{
        set({isFormSubmit: true});
        const email = getEmail();
        const PostJson = { email, otp };
        let res=await axios.post(`/api/VerifyLogin`,PostJson);
        set({isFormSubmit: false});
        return res.data["status"] === "success";
    },


}))

export default UserStore;