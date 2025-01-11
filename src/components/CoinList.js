import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import {
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from 'recharts';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';

// Styled Components
const Section = styled.section`
  padding: 40px;
  background-color: #f5f8fa;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
`;

const CoinCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 150px;
`;

const CoinLogo = styled.img`
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
`;

const CoinSymbol = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #555;
`;

const CoinPrice = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
`;

const CoinChange = styled.p`
  font-size: 14px;
  color: ${props => (props.change > 0 ? 'green' : 'red')};
  margin-bottom: 10px;
`;

const GraphContainer = styled.div`
  width: 100%;
  height: 50px;
`;

// Slider Settings
const sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const CoinList = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    // Fetching data from the API
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets', {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
              sparkline: true
            }
          }
        );
        setCoins(response.data);
      } catch (error) {
        console.error("Error fetching coins data:", error);
      }
    };
    fetchCoins();
  }, []);

  return (
    <Section>
      <Title>You May Also Like</Title>
      <Slider {...sliderSettings}>
        {coins.map(coin => (
          <CoinCard key={coin.id}>
            <CoinLogo src={coin.image} alt={coin.name} />
            <CoinSymbol>{coin.symbol.toUpperCase()}</CoinSymbol>
            <CoinPrice>${coin.current_price.toFixed(2)}</CoinPrice>
            <CoinChange change={coin.price_change_percentage_24h}>
              {coin.price_change_percentage_24h > 0 ? `+${coin.price_change_percentage_24h.toFixed(2)}%` : `${coin.price_change_percentage_24h.toFixed(2)}%`}
            </CoinChange>

            {/* Render Sparkline Graph */}
            <GraphContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={coin.sparkline_in_7d.price.map((price, index) => ({ index, price }))}>
                  <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
                  <XAxis dataKey="index" hide />
                  <YAxis domain={['auto', 'auto']} hide />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </GraphContainer>
          </CoinCard>
        ))}
      </Slider>

      <Title>Trending Coins</Title>
      <Slider {...sliderSettings}>
        {coins.map(coin => (
          <CoinCard key={coin.id}>
            <CoinLogo src={coin.image} alt={coin.name} />
            <CoinSymbol>{coin.symbol.toUpperCase()}</CoinSymbol>
            <CoinPrice>${coin.current_price.toFixed(2)}</CoinPrice>
            <CoinChange change={coin.price_change_percentage_24h}>
              {coin.price_change_percentage_24h > 0 ? `+${coin.price_change_percentage_24h.toFixed(2)}%` : `${coin.price_change_percentage_24h.toFixed(2)}%`}
            </CoinChange>

            {/* Render Sparkline Graph */}
            <GraphContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={coin.sparkline_in_7d.price.map((price, index) => ({ index, price }))}>
                  <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
                  <XAxis dataKey="index" hide />
                  <YAxis domain={['auto', 'auto']} hide />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </GraphContainer>
          </CoinCard>
        ))}
      </Slider>
    </Section>
  );
};

export default CoinList;
