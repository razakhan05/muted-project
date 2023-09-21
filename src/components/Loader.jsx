import React from "react";
import { Puff } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center py-3">
      <Puff
        height="80"
        width="80"
        radius="9"
        color=" rgb(14 116 144)"
        ariaLabel="three-dots-loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};

export default Loader;
