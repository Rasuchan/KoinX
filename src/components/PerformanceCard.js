import React, { useEffect, useState } from "react";

const PerformanceCard = () => {
  const [data, setData] = useState(null);

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      margin: "20px",
      padding: "20px",
      backgroundColor: "#f7fafc",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    header: {
      marginBottom: "20px",
      fontWeight: "bold",
      fontSize: "18px",
    },
    performanceBar: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
    },
    bar: {
      flex: 1,
      height: "8px",
      background: "linear-gradient(to right, red, orange, yellow, green)",
      position: "relative",
      margin: "0 10px",
    },
    marker: {
      position: "absolute",
      top: "-4px",
      left: "50%",
      width: "8px",
      height: "8px",
      backgroundColor: "#000",
      borderRadius: "50%",
    },
    performanceValues: {
      display: "flex",
      justifyContent: "space-between",
      fontSize: "14px",
    },
    fundamentals: {
      marginTop: "20px",
    },
    fundamentalsRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "10px",
      fontSize: "14px",
    },
    label: {
      color: "#6c757d",
    },
    value: {
      fontWeight: "bold",
    },
  };

  // Fetch the data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching Bitcoin data from CoinGecko API
        const priceResponse = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,inr&include_24hr_change=true"
        );
        const coinDetailsResponse = await fetch(
          "https://api.coingecko.com/api/v3/coins/bitcoin"
        );

        const priceResult = await priceResponse.json();
        const coinDetailsResult = await coinDetailsResponse.json();

        setData({
          price: priceResult.bitcoin,
          coinDetails: coinDetailsResult,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // If data is not yet available, show a loading state
  if (!data || !data.price || !data.coinDetails) {
    return <div>Loading...</div>;
  }

  // Extract data from the fetched response
  const { price } = data;
  const { coinDetails } = data;

  const priceUSD = price?.usd || 0;
  const priceINR = price?.inr || 0;
  const priceChange24h = price?.usd_24h_change || 0;
  const priceLow24h = priceUSD - (priceChange24h * priceUSD) / 100;
  const priceHigh24h = priceUSD + (priceChange24h * priceUSD) / 100;

  // Extract additional details from CoinGecko response
  const marketCap = coinDetails?.market_data?.market_cap?.usd || 0;
  const marketCapDominance = coinDetails?.market_data?.market_cap_percentage?.btc || 0;
  const allTimeHigh = coinDetails?.market_data?.high_24h?.usd || 0;
  const allTimeLow = coinDetails?.market_data?.low_24h?.usd || 0;
  const tradingVolume = coinDetails?.market_data?.total_volumes?.usd || 0;

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>Performance</div>

      {/* Performance Bar */}
      <div style={styles.performanceBar}>
        <div style={styles.label}>{priceLow24h.toFixed(2)}</div>
        <div style={styles.bar}>
          <div style={styles.marker}></div>
        </div>
        <div style={styles.label}>{priceHigh24h.toFixed(2)}</div>
      </div>
      <div style={styles.performanceValues}>
        <span>24h Change: {priceChange24h.toFixed(2)}%</span>
        <span>USD: {priceUSD.toFixed(2)}</span>
        <span>INR: {priceINR.toFixed(2)}</span>
      </div>

      {/* Fundamentals Section */}
      <div style={styles.header}>Fundamentals</div>
      <div style={styles.fundamentals}>
        <div style={styles.fundamentalsRow}>
          <span style={styles.label}>Bitcoin Price</span>
          <span style={styles.value}>${priceUSD.toFixed(2)}</span>
        </div>
        <div style={styles.fundamentalsRow}>
          <span style={styles.label}>24h Low / 24h High</span>
          <span style={styles.value}>
            ${priceLow24h.toFixed(2)} / ${priceHigh24h.toFixed(2)}
          </span>
        </div>
        <div style={styles.fundamentalsRow}>
          <span style={styles.label}>Trading Volume</span>
          <span style={styles.value}>
            ${tradingVolume.toLocaleString()}
          </span>
        </div>
        <div style={styles.fundamentalsRow}>
          <span style={styles.label}>Market Cap</span>
          <span style={styles.value}>
            ${marketCap.toLocaleString()}
          </span>
        </div>
        <div style={styles.fundamentalsRow}>
          <span style={styles.label}>Market Cap Dominance</span>
          <span style={styles.value}>
            {marketCapDominance.toFixed(2)}%
          </span>
        </div>
        <div style={styles.fundamentalsRow}>
          <span style={styles.label}>All-Time High</span>
          <span style={styles.value}>
            ${allTimeHigh.toFixed(2)}{" "}
            <span style={{ color: "red" }}>
              -{(((priceUSD - allTimeHigh) / allTimeHigh) * 100).toFixed(2)}%
            </span>
          </span>
        </div>
        <div style={styles.fundamentalsRow}>
          <span style={styles.label}>All-Time Low</span>
          <span style={styles.value}>
            ${allTimeLow.toFixed(2)}{" "}
            <span style={{ color: "green" }}>
              +{(((allTimeLow - priceUSD) / priceUSD) * 100).toFixed(2)}%
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceCard;
