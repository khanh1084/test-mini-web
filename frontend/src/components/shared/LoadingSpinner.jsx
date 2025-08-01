import React from "react";

function LoadingSpinner({ message = "Đang tải..." }) {
  return <div className="loading">{message}</div>;
}

export default LoadingSpinner;
