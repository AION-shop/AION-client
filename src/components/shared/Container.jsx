import React from "react";
const Container = ({ children }) => {
  return (
    <div className="max-w-[90%] mx-auto px-2 sm:px-4">
      {children}
    </div>
  );
};

export default Container;
