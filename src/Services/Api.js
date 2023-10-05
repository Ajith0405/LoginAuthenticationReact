import axios from "axios";
import { getUserData } from "./Storage";

const API_KEY = "AIzaSyBRkCWAYR5kq9a9SThcTkWLPGkzS6AVcuo";
axios.defaults.baseURL = "https://identitytoolkit.googleapis.com/v1";

const Register_Url = `/accounts:signUp?key=${API_KEY}`;
const Login_Url = `/accounts:signInWithPassword?key=${API_KEY}`;
const User_Details_URL = `/accounts:lookup?key=${API_KEY}`;
export const RegisterApi = (inputs) => {
  let data = {
    displayName: inputs.name,
    email: inputs.email,
    mobile: inputs.mobile,
    password: inputs.password
  };
  return axios.post(Register_Url, data);
};

export const LoginApi = (inputs) => {
  let data = {
    email: inputs.email,
    password: inputs.password
  };
  return axios.post(Login_Url, data);
};

export const UserDetailsApi = ()=>{
  let data = {idToken:getUserData()}
  return axios.post(User_Details_URL, data);
}

