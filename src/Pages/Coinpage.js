import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CryptoState } from '../CryptoContext';
import { SingleCoin } from '../config/api';
import CoinInfo from '../Components/CoinInfo';
import { styled } from '@mui/material/styles';
import { Button, LinearProgress, Typography } from '@mui/material';
import { numberWithCommas } from '../Components/Banner/Carousel'
import HTMLReactParser from 'html-react-parser';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Coinpage = () => {
  
  const { id } = useParams();
  const [coin , setcoin] = useState();
  const { currency, symbol, user, watchlist, setAlert} = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setcoin(data);
  }

useEffect(()=>{
  fetchCoin();
      // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


const CoinDescription = styled(Typography)({
  width: "100%",
  fontFamily: "Montserrat",
  padding: 25,
  paddingBottom: 15,
  paddingTop: 0,
  textAlign: "justify",
})
const CoinName = styled(Typography)({
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Montserrat",
})

const Heading = styled(Typography)({
  fontWeight: "bold",
  marginBottom: 20,
  fontFamily: "Montserrat",
})
const Marketdata = styled('div')(({ theme }) => ({
  alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
}));
const CustomDiv = styled('div')(({ theme }) => ({
  display:"flex",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));
const Sidebar = styled('div')(({ theme }) => ({
  width: "30%",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 25,
  borderRight: "2px solid grey",
}));
 
const inWatchList = watchlist.includes(coin?.id);

const handleWatchListButton = async() => {
  const coinRef = doc(db, "watchlist", user.uid);
  try {
    //creating a doc using setDoc
    await setDoc(coinRef, 
        {coins:watchlist?[...watchlist, coin.id] : [coin.id]}
      );

      setAlert({
        open : true,
        message: coin.name + " added to watchlist",
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

const removeFromWatchList = async() => {
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

if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

  return (
    <CustomDiv>
      <Sidebar>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <CoinName variant="h3">
          {coin?.name}
        </CoinName>
        <CoinDescription variant="subtitle1">
          {HTMLReactParser(coin?.description.en.split(". ")[0])}.
        </CoinDescription>
        <Marketdata>
          <span style={{ display: "flex" }}>
            <Heading variant="h5">
              Rank:
            </Heading>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>

          <span style={{ display: "flex" }}>
            <Heading variant="h5" >
              Current Price:
            </Heading>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Heading variant="h5">
              Market Cap:
            </Heading>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>
          </span>
          {user && (
            <Button
              variant='outlined'
              style={{
                width : "1005",
                height : 40,
                backgroundColor : inWatchList?"#ff0000":"#DCFE50",
                color : "black"
              }}
              onClick = {inWatchList?removeFromWatchList : handleWatchListButton}
            >
              {inWatchList ? "Remove from watchlist" : "Add to watchlist"}
            </Button>
          )}
        </Marketdata>
      </Sidebar>
      <CoinInfo coin={coin}/>
    </CustomDiv>
  )
}

export default Coinpage
