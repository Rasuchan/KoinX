import React, { useEffect, useState } from "react";
import AboutBitcoin from "./components/AboutBitcoin";
import ChartComponent from "./components/ChartComponent";
import CoinList from "./components/CoinList";
import imgKoinX from './components/imgKoinX.png';
import PerformanceCard from "./components/PerformanceCard";
import SentimentCard from "./components/SentimentCard";
import TeamCard from "./components/TeamCard";
import TrendingCoins from "./components/TrendingCoins";



const App = () => {
  const [bitcoinData, setBitcoinData] = useState({ priceUsd: 0, priceInr: 0, change24h: 0 });

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,inr&include_24hr_change=true"
    )
      .then((response) => response.json())
      .then((data) => {
        setBitcoinData({
          priceUsd: data.bitcoin.usd,
          priceInr: data.bitcoin.inr,
          change24h: data.bitcoin.usd_24h_change.toFixed(2),
        });
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div style={styles.appContainer}>
      {/* Top Navigation Bar */}
      <header style={styles.navbar}>
      <div>
      {/* Replacing text with logo image */}
      <img src={imgKoinX} alt="KoinX Logo" style={{ width: '150px', height: 'auto' }} />
    </div>
        
        <nav style={styles.navLinks}>
          <a href="#" style={styles.navLink}>Crypto Taxes</a>
          <a href="#" style={styles.navLink}>Free Tools</a>
          <a href="#" style={styles.navLink}>Resource Center</a>
        </nav>
        <button style={styles.getStartedBtn}>Get Started</button>
      </header>

      {/* Main Content */}
      <main style={styles.mainContent}>
        {/* Bitcoin Price Section */}
        <section style={styles.priceSection}>
          <div style={styles.priceHeader}>
            <div style={styles.coinInfo}>
              <h1 style={styles.coinTitle}>Bitcoin BTC</h1>
              <span style={styles.rank}>Rank #1</span>
            </div>
            <div style={styles.priceDetails}>
              <h2 style={styles.price}>${bitcoinData.priceUsd}</h2>
              <p style={styles.priceChange}>{bitcoinData.change24h}% (24H)</p>
              <p style={styles.priceInr}>₹ {bitcoinData.priceInr}</p>
            </div>
          </div>
          {/* Replaced the chart section with ChartComponent */}
          <ChartComponent />
        </section>
        

        {/* Sidebar Section */}
        <aside style={styles.sidebar}>
          <div style={styles.adSection}>
            <h3 style={styles.adTitle}>Get Started with KoinX for FREE</h3>
            <p style={styles.adText}>
              With our range of features that you can equip for free, KoinX allows
              you to be more educated and aware of your tax reports.
            </p>
            <button style={styles.adBtn}>Get Started for FREE</button>
          </div>
          <aside style={styles.sidebar}>
  <TrendingCoins />
</aside>

        </aside>
        
      </main>
      <div><PerformanceCard /></div>
      <div><SentimentCard /></div>
      <div><AboutBitcoin /></div>
      <div><TeamCard /></div>
      <div><CoinList /></div>
    </div>
    
  );
};

const styles = {
  appContainer: {
    fontFamily: "Arial, sans-serif",
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ddd",
  },
  logo: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  navLinks: {
    display: "flex",
    gap: "15px",
  },
  navLink: {
    textDecoration: "none",
    color: "#333",
    fontSize: "16px",
  },
  getStartedBtn: {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  mainContent: {
    display: "flex",
    padding: "20px",
    gap: "20px",
  },
  priceSection: {
    flex: 3,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  priceHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  coinInfo: {},
  coinTitle: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
  },
  rank: {
    fontSize: "14px",
    color: "#666",
  },
  priceDetails: {
    textAlign: "right",
  },
  price: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "bold",
  },
  priceChange: {
    color: "#28a745",
    margin: 0,
  },
  priceInr: {
    color: "#333",
    margin: 0,
  },
  sidebar: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  adSection: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "20px",
    borderRadius: "8px",
    textAlign: "center",
  },
  adTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  adText: {
    margin: "10px 0",
  },
  adBtn: {
    padding: "8px 16px",
    backgroundColor: "#fff",
    color: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
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

export default App;
