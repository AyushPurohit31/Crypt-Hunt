import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { CoinList } from './config/api';
import { auth, db } from './firebase';

const Crypto = createContext();

const CryptoContext = ({children}) => {
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null); 
    const [alert, setAlert] = useState({
      open : false,
      message : "",
      type : "success"
    });
    
    const [watchlist, setwatchlist] = useState([])

    useEffect(()=>{
      if(user){
        const coinRef = doc(db, "watchlist", user.uid);
        var unsubscribe = onSnapshot(coinRef, coin=>{
          if(coin.exists()){
            console.log(coin.data().coins);
            setwatchlist(coin.data().coins);
          }else{
            console.log("No item in watchlist")
          }
        });
        return ()=>{
          unsubscribe();
        }
      }
    }, [user])

    useEffect(()=>{
      onAuthStateChanged(auth, (user)=>{
        if(user)setUser(user);
        else setUser(null);

        console.log(user);
      })
    }, [])

    const fetchCoinList = async ()=>{
      setLoading(true);
      const {data} = await axios.get(CoinList(currency));
      setCoins(data);
      setLoading(false);
  }

     useEffect(()=>{
        if(currency==="INR")setSymbol("₹");
        else if(currency==="USD")setSymbol("$");
    }, [currency]);//dependancy on currency object's value

  return (
    <Crypto.Provider value={{watchlist, user,currency, symbol, setCurrency, coins, loading, fetchCoinList, alert, setAlert}}>
      {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = ()=>{
    return useContext(Crypto);
}
