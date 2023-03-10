import { Button, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../firebase';

const Signup = ({handleClose}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setcnfPassword] = useState("");
  const {setAlert} = CryptoState();

  const handleSubmit = async()=>{
    if(password !== cnfpassword){
      setAlert({
        open : true,
        message : "Passwords do not match",
        type : "error"
      })
      return;
    }
    try {
      // eslint-disable-next-line
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      setAlert({
        open : true,
        message : "Sign Up Successful!",
        type : "success"
      })
      handleClose()
    } catch (error) {
      setAlert({
        open : true,
        message : error.message,
        type : "error"
      });
      return;
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

        <TextField 
        variant='outlined'
        type="password"
        label="Confirm Password"
        value={cnfpassword}
        onChange= {(e)=>{
          setcnfPassword(e.target.value);
        }}
        fullWidth
        />

        <Button variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D" }}
        onClick={handleSubmit}
        >Sign up</Button>
      </Box>
    </div>
  )
}

export default Signup
