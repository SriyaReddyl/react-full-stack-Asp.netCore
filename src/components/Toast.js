import React from "react";

const Toast = ({ message }) => {
  if (!message) return null;

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      background: "#4caf50",
      color: "white",
      padding: "10px 20px",
      borderRadius: "5px",
      zIndex: 1000
    }}>
      {message}
    </div>
  );
};

export default Toast;