/* eslint-disable no-unused-vars */
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();

  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   * 
   * 
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */


const[username , setUserName] = useState("");
const[password, setPassword] = useState("");
const history = useHistory();





  const login = async (formData) => {

    const url = config.endpoint;
     try{
      let res = await axios.post(`${url}/auth/login`, formData);

      if(res.data.success){
        enqueueSnackbar("Logged in sucessfully" , { variant:'success'});
        let {token,username,balance} = res.data;
        persistLogin(token,username,balance-0)
      }

     }catch(e){
      axios.post(`${url}/auth/login`,formData).catch((e)=>{
        if(e.response){
          console.log(e.response)
          enqueueSnackbar(e.response.data.message,{ variant: 'error' })
        }
        else {
          // Something happened in setting up the request that triggered an Error
          enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{ variant: 'error' })
        }
      })
    }

  };

  let data ={
    "username":username,
    "password":password
  }

  const onSubmit =(e) =>{
      e.preventDefault();
      // eslint-disable-next-line no-lone-blocks
      {validateInput(data)  && login(data)}
  }

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {

    const {username , password} = data;

    let userNameLength = username.length;
    let passwordLength  = password.length;

    if(userNameLength < 1){
      enqueueSnackbar("Username is a required field" , {variant : 'waring'});
      return false;
    }else if(passwordLength < 1){
      enqueueSnackbar("Password is a required field" , {variant:'warning'});
      return false;
    }
      else{
        return true;
      }

  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {

      localStorage.setItem('token',token);
      localStorage.setItem('username' , username);
      localStorage.setItem('balance' , balance);

      history.push("/")
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Login</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={(e) =>setUserName(e.target.value)}
          />
          <TextField
          id="password"
          label="Password"
          variant="outlined"
          title="Password"
          type="password"
          name="password"
          placeholder="Enter Password"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
          />
           <Button className="button" variant="contained" onClick={onSubmit}>LOGIN TO QKART</Button>

           <p className="secondary-action">
           Don’t have an account?{" "}
             <Link to="/register" className="link">
             Register now
             </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Login;
