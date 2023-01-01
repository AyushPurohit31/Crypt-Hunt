import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material';
import axios from 'axios';
import {CryptoState} from "../../CryptoContext"
import { TrendingCoins } from '../../config/api';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

const MyCarousel = styled('div')({
    height : "50%",
    display : "flex",
    alignItems : "center",
});
const MyCarouselitems = styled(Link)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
});

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  

const Carousel = () => {

    const [trending, setTrending] = useState([]);
    const {currency, symbol} = CryptoState();

    const fetchTrendingcoins = async()=>{
        const {data} = await axios.get(TrendingCoins(currency));
        setTrending(data);
    };
     
    useEffect(()=>{
        fetchTrendingcoins();
    },[currency]);

    const items = trending.map((coin)=>{
        let profit = coin?.price_change_percentage_24h >= 0;
        return (
                <MyCarouselitems to ={'/coin/'+coin.id}>
                    <img
                        src={coin?.image}
                        alt={coin.name}
                        height="80"
                        style={{marginBottom:10}}
                    />
                    <span>
                        {coin?.symbol}
                        &nbsp;
                        <span
                            style={{
                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                fontWeight: 500,
                            }}
                        >
                            {profit && "+"}
                            {coin?.price_change_percentage_24h?.toFixed(2)}%
                        </span>
                    </span>
                    <span style={{ fontSize: 22, fontWeight: 500 }}>
                        {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                    </span>
                </MyCarouselitems>
        )
    })
    
    const responsive={
        0: {
            items: 2,
        },
        512: {
            items: 4,
        }
    };



  return (
    <MyCarousel>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration = {1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                items={items}
                autoPlay
            />
    </MyCarousel>
  )
}

export default Carousel
