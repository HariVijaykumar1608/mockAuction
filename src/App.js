import AuctionPurse from "./auctionPurse";
import Button from '@mui/material/Button';
import React, { useState, useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import TeamDetailTab from "./teamDetailTab"
const data = require("./player.json");

function App() {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [unsoldPlayers, setUnsoldPlayers] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [basePrice, setbasePrice] = useState("")
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    // Convert the grouped data from object to an array for easy iteration.
    const sets = Object.keys(data);
    const grouped = sets.map((setKey) => ({
      setName: setKey,
      players: shuffle(data[setKey]),
    }));
    setGroupedData(grouped);
  }, []);

  useEffect(()=>{
    const currentSet = groupedData[currentSetIndex];
    const currentPlayer = currentSet ? currentSet.players[currentIndex] : null;
    setbasePrice(currentPlayer?.basePrice)
  },[groupedData,currentIndex])

  // Shuffle players within each set using Fisher-Yates algorithm
  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap
    }
    return array;
  };

  const teams = [
    { name : "Chennai Super Kings", purse:5500, players:[]},
    { name : "Mumbai Indians", purse:4500, players:[]},
    { name : "Royal Challengers Bangalore", purse:8300, players:[]},
    { name : "Kolkata Knight Riders", purse:5100, players:[]},
    { name : "Sunrisers Hyderabad", purse:4500, players:[]},
    { name : "Gujarat Titans", purse:6900, players:[]},
    { name : "Rajasthan Royals", purse:4100, players:[]},
    { name : "Punjab Kings", purse:11050, players:[]},
    { name : "Lucknow Super Gaints", purse:6900, players:[]},
    { name : "Delhi Capitals", purse:7300, players:[]},
  ];

  const [teamData, setTeamData] = useState(teams)

  const handleAccounting = () => {
    const data = [...teamData]
    const finalBiddedTeamObj = data[highlightedIndex]
    const buyingTeam = finalBiddedTeamObj?.name || ""
    if(!buyingTeam){
      return{done:false,message:`Please Select A Team`}
    }
    const isIndian = currentPlayer.Country === "India"
    if(!isIndian){
      const nonIndianCount = finalBiddedTeamObj.players.filter(player => player.isIndian === false).length
      if(nonIndianCount > 8){
        setbasePrice(currentPlayer.basePrice)
        return{done: false, message: `Foreign Players execeeds for ${buyingTeam}`}
      }
    }
    if(finalBiddedTeamObj.purse >= basePrice && finalBiddedTeamObj?.players?.length < 25) {
      const finalPurseValue = finalBiddedTeamObj.purse - basePrice
      const updatedData = data.map((obj) => {
        if (obj.name === buyingTeam) {
          return {
            ...obj,
            purse: finalPurseValue,
            players: [
              ...(obj.players || []),
              {
                name: `${currentPlayer.firstName} ${currentPlayer.surName}`, 
                isIndian: currentPlayer.Country === "India" ? true : false,
              },
            ],
          };
        }
        return obj;
      });
      setTeamData(updatedData);
      
      return{done:true,message:`Player Sold for ${buyingTeam} for ${basePrice}L`}
    }
    else{
      setbasePrice(currentPlayer.basePrice)
      return{done:false,message: finalBiddedTeamObj.purse <= basePrice ? `Money Exceeded for ${buyingTeam}` : `Sorry Player exceeded for ${buyingTeam}!!`}
    }
  }

  const handleSold = () => {
    const isSold = handleAccounting()
    if(isSold.done){
      if (currentIndex < groupedData[currentSetIndex].players.length - 1) {
        setCurrentIndex(currentIndex + 1);
        alert(isSold.message)
      } else {
        // Move to the next set if available
        if (currentSetIndex < groupedData.length - 1) {
          setCurrentSetIndex(currentSetIndex + 1);
          setCurrentIndex(0);
          alert(isSold.message)
        } else {
          alert("Auction Complete");
        }
      }
      setHighlightedIndex(null)
    }
    else{
      alert(isSold.message)
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

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const increment = (amt) => {
    if (amt >= 500) {
        amt += 25;
    } else if (amt >= 100) {
        amt += 20;
    } else {
        amt += 5;
    }
  setbasePrice(amt)
};

  const currentSet = groupedData[currentSetIndex];
  const currentPlayer = currentSet ? currentSet.players[currentIndex] : null;

  const containerStyle = {
    display: "flex",             // Enables flexbox
    justifyContent: "center",    // Centers horizontally
    alignItems: "center",        // Centers vertically
    height: "100vh",             // Ensures full viewport height
    width: "100%",               // Ensures full viewport width
    boxSizing: "border-box",     // Includes padding and borders in size calculations
  };
  
  
  
  const boxStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
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

  const incrementBoxStyle = {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };

  const incrementButtonStyle = {
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    fontSize: "14px",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    width: "80px",
    textAlign: "center",
  };

  return (
    <div style={containerStyle}>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
    </Button>
    {
      drawerOpen && <TeamDetailTab drawerOpen={drawerOpen} toggleDrawer={toggleDrawer} teams={teamData}/>
    }
      <AuctionPurse highlightedIndex={highlightedIndex} setHighlightedIndex={setHighlightedIndex}/>
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
          <div style={incrementBoxStyle}>
            <input
              type="text"
              value={basePrice}
              style={inputStyle}
              onChange={(e) => setbasePrice(e.target.value && parseInt(e.target.value))}
            />
            <button style={incrementButtonStyle} onClick={()=>increment(basePrice)}>
              Bid
            </button>
          </div>
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