import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { LinearProgress, Pagination, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api';
import { CryptoState } from '../CryptoContext';
import { useNavigate } from 'react-router-dom';
import { numberWithCommas } from './Banner/Carousel';

const Cointable = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const {currency, symbol} = CryptoState();
    const navigate = useNavigate();

    const fetchCoinList = async ()=>{
        setLoading(true);
        const {data} = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }

    useEffect(()=>{
        fetchCoinList();
    },[currency]);

    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });

    const CustomRow = styled(TableRow)({
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
        backgroundColor: "#131111",
        },
        fontFamily: "Montserrat",
    })
    const CustomPage = styled(Pagination)({
        "& .MuiPaginationItem-root": {
        color: "gold",
    }
    })
    const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
      };

  return (
    <ThemeProvider theme={darkTheme}>
        <Container style={{ textAlign: "center" }}>
            <Typography
            variant="h4"
            style={{ margin: 18, fontFamily: "Montserrat" }}
            >
            Cryptocurrency Prices by Market Cap
            </Typography>
            <TextField 
            label="search for a coin" 
            variant='outlined'
            style={{
                marginBottom:20,
                width : "50%"
            }} 
            onChange={(e)=>{
                setSearch(e.target.value);
            }}
            >
                Search for a coin
            </TextField>
            <TableContainer>
                {loading?(
                    <LinearProgress style={{backgroundColor: "gold"}} />
                ):(
                    <Table>
                        <TableHead style={{backgroundColor : "#EEBC1D"}}>
                        <TableRow>
                            {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                <TableCell
                                style={{
                                    color: "black",
                                    fontWeight: "700",
                                    fontFamily: "Montserrat",
                                }}
                                key={head}
                                align={head === "Coin" ? "" : "right"}
                                >
                                {head}
                                </TableCell>
                            ))}
                        </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleSearch()
                            .slice((page-1)*10, (page-1)*10+10)
                            .map((row)=>{
                                const profit = row.price_change_percentage_24h>0;

                                return(
                                    <CustomRow 
                                    onClick={()=>navigate('/coin/'+row.id)}
                                    key={row.name}
                                    >
                                        <TableCell 
                                        component="th"
                                        scope='row'
                                        style={{
                                            display:'flex',
                                            gap : 15,
                                        }}
                                        >
                                           <img 
                                           src={row.image}
                                           alt={row.name}
                                           height="50"
                                           style={{marginBottom: 10}} 
                                           />   
                                            <div
                                                style={{ display: "flex", flexDirection: "column" }}
                                            >
                                                <span
                                                style={{
                                                    textTransform: "uppercase",
                                                    fontSize: 22,
                                                }}
                                                >
                                                {row.symbol}
                                                </span>
                                                <span style={{ color: "darkgrey" }}>
                                                {row.name}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell align="right">
                                            {symbol}{" "}
                                            {numberWithCommas(row.current_price.toFixed(2))}
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            style={{
                                            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                            fontWeight: 500,
                                            }}
                                        >
                                            {profit && "+"}
                                            {row.price_change_percentage_24h.toFixed(2)}%
                                        </TableCell>
                                        <TableCell align="right">
                                            {symbol}{" "}
                                            {numberWithCommas(
                                            row.market_cap.toString().slice(0, -6)
                                            )}
                                            M
                                        </TableCell>
                                    </CustomRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <CustomPage
            style={{
                padding: 20,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            count={(handleSearch()?.length/10).toFixed(0)}
            onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 500);
              }}
            />
        </Container>
    </ThemeProvider>
  )
}

export default Cointable
