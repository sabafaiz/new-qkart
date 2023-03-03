/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
// eslint-disable-next-line no-unused-vars
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { display } from "@mui/system";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory,Link } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();


  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *  
   * 
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */

  const [username , setUserName] = useState("");
  const [password , setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader,setLoader]  = useState(false);
  const history = useHistory();


  async function register(formData) {
    setLoader(true);
    let url = config.endpoint;
    console.log(url);
      try{
        let request = await axios.post(`${url}/auth/register`,JSON.stringify({
          "username":formData.username,
          "password": formData.password
        }));
        console.log(request.data);
        setLoader(false)
        enqueueSnackbar("Registered successfully" ,{variant :'success'})
        history.push("/login") // user is register than page go to login page

      }
      catch(error){
        axios.post(`${url}/auth/register`,{
          "username":formData.username,
          "password": formData.password
        }).catch((error) => {
          if(error.response){
            enqueueSnackbar(error.response.data.message ,{ variant: 'error' })
          }else{
            enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.",{ variant: 'error' })
          }
        })
      }
    }

  

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  
    let data ={
      "username" :username,
      "password" :password,
      "confirmPassword": confirmPassword
    }

   const submitHandler =(e) =>{
    // eslint-disable-next-line no-lone-blocks
    {validateInput(data) && register(data)}
  }

  
  const validateInput = (data) => {
    const {username , password , confirmPassword} = data;

    let userNameLength = username.length;
    let passwordLength = password.length;

    if(userNameLength < 1){
      enqueueSnackbar("Username is a required field" , {variant : 'waring'});
      return false;
    }else if(userNameLength < 6){
      enqueueSnackbar("Username must be at least 6 chartcters" , { variant:'warning'});
      return false
    }else if(passwordLength < 1){
      enqueueSnackbar("Password is a required field" , {variant:'warning'});
      return false;
    }else if(passwordLength < 6){
      enqueueSnackbar("Password must be at least 6 characters" , {variant:'warning'});
      return false;
    }else if(password !== confirmPassword){
      enqueueSnackbar("Passwords do not match" , {variant:'warning'});
      return false;
    }else{
      return true;
    }
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
          <h2 className="title">Register</h2>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            title="Username"
            name="username"
            placeholder="Enter Username"
            fullWidth
            onChange={(e) => setUserName(e.target.value)} 
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            onChange={(e) => setPassword(e.target.value)} 
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            fullWidth
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
          {loader ? <Box sm={{display:'flex' ,justifyContent:"center" , alignItems:"center"}}>
          <CircularProgress />
          </Box> :
          <Button className="button" variant="contained" onClick={submitHandler}>
          Register Now
         </Button>
          }
           
          <p className="secondary-action">
            Already have an account?{" "}
             <Link to="/login" className="link">
              Login here
             </Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;
