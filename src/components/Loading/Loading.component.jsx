import React from "react";
import "./loading.css";
import loading from "../../assets/image/loading.gif";
export default function LoadingComponent() {
  return (
    <div className="loader-container">
      <div className="loader">
        <img src={loading} alt="" width="40%" />
      </div>
    </div>
  );
}
