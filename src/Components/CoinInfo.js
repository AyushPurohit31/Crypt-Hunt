import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react'
import { HistoricalChart } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { CircularProgress} from '@mui/material';
import { Line } from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';
import { chartDays } from '../config/data';
import SelectButton from './SelectButton';

Chart.register(CategoryScale);


const CoinInfo = ({coin}) => {
    console.log(coin)
    const [historicalData, setHistoricalData] = useState();
    const [days, setDays] = useState(1);
    const {currency} = CryptoState();

    const CustomDiv = styled('div')(({ theme }) => ({
      width: "75%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down("md")]: {
        width: "100%",
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
      }));
    const darkTheme = createTheme({
        palette: {
          mode: 'dark',
        },
      });
    const fetchHistoricalData = async ()=>{
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency))
        setHistoricalData(data.prices);
    }

    console.log("data", historicalData);

    useEffect(()=>{
        fetchHistoricalData();
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currency, days])
  return (
    <ThemeProvider theme={darkTheme}>
        <CustomDiv>
            {
              !historicalData?(
                <CircularProgress
                  style={{ color: "gold" }}
                  size={250}
                  thickness={1}
                />
              ):(
                <>
                <Line
              data={{
                labels: historicalData.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? (date.getHours() - 12) + ":" + date.getMinutes()+ " PM"
                      : (date.getHours()) + ":" + date.getMinutes()+ " AM"
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicalData.map((coin) => coin[1]),
                    label: "Price ( Past "+days+ " Days ) in "+ currency,
                    borderColor: "#EEBC1D",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
            style={{
              display: "flex",
              marginTop: 20,
              justifyContent: "space-around",
              width: "100%",
            }}
            >
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                }}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
          </>  
              )
            }
        </CustomDiv>
    </ThemeProvider>
  )
}

export default CoinInfo
