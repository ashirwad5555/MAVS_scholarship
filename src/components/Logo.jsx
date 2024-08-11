import React from "react";
import img from "../assets/mavs_main_logoHD.png";

function Logo({ width = "100px" }) {
  return (
    <div className="text-2xl font-bold text-slate-900">
      <img src={ img } alt="MAVS" width={width} />
    </div>
  );
}

export default Logo;
