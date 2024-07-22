import React from 'react'

function Logo({width = '100px'}) {
  return (
    <div className="text-2xl font-bold text-slate-900">
      <img
        src="https://wallpapers.com/images/hd/lord-pandurang-and-rukmini-digital-art-vgr62833s4ip96fn.jpg"
        alt="MAVS" width={width}
      />
    </div>
  );
}

export default Logo