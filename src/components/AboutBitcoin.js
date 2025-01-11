import axios from 'axios';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { darken } from 'polished';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import styled from 'styled-components';
// Register Chart.js elements
ChartJS.register(ArcElement, Tooltip, Legend);


const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Card = styled.div`
  background-color: ${(props) => props.bgColor || '#fff'};
  border-radius: 8px;
  padding: 20px;
  width: 48%;
  color: white;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const Button = styled.a`
  display: inline-block;
  background-color: ${(props) => props.bgColor || '#007bff'};
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  text-decoration: none;
  margin-top: 10px;
  font-size: 14px;

  &:hover {
    background-color: ${(props) => props.bgColor ? darken(0.1, props.bgColor) : '#0056b3'};
  }
`;

// Styled components for layout
const Container = styled.div`
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const Section = styled.section`
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const SubTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

const Text = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
`;

const ChartSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const ChartWrapper = styled.div`
  width: 40%;
  margin-right: 20px;
  
  @media (max-width: 768px) {
    width: 100%;
    margin: 0 auto 20px;
  }
`;

const ChartText = styled.div`
  width: 60%;
  
  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
  }
`;

const AboutBitcoin = () => {
  const [tokenomicsData, setTokenomicsData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from CoinGecko API
    axios
      .get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,inr&include_24hr_change=true')
      .then((response) => {
        const data = response.data.bitcoin;
        setTokenomicsData(data); // Set the API response data to state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data.');
      });
  }, []);

  // Chart data for tokenomics (you can adjust these values as per real tokenomics data)
  const chartData = {
    labels: ['USD', 'INR', '24hr Change'],
    datasets: [
      {
        label: 'Bitcoin Tokenomics',
        data: tokenomicsData
          ? [tokenomicsData.usd, tokenomicsData.inr, tokenomicsData.usd_24h_change]
          : [0, 0, 0],
        backgroundColor: ['#007bff', '#28a745', '#dc3545'],
        hoverBackgroundColor: ['#0056b3', '#218838', '#c82333'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <Container>
      {/* About Bitcoin Section */}
      <Section>
        <Title>About Bitcoin</Title>
        <SubTitle>What is Bitcoin?</SubTitle>
        <Text>
          Bitcoin's price today is US${tokenomicsData ? tokenomicsData.usd : 'Loading...'}, 
          with a 24-hour trading volume of $19.14 B.
          BTC is {tokenomicsData && tokenomicsData.usd_24h_change ? `${tokenomicsData.usd_24h_change.toFixed(2)}%` : 'Loading...'} in the last 24 hours.
        </Text>

        <SubTitle>What will Bitcoin be worth in 2025?</SubTitle>
        <Text>
        
Bitcoin will reach $200,000

My first prediction is Bitcoin will hit $200,000 in 2025. Two major factors support this bold target: the halving effect and institutional demand through exchange-traded funds (ETFs). The Bitcoin halving, which occurred in April 2024, cut its supply growth rate in half.
        </Text>
      </Section>
      {/* Already Holding Bitcoin Section */}
      <Section>
        <SubTitle>Already Holding Bitcoin?</SubTitle>
        <CardRow>
          <Card bgColor="#28a745">
            <Text>Calculate your Profits</Text>
            <Button bgColor="#28a745" href="#">Check Now →</Button>
          </Card>
          <Card bgColor="#dc3545">
            <Text>Calculate your tax liability</Text>
            <Button bgColor="#dc3545" href="#">Check Now →</Button>
          </Card>
        </CardRow>
      </Section>

      {/* Tokenomics Section */}
      <Section>
        <Title>Tokenomics</Title>
        <SubTitle>Initial Distribution</SubTitle>
        <ChartSection>
          <ChartWrapper>
            {/* Render the dynamic Pie chart */}
            <Pie data={chartData} options={chartOptions} />
          </ChartWrapper>
          <ChartText>
            <Text>
              The current price of Bitcoin in USD is: {tokenomicsData ? `$${tokenomicsData.usd}` : 'Loading...'}.
            </Text>
            <Text>
              The current price of Bitcoin in INR is: {tokenomicsData ? `₹${tokenomicsData.inr}` : 'Loading...'}.
            </Text>
            <Text>
              Bitcoin 24-hour change: {tokenomicsData ? `${tokenomicsData.usd_24h_change.toFixed(2)}%` : 'Loading...'}
            </Text>
          </ChartText>
        </ChartSection>

        {error && <Text style={{ color: 'red' }}>{error}</Text>}
      </Section>
    </Container>
  );
};

export default AboutBitcoin;
