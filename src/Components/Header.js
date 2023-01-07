import { Box, Toolbar, AppBar, MenuItem, Select, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import { Container } from '@mui/system'
import React from 'react'
import { useNavigate } from "react-router-dom";
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSideBar from './Authentication/UserSideBar';

const Header = () => {
    const Component = styled('div')({
        flex : 1,
        color : "gold",
        fontFamily : "Montserrat",
        fontWeight : "bold",
        cursor : "pointer"
      });

      const navigate = useNavigate();

      const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

      const {currency, setCurrency, user} = CryptoState()

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position='static' color='transparent'>
        <Container>
            <Toolbar>
            <Component>
            <Typography variant='h5' onClick = {()=>navigate("/")}>
                <Box sx={{ fontWeight:'bold', fontFamily: 'Montserrat', m: 1 }}>CRYPT HUNT</Box>
            </Typography>
            </Component>
            <Select variant='outlined' style={{
                width : 100,
                height : 40,
                marginRight : 15,
                }}
                value = {currency}
                onChange = {(e)=>{setCurrency(e.target.value)}}
            >
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            {user? <UserSideBar/> :<AuthModal />}
            </Toolbar>
        </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header
