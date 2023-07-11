import { styled, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import Carousel from './Carousel';

const Mybanner = styled('div')({
    backgroundColor : "#232323"
});

const BannerContent = styled(Container)({
    height :280,
    display : 'flex',
    flexDirection : "coloumn",
    paddingTop : 25,
    justifyContent : "space-around",
});

const Tagline = styled('div')({
    display : "flex",
    height : "90%",
    flexDirection : "column",
    justifyContent : "center",
    textAlign : "center",
})

const Banner = () => {
  return (
    <Mybanner>
      <BannerContent>
        <Tagline>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypt Hunt
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "darkgrey",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </Tagline>
      </BannerContent>
      <Carousel />
    </Mybanner>
  )
}

export default Banner
