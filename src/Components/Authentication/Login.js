import { Box, Button, TextField } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import {CryptoState} from "../../CryptoContext"
import { auth } from '../../firebase';


const Login = ({handleClose}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {setAlert} = CryptoState()
  const handleSubmit = async()=>{
    if(!email || !password){
      setAlert({
        open : true,
        messge : "Please fill all the fields!",
        type : "error"
      });
      return;
    }
    try {
      // eslint-disable-next-line
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      setAlert({
        open : true,
        message : "Login Successful!",
        type : "success"
      })
      handleClose()
    } catch (error) {
      setAlert({
        open : true,
        message : error.message,
        type : "error"
      })
    }
  }
  return (
    <div>
      <Box
        sx={{
          padding : "3",
          display : "flex",
          flexDirection : "column",
          gap : "20px"
        }}
      >
        <TextField 
        variant='outlined'
        type="email"
        label="Email"
        value={email}
        onChange= {(e)=>{
          setEmail(e.target.value);
        }}
        fullWidth
        />

        <TextField 
        variant='outlined'
        type="password"
        label="Password"
        value={password}
        onChange= {(e)=>{
          setPassword(e.target.value);
        }}
        fullWidth
        />

        <Button variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
        >Login</Button>
        </Box>
    </div>
  )
}

export default Login
