import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { CryptoState } from '../../CryptoContext';
import { Avatar, Button } from '@mui/material';
import styled from '@emotion/styled';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { numberWithCommas } from '../Banner/Carousel';
import {AiFillDelete} from "react-icons/ai"
import { doc, setDoc } from 'firebase/firestore';

export default function UserSideBar() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const Coin = styled('div')({
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEBC1D",
    boxShadow: "0 0 10px black",
  })

  const CustomDiv = styled('div')({
    width : 350,
    padding : 25,
    height : "100%",
    display : "flex",
    flexDirection : "column",
    fontFamily : "monospace"
  })

  const WatchList = styled('div')({
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  })


  const LogoutButton = styled(Button)({
    height: "8%",
    width: "100%",
    backgroundColor: "#EEBC1D",
    marginTop: 20,
    color : "black"
  })

  const Profile = styled('div')({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  })  

  const Picture = styled(Avatar)({
    width: 120,
    height: 120,
    cursor: "pointer",
    backgroundColor: "#EEBC1D",
    objectFit: "contain",
  }) 

  const {symbol ,user, setAlert, watchlist,coins} = CryptoState();
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = ()=>{
    signOut(auth);
    setAlert({
        open : true,
        message : "Logged out successfully!",
        type : "success"
    })

    toggleDrawer();
  }

  const RemoveFromCoinList = async(coin) =>{
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(coinRef, 
          {coins : watchlist.filter((watch)=>watch!==coin?.id)},
          {merge : "true"}
        );

        setAlert({
          open : true,
          message: coin.name + " removed from watchlist",
          type : "success"
        })
    } catch (error) {
      setAlert({
        open : true,
        message: error.message,
        type : "error"
      })
    }
  }
  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar
            onClick = {toggleDrawer(anchor, true)}
            style = {{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src = {user.photoURL}
            alt={user.displayName || user.email}
          />
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <CustomDiv>
                <Profile>
                <Picture
                    src = {user.photoURL}
                    alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <WatchList>
                  <span style={{fontSize : 15, textShadow : "0 0 5px black"}}>
                    Watchlist
                  </span>
                  {
                    // eslint-disable-next-line
                    coins.map(coin=>{
                      if(watchlist.includes(coin.id)){
                        return(
                          <Coin>
                            <span>{coin.name}</span>
                            <span style={{display : "flex", gap : 8}}>
                              {symbol}
                              {numberWithCommas(coin.current_price.toFixed(2))}
                             <AiFillDelete 
                                style= {{cursor : "pointer"}}
                                fontSize= "16"
                                onClick={()=>RemoveFromCoinList(coin)}
                             />
                            </span>
                          </Coin>
                        )
                      }
                    })
                  }
                </WatchList>
                </Profile>
                <LogoutButton
                 variant='contained'
                 onClick={logout}
                >Logout</LogoutButton>
            </CustomDiv>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}