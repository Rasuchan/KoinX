import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SentimentContainer = styled.div`
  width: 90%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;

const KeyEventsSection = styled.div`
  margin-bottom: 30px;
`;

const EventCard = styled.div`
  width: 48%;
  background-color: ${(props) => (props.variant === 'blue' ? '#e6f2ff' : '#e6ffed')};
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const EventIcon = styled.div`
  font-size: 20px;
  margin-bottom: 10px;
`;

const EventContent = styled.div`
  h4 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    color: #666;
  }
`;

const AnalystEstimatesSection = styled.div`
  margin-bottom: 30px;
`;

const EstimateDetails = styled.div`
  .detail {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .label {
    width: 50px;
    font-size: 14px;
  }

  .bar {
    flex: 1;
    height: 8px;
    margin: 0 10px;
    border-radius: 4px;
    transition: width 0.3s ease; /* Smooth transition of the bar width */
  }

  .buy-bar {
    background-color: #4caf50; /* Green for buy */
  }

  .hold-bar {
    background-color: #ff9800; /* Orange for hold */
  }

  .sell-bar {
    background-color: #f44336; /* Red for sell */
  }

  .value {
    width: 40px;
    text-align: right;
  }
`;

const EventsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const SentimentCard = () => {
  const [priceData, setPriceData] = useState({
    buy: 0,
    hold: 0,
    sell: 0,
  });

  useEffect(() => {
    // Fetch data from CoinGecko API
    axios
      .get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,inr&include_24hr_change=true'
      )
      .then((response) => {
        const { usd_24h_change } = response.data.bitcoin;

        // Assume "buy" represents percentage increase in the last 24 hours.
        const buyPercentage = Math.abs(usd_24h_change);
        const holdPercentage = 100 - buyPercentage - 5; // Dummy value for hold
        const sellPercentage = 5; // Dummy value for sell

        setPriceData({
          buy: buyPercentage,
          hold: holdPercentage,
          sell: sellPercentage,
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <SentimentContainer>
      <h2>Sentiment</h2>

      {/* Key Events Section */}
      <KeyEventsSection>
        <h3>Key Events</h3>
        <EventsWrapper>
          <EventCard variant="blue">
            <EventIcon>
              <i className="fa fa-info-circle"></i>
            </EventIcon>
            <EventContent>
              <h4>KoinX Ideation</h4>
              <p>
                Ideation: The idea for KoinX began when Punit, the founder, realized that technology could calculate crypto taxes, and manual efforts could be time-consuming.
              </p>
            </EventContent>
          </EventCard>

          <EventCard variant="green">
            <EventIcon>
              <i className="fa fa-line-chart"></i>
            </EventIcon>
            <EventContent>
              <h4>KoinX Prototype and Fundraising</h4>
              <p>
                In the second quarter of 2022, KoinX developed a prototype and began raising funds.
              </p>
            </EventContent>
          </EventCard>
        </EventsWrapper>
      </KeyEventsSection>

      {/* Analyst Estimates Section */}
      <AnalystEstimatesSection>
        <h3>Analyst Estimates</h3>
        <EstimateDetails>
          <div className="detail">
            <span className="label">Buy</span>
            <div
              className="bar buy-bar"
              style={{ width: `${priceData.buy}%` }}
            ></div>
            <span className="value">{priceData.buy}%</span>
          </div>
          <div className="detail">
            <span className="label">Hold</span>
            <div
              className="bar hold-bar"
              style={{ width: `${priceData.hold}%` }}
            ></div>
            <span className="value">{priceData.hold}%</span>
          </div>
          <div className="detail">
            <span className="label">Sell</span>
            <div
              className="bar sell-bar"
              style={{ width: `${priceData.sell}%` }}
            ></div>
            <span className="value">{priceData.sell}%</span>
          </div>
        </EstimateDetails>
      </AnalystEstimatesSection>
    </SentimentContainer>
  );
};

export default SentimentCard;
