import { Box, Button, Modal, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login"
import styled from "@emotion/styled";
import GoogleButton from "react-google-button";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { CryptoState } from "../../CryptoContext";
import { auth } from "../../firebase";
 
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const GoogleBox = styled(Box)({
    padding: 24,
    paddingTop: 17,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20, 
})

export default function AuthModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(0);
  const {setAlert} = CryptoState()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const googleProvider = new GoogleAuthProvider()
  const signInWithGoogle = ()=>{
     signInWithPopup(auth, googleProvider).then((res)=>{
      setAlert({
        open : true,
        message : "Sign Up Successful!",
        type : "success"
      });
      handleClose();
     }).catch((error) =>{
      setAlert({
        open : true,
        message : error.message,
        type : "error"
      });
      return;
     })
  }

  return (
    <div>
      <Button 
      variant="contained"
      style={{
        width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#EEBC1D",
      }}
      onClick={handleOpen}>Login</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{
          backgroundColor :'black',
          color : "white",
          borderColor : "gold"
        }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{
              display : "flex",
              justifyContent : "space-around"
            }}>
              <Tabs style={{borderRadius:10}} value={value} onChange={handleChange}>
                <Tab label="Login" style={{padding : "0px 50px 0 50px"}}/>
                <Tab label="Sign Up" style={{padding : "0px 50px 0 50px"}}/>
              </Tabs>
            </Box>
            {value===0 && <Login handleClose = {handleClose}/>}
            {value===1 && <Signup handleClose = {handleClose}/>}
            <GoogleBox>
              <span>OR</span>
              <GoogleButton 
              style={{width : "100%", outline : "none"}}
              onClick = {signInWithGoogle}
              />
            </GoogleBox>
        </Box>
      </Modal>
    </div>
  );
}
