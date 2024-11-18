import React, { useState, useEffect } from "react";
const data = require("./player.json"); // Assuming this is the structure you've shared.
const background = require("./background.jpg")
// import background from "./background.jpg"

function App() {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [unsoldPlayers, setUnsoldPlayers] = useState([]);
  const [groupedData, setGroupedData] = useState([]);

  useEffect(() => {
    // Convert the grouped data from object to an array for easy iteration.
    const sets = Object.keys(data);
    const grouped = sets.map((setKey) => ({
      setName: setKey,
      players: shuffle(data[setKey]),
    }));
    setGroupedData(grouped);
  }, []);

  // Shuffle players within each set using Fisher-Yates algorithm
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap
    }
    return array;
  };

  const handleSold = () => {
    if (currentIndex < groupedData[currentSetIndex].players.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Move to the next set if available
      if (currentSetIndex < groupedData.length - 1) {
        setCurrentSetIndex(currentSetIndex + 1);
        setCurrentIndex(0);
      } else {
        alert("Auction Complete");
      }
    }
  };

  const handleUnsold = () => {
    setUnsoldPlayers([
      ...unsoldPlayers,
      groupedData[currentSetIndex].players[currentIndex],
    ]);

    if (currentIndex < groupedData[currentSetIndex].players.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Move to the next set if available
      if (currentSetIndex < groupedData.length - 1) {
        setCurrentSetIndex(currentSetIndex + 1);
        setCurrentIndex(0);
      } else {
        alert("Auction Complete");
      }
    }
  };

  const currentSet = groupedData[currentSetIndex];
  const currentPlayer = currentSet ? currentSet.players[currentIndex] : null;

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "98vh",
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    fontFamily: "Arial, sans-serif",
  };
  

  const boxStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    width: "300px",
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: "20px",
  };

  const detailStyle = {
    marginBottom: "10px",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  };

  const soldButtonStyle = {
    backgroundColor: "green",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "14px",
  };

  const unsoldButtonStyle = {
    backgroundColor: "red",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "14px",
  };

  return (
    <div style={containerStyle}>
      {currentPlayer ? (
        <div style={boxStyle}>
          <p style={titleStyle}>IPL Mock Auction</p>
          <p style={titleStyle}>
            <strong>Set Name:</strong> {`${currentPlayer.Set}`}
          </p>
          <p style={detailStyle}>
            <strong>Player No:</strong> {`${currentPlayer.playerNo}`}
          </p>
          <p style={detailStyle}>
            <strong>Player Name:</strong> {`${currentPlayer.firstName} ${currentPlayer.surName}`}
          </p>
          <p style={detailStyle}>
            <strong>Country:</strong> {currentPlayer.Country}
          </p>
          <p style={detailStyle}>
            <strong>Role:</strong> {currentPlayer.Specialism}
          </p>
          <p style={detailStyle}>
            <strong>Batting Style:</strong> {currentPlayer.Column11}
          </p>
          {currentPlayer.Column12 && (
            <p style={detailStyle}>
              <strong>Bowling Style:</strong> {currentPlayer.Column12}
            </p>
          )}
          <p style={detailStyle}>
            <strong>Base Price:</strong> {`${currentPlayer.basePrice}L`}
          </p>
          <div style={buttonContainerStyle}>
            <button style={soldButtonStyle} onClick={handleSold}>
              Sold
            </button>
            <button style={unsoldButtonStyle} onClick={handleUnsold}>
              Unsold
            </button>
          </div>
        </div>
      ) : (
        <div style={boxStyle}>
          <p style={titleStyle}>Auction Complete</p>
          <p>
            Unsold Players:
            {unsoldPlayers.length > 0 ? (
              <ul>
                {unsoldPlayers.map((player, index) => (
                  <li key={index}>{player.firstName} {player.surName}</li>
                ))}
              </ul>
            ) : (
              <p>No unsold players.</p>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;