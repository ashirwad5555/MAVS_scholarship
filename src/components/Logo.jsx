import React from "react";

function Logo({ width = "100px" }) {
  return (
    <div className="text-2xl font-bold text-slate-900">
      <img src="src\assets\mavs_main_logoHD.png" alt="MAVS" width={width} />
    </div>
  );
}

export default Logo;
