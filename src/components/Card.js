import React from "react";

const Card = ({ children, style }) => {
  return (
   <div style={{ ...defaultStyles.container }}>
      <div style={{ ...defaultStyles.card, ...style }}>
        {children}
      </div>
    </div>
  );
};

export const defaultStyles = {
  card: {
    backgroundColor: "#fff",
    padding: "30px 25px",
    width: "100%",
    maxWidth: "350px",
    borderRadius: "8px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15)",
  },

  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    fontFamily: "Arial, sans-serif",
  },

    button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#667eea",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "15px",
    cursor: "pointer",
  },
};

export default Card;
