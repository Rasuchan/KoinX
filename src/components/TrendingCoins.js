import React, { useEffect, useState } from "react";

const TrendingCoins = () => {
  const [trendingCoins, setTrendingCoins] = useState([]);

  useEffect(() => {
    // Fetch trending coins data from CoinGecko
    fetch("https://api.coingecko.com/api/v3/search/trending")
      .then((response) => response.json())
      .then((data) => {
        // Extract the top 3 trending coins
        const topCoins = data.coins.slice(0, 3).map((coin) => ({
          name: coin.item.name,
          symbol: coin.item.symbol,
          priceChange: coin.item.price_btc.toFixed(8), // Price in BTC as an example
        }));
        setTrendingCoins(topCoins);
      })
      .catch((error) => console.error("Error fetching trending coins:", error));
  }, []);

  return (
    <div style={styles.trendingCoins}>
      <h3 style={styles.trendingTitle}>Trending Coins (24h)</h3>
      <ul style={styles.trendingList}>
        {trendingCoins.map((coin, index) => (
          <li key={index} style={styles.trendingItem}>
            <span>
              {coin.name} ({coin.symbol.toUpperCase()})
            </span>
            <span style={styles.positive}>{coin.priceChange} BTC</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  trendingCoins: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  trendingTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  trendingList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  trendingItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  positive: {
    color: "#28a745",
  },
};

export default TrendingCoins;
