import React from "react";
const images = [
    {image: require("../src/img/csk.png"), alt : "Chennai Super Kings"},
    {image: require("../src/img/mi.png"), alt : "Mumbai Indians"},
    {image: require("../src/img/rcb.png"), alt : "Royal Challengers Bangalore"},
    {image: require("../src/img/kkr.png"), alt : "Kolkata Knight Riders"},
    {image: require("../src/img/srh.png"), alt : "Sunrisers Hyderabad"},
    {image: require("../src/img/gt.png"), alt : "Gujarat Titans"},
    {image: require("../src/img/rr.png"), alt : "Rajasthan Royals"},
    {image: require("../src/img/pk.png"), alt : "Punjab Kings"},
    {image: require("../src/img/lsg.png"), alt : "Lucknow Super Gaints"},
    {image: require("../src/img/dc.png"), alt : "Delhi Capitals"},
];

function AuctionPurse(props) {
    const { highlightedIndex, setHighlightedIndex } = props

    const containerStyle = {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "20px",
      padding: "20px",
    };
  
    const rowStyle = {
      display: "flex",
      justifyContent: "center",
      gap: "10px",
    };
  
    const buttonStyle = (isHighlighted) => ({
      position: "relative",
      width: isHighlighted ? "120px" : "100px",
      height: isHighlighted ? "120px" : "100px",
      border: isHighlighted ? "2px solid gold" : "none",
      borderRadius: "8px",
      overflow: "hidden",
      cursor: "pointer",
      boxShadow: isHighlighted
        ? "0 8px 10px rgba(0, 0, 0, 0.3)"
        : "0 4px 6px rgba(0, 0, 0, 0.1)",
      zIndex: isHighlighted ? 10 : 1,
      transition: "all 0.3s ease",
    });
  
    const imageStyle = {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    };
  
    const labelStyle = {
      position: "absolute",
      bottom: "0",
      left: "0",
      right: "0",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      color: "white",
      fontSize: "14px",
      fontWeight: "bold",
      padding: "5px",
      textAlign: "center",
    };
  
    const handleClick = (index) => {
      setHighlightedIndex(index === highlightedIndex ? null : index);
    };
  
    return (
      <div style={containerStyle}>
        <div style={rowStyle}>
          {images.slice(0, 5).map((image, index) => (
            <button
              key={index}
              style={buttonStyle(highlightedIndex === index)}
              onClick={() => handleClick(index)}
            >
              <img src={image.image} alt={`${image.alt}`} style={imageStyle} />
              <span style={labelStyle}>{image.alt}</span>
            </button>
          ))}
        </div>
        <div style={rowStyle}>
          {images.slice(5).map((image, index) => (
            <button
              key={index + 5}
              style={buttonStyle(highlightedIndex === index + 5)}
              onClick={() => handleClick(index + 5)}
            >
              <img
                src={image.image}
                alt={`${image.alt}`}
                style={imageStyle}
              />
              <span style={labelStyle}>{image.alt}</span>
            </button>
          ))}
        </div>
      </div>
    );
    }

export default AuctionPurse;
