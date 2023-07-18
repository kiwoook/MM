import React from "react";
import MoonLoader from "react-spinners/MoonLoader";

const Loading = ({loading} : any) => {
  return (
    <div className="loading">
      <MoonLoader
        color={"#868dfb"}
        loading={loading}
        size={100}
        speedMultiplier={0.5}
      />
    </div>
  );
};

export default Loading;
