import React, { useState } from "react";

const ChartComponent = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("7D");

  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframe(timeframe);
  };

  const getTimeframeForWidget = (timeframe) => {
    switch (timeframe) {
      case "1H":
        return "60"; // 1-hour timeframe
      case "24H":
        return "D"; // 1-day timeframe
      case "7D":
        return "W"; // 1-week timeframe
      case "1M":
        return "M"; // 1-month timeframe
      case "3M":
        return "3M"; // 3-month timeframe
      case "6M":
        return "6M"; // 6-month timeframe
      case "1Y":
        return "1Y"; // 1-year timeframe
      case "ALL":
        return "ALL"; // All-time
      default:
        return "D"; // Default to daily
    }
  };

  return (
    <div style={styles.chartContainer}>
      <h3 style={styles.chartTitle}>Bitcoin Price Chart (USD)</h3>
      <div style={styles.chartPlaceholder}>
        <iframe
          title="TradingView Chart"
          src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_chart&symbol=BITSTAMP:BTCUSD&interval=${getTimeframeForWidget(
            selectedTimeframe
          )}&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=F1F3F6`}
          width="100%"
          height="400px"
          frameBorder="0"
          allowTransparency="true"
          scrolling="no"
        ></iframe>
      </div>
      <div style={styles.timeframe}>
        {["1H", "24H", "7D", "1M", "3M", "6M", "1Y", "ALL"].map((timeframe) => (
          <button
            key={timeframe}
            style={{
              ...styles.timeframeBtn,
              ...(selectedTimeframe === timeframe ? styles.activeBtn : {}),
            }}
            onClick={() => handleTimeframeChange(timeframe)}
          >
            {timeframe}
          </button>
        ))}
      </div>
    </div>
  );
};

const styles = {
  chartContainer: {
    marginTop: "20px",
  },
  chartTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  chartPlaceholder: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "10px",
  },
  timeframe: {
    display: "flex",
    gap: "10px",
  },
  timeframeBtn: {
    padding: "8px 12px",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
  },
  activeBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
};

export default ChartComponent;
